import { useState } from "react";
import { ChevronDown, ChevronUp, Code2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import CodeBlock from "./CodeBlock";

interface ExerciseCardProps {
  exerciseNumber: number;
  title: string;
  description: string;
  example: {
    input?: string;
    output: string;
  };
  solution: string;
  graphExample?: string;
}

const ExerciseCard = ({
  exerciseNumber,
  title,
  description,
  example,
  solution,
  graphExample,
}: ExerciseCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="shadow-card border-0 overflow-hidden animate-fade-in" style={{ animationDelay: `${exerciseNumber * 0.1}s` }}>
      <CardHeader className="bg-gradient-primary text-primary-foreground pb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-foreground/20 backdrop-blur">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-medium opacity-90">Exercice {exerciseNumber}</p>
            <CardTitle className="text-xl md:text-2xl font-bold">{title}</CardTitle>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        {/* Description */}
        <div>
          <h4 className="font-semibold text-foreground mb-2">Description</h4>
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
        <div className="bg-muted/50 rounded-lg p-4 border border-border">
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary" />
            Exemple
          </h4>
          {example.input && (
            <div className="mb-2">
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
              className="w-full justify-between border-primary/30 hover:bg-primary/5 hover:border-primary transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                {isOpen ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {isOpen ? "Masquer la solution" : "Voir la solution"}
              </span>
              {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="mt-4 overflow-hidden data-[state=open]:animate-slide-down data-[state=closed]:animate-slide-up">
            <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
              <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
                <Code2 className="w-4 h-4" />
                Solution Python
              </h4>
              <CodeBlock code={solution} />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default ExerciseCard;
