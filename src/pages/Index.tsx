import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { LatinWord } from "@/types/latinWord";
import Flashcard from "@/components/Flashcard";
import ProgressBar from "@/components/ProgressBar";
import Summary from "@/components/Summary";
import WordInput from "@/components/WordInput";

type StudyState = "input" | "studying" | "complete";

const Index = () => {
  const [studyState, setStudyState] = useState<StudyState>("input");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [unknownWords, setUnknownWords] = useState<LatinWord[]>([]);
  const [studyingWords, setStudyingWords] = useState<LatinWord[]>([]);
  const [allWords, setAllWords] = useState<LatinWord[]>([]);

  const handleWordsReady = useCallback((words: LatinWord[]) => {
    setAllWords(words);
    setStudyingWords(words);
    setCurrentIndex(0);
    setUnknownWords([]);
    setStudyState("studying");
  }, []);

  const handleKnow = useCallback(() => {
    if (currentIndex < studyingWords.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setStudyState("complete");
    }
  }, [currentIndex, studyingWords.length]);

  const handleDontKnow = useCallback(() => {
    setUnknownWords(prev => [...prev, studyingWords[currentIndex]]);
    if (currentIndex < studyingWords.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setStudyState("complete");
    }
  }, [currentIndex, studyingWords]);

  const handleRestart = useCallback(() => {
    setStudyingWords(allWords);
    setCurrentIndex(0);
    setUnknownWords([]);
    setStudyState("studying");
  }, [allWords]);

  const handleStudyUnknown = useCallback(() => {
    setStudyingWords(unknownWords);
    setUnknownWords([]);
    setCurrentIndex(0);
    setStudyState("studying");
  }, [unknownWords]);

  const handleNewWords = useCallback(() => {
    setStudyState("input");
    setAllWords([]);
    setStudyingWords([]);
    setCurrentIndex(0);
    setUnknownWords([]);
  }, []);

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container max-w-4xl mx-auto">
        {studyState === "studying" && (
          <ProgressBar current={currentIndex} total={studyingWords.length} />
        )}

        <AnimatePresence mode="wait">
          {studyState === "input" && (
            <WordInput key="input" onWordsReady={handleWordsReady} />
          )}

          {studyState === "studying" && studyingWords[currentIndex] && (
            <Flashcard
              key={`card-${currentIndex}`}
              word={studyingWords[currentIndex]}
              onKnow={handleKnow}
              onDontKnow={handleDontKnow}
              currentIndex={currentIndex}
              totalWords={studyingWords.length}
            />
          )}

          {studyState === "complete" && (
            <Summary
              key="summary"
              unknownWords={unknownWords}
              totalWords={studyingWords.length}
              onRestart={handleRestart}
              onStudyUnknown={handleStudyUnknown}
              onNewWords={handleNewWords}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
