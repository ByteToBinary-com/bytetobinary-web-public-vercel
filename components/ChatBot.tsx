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

// Helper function to sanitize user input to prevent XSS
const sanitizeInput = (input: string): string => {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
};

// Email validation using HTML5 pattern
const isValidEmail = (email: string): boolean => {
  // Use browser's native email validation
  const input = document.createElement('input');
  input.type = 'email';
  input.value = email;
  return input.checkValidity();
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
  const [validationError, setValidationError] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  // Helper function to add bot message
  const addBotMessage = (text: string, nextStage: ChatStage) => {
    const botMessage: Message = {
      id: crypto.randomUUID(),
      text,
      sender: 'bot',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, botMessage]);
    setChatStage(nextStage);
    setIsLoading(false);
  };

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    // Focus and select input after bot replies
    if (isOpen && !isLoading && chatStage !== 'complete') {
      const focusTimeout = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.select();
        }
      }, 100);
      return () => clearTimeout(focusTimeout);
    }
  }, [messages, isLoading, isOpen, chatStage]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const trimmedInput = inputValue.trim();
    setValidationError('');

    // Validate input length based on stage
    if (chatStage === 'query' && trimmedInput.length > 2000) {
      setValidationError('Your message is too long. Please keep it under 2000 characters.');
      return;
    }
    if (chatStage === 'contact_name' && trimmedInput.length > 100) {
      setValidationError('Name is too long. Please keep it under 100 characters.');
      return;
    }
    if (chatStage === 'contact_email' && trimmedInput.length > 254) {
      setValidationError('Email is too long. Please keep it under 254 characters.');
      return;
    }

    // Validate email format
    if (chatStage === 'contact_email' && !isValidEmail(trimmedInput)) {
      setValidationError('Please enter a valid email address.');
      return;
    }

    // Add user message
    const userMessage: Message = {
      id: crypto.randomUUID(),
      text: trimmedInput,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Handle different chat stages
    if (chatStage === 'query') {
      // User entered their query
      setContactData((prev) => ({ ...prev, query: trimmedInput }));
      
      timeoutRef.current = setTimeout(() => {
        addBotMessage(
          'Thank you for your inquiry! To assist you better, could you please provide your full name?',
          'contact_name'
        );
      }, 500);
    } else if (chatStage === 'contact_name') {
      // User entered their name - store sanitized version
      const sanitizedName = sanitizeInput(trimmedInput);
      setContactData((prev) => ({ ...prev, name: sanitizedName }));
      
      timeoutRef.current = setTimeout(() => {
        addBotMessage(
          `Nice to meet you, ${sanitizedName}! What is your email address?`,
          'contact_email'
        );
      }, 500);
    } else if (chatStage === 'contact_email') {
      // User entered their email
      setContactData((prev) => ({ ...prev, email: trimmedInput }));
      
      timeoutRef.current = setTimeout(() => {
        addBotMessage(
          'Great! And what is your phone number?',
          'contact_phone'
        );
      }, 500);
    } else if (chatStage === 'contact_phone') {
      // User entered phone, save to database
      setContactData((prev) => ({ ...prev, phone: trimmedInput }));
      
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
            phone: trimmedInput,
          }),
        });

        if (response.ok) {
          const sanitizedEmail = sanitizeInput(contactData.email);
          addBotMessage(
            `Perfect! Thank you ${contactData.name}. We've received your information and will get back to you at ${sanitizedEmail} shortly. Our team will review your inquiry and contact you soon!`,
            'complete'
          );
        } else {
          // Parse error response for specific feedback
          let errorMessage = 'Sorry, there was an error saving your information. Please try again or use our contact form.';
          try {
            const errorData = await response.json();
            if (response.status === 400) {
              errorMessage = 'Invalid data provided. Please check your information and try again.';
            } else if (response.status === 429) {
              errorMessage = 'Too many requests. Please wait a moment and try again.';
            } else if (errorData.error) {
              errorMessage = `Error: ${errorData.error}`;
            }
          } catch {
            // Use default error message if parsing fails
          }
          
          console.error('API error:', response.status, response.statusText);
          
          const errorMsg: Message = {
            id: crypto.randomUUID(),
            text: errorMessage,
            sender: 'bot',
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, errorMsg]);
        }
      } catch (error) {
        console.error('Network error submitting contact form:', error);
        
        const errorMessage: Message = {
          id: crypto.randomUUID(),
          text: 'Network error. Please check your internet connection and try again.',
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
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
        <div 
          className="fixed bottom-8 right-8 z-40 w-80 h-96 bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="chat-title"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[var(--accent-blue)] to-blue-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MdHeadset size={28} />
              <div>
                <h3 id="chat-title" className="font-bold text-lg">Chat with us</h3>
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
          <div 
            className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4"
            aria-live="polite"
            role="log"
            aria-label="Chat messages"
          >
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
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '100ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
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
              <>
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    ref={inputRef}
                    type={
                      chatStage === 'contact_email' ? 'email'
                      : chatStage === 'contact_phone' ? 'tel'
                      : 'text'
                    }
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    maxLength={
                      chatStage === 'query' ? 2000
                      : chatStage === 'contact_name' ? 100
                      : chatStage === 'contact_email' ? 254
                      : undefined
                    }
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
                    aria-invalid={validationError ? 'true' : 'false'}
                    aria-describedby={validationError ? 'validation-error' : undefined}
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
                {validationError && (
                  <p 
                    id="validation-error" 
                    className="text-red-600 text-xs mt-2"
                    role="alert"
                    aria-live="polite"
                  >
                    {validationError}
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
