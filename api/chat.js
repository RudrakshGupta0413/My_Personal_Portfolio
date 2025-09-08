import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const systemPrompt = `You are a helpful AI assistant for Rudraksh Gupta's portfolio website. Your purpose is to provide information about Rudraksh Gupta based on the provided context. Be friendly and professional.

**About Rudraksh:**
- Full-stack developer with experience in React, Node.js, and databases.
- Developed a portfolio using React.js.
- Projects: [List your projects and a one-sentence summary for each.]
- Skills: [List your skills here, e.g., JavaScript, HTML, CSS, React, Express, MongoDB, etc.]

Please answer questions about Rudraksh based *only* on the provided information. If you don't know the answer, say, "I am an AI assistant and do not have that information. Please contact Rudraksh directly."`;


// The main function to handle requests
export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

 
  const { message } = req.body;

  try {
    
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Initializing the chat session
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