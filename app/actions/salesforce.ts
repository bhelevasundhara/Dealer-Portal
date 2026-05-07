'use server'

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';

// Cache the client globally so we don't force Salesforce to re-initialize on every request
let globalMcpClient: Client | null = null;

async function getMCPClient(): Promise<Client> {
  if (globalMcpClient) {
    return globalMcpClient;
  }

  const instanceUrl = process.env.SF_INSTANCE_URL!;
  const clientId = process.env.SF_CLIENT_ID!;
  const clientSecret = process.env.SF_CLIENT_SECRET!;

  // Step 1: Get OAuth token via Client Credentials flow
  const tokenRes = await fetch(`${instanceUrl}/services/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });

  const tokenData = await tokenRes.json();
  if (!tokenRes.ok || tokenData.error) {
    throw new Error(`OAuth failed: ${tokenData.error_description || tokenData.error}`);
  }

  const accessToken = tokenData.access_token;

  // Step 2: Connect to Salesforce Hosted MCP
  const mcpServerUrl = new URL('https://api.salesforce.com/platform/mcp/v1/platform/sobject-all');
  const transport = new StreamableHTTPClientTransport(mcpServerUrl, {
    requestInit: {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
  });

  const client = new Client({ name: 'abc-heavy-equipments', version: '1.0.0' }, { capabilities: {} });
  await client.connect(transport);

  // Step 3: Initialize session — Salesforce MCP requires listTools before any callTool
  await client.listTools();

  globalMcpClient = client;
  return client;
}

// Unified helper to call MCP tools with automatic retry on "not initialized" errors
async function callMCPToolWithRetry(toolName: string, args: any, attempt = 1): Promise<any> {
  let client;
  try {
    client = await getMCPClient();
    const result = await client.callTool({ name: toolName, arguments: args });

    if (result.isError) {
      const errorText = (result.content as {text:string}[])[0]?.text || '';
      if (errorText.includes("not been initialized") && attempt < 3) {
        console.log(`MCP server initialization lag on ${toolName}. Reconnecting (Attempt ${attempt + 1})...`);
        globalMcpClient = null;
        await new Promise(resolve => setTimeout(resolve, 2000));
        return callMCPToolWithRetry(toolName, args, attempt + 1);
      }
    }
    return result;
  } catch (err: any) {
    globalMcpClient = null;

    if (err.message?.includes("not been initialized") && attempt < 3) {
      console.log(`MCP transport lag on ${toolName}. Reconnecting (Attempt ${attempt + 1})...`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      return callMCPToolWithRetry(toolName, args, attempt + 1);
    }
    throw err;
  }
}

// Create a Case in Salesforce
export async function createCaseAction(formData: FormData) {
  const subject = formData.get('subject') as string;
  const caseType = formData.get('caseType') as string;
  const status = formData.get('status') as string;
  const caseOrigin = formData.get('caseOrigin') as string;
  const description = formData.get('description') as string;

  const caseData: Record<string, any> = {
    Subject: subject,
    Type: caseType,
    Description: description,
    Origin: caseOrigin || 'Web',
    Status: status || 'New',
    Priority: 'Medium',
  };

  try {
    const result = await callMCPToolWithRetry('createSobjectRecord', { "sobject-name": "Case", "body": caseData });

    if (result.isError) {
      const errorMsg = (result.content as {text: string}[])[0]?.text || 'MCP error';
      return { success: false, error: errorMsg };
    }

    const content = result.content as { type: string; text: string }[];
    const parsed = JSON.parse(content[0].text);
    const caseId = parsed.id || parsed.Id;

    console.log('✅ Case created via MCP! ID:', caseId);
    return { success: true, caseId };

  } catch (error: any) {
    console.error('❌ MCP Error:', error.message);
    return { success: false, error: error.message || 'Failed to create case via MCP.' };
  }
}

// Submit Onboarding to Salesforce (Account, Contact, Opportunity)
export async function createOnboardingAction(onboardingData: Record<string, any>) {
  try {
    // 1. Create Salesforce Account
    const accountPayload = {
      Name: onboardingData.companyName,
      Website: onboardingData.websiteUrl || '',
      BillingStreet: onboardingData.primaryStreet || '',
      BillingCity: onboardingData.primaryCity || '',
      BillingState: onboardingData.primaryState || '',
      BillingPostalCode: onboardingData.primaryZip || '',
      BillingCountry: onboardingData.primaryCountry || '',
      ShippingStreet: onboardingData.billingStreet || onboardingData.primaryStreet || '',
      ShippingCity: onboardingData.billingCity || onboardingData.primaryCity || '',
      ShippingState: onboardingData.billingState || onboardingData.primaryState || '',
      ShippingPostalCode: onboardingData.billingZip || onboardingData.primaryZip || '',
      ShippingCountry: onboardingData.billingCountry || onboardingData.primaryCountry || '',
      Description: `Equipment Specialties: ${onboardingData.specialties?.join(', ') || 'None'}. Territory: ${onboardingData.territory || 'Not Specified'}.`
    };

    const accountResult = await callMCPToolWithRetry('createSobjectRecord', { "sobject-name": "Account", "body": accountPayload });
    if (accountResult.isError) {
      throw new Error((accountResult.content as {text: string}[])[0]?.text || 'Failed to create Account');
    }
    const accParsed = JSON.parse((accountResult.content as { type: string; text: string }[])[0].text);
    const accountId = accParsed.id || accParsed.Id;

    // 2. Create Salesforce Contact (Linked to Account)
    const contactPayload = {
      FirstName: onboardingData.firstName || '',
      LastName: onboardingData.lastName || 'Onboarding Contact',
      Email: onboardingData.email || '',
      Phone: onboardingData.phone || '',
      AccountId: accountId,
      LeadSource: 'Web'
    };

    const contactResult = await callMCPToolWithRetry('createSobjectRecord', { "sobject-name": "Contact", "body": contactPayload });
    if (contactResult.isError) {
      throw new Error((contactResult.content as {text: string}[])[0]?.text || 'Failed to create Contact');
    }

    // 3. Create Salesforce Opportunity (Linked to Account, Closed Won)
    const currentDate = new Date().toISOString().split('T')[0];
    const opportunityPayload = {
      Name: `${onboardingData.companyName} - Onboarding Opportunity`,
      StageName: 'Closed Won',
      CloseDate: currentDate,
      AccountId: accountId,
      LeadSource: 'Web',
      Amount: 150000, // Hardcoded standard onboarding default amount
      Description: `Onboarding Opportunity for ABC Equipment. Bank Account Name: ${onboardingData.bankName || 'Not Specified'}.`
    };

    const opportunityResult = await callMCPToolWithRetry('createSobjectRecord', { "sobject-name": "Opportunity", "body": opportunityPayload });
    if (opportunityResult.isError) {
      throw new Error((opportunityResult.content as {text: string}[])[0]?.text || 'Failed to create Opportunity');
    }

    console.log('✅ Onboarding successfully completed for Account ID:', accountId);
    return { success: true, accountId };

  } catch (error: any) {
    console.error('❌ Onboarding MCP Error:', error.message);
    return { success: false, error: error.message || 'Failed to complete onboarding via MCP.' };
  }
}
