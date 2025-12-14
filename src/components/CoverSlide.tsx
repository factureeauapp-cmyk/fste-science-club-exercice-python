import { Calendar, Clock, User, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import fsteLogo from "@/assets/fste-logo.png";

interface CoverSlideProps {
  onStart: () => void;
}

const CoverSlide = ({ onStart }: CoverSlideProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-primary/5 to-secondary/10 p-6">
      <div className="max-w-3xl w-full text-center space-y-8 animate-fade-in">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src={fsteLogo}
            alt="FST-E Science Club"
            className="w-24 h-24 object-contain rounded-xl shadow-lg"
          />
        </div>

        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
            Formation Python
          </h1>
          <p className="text-2xl md:text-3xl font-semibold text-foreground">
            Session 2 🐍💻
          </p>
        </div>

        {/* Welcome message */}
        <div className="bg-card/80 backdrop-blur rounded-2xl p-6 md:p-8 shadow-lg border border-border">
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Nous revoilà pour la <span className="text-primary font-semibold">session 2</span> de la formation Python !
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Dans cette session, nous approfondirons Python à travers la résolution de problèmes et la réflexion logique.
            Les apprenants pratiqueront les <span className="text-secondary font-semibold">conditions</span>, les <span className="text-secondary font-semibold">boucles</span> et construiront des solutions réelles en Python.
          </p>
          <p className="mt-4 text-xl font-semibold text-primary">
            Transformons la logique en code !
          </p>
        </div>

        {/* Info cards */}
        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex items-center gap-3 bg-primary/10 px-5 py-3 rounded-full">
            <Calendar className="w-5 h-5 text-primary" />
            <span className="font-medium">14 Décembre 2025</span>
          </div>
          <div className="flex items-center gap-3 bg-secondary/10 px-5 py-3 rounded-full">
            <Clock className="w-5 h-5 text-secondary" />
            <span className="font-medium">18:15</span>
          </div>
          <div className="flex items-center gap-3 bg-muted px-5 py-3 rounded-full">
            <User className="w-5 h-5 text-muted-foreground" />
            <span className="font-medium">FST-E Science Club</span>
          </div>
        </div>

        {/* Start button */}
        <Button
          onClick={onStart}
          size="lg"
          className="mt-8 px-8 py-6 text-lg font-semibold bg-gradient-primary hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
        >
          Commencer les exercices
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default CoverSlide;
