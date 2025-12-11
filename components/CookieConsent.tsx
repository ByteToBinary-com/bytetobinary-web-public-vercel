'use client';

import React, { useState, useEffect } from 'react';

declare global {
  interface Window {
    gtag?: (command: string, action: string, config: Record<string, string>) => void;
  }
}

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consentCookie = localStorage.getItem('cookieConsent');
    if (!consentCookie) {
      setShowConsent(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookieConsent', 'all');
    localStorage.setItem('analytics', 'true');
    localStorage.setItem('marketing', 'true');
    setShowConsent(false);
    
    // Optional: Send consent to analytics service
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted',
      });
    }
  };

  const handleAcceptEssential = () => {
    localStorage.setItem('cookieConsent', 'essential');
    localStorage.setItem('analytics', 'false');
    localStorage.setItem('marketing', 'false');
    setShowConsent(false);
    
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
      });
    }
  };

  const handleRejectAll = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    localStorage.setItem('analytics', 'false');
    localStorage.setItem('marketing', 'false');
    setShowConsent(false);
    
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
      });
    }
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 text-white p-4 md:p-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1">
          <h3 className="text-base font-bold mb-2">Cookie Preferences</h3>
          <p className="text-sm text-gray-300">
            We use cookies to enhance your experience and analyze site traffic. You can accept all, essential only, or reject. Learn more in our{' '}
            <a href="/privacy" className="text-[var(--accent-blue)] hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <button
            onClick={handleAcceptAll}
            className="py-2 px-6 bg-[var(--accent-blue)] hover:bg-[var(--accent-blue)]/90 text-white font-semibold rounded-lg transition-colors whitespace-nowrap"
          >
            Accept All
          </button>

          <button
            onClick={handleAcceptEssential}
            className="py-2 px-6 border-2 border-gray-600 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap"
          >
            Essential Only
          </button>

          <button
            onClick={handleRejectAll}
            className="py-2 px-6 text-gray-300 font-semibold rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap"
          >
            Reject All
          </button>
        </div>
      </div>
    </div>
  );
}
