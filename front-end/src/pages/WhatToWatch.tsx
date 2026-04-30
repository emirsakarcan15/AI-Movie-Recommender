import { useState } from "react";
import { Search, Mail, Phone, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FadeContent from "@/components/FadeContent";
import "@/App.css";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const WhatToWatch = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ input: query })
    });

    if (response.ok) {
      navigate("/recommendations",);
    }
    else {
      toast.error("Failed to get recommendations. Please try again.");
    }

  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="py-8 px-6">
        <FadeContent blur duration={600}>
          <h1 className="font-display text-2xl font-light tracking-[0.3em] text-center">
            WHATTOWATCH
          </h1>
        </FadeContent>
      </header>

      {/* Main - centered input */}
      <main className="flex-1 flex flex-col items-center justify-center px-6">
        <FadeContent blur duration={800} delay={200}>
          <div className="w-full max-w-2xl text-center space-y-10">
            <div className="space-y-4">
              <h2 className="font-display text-5xl md:text-7xl font-light leading-tight">
                What should I watch?
              </h2>
              <p className="font-body text-sm md:text-base text-muted-foreground tracking-wide">
                Type in your mood, genre, or a keyword — and we'll tell you what to watch.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"/>
              <Input
              id="search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="For example, a calm science fiction film for the night..."
                className="h-14 pl-12 pr-32 bg-card border-border text-base rounded-full focus-visible:ring-1 focus-visible:ring-ring"
              />
              <Button
              id="search-button"
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-10 px-6 rounded-full"
              >
                Suggest
              </Button>
            </form>
          </div>
        </FadeContent>
      </main>

      {/* Footer - contact info */}
      <footer className="border-t border-border py-10 px-6">
        <FadeContent blur duration={600}>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span className="font-body text-xs uppercase tracking-[0.2em]">E-mail</span>
              </div>
              <p className="font-body text-sm">hello@whattowatch.com</p>
            </div>
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span className="font-body text-xs uppercase tracking-[0.2em]">Phone</span>
              </div>
              <p className="font-body text-sm">+90 (212) 000 00 00</p>
            </div>
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span className="font-body text-xs uppercase tracking-[0.2em]">Adress</span>
              </div>
              <p className="font-body text-sm">İstanbul, Turkey</p>
            </div>
          </div>
          <p className="text-center font-body text-xs text-muted-foreground mt-10">
            © 2026 whattowatch. All rights reserved.

          </p>
        </FadeContent>
      </footer>
    </div>
  );
};

export default WhatToWatch;