import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatBox from '../components/ChatBox';
import ChatMessage from '../components/ChatMessage';
import LoadingSpinner from '../components/LoadingSpinner';

const StudentChat = () => {
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

    setMessages([
      {
        id: 1,
        text: "👋 Hello! I'm your Student Assistant. I can help you with homework, research, study guides, essays, and academic questions.\n\n**Example Inputs:**\n- Explain photosynthesis\n- Help me write a history essay\n- Provide a math study guide",
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
    const res = await fetch('http://localhost:8000/api/student-assistant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();

    const aiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    const aiMessage = {
      id: Date.now() + 1,
      text: aiResponse || '⚠️ Student Assistant did not return a response.',
      isUser: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, aiMessage]);
  } catch (error) {
    console.error('Error from Student Assistant:', error);
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + 1,
        text: '🚫 Could not connect to Student Assistant. Please try again later.',
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

export default StudentChat;
