import { LatinWord } from "@/types/latinWord";

export function parseWordList(input: string): LatinWord[] {
  const lines = input.split("\n").map(l => l.trim()).filter(Boolean);
  const words: LatinWord[] = [];
  let currentSection = 1;

  for (const line of lines) {
    // Check for section headers like "Section 1", "Section [2]", etc.
    const sectionMatch = line.match(/^section\s*\[?\s*(\d+)\s*\]?\s*$/i);
    if (sectionMatch) {
      currentSection = parseInt(sectionMatch[1], 10);
      continue;
    }

    // Parse word - definition lines using hyphen or em dash
    // Match: "word — definition" or "word - definition"
    const wordMatch = line.match(/^(.+?)\s*[-—–]\s*(.+)$/);
    if (wordMatch) {
      const word = wordMatch[1].trim();
      const definition = wordMatch[2].trim();
      if (word && definition) {
        words.push({ word, definition, section: currentSection });
      }
    }
  }

  return words;
}
