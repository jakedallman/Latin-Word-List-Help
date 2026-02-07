import { motion } from "framer-motion";
import { LatinWord } from "@/types/latinWord";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

interface FlashcardProps {
  word: LatinWord;
  onKnow: () => void;
  onDontKnow: () => void;
  currentIndex: number;
  totalWords: number;
}

const Flashcard = ({ word, onKnow, onDontKnow, currentIndex, totalWords }: FlashcardProps) => {
  return (
    <motion.div
      key={word.word + currentIndex}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="flashcard p-8 md:p-12">
        {/* Section Badge */}
        <div className="flex justify-between items-center mb-8">
          <span className="section-badge">
            Section {word.section}
          </span>
          <span className="text-sm text-muted-foreground">
            {currentIndex + 1} of {totalWords}
          </span>
        </div>

        {/* Latin Word */}
        <div className="text-center mb-8">
          <h2 className="latin-word text-primary mb-2">
            {word.word}
          </h2>
          <div className="w-24 h-0.5 bg-accent/30 mx-auto" />
        </div>

        {/* Definition */}
        <div className="bg-muted/50 rounded-lg p-6 mb-8">
          <p className="text-lg md:text-xl text-center text-foreground/90 leading-relaxed">
            {word.definition}
          </p>
        </div>

        {/* Question */}
        <p className="text-center text-muted-foreground mb-6 text-lg italic">
          Do you know this word?
        </p>

        {/* Buttons */}
        <div className="flex gap-4 justify-center">
          <Button
            onClick={onDontKnow}
            size="lg"
            className="btn-dont-know px-8 py-6 text-lg gap-2"
          >
            <X className="w-5 h-5" />
            No
          </Button>
          <Button
            onClick={onKnow}
            size="lg"
            className="btn-know px-8 py-6 text-lg gap-2"
          >
            <Check className="w-5 h-5" />
            Yes
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default Flashcard;
