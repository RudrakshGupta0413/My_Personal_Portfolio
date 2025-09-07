import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, X, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm Rudraksh's AI assistant. I can help answer questions about his skills, projects, experience, and more. What would you like to know?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Sample responses for common questions
  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes("skill") || message.includes("technology") || message.includes("tech")) {
      return "Rudraksh specializes in full-stack development with expertise in React, Next.js, Node.js, TypeScript, Python, and modern databases like MongoDB and PostgreSQL. He's also experienced with cloud platforms, DevOps tools, and modern development practices.";
    }
    
    if (message.includes("project") || message.includes("work") || message.includes("portfolio")) {
      return "Rudraksh has worked on various impressive projects including SaaS applications, e-commerce platforms, and AI-powered tools. His notable projects include real-time collaboration tools, modern web applications with advanced features, and scalable backend systems. Check out the Projects section for detailed information!";
    }
    
    if (message.includes("experience") || message.includes("background")) {
      return "Rudraksh is a passionate full-stack developer with experience in building modern web applications. He has expertise in both frontend and backend development, with a focus on creating scalable, user-friendly solutions using cutting-edge technologies.";
    }
    
    if (message.includes("contact") || message.includes("hire") || message.includes("collaborate")) {
      return "You can reach out to Rudraksh through the contact form on this website, or connect via LinkedIn (linkedin.com/in/rudraksh-gupta-664b591b2/) or email (rudrakshgupta40@gmail.com). He's always open to discussing new opportunities and collaborations!";
    }
    
    if (message.includes("blog") || message.includes("article") || message.includes("writing")) {
      return "Rudraksh shares his knowledge through technical blogs on Hashnode (rudrakshgupta40.hashnode.dev). He writes about web development, best practices, and emerging technologies. Check out the Blogs section for his latest articles!";
    }
    
    if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
      return "Hello! Great to meet you! I'm here to help you learn more about Rudraksh's work and expertise. What specific information are you looking for?";
    }
    
    return "That's an interesting question! For detailed information about Rudraksh's work, skills, and projects, I'd recommend exploring the different sections of this portfolio. If you have specific questions about his experience or want to get in touch, feel free to ask!";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        isBot: true,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="fixed right-6 bottom-32 z-50"
      >
        <motion.button
          onClick={() => setIsOpen(true)}
          className="glass-effect glow-effect rounded-full p-4 bg-gradient-primary hover:shadow-glow-neon transition-all duration-300 group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageCircle className="h-6 w-6 text-primary-foreground" />
          
          {/* Pulse animation */}
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
          
          {/* Tooltip */}
          <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="bg-card border border-border rounded-lg px-3 py-2 text-sm whitespace-nowrap text-card-foreground">
              Ask me anything!
            </div>
          </div>
        </motion.button>
      </motion.div>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0, x: 100, y: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0, x: 100, y: 100 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed right-6 bottom-6 z-50 w-80 h-96"
          >
            <div className="glass-effect rounded-2xl border border-border/50 h-full flex flex-col overflow-hidden shadow-glow-neon">
              {/* Header */}
              <div className="bg-gradient-primary p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-surface-dark flex items-center justify-center">
                    <Bot className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-foreground">AI Assistant</h3>
                    <p className="text-xs text-primary-foreground/80">Ask me about Rudraksh</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-primary-foreground hover:bg-surface-dark/20 h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-2 ${message.isBot ? "justify-start" : "justify-end"}`}
                    >
                      {message.isBot && (
                        <div className="w-6 h-6 rounded-full bg-gradient-neon flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Bot className="h-3 w-3 text-surface-darker" />
                        </div>
                      )}
                      <div
                        className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${
                          message.isBot
                            ? "bg-card border border-border text-card-foreground"
                            : "bg-gradient-primary text-primary-foreground"
                        }`}
                      >
                        {message.text}
                      </div>
                      {!message.isBot && (
                        <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                          <User className="h-3 w-3 text-accent-foreground" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                  
                  {/* Typing indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-2 justify-start"
                    >
                      <div className="w-6 h-6 rounded-full bg-gradient-neon flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Bot className="h-3 w-3 text-surface-darker" />
                      </div>
                      <div className="bg-card border border-border rounded-2xl px-3 py-2 text-sm text-card-foreground">
                        <div className="flex gap-1">
                          <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce" />
                          <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                          <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="p-4 border-t border-border/30">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything..."
                    className="flex-1 bg-surface-dark border-border/50 text-foreground placeholder:text-muted-foreground"
                  />
                  <Button
                    onClick={handleSendMessage}
                    size="icon"
                    className="bg-gradient-primary hover:shadow-glow-accent"
                    disabled={!inputValue.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;