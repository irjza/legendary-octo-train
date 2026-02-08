export type LetterState = 'correct' | 'present' | 'absent' | 'empty';

export interface Letter {
  char: string;
  state: LetterState;
}

export interface GameState {
  guesses: Letter[][];
  currentGuess: number;
  gameStatus: 'playing' | 'won' | 'lost';
  targetWord: string;
}

export const MAX_GUESSES = 6;
export const WORD_LENGTH = 5;

export const checkGuess = (guess: string, targetWord: string): Letter[] => {
  const result: Letter[] = [];
  const targetLetters = targetWord.split('');
  const guessLetters = guess.split('');
  
  // Track which letters in target have been matched
  const matched = new Array(WORD_LENGTH).fill(false);
  
  // First pass: mark correct positions
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guessLetters[i] === targetLetters[i]) {
      result[i] = { char: guessLetters[i], state: 'correct' };
      matched[i] = true;
    }
  }
  
  // Second pass: mark present letters
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (result[i]) continue; // Already marked as correct
    
    const letterIndex = targetLetters.findIndex(
      (letter, idx) => letter === guessLetters[i] && !matched[idx]
    );
    
    if (letterIndex !== -1) {
      result[i] = { char: guessLetters[i], state: 'present' };
      matched[letterIndex] = true;
    } else {
      result[i] = { char: guessLetters[i], state: 'absent' };
    }
  }
  
  return result;
};

export const initializeGame = (targetWord: string): GameState => {
  const guesses: Letter[][] = [];
  for (let i = 0; i < MAX_GUESSES; i++) {
    const row: Letter[] = [];
    for (let j = 0; j < WORD_LENGTH; j++) {
      row.push({ char: '', state: 'empty' });
    }
    guesses.push(row);
  }
  
  return {
    guesses,
    currentGuess: 0,
    gameStatus: 'playing',
    targetWord,
  };
};
