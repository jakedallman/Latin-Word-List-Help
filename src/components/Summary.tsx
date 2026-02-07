import { motion } from "framer-motion";
import { LatinWord } from "@/types/latinWord";
import { Button } from "@/components/ui/button";
import { RotateCcw, BookOpen, CheckCircle, FileText } from "lucide-react";

interface SummaryProps {
  unknownWords: LatinWord[];
  totalWords: number;
  onRestart: () => void;
  onStudyUnknown: () => void;
  onNewWords?: () => void;
}

const Summary = ({ unknownWords, totalWords, onRestart, onStudyUnknown, onNewWords }: SummaryProps) => {
  const knownCount = totalWords - unknownWords.length;
  const percentage = Math.round((knownCount / totalWords) * 100);

  // Group unknown words by section
  const groupedBySection = unknownWords.reduce((acc, word) => {
    if (!acc[word.section]) {
      acc[word.section] = [];
    }
    acc[word.section].push(word);
    return acc;
  }, {} as Record<number, LatinWord[]>);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-3xl mx-auto"
    >
      {/* Results Header */}
      <div className="flashcard p-8 md:p-12 mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
          Study Complete!
        </h1>
        
        <div className="flex justify-center gap-8 my-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-success mb-1">{knownCount}</div>
            <div className="text-sm text-muted-foreground">Known</div>
          </div>
          <div className="w-px bg-border" />
          <div className="text-center">
            <div className="text-4xl font-bold text-destructive mb-1">{unknownWords.length}</div>
            <div className="text-sm text-muted-foreground">To Review</div>
          </div>
          <div className="w-px bg-border" />
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-1">{percentage}%</div>
            <div className="text-sm text-muted-foreground">Score</div>
          </div>
        </div>

        <div className="flex gap-4 justify-center flex-wrap">
          {onNewWords && (
            <Button onClick={onNewWords} variant="outline" size="lg" className="gap-2">
              <FileText className="w-4 h-4" />
              New Words
            </Button>
          )}
          <Button onClick={onRestart} variant="outline" size="lg" className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Start Over
          </Button>
          {unknownWords.length > 0 && (
            <Button onClick={onStudyUnknown} size="lg" className="gap-2 bg-primary text-primary-foreground">
              <BookOpen className="w-4 h-4" />
              Study Unknown Words ({unknownWords.length})
            </Button>
          )}
        </div>
      </div>

      {/* Unknown Words List */}
      {unknownWords.length > 0 ? (
        <div className="flashcard p-8">
          <h2 className="text-2xl font-bold text-primary mb-6" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            Words to Review
          </h2>
          
          {Object.entries(groupedBySection)
            .sort(([a], [b]) => Number(a) - Number(b))
            .map(([section, words]) => (
              <div key={section} className="mb-6 last:mb-0">
                <h3 className="text-lg font-semibold text-accent mb-3">
                  Section {section}
                </h3>
                <div className="space-y-3">
                  {words.map((word, index) => (
                    <motion.div
                      key={word.word + index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex flex-col sm:flex-row sm:items-baseline gap-2 p-4 bg-muted/50 rounded-lg"
                    >
                      <span className="latin-word text-xl text-primary font-semibold min-w-[120px]">
                        {word.word}
                      </span>
                      <span className="text-muted-foreground">—</span>
                      <span className="text-foreground/80">{word.definition}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="flashcard p-8 text-center">
          <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-primary mb-2" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            Perfect Score!
          </h2>
          <p className="text-muted-foreground">
            You knew all {totalWords} words. Excellent work!
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default Summary;
