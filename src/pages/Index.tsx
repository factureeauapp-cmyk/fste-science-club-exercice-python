import { useState, useEffect, useCallback } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CoverSlide from "@/components/CoverSlide";
import ExerciseSlide from "@/components/ExerciseSlide";
import SlideNavigation from "@/components/SlideNavigation";
import CreateExerciseForm from "@/components/CreateExerciseForm";

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

const initialExercises: Exercise[] = [
  {
    exerciseNumber: 1,
    title: "Calculer la moyenne de 3 nombres",
    description:
      "Créer une fonction calculer_moyenne(a, b, c) qui retourne la moyenne de trois nombres. Demander à l'utilisateur de saisir les nombres et afficher la moyenne.",
    example: {
      input: "Entrez le premier nombre: 10\nEntrez le deuxième nombre: 20\nEntrez le troisième nombre: 30",
      output: "La moyenne de 10, 20 et 30 est: 20.0",
    },
    solution:
      "def calculer_moyenne(a, b, c):\n    \"\"\"Calcule et retourne la moyenne de trois nombres.\"\"\"\n    return (a + b + c) / 3\n\n# Demander les nombres à l'utilisateur\n n1 = float(input(\"Entrez le premier nombre: \"))\n n2 = float(input(\"Entrez le deuxième nombre: \"))\n n3 = float(input(\"Entrez le troisième nombre: \"))\n\n# Calculer et afficher la moyenne\n moyenne = calculer_moyenne(n1, n2, n3)\n print(f\"La moyenne de {n1}, {n2} et {n3} est: {moyenne}\")",
  },
  {
    exerciseNumber: 2,
    title: "Parcours d'un graphe avec BFS et DFS",
    description:
      "Écrire deux fonctions bfs(graph, start) et dfs(graph, start) pour explorer un graphe de villes. Afficher la liste des villes visitées dans l'ordre de parcours.",
    graphExample:
      "# Graphe représentant des connexions entre villes\ngraph = {\n    'Errachidia': ['Meknes', 'Fes'],\n    'Meknes': ['Errachidia', 'Fes', 'Rabat'],\n    'Fes': ['Errachidia', 'Meknes', 'Tanger'],\n    'Rabat': ['Meknes', 'Casablanca'],\n    'Tanger': ['Fes'],\n    'Casablanca': ['Rabat']\n}",
    example: {
      output:
        "BFS depuis 'Errachidia': ['Errachidia', 'Meknes', 'Fes', 'Rabat', 'Tanger', 'Casablanca']\nDFS depuis 'Errachidia': ['Errachidia', 'Meknes', 'Fes', 'Tanger', 'Rabat', 'Casablanca']",
    },
    solution:
      "from collections import deque\n\ndef bfs(graph, start):\n    \"\"\"Parcours en largeur (Breadth-First Search).\"\"\"\n    visited = []\n    queue = deque([start])\n    \n    while queue:\n        vertex = queue.popleft()\n        if vertex not in visited:\n            visited.append(vertex)\n            # Ajouter les voisins non visités à la file\n            for neighbor in graph[vertex]:\n                if neighbor not in visited:\n                    queue.append(neighbor)\n    \n    return visited\n\ndef dfs(graph, start, visited=None):\n    \"\"\"Parcours en profondeur (Depth-First Search).\"\"\"\n    if visited is None:\n        visited = []\n    \n    visited.append(start)\n    \n    for neighbor in graph[start]:\n        if neighbor not in visited:\n            dfs(graph, neighbor, visited)\n    \n    return visited",
  },
  {
    exerciseNumber: 3,
    title: "Comparaison de chaînes de caractères",
    description:
      "Écrire une fonction compareStrings(s1, s2) qui prend deux chaînes de caractères en entrée et détermine si elles contiennent exactement les mêmes lettres, sans tenir compte de l'ordre ni de la casse (majuscules/minuscules). La fonction retourne True si les deux chaînes sont composées des mêmes lettres avec la même fréquence, sinon False.",
    example: {
      input:
        "Exemple 1:\ns1 = \"Hello\"\ns2 = \"Hella\"\n\nExemple 2:\ns1 = \"Python\"\ns2 = \"nohtyp\"\n\nExemple 3:\ns1 = \"Listen\"\ns2 = \"Silent\"",
      output: "Exemple 1: False\nExemple 2: True\nExemple 3: True",
    },
    solution:
      "def compareStrings(s1: str, s2: str) -> bool:\n    \"\"\"\n    Compare deux chaînes de caractères.\n    Retourne True si elles contiennent les mêmes lettres\n    avec la même fréquence, sans tenir compte de l'ordre\n    ni de la casse.\n    \"\"\"\n    # Convertir en minuscules et trier les caractères\n    s1_sorted = sorted(s1.lower())\n    s2_sorted = sorted(s2.lower())\n    \n    # Comparer les listes triées\n    return s1_sorted == s2_sorted",
  },
];

const Index = () => {
  const [exercises, setExercises] = useState<Exercise[]>(initialExercises);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("right");

  const totalSlides = exercises.length + 1; // +1 for cover slide

  const goToSlide = useCallback((index: number, direction: "left" | "right") => {
    if (index >= 0 && index < totalSlides) {
      setSlideDirection(direction);
      setCurrentSlide(index);
    }
  }, [totalSlides]);

  const handlePrevious = useCallback(() => {
    goToSlide(currentSlide - 1, "left");
  }, [currentSlide, goToSlide]);

  const handleNext = useCallback(() => {
    goToSlide(currentSlide + 1, "right");
  }, [currentSlide, goToSlide]);

  const handleGoHome = useCallback(() => {
    goToSlide(0, "left");
  }, [goToSlide]);

  const handleReset = useCallback(() => {
    goToSlide(0, "left");
  }, [goToSlide]);

  const handleStart = useCallback(() => {
    goToSlide(1, "right");
  }, [goToSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrevious();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowUp" || e.key === "Home") {
        handleGoHome();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrevious, handleNext, handleGoHome]);

  const handleCreateExercise = (newExercise: Omit<Exercise, "exerciseNumber">) => {
    setExercises((prev) => {
      const exerciseWithNumber: Exercise = {
        ...newExercise,
        exerciseNumber: prev.length + 1,
      };
      const newList = [...prev, exerciseWithNumber];

      // Navigate to the newly added slide immediately
      setSlideDirection("right");
      setCurrentSlide(newList.length); // slide index: cover is 0

      return newList;
    });
  };

  // Delete a single exercise by its index in the exercises array
  const handleDeleteExercise = useCallback(
    (indexToDelete: number) => {
      const confirmed = window.confirm("Supprimer cet exercice ? Cette action est irréversible.");
      if (!confirmed) return;

      setExercises((prev) => {
        const newList = prev.filter((_, idx) => idx !== indexToDelete).map((ex, idx) => ({ ...ex, exerciseNumber: idx + 1 }));

        // Update current slide appropriately
        setCurrentSlide((current) => {
          const deletedSlideIndex = indexToDelete + 1; // because slide 0 is cover
          if (current === deletedSlideIndex) return Math.max(0, current - 1);
          if (current > deletedSlideIndex) return Math.max(0, current - 1);
          return current;
        });

        return newList;
      });
    },
    [setExercises],
  );

  // Clear all exercises, leave only the cover page
  const handleClearAll = useCallback(() => {
    const confirmed = window.confirm("Effacer tous les exercices ? Cette action supprimera toutes les slides d'exercices.");
    if (!confirmed) return;
    setExercises([]);
    setCurrentSlide(0);
  }, []);

  // Ensure currentSlide remains within valid bounds when exercises change
  useEffect(() => {
    if (currentSlide > exercises.length) {
      setSlideDirection("left");
      setCurrentSlide(exercises.length);
    }
    if (currentSlide < 0) setCurrentSlide(0);
  }, [exercises.length, currentSlide]);

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Slides container */}
      <div
        className={`transition-all duration-500 ease-out ${
          slideDirection === "right" ? "animate-slide-in-right" : "animate-slide-in-left"
        }`}
        key={currentSlide}
      >
        {currentSlide === 0 ? (
          <CoverSlide onStart={handleStart} />
        ) : (
          (exercises[currentSlide - 1] ? (
            <ExerciseSlide
              {...exercises[currentSlide - 1]}
              onDelete={() => handleDeleteExercise(currentSlide - 1)}
            />
          ) : (
            <div className="min-h-screen flex items-center justify-center p-6 pb-24">
              <div className="bg-card rounded-2xl shadow-xl border border-border p-8 text-center">
                <h3 className="text-lg font-semibold mb-2">Exercice introuvable</h3>
                <p className="text-sm text-muted-foreground mb-4">La slide demandée n'existe plus. Vous revenez à la page précédente.</p>
                <div className="flex justify-center">
                  <Button variant="outline" onClick={() => goToSlide(Math.max(0, exercises.length), "left")}>
                    Retour
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Navigation */}
      <SlideNavigation
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onGoHome={handleGoHome}
        onReset={handleReset}
      />

      {/* Add exercise button (visible on last slide) */}
      {currentSlide === totalSlides - 1 && (
        <div className="fixed top-6 right-6 z-50 animate-fade-in">
          <CreateExerciseForm onCreateExercise={handleCreateExercise} />
        </div>
      )}

      {/* Clear all exercises button (visible if any exercises exist) */}
      {exercises.length > 0 && (
        <div className="fixed top-6 left-6 z-50 animate-fade-in">
          <Button variant="destructive" onClick={handleClearAll} title="Effacer tous les exercices">
            Effacer tous
          </Button>
        </div>
      )}
    </div>
  );
};

export default Index;
