import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BookOpen, Scroll } from "lucide-react";

interface StartScreenProps {
  totalWords: number;
  totalSections: number;
  onStart: () => void;
}

const StartScreen = ({ totalWords, totalSections, onStart }: StartScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto text-center"
    >
      <div className="flashcard p-8 md:p-12">
        {/* Decorative Element */}
        <div className="flex justify-center mb-6">
          <Scroll className="w-16 h-16 text-accent" />
        </div>

        {/* Title */}
        <h1 
          className="text-4xl md:text-5xl font-bold text-primary mb-4"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Latin Vocabulary
        </h1>
        <p className="text-xl text-muted-foreground mb-8 italic">
          Discere et Docere
        </p>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-border" />
          <span className="text-accent">❧</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-8 mb-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">{totalWords}</div>
            <div className="text-sm text-muted-foreground">Words</div>
          </div>
          <div className="w-px bg-border" />
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">{totalSections}</div>
            <div className="text-sm text-muted-foreground">Sections</div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-muted/50 rounded-lg p-6 mb-8 text-left">
          <h3 className="font-semibold text-foreground mb-3">How it works:</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">•</span>
              Each card shows a Latin word with its definition
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">•</span>
              Click <strong className="text-success">Yes</strong> if you know it, <strong className="text-destructive">No</strong> if you don't
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">•</span>
              At the end, review all the words you didn't know
            </li>
          </ul>
        </div>

        {/* Start Button */}
        <Button 
          onClick={onStart} 
          size="lg" 
          className="bg-primary text-primary-foreground px-12 py-6 text-lg gap-2"
        >
          <BookOpen className="w-5 h-5" />
          Begin Study
        </Button>
      </div>
    </motion.div>
  );
};

export default StartScreen;
