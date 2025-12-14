import { Calendar, Clock, MapPin } from "lucide-react";
import logo from "@/assets/fste-logo.png";

const Header = () => {
  return (
    <header className="bg-gradient-hero">
      <div className="container mx-auto px-4 py-6">
        {/* Top bar with logo */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <img 
              src={logo} 
              alt="FST-E Science Club Logo" 
              className="h-16 md:h-20 w-auto object-contain"
            />
          </div>
          
          {/* Session info badges */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <Calendar className="w-4 h-4" />
              <span>14 Dec 2025</span>
            </div>
            <div className="flex items-center gap-2 bg-secondary/20 text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium">
              <Clock className="w-4 h-4" />
              <span>18:15</span>
            </div>
          </div>
        </div>

        {/* Main title section */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-block bg-secondary text-secondary-foreground px-4 py-1.5 rounded-full text-sm font-semibold mb-4 animate-fade-in">
            Python Training - Session 2 🐍
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Exercices Python <span className="text-primary">Interactifs</span>
          </h1>
          <p className="text-muted-foreground text-lg animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Plongez dans la résolution de problèmes et la pensée logique avec Python.
            <br className="hidden md:block" />
            Pratiquez les conditions, les boucles et construisez des solutions réelles !
          </p>
        </div>
      </div>

      {/* Decorative wave */}
      <div className="h-6 bg-gradient-to-b from-transparent to-background" />
    </header>
  );
};

export default Header;
