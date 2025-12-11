'use client';

import React, { useState, useRef, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import { RiChat3Line } from 'react-icons/ri';
import { MdHeadset, MdCheckCircle } from 'react-icons/md';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

type ChatStage = 'greeting' | 'query' | 'contact_name' | 'contact_email' | 'contact_phone' | 'complete';

// Email validation function
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatStage, setChatStage] = useState<ChatStage>('greeting');
  const [contactData, setContactData] = useState({
    query: '',
    name: '',
    email: '',
    phone: '',
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        text: 'Hello! How may I help you?',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
      setChatStage('query');
    }
  }, [isOpen, messages]);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    // Focus and select input after bot replies
    if (isOpen && !isLoading && chatStage !== 'complete') {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.select();
        }
      }, 100);
    }
  }, [messages, isLoading, isOpen, chatStage]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Handle different chat stages
    if (chatStage === 'query') {
      // User entered their query
      setContactData((prev) => ({ ...prev, query: inputValue }));
      
      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Thank you for your inquiry! To assist you better, could you please provide your full name?',
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
        setChatStage('contact_name');
        setIsLoading(false);
      }, 500);
    } else if (chatStage === 'contact_name') {
      // User entered their name
      setContactData((prev) => ({ ...prev, name: inputValue }));
      
      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: `Nice to meet you, ${inputValue}! What is your email address?`,
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
        setChatStage('contact_email');
        setIsLoading(false);
      }, 500);
    } else if (chatStage === 'contact_email') {
      // User entered their email - validate before proceeding
      if (!isValidEmail(inputValue)) {
        setIsLoading(false);
        setTimeout(() => {
          const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: 'Please enter a valid email address (e.g., name@example.com).',
            sender: 'bot',
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, botMessage]);
        }, 500);
        return;
      }
      
      setContactData((prev) => ({ ...prev, email: inputValue }));
      
      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Great! And what is your phone number?',
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
        setChatStage('contact_phone');
        setIsLoading(false);
      }, 500);
    } else if (chatStage === 'contact_phone') {
      // User entered phone, save to database
      setContactData((prev) => ({ ...prev, phone: inputValue }));
      
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: contactData.name,
            email: contactData.email,
            message: contactData.query,
            phone: inputValue,
          }),
        });

        if (response.ok) {
          const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: `Perfect! Thank you ${contactData.name}. We've received your information and will get back to you at ${contactData.email} shortly. Our team will review your inquiry and contact you soon!`,
            sender: 'bot',
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, botMessage]);
          setChatStage('complete');
          setIsLoading(false);
        } else {
          throw new Error('Failed to save contact');
        }
      } catch (error) {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Sorry, there was an error saving your information. Please try again or use our contact form.',
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
        setIsLoading(false);
      }
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setContactData({ query: '', name: '', email: '', phone: '' });
    setChatStage('greeting');
    setIsOpen(false);
  };

  const isInputDisabled = isLoading || chatStage === 'complete';

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-[var(--accent-blue)] text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
          aria-label="Open chat"
        >
          <RiChat3Line size={24} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-8 right-8 z-40 w-80 h-96 bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4">
          {/* Header */}
          <div className="bg-gradient-to-r from-[var(--accent-blue)] to-blue-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MdHeadset size={28} />
              <div>
                <h3 className="font-bold text-lg">Chat with us</h3>
                <div className="flex items-center gap-1 text-xs text-blue-100">
                  <MdCheckCircle size={14} />
                  <p>We typically reply within minutes</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 p-1 rounded transition-colors"
              aria-label="Close chat"
            >
              <IoMdClose size={24} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                    message.sender === 'user'
                      ? 'bg-[var(--accent-blue)] text-white rounded-br-none'
                      : 'bg-white text-gray-900 border border-gray-200 rounded-bl-none'
                  }`}
                >
                  <p className="leading-relaxed">{message.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-900 border border-gray-200 rounded-lg rounded-bl-none px-4 py-2">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4 bg-white">
            {chatStage === 'complete' ? (
              <button
                onClick={handleNewChat}
                className="w-full px-4 py-2 bg-[var(--accent-blue)] text-white rounded-lg hover:bg-[var(--accent-blue)]/90 transition-colors font-semibold"
              >
                Start New Chat
              </button>
            ) : (
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  ref={inputRef}
                  type={chatStage === 'contact_email' ? 'email' : 'text'}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={
                    chatStage === 'query'
                      ? 'Describe your inquiry...'
                      : chatStage === 'contact_name'
                      ? 'Enter your name...'
                      : chatStage === 'contact_email'
                      ? 'Enter your email...'
                      : 'Enter your phone...'
                  }
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)] focus:border-transparent text-sm"
                  disabled={isInputDisabled}
                />
                <button
                  type="submit"
                  disabled={isInputDisabled || !inputValue.trim()}
                  className="px-4 py-2 bg-[var(--accent-blue)] text-white rounded-lg hover:bg-[var(--accent-blue)]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-semibold"
                  aria-label={
                    chatStage === 'query'
                      ? 'Send inquiry'
                      : chatStage === 'contact_name'
                      ? 'Send name'
                      : chatStage === 'contact_email'
                      ? 'Send email'
                      : chatStage === 'contact_phone'
                      ? 'Send phone number'
                      : 'Send message'
                  }
                >
                  Send
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
