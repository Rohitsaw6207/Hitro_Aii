import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { User, Bot, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useState } from 'react';

const ChatMessage = ({ message, isUser }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`group relative px-4 py-6 transition-all duration-300 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 ${
        isUser
          ? 'bg-gradient-to-r from-primary-50/30 to-purple-50/30 dark:from-primary-900/20 dark:to-purple-900/20'
          : ''
      }`}
    >
      <div className="max-w-4xl mx-auto flex space-x-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 ${
              isUser
                ? 'bg-gradient-to-r from-primary-500 to-purple-600 text-white'
                : 'bg-gradient-to-r from-emerald-500 to-cyan-600 text-white'
            }`}
          >
            {isUser ? <User size={20} /> : <Bot size={20} />}
          </div>
        </div>

        {/* Message Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="font-semibold text-gray-900 dark:text-gray-100">
              {isUser ? 'You' : 'Hitro AI'}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {new Date().toLocaleTimeString()}
            </div>
          </div>

          {/* Message Body — everything 15 px */}
          <div className="text-gray-700 dark:text-gray-300 max-w-none dark:prose-invert text-[15px]">
            {isUser ? (
              <p className="whitespace-pre-wrap text-[15px]">{message}</p>
            ) : (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <div className="relative group/code">
                        <SyntaxHighlighter
                          style={tomorrow}
                          language={match[1]}
                          PreTag="div"
                          className="rounded-lg !bg-gray-900 dark:!bg-gray-800 text-[15px]"
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                        <button
                          onClick={() => handleCopy(String(children))}
                          className="absolute top-2 right-2 p-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded opacity-0 group-hover/code:opacity-100 transition-all"
                        >
                          <Copy size={12} />
                        </button>
                      </div>
                    ) : (
                      <code
                        className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-[15px]"
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  },
                  h1: ({ children }) => (
                    <h1 className="text-lg font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent mb-1">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-1 mt-2">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-[15px] font-medium text-gray-700 dark:text-gray-300 mb-1 mt-1">
                      {children}
                    </h3>
                  ),
                  ul: ({ children }) => (
                    <ul className="space-y-0.5 ml-2 text-[15px]">{children}</ul>
                  ),
                  li: ({ children }) => (
                    <li className="flex items-start space-x-2">
                      <span className="w-1 h-1 bg-primary-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>{children}</span>
                    </li>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-2 border-primary-500 pl-3 py-1 bg-primary-50 dark:bg-primary-900/20 rounded-r my-2 text-[15px]">
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {message}
              </ReactMarkdown>
            )}
          </div>

          {/* Action Buttons for AI Messages */}
          {!isUser && (
            <div className="flex items-center space-x-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleCopy(message)}
                className="flex items-center space-x-1 px-1.5 py-0.5 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <Copy size={8} />
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;