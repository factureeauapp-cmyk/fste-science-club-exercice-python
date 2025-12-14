import { useState } from "react";
import { ChevronDown, ChevronUp, Code2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import CodeBlock from "./CodeBlock";

interface ExerciseSlideProps {
  exerciseNumber: number;
  title: string;
  description: string;
  example: {
    input?: string;
    output: string;
  };
  solution: string;
  graphExample?: string;
  onDelete?: () => void;
}

const ExerciseSlide = ({
  exerciseNumber,
  title,
  description,
  example,
  solution,
  graphExample,
  onDelete,
}: ExerciseSlideProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 pb-24 bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="max-w-4xl w-full animate-fade-in">
        {/* Header */}
        <div className="bg-gradient-primary text-primary-foreground rounded-t-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary-foreground/20 backdrop-blur">
              <Code2 className="w-7 h-7" />
            </div>
            <div>
              <p className="text-sm font-medium opacity-90">Exercice {exerciseNumber}</p>
              <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
            </div>
            {onDelete && (
              <div className="ml-auto">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={onDelete}
                  title="Supprimer cet exercice"
                  className="text-sm"
                >
                  Supprimer
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="bg-card rounded-b-2xl shadow-xl border border-border border-t-0 p-6 space-y-6">
          {/* Description */}
          <div>
            <h4 className="font-semibold text-foreground mb-2 text-lg">Description</h4>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
          </div>

          {/* Graph Example (if provided) */}
          {graphExample && (
            <div>
              <h4 className="font-semibold text-foreground mb-2">Exemple de graphe</h4>
              <CodeBlock code={graphExample} />
            </div>
          )}

          {/* Example */}
          <div className="bg-muted/50 rounded-xl p-5 border border-border">
            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              Exemple
            </h4>
            {example.input && (
              <div className="mb-3">
                <span className="text-sm font-medium text-muted-foreground">Entrée :</span>
                <CodeBlock code={example.input} />
              </div>
            )}
            <div>
              <span className="text-sm font-medium text-muted-foreground">Sortie :</span>
              <CodeBlock code={example.output} />
            </div>
          </div>

          {/* Solution Toggle */}
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between border-primary/30 hover:bg-primary/5 hover:border-primary transition-all duration-300 py-6"
              >
                <span className="flex items-center gap-2 text-base">
                  {isOpen ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  {isOpen ? "Masquer la solution" : "Voir la solution"}
                </span>
                {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </Button>
            </CollapsibleTrigger>

            <CollapsibleContent className="mt-4 overflow-hidden data-[state=open]:animate-slide-down data-[state=closed]:animate-slide-up">
              <div className="bg-primary/5 rounded-xl p-5 border border-primary/20">
                <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
                  <Code2 className="w-5 h-5" />
                  Solution Python
                </h4>
                <CodeBlock code={solution} />
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </div>
  );
};

export default ExerciseSlide;
