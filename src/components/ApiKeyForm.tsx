
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";

interface ApiKeyFormProps {
  onApiKeySubmit: (apiKey: string) => void;
}

const ApiKeyForm: React.FC<ApiKeyFormProps> = ({ onApiKeySubmit }) => {
  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apiKey.trim()) {
      toast.error("Please enter an API key");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, you'd validate the API key with a backend call
      // For now, we'll just simulate a delay and assume it's valid
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Pass the API key to the parent component
      onApiKeySubmit(apiKey);
      toast.success("API key accepted! Let's vibe check!");
    } catch (error) {
      toast.error("Failed to validate API key. Please try again.");
      console.error("API key validation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto gradient-border">
      <div className="bg-background rounded-xl p-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold gradient-text">Enter Your API Key</CardTitle>
          <CardDescription>
            Provide your Gemini API key to unlock the full vibe-checking experience!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input
                type="password"
                placeholder="Your API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="border-2 border-vibecheck-lightpurple focus:border-vibecheck-purple"
              />
              <p className="text-xs text-muted-foreground">
                Your API key is stored only in your browser's session and is never saved permanently.
              </p>
            </div>
            <CardFooter className="px-0 pt-6">
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-vibecheck-purple to-vibecheck-pink hover:opacity-90 transition-opacity"
                disabled={isLoading}
              >
                {isLoading ? "Validating..." : "Let's Chat!"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </div>
    </Card>
  );
};

export default ApiKeyForm;
