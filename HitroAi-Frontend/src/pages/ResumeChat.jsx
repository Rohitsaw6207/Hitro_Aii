import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatBox from '../components/ChatBox';
import ChatMessage from '../components/ChatMessage';
import LoadingSpinner from '../components/LoadingSpinner';

const ResumeChat = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Initial welcome message with example inputs
    setMessages([
      {
        id: 1,
        text:
          "👋 Hi! I'm your Resume Assistant. I can help with resumes, cover letters, LinkedIn optimization, and job interviews.\n\n" +
          "**Example Inputs:**\n" +
          "- Create a resume for software engineer\n" +
          "- Write a cover letter for digital marketing\n" +
          "- Help with interview prep for HR role",
        isUser: false,
        timestamp: new Date(),
      },
    ]);
  }, [navigate]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

const handleSendMessage = async (message) => {
  const userMessage = {
    id: Date.now(),
    text: message,
    isUser: true,
    timestamp: new Date(),
  };

  setMessages((prev) => [...prev, userMessage]);
  setIsLoading(true);

  try {
    const res = await fetch('http://localhost:8000/api/resume-assistant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();

    const aiMessage = {
      id: Date.now() + 1,
      text: data.result || '⚠️ Resume Assistant did not return a response.',
      isUser: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, aiMessage]);
  } catch (error) {
    console.error('Error from Resume Assistant:', error);
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + 1,
        text: '🚫 Could not connect to Resume Assistant. Please try again later.',
        isUser: false,
        timestamp: new Date(),
      },
    ]);
  }

  setIsLoading(false);
};


  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="max-w-4xl mx-auto">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg.text} isUser={msg.isUser} />
          ))}
          {isLoading && <LoadingSpinner />}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <ChatBox onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ResumeChat;
