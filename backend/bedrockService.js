const { BedrockRuntimeClient, InvokeModelCommand } = require("@aws-sdk/client-bedrock-runtime");

const client = new BedrockRuntimeClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function generateAIResponse(prompt) {
  const body = JSON.stringify({
    anthropic_version: "bedrock-2023-05-31",
    max_tokens: 300,
    messages: [
      {
        role: "user",
        content: prompt
      }
    ]
  });

  const command = new InvokeModelCommand({
    modelId: "anthropic.claude-3-haiku-20240307-v1:0",
    contentType: "application/json",
    accept: "application/json",
    body: body,
  });

  const response = await client.send(command);
  const decoded = JSON.parse(new TextDecoder().decode(response.body));

  return decoded.content[0].text;
}

module.exports = { generateAIResponse };