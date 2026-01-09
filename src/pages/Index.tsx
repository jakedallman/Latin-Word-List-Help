import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { latinWords, LatinWord } from "@/data/latinWords";
import Flashcard from "@/components/Flashcard";
import ProgressBar from "@/components/ProgressBar";
import Summary from "@/components/Summary";
import StartScreen from "@/components/StartScreen";

type StudyState = "start" | "studying" | "complete";

const Index = () => {
  const [studyState, setStudyState] = useState<StudyState>("start");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [unknownWords, setUnknownWords] = useState<LatinWord[]>([]);
  const [studyingWords, setStudyingWords] = useState<LatinWord[]>(latinWords);

  const totalSections = Math.max(...latinWords.map(w => w.section));

  const handleStart = useCallback(() => {
    setStudyState("studying");
    setCurrentIndex(0);
    setUnknownWords([]);
    setStudyingWords(latinWords);
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
    setStudyState("start");
    setCurrentIndex(0);
    setUnknownWords([]);
    setStudyingWords(latinWords);
  }, []);

  const handleStudyUnknown = useCallback(() => {
    setStudyingWords(unknownWords);
    setUnknownWords([]);
    setCurrentIndex(0);
    setStudyState("studying");
  }, [unknownWords]);

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container max-w-4xl mx-auto">
        {/* Header */}
        {studyState === "studying" && (
          <ProgressBar 
            current={currentIndex} 
            total={studyingWords.length} 
          />
        )}

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {studyState === "start" && (
            <StartScreen
              key="start"
              totalWords={latinWords.length}
              totalSections={totalSections}
              onStart={handleStart}
            />
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
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
