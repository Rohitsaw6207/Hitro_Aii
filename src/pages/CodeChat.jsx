import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatBox from '../components/ChatBox';
import ChatMessage from '../components/ChatMessage';
import LoadingSpinner from '../components/LoadingSpinner';
import { GoogleGenerativeAI } from '@google/generative-ai';

// ✅ Initialize Gemini with your API key
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const CodeChat = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // ✅ Check authentication + Set welcome message
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setMessages([
      {
        id: 1,
        text: `👋 Hey! I'm your **professional Code Assistant** 👨‍💻  
I can help you debug, explain, or generate code in **any programming language**.  

💡 Example: *Create a simple calculator in HTML*  
Let’s get started!`,
        isUser: false,
        timestamp: new Date()
      }
    ]);
  }, [navigate]);

  // ✅ Always scroll to bottom on new message
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // ✅ Handle user message
const handleSendMessage = async (message) => {
  const userMsg = {
    id: Date.now(),
    text: message,
    isUser: true,
    timestamp: new Date()
  };

  setMessages(prev => [...prev, userMsg]);
  setIsLoading(true);

  try {
    const res = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: message, type: "code" }) // 'code' maps to Code Assistant role
    });

    const data = await res.json();

    const aiMsg = {
      id: Date.now() + 1,
      text: data.text || '⚠️ Gemini returned no response.',
      isUser: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMsg]);
  } catch (error) {
    console.error('🔥 Gemini Proxy Error:', error);
    setMessages(prev => [...prev, {
      id: Date.now() + 1,
      text: '🚫 Couldn’t reach Gemini. Please try again later.',
      isUser: false,
      timestamp: new Date()
    }]);
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg.text}
              isUser={msg.isUser}
            />
          ))}
          {isLoading && <LoadingSpinner />}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <ChatBox onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default CodeChat;
