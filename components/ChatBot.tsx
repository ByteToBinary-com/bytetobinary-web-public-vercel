'use client';

import React, { useState, useRef, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import { RiChat3Line } from 'react-icons/ri';
import { MdHeadset, MdCheckCircle, MdSend } from 'react-icons/md';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

type ChatStage = 'greeting' | 'query' | 'contact_name' | 'contact_email' | 'contact_phone' | 'complete';

// Generate unique message IDs to prevent collisions
const generateMessageId = (): string => {
  if (typeof window !== 'undefined' && window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }
  // Fallback for environments without crypto.randomUUID
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
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
  const isMountedRef = useRef(true);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Track component mount/unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: generateMessageId(),
        text: 'Hello! How may I help you?',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
      setChatStage('query');
    }
  }, [isOpen]);

  // Auto-scroll to latest message
  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    // Focus and select input after bot replies
    if (isOpen && !isLoading && chatStage !== 'complete' && chatStage !== 'greeting') {
      const timeoutId = setTimeout(() => {
        if (isMountedRef.current && inputRef.current) {
          inputRef.current.focus();
          inputRef.current.select();
        }
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [messages, isLoading, isOpen, chatStage]);

  // Focus management and keyboard handling for dialog
  useEffect(() => {
    if (!isOpen || !dialogRef.current) return;

    // Store the previously focused element to restore later
    const previousActiveElement = document.activeElement as HTMLElement;

    // Focus the close button when dialog opens for accessibility
    closeButtonRef.current?.focus();

    // Handle keyboard events for focus trapping and escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      // Close dialog on Escape key
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsOpen(false);
      }

      // Focus trap: keep focus within the dialog
      if (e.key === 'Tab' && dialogRef.current) {
        const focusableElements = dialogRef.current.querySelectorAll(
          'button, input, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          // Shift+Tab: move focus backwards
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          // Tab: move focus forwards
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // Restore focus to the previously focused element when dialog closes
      previousActiveElement?.focus();
    };
  }, [isOpen]);

  // Helper function to add bot message and update state
  const addBotMessage = (text: string, nextStage: ChatStage, delay: number = 500) => {
    setTimeout(() => {
      if (!isMountedRef.current) return;
      const botMessage: Message = {
        id: generateMessageId(),
        text,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setChatStage(nextStage);
      setIsLoading(false);
    }, delay);
  };



  // Get maximum length for current chat stage
  const getMaxLength = (): number => {
    switch (chatStage) {
      case 'query':
        return 2000; // API message field max
      case 'contact_name':
        return 100; // Reasonable name length
      case 'contact_email':
        return 254; // RFC 5321 email max length
      case 'contact_phone':
        return 20; // International phone format max
      default:
        return 2000;
    }
  };

  // Get specific error message based on response status and error type
  const getErrorMessage = (
    error: unknown,
    status?: number
  ): string => {
    // Network error or no connection
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return "Unable to connect. Please check your internet connection and try again.";
    }

    // Handle HTTP status codes
    if (status) {
      switch (status) {
        case 400:
          return "Invalid data provided. Please check your information and try again.";
        case 401:
          return "Authentication failed. Please refresh and try again.";
        case 403:
          return "Access denied. Please contact support if this persists.";
        case 404:
          return "Service unavailable. Please try again later.";
        case 409:
          return "This email is already registered. Please use a different email address.";
        case 429:
          return "Too many requests. Please wait a moment before trying again.";
        case 500:
        case 502:
        case 503:
          return "Our server is experiencing issues. Please try again in a few moments.";
        case 504:
          return "Request timeout. Please check your connection and try again.";
        default:
          return `An error occurred (${status}). Please try again or contact support.`;
      }
    }

    // Generic fallback
    return "An unexpected error occurred. Please try again or contact our support team.";
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: generateMessageId(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Handle different chat stages
    if (chatStage === 'query') {
      setContactData((prev) => ({ ...prev, query: inputValue }));
      addBotMessage(
        'Thank you for your inquiry! To assist you better, could you please provide your full name?',
        'contact_name'
      );
    } else if (chatStage === 'contact_name') {
      setContactData((prev) => ({ ...prev, name: inputValue }));
      addBotMessage(
        `Nice to meet you, ${inputValue}! What is your email address?`,
        'contact_email'
      );
    } else if (chatStage === 'contact_email') {
      setContactData((prev) => ({ ...prev, email: inputValue }));
      addBotMessage(
        'Great! And what is your phone number?',
        'contact_phone'
      );
    } else if (chatStage === 'contact_phone') {
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

        if (!isMountedRef.current) return;

        if (response.ok) {
          const botMessage: Message = {
            id: generateMessageId(),
            text: `Perfect! Thank you ${contactData.name}. We've received your information and will get back to you at ${contactData.email} shortly. Our team will review your inquiry and contact you soon!`,
            sender: 'bot',
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, botMessage]);
          setChatStage('complete');
        } else {
          // Get specific error message based on HTTP status
          const errorMessage = getErrorMessage(null, response.status);
          const botMessage: Message = {
            id: generateMessageId(),
            text: errorMessage,
            sender: 'bot',
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, botMessage]);
        }
      } catch (error) {
        if (!isMountedRef.current) return;
        // Get specific error message based on error type
        const errorText = getErrorMessage(error);
        const botMessage: Message = {
          id: generateMessageId(),
          text: errorText,
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      } finally {
        // Always clear loading state, regardless of mount status
        // This ensures the UI doesn't remain in a loading state
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
          ref={dialogRef}
          role="dialog"
          aria-labelledby="chat-dialog-title"
          aria-modal="true"
          className="fixed bottom-8 right-8 z-40 w-80 h-96 bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[var(--accent-blue)] to-blue-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MdHeadset size={28} />
              <div>
                <h3 id="chat-dialog-title" className="font-bold text-lg">Chat with us</h3>
                <div className="flex items-center gap-1 text-xs text-blue-100">
                  <MdCheckCircle size={14} />
                  <p>We typically reply within minutes</p>
                </div>
              </div>
            </div>
            <button
              ref={closeButtonRef}
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
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '100ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Accessibility: Live region for screen readers to announce new messages */}
          <div
            aria-live="polite"
            aria-atomic="true"
            className="sr-only"
            role="status"
          >
            {messages.length > 0 && messages[messages.length - 1].sender === 'bot'
              ? messages[messages.length - 1].text
              : ''}
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
                    type={chatStage === 'contact_email' ? 'email' : 'text'}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    maxLength={getMaxLength()}
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
                    className="px-3 py-2 bg-[var(--accent-blue)] text-white rounded-lg hover:bg-[var(--accent-blue)]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
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
                    <MdSend size={20} />
                  </button>
                </form>
                {inputValue.length > 0 && (
                  <div className="text-xs text-gray-500 mt-2 text-right">
                    {inputValue.length} / {getMaxLength()} characters
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
