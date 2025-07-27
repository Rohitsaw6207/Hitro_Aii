import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatBox from '../components/ChatBox';
import ChatMessage from '../components/ChatMessage';
import LoadingSpinner from '../components/LoadingSpinner';

const TranslatorChat = () => {
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
    text: `👋 Hey there! I’m your Translator Assistant. Type something and tell me the language you want it translated into.

**Example inputs you can try:**
- \`Hi, translate in Hindi\`
- \`Good morning translate to Japanese\``,
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

const handleSendMessage = async (text) => {
  const userMessage = {
    id: Date.now(),
    text,
    isUser: true,
    timestamp: new Date()
  };

  setMessages(prev => [...prev, userMessage]);
  setIsLoading(true);

  // 🔍 Extract language from message
  const lowerText = text.toLowerCase();
  const match = lowerText.match(/translate (?:in|to) (\w+)/);
  const targetLanguage = match ? match[1] : 'Hindi'; // fallback default

  // 🧹 Clean the message
  const cleanedText = text.replace(/translate (?:in|to) (\w+)/i, '').trim();

  try {
    const response = await fetch('http://localhost:8000/api/translator', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: cleanedText,
        language: targetLanguage
      })
    });

    const data = await response.json();
    const translated = data.candidates?.[0]?.content?.parts?.[0]?.text || '⚠️ Could not translate.';

    setMessages(prev => [
      ...prev,
      {
        id: Date.now() + 1,
        text: `(${targetLanguage}): ${translated}`,
        isUser: false,
        timestamp: new Date()
      }
    ]);
  } catch (error) {
    console.error('Translator error:', error);
    setMessages(prev => [
      ...prev,
      {
        id: Date.now() + 1,
        text: '⚠️ Something went wrong. Try again.',
        isUser: false,
        timestamp: new Date()
      }
    ]);
  } finally {
    setIsLoading(false);
  }
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

export default TranslatorChat;
