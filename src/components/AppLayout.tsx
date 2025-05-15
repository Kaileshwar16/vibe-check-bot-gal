
import React, { ReactNode } from "react";


interface AppLayoutProps {
  children: ReactNode;
}


const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-vibecheck-bg to-white">
      <header className="container mx-auto py-6 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center gradient-text mb-2">Vibe Check Bot</h1>
        <p className="text-center text-muted-foreground">Your Gen Z bestie for stress relief convos</p>
      </header>
      
      <main className="container mx-auto py-6 px-4">
        {children}
      </main>
      
      <footer className="container mx-auto py-6 px-4 text-center text-sm text-muted-foreground">
        <p>Your API key is only stored temporarily in your session and never saved permanently.</p>
        <p className="mt-2">© {new Date().getFullYear()} Vibe Check Bot - Made with ✨ good vibes ✨</p>
      </footer>
    </div>
  );
};

export default AppLayout;
