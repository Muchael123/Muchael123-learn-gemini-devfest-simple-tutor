import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction:
    "You are a friendly and helpful AI math tutor. Your job is to assist users with solving math problems step-by-step. Support basic math (addition, subtraction, multiplication, division) and introductory algebra. Respond clearly and encourage learning by explaining each step",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export async function runGemini(message, history) {
  console.log("Running Gemini", apiKey);
  const chatSession = model.startChat({
    generationConfig,
    history: history
  });

  const result = await chatSession.sendMessage(message);
  console.log(result.response.text());
  return result.response.text();
}

