import React, { useState, useEffect } from "react";
import AppLayout from "@/components/AppLayout";
import ApiKeyForm from "@/components/ApiKeyForm";
import ChatInterface from "@/components/ChatInterface";

const Index = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);

   // Check for API key in session storage on initial load
  useEffect(() => {
    const storedApiKey = sessionStorage.getItem("vibeCheckApiKey");
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, []);

  const handleApiKeySubmit = (key: string) => {
    // Store the API key in session storage (not localStorage, to avoid persistence)
    sessionStorage.setItem("vibeCheckApiKey", key);
    setApiKey(key);
  };

  const handleSignOut = () => {
    // Remove the API key from session storage
    sessionStorage.removeItem("vibeCheckApiKey");
    setApiKey(null);
  };

  return (
    <AppLayout>
      {apiKey ? (
        <div className="flex flex-col items-center">
          <ChatInterface apiKey={apiKey} />
          
          <button 
            onClick={handleSignOut}
            className="mt-4 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Reset API Key
          </button>
        </div>
      ) : (
        <div className="max-w-lg mx-auto">
          <div className="mb-8 text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 bg-gradient-to-br from-vibecheck-purple to-vibecheck-pink rounded-full flex items-center justify-center text-white text-3xl shadow-lg bounce-animate">
                😎
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold mb-2">Get Stress Relief With a Gen Z Twist</h2>
            <p className="text-muted-foreground">
              Have playful, supportive convos with our AI bestie that speaks your language. 
              Enter your Gemini API key to get started!
            </p>
          </div>
          
          <ApiKeyForm onApiKeySubmit={handleApiKeySubmit} />
          
          <div className="mt-8 p-4 bg-muted rounded-lg">
            <h3 className="font-medium mb-2">How it works:</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Enter your Gemini API key (it's only stored in your browser session)</li>
              <li>Chat about anything that's stressing you out</li>
              <li>Get playful, supportive responses with Gen Z flair</li>
              <li>Hear responses spoken out loud in a friendly voice</li>
            </ol>
          </div>
        </div>
      )}
    </AppLayout>
  );
};

export default Index;
