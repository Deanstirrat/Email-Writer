import { Configuration, OpenAIApi } from 'openai';
const configuration = new Configuration({
  apiKey: 'secret key',
});
const openai = new OpenAIApi(configuration);

const getFromAI = async (inputPrompt) => {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "user", content: inputPrompt}],
  });
  return completion.data.choices[0].message.content;
}

export { getFromAI };
