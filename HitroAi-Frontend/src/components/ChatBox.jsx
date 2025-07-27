import { useState } from 'react';
import { Send } from 'lucide-react';

const ChatBox = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="sticky bottom-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50 p-4 shadow-2xl">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="relative">
          {/* Main Input Container */}
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-600 shadow-lg hover:shadow-xl transition-all duration-300 focus-within:ring-2 focus-within:ring-primary-500/50 focus-within:border-primary-500">
            
            {/* Input Field */}
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message Hitro AI..."
              className="w-full px-3 py-3 pr-14 bg-transparent border-none outline-none resize-none text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 text-sm leading-5 max-h-28 min-h-[48px] scrollbar-thin rounded-2xl"
              disabled={isLoading}
              rows={1}
              style={{
                height: 'auto',
                minHeight: '48px',
                maxHeight: '112px'
              }}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 112) + 'px';
              }}
            />
            
            {/* Send Button */}
            <div className="absolute right-1.5 bottom-1.5">
              <button
                type="submit"
                disabled={!message.trim() || isLoading}
                className="group p-2.5 bg-gradient-to-r from-primary-500 to-purple-600 hover:from-primary-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg hover:shadow-xl"
              >
                <Send size={16} className={`transition-transform duration-200 ${isLoading ? 'animate-pulse' : 'group-hover:translate-x-0.5'}`} />
              </button>
            </div>
          </div>
          
          {/* Status & Instructions */}
          <div className="flex items-center justify-between mt-2 px-2">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {isLoading ? (
                <span className="flex items-center space-x-1">
                  <div className="w-1 h-1 bg-primary-500 rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1 h-1 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <span className="ml-2">AI is thinking...</span>
                </span>
              ) : (
                <span className="text-xs">Press Enter to send</span>
              )}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {message.length}/2000
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;