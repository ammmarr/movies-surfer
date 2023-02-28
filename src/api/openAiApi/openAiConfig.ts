import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    organization: "org-0SRQWMpRooSzEm4zXA1lQYxY",
    apiKey: import.meta.env.VITE_OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.listEngines();


export default async function openAiCall() {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Hello",
        temperature: 0,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ["\n"],
      });
      console.log(response)
}
