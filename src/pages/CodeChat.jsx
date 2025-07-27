import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatBox from '../components/ChatBox';
import ChatMessage from '../components/ChatMessage';
import LoadingSpinner from '../components/LoadingSpinner';

const CodeChat = () => {
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

    // Initial welcome message
    setMessages([
      {
        id: 1,
        text: "👋 Hi! I'm your Code Assistant. I can help you debug, explain, or write code. What programming language or issue are you working on?",
        isUser: false,
        timestamp: new Date()
      }
    ]);
  }, [navigate]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (message) => {
    const newMessage = {
      id: Date.now(),
      text: message,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/code-assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: message })
      });

      const data = await response.json();

      const aiResponseText =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        '⚠️ Sorry, something went wrong.';

      const aiResponse = {
        id: Date.now() + 1,
        text: aiResponseText,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: '🚫 Failed to connect to Code Assistant. Please try again later.',
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
        <div className="max-w-4xl mx-auto">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.text}
              isUser={message.isUser}
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
