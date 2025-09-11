import type { NextApiRequest, NextApiResponse } from "next";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { retrieveRelevantContext } from "../retriever.js";

if (!process.env.GOOGLE_API_KEY) {
  throw new Error("GOOGLE_API_KEY environment variable is not set.");
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);

const systemPrompt = `You are a helpful AI assistant for Rudraksh Gupta's portfolio website. Your purpose is to provide information about Rudraksh Gupta based on the provided context. Be friendly and professional. If you don't know the answer, say, "I am an AI assistant and do not have that information. Please contact Rudraksh directly."`;

// The main function to handle requests
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ message: "Message is required." });
  }

  const maxRetries = 5;
  let attempt = 0;
  const responseText = null;

  while (attempt < maxRetries) {
    try {
      // Step 1: Retrieve relevant context based on the user's message
      const relevantContext = retrieveRelevantContext(message);

      // Step 2: Combine the system prompt, retrieved context, and user message
      const combinedPrompt = `${systemPrompt}\n\n${relevantContext}\n\nUser Question: ${message}`;

      // Step 3: Send the combined prompt to the Gemini API
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const chat = model.startChat({ history: [] });

      const result = await chat.sendMessage(combinedPrompt);
      const responseText = result.response.text();

      break;
    } catch (error: unknown) {
      if (
        typeof error === "object" &&
        error !== null &&
        "status" in error &&
        (error as { status?: number }).status === 503 &&
        attempt < maxRetries - 1
      ) {
        // Log the retry attempt
        console.warn(
          `Gemini API call failed with 503. Retrying attempt ${
            attempt + 1
          }/${maxRetries}...`
        );

        // Calculate the delay using exponential backoff with jitter
        // (1000 * 2^attempt) + a random number to prevent all clients from retrying at once
        const delay = Math.pow(2, attempt) * 1000 + Math.random() * 1000;
        await new Promise((resolve) => setTimeout(resolve, delay));
        attempt++;
      } else {
        // Re-throw the error if it's not a 503 or if max retries are reached
        console.error("Gemini API call failed:", error);
        return res
          .status(500)
          .json({ message: "Failed to get a response from the AI." });
      }
    }
  }

  if (responseText === null) {
    return res
      .status(500)
      .json({
        message: "The model is currently overloaded. Please try again later.",
      });
  }

  res.status(200).json({ response: responseText });
}
