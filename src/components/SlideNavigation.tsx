import { ChevronLeft, ChevronRight, Home, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SlideNavigationProps {
  currentSlide: number;
  totalSlides: number;
  onPrevious: () => void;
  onNext: () => void;
  onGoHome: () => void;
  onReset: () => void;
}

const SlideNavigation = ({
  currentSlide,
  totalSlides,
  onPrevious,
  onNext,
  onGoHome,
  onReset,
}: SlideNavigationProps) => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-3 bg-card/95 backdrop-blur-lg px-6 py-3 rounded-full shadow-lg border border-border">
        {/* Home button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onGoHome}
          className="hover:bg-primary/10 hover:text-primary"
          title="Retour à l'accueil"
        >
          <Home className="w-5 h-5" />
        </Button>

        {/* Previous */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onPrevious}
          disabled={currentSlide === 0}
          className="hover:bg-primary/10 hover:text-primary disabled:opacity-30"
          title="Slide précédente"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>

        {/* Slide indicator */}
        <div className="px-4 py-1 bg-primary/10 rounded-full">
          <span className="text-sm font-medium text-primary">
            {currentSlide + 1} / {totalSlides}
          </span>
        </div>

        {/* Next */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onNext}
          disabled={currentSlide === totalSlides - 1}
          className="hover:bg-primary/10 hover:text-primary disabled:opacity-30"
          title="Slide suivante"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>

        {/* Reset button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onReset}
          className="hover:bg-secondary/20 hover:text-secondary"
          title="Réinitialiser"
        >
          <RotateCcw className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default SlideNavigation;
