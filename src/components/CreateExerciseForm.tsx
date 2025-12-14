import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Exercise {
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

interface CreateExerciseFormProps {
  onCreateExercise: (exercise: Omit<Exercise, "exerciseNumber">) => void;
}

const CreateExerciseForm = ({ onCreateExercise }: CreateExerciseFormProps) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [exampleInput, setExampleInput] = useState("");
  const [exampleOutput, setExampleOutput] = useState("");
  const [solution, setSolution] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !exampleOutput || !solution) return;

    onCreateExercise({
      title,
      description,
      example: {
        input: exampleInput || undefined,
        output: exampleOutput,
      },
      solution,
    });

    // Reset form
    setTitle("");
    setDescription("");
    setExampleInput("");
    setExampleOutput("");
    setSolution("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="bg-gradient-accent hover:opacity-90 shadow-button transition-all duration-300 hover:scale-105 gap-2"
        >
          <Plus className="w-5 h-5" />
          Ajouter un exercice
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Créer un nouvel exercice
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Titre de l'exercice *
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Calculer la factorielle"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Description *
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez l'exercice en détail..."
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Exemple d'entrée
              </label>
              <Textarea
                value={exampleInput}
                onChange={(e) => setExampleInput(e.target.value)}
                placeholder="Entrée: 5"
                rows={2}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Exemple de sortie *
              </label>
              <Textarea
                value={exampleOutput}
                onChange={(e) => setExampleOutput(e.target.value)}
                placeholder="Sortie: 120"
                rows={2}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Solution Python *
            </label>
            <Textarea
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              placeholder="def factorielle(n):&#10;    if n <= 1:&#10;        return 1&#10;    return n * factorielle(n - 1)"
              rows={8}
              className="font-fira text-sm"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="bg-gradient-primary hover:opacity-90"
            >
              Créer l'exercice
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateExerciseForm;
