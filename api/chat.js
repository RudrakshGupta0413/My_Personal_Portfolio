import { GoogleGenerativeAI } from "@google/generative-ai";

// Configure the Google AI client with your API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// The 'system' message needs to be included as the first 'user' message in the chat history
// for models like Gemini 1.0 Pro. This gives the AI context about you.
const systemPrompt = `You are a helpful AI assistant for Rudraksh Gupta's portfolio website. Your purpose is to provide information about Rudraksh Gupta based on the provided context. Be friendly and professional.

**About Rudraksh:**
- Full-stack developer with experience in React, Node.js, and databases.
- Developed a portfolio using React.js.
- Projects: [List your projects and a one-sentence summary for each.]
- Skills: [List your skills here, e.g., JavaScript, HTML, CSS, React, Express, MongoDB, etc.]

Please answer questions about Rudraksh based *only* on the provided information. If you don't know the answer, say, "I am an AI assistant and do not have that information. Please contact Rudraksh directly."`;


// The main function to handle requests
export default async function handler(req, res) {
  // Only allow POST requests for security
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  // Get the message from the request body sent from your React app
  const { message } = req.body;

  try {
    // For conversational models, Gemini uses startChat() to maintain context.
    // The system prompt is passed as a first message in the history.
    const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

    // Initialize the chat session
    const chat = model.startChat({
        history: [{
            role: "user",
            parts: [{ text: systemPrompt }],
        }],
    });
    
    // Send the user's message to the chat session
    const result = await chat.sendMessage(message);

    // Get the response text
    const responseText = await result.response.text();

    // Send the AI's response back to the front end
    res.status(200).json({ response: responseText });
  } catch (error) {
    console.error("Gemini API call failed:", error);
    res.status(500).json({ message: "Failed to get a response from the AI." });
  }
}