import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, ClipboardPaste } from "lucide-react";
import { parseWordList } from "@/lib/parseWords";
import { LatinWord } from "@/types/latinWord";

interface WordInputProps {
  onWordsReady: (words: LatinWord[]) => void;
}

const WordInput = ({ onWordsReady }: WordInputProps) => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const parsed = parseWordList(text);
    if (parsed.length === 0) {
      setError("No words found. Make sure each word follows the format: Latin word - definition");
      return;
    }
    setError("");
    onWordsReady(parsed);
  };

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText(clipboardText);
      setError("");
    } catch {
      // Fallback: user can paste manually
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="flashcard p-8 md:p-12">
        <h1
          className="text-4xl md:text-5xl font-bold text-primary mb-4 text-center"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Latin Vocabulary
        </h1>
        <p className="text-xl text-muted-foreground mb-8 italic text-center">
          Paste your word list below
        </p>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-border" />
          <span className="text-accent">❧</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="bg-muted/50 rounded-lg p-4 mb-4 text-sm text-muted-foreground">
          <p className="font-semibold text-foreground mb-2">Expected format:</p>
          <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
{`Section 1
Āctum - procedure/course of action
quem - which (Relative Pronoun)

Section 2
Conquīrendī - to be sought out`}
          </pre>
        </div>

        <div className="relative mb-4">
          <Textarea
            value={text}
            onChange={(e) => { setText(e.target.value); setError(""); }}
            placeholder="Paste your Latin word list here..."
            className="min-h-[250px] font-mono text-sm"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePaste}
            className="absolute top-2 right-2 gap-1 text-xs text-muted-foreground"
          >
            <ClipboardPaste className="w-3 h-3" />
            Paste
          </Button>
        </div>

        {error && (
          <p className="text-destructive text-sm mb-4">{error}</p>
        )}

        <Button
          onClick={handleSubmit}
          size="lg"
          className="w-full bg-primary text-primary-foreground py-6 text-lg gap-2"
          disabled={!text.trim()}
        >
          <BookOpen className="w-5 h-5" />
          Start Studying
        </Button>
      </div>
    </motion.div>
  );
};

export default WordInput;
