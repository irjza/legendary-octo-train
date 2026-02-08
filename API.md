# API Documentation

This document provides detailed API documentation for Shoutdle's core functions and modules.

## Table of Contents

- [gameLogic Module](#gamelogic-module)
- [wordList Module](#wordlist-module)
- [App Component](#app-component)
- [Types and Interfaces](#types-and-interfaces)

## gameLogic Module

### Types

#### `LetterState`

Represents the state of a letter in a guess.

```typescript
type LetterState = 'correct' | 'present' | 'absent' | 'empty';
```

**Values:**
- `'correct'`: Letter is in the word and in the correct position
- `'present'`: Letter is in the word but in wrong position
- `'absent'`: Letter is not in the word
- `'empty'`: No letter has been guessed yet

#### `Letter`

Represents a single letter in the game grid.

```typescript
interface Letter {
  char: string;      // The letter character (A-Z) or empty string
  state: LetterState; // The state of this letter
}
```

#### `GameState`

Represents the complete state of a game.

```typescript
interface GameState {
  guesses: Letter[][];           // 2D array of all guesses (6 rows x 5 columns)
  currentGuess: number;          // Index of current guess (0-5)
  gameStatus: 'playing' | 'won' | 'lost'; // Current game status
  targetWord: string;            // The word to guess (uppercase)
}
```

**Properties:**
- `guesses`: A 6x5 matrix where each row is a guess
- `currentGuess`: 0-indexed counter for current guess attempt
- `gameStatus`: Game state indicating if game is active, won, or lost
- `targetWord`: The correct answer (always uppercase)

### Constants

#### `MAX_GUESSES`

Maximum number of guess attempts allowed.

```typescript
export const MAX_GUESSES = 6;
```

#### `WORD_LENGTH`

Length of words in the game.

```typescript
export const WORD_LENGTH = 5;
```

### Functions

#### `checkGuess()`

Evaluates a guess against the target word and returns the state of each letter.

```typescript
function checkGuess(guess: string, targetWord: string): Letter[]
```

**Parameters:**
- `guess` (string): The guessed word (must be uppercase, 5 letters)
- `targetWord` (string): The target word (must be uppercase, 5 letters)

**Returns:**
- `Letter[]`: Array of 5 Letter objects with states assigned

**Algorithm:**
1. First pass: Mark all correct position matches
2. Second pass: Mark present letters (avoiding double-counting)
3. Mark remaining letters as absent

**Example:**
```typescript
const result = checkGuess('TRAIN', 'CHAIR');
// Returns:
// [
//   { char: 'T', state: 'absent' },
//   { char: 'R', state: 'present' },
//   { char: 'A', state: 'correct' },
//   { char: 'I', state: 'present' },
//   { char: 'N', state: 'absent' }
// ]
```

**Edge Cases:**
- Handles duplicate letters correctly (only marks as many 'present' as exist in target)
- Example: If target is "ROBOT" and guess is "FLOOR", only one 'O' is marked as present

#### `initializeGame()`

Creates a new game state with empty guesses.

```typescript
function initializeGame(targetWord: string): GameState
```

**Parameters:**
- `targetWord` (string): The word to guess (must be uppercase, 5 letters)

**Returns:**
- `GameState`: Fresh game state ready to play

**Example:**
```typescript
const gameState = initializeGame('HELLO');
// Returns:
// {
//   guesses: [[{char:'',state:'empty'}, ...], ...], // 6 rows x 5 columns
//   currentGuess: 0,
//   gameStatus: 'playing',
//   targetWord: 'HELLO'
// }
```

## wordList Module

### Constants

#### `WORD_LIST`

Array of valid 5-letter words for the game.

```typescript
export const WORD_LIST: string[]
```

**Size:** ~380 common English words
**Format:** All uppercase strings of length 5
**Examples:** 'ABOUT', 'HOUSE', 'TRAIN', 'WORLD'

### Functions

#### `getRandomWord()`

Returns a random word from the word list.

```typescript
function getRandomWord(): string
```

**Parameters:** None

**Returns:**
- `string`: Random 5-letter word in uppercase

**Example:**
```typescript
const word = getRandomWord();
console.log(word); // e.g., "BRAIN"
```

**Implementation:**
Uses `Math.random()` to select a random index from the word list.

#### `isValidWord()`

Checks if a word exists in the valid word list.

```typescript
function isValidWord(word: string): boolean
```

**Parameters:**
- `word` (string): Word to validate (case-insensitive)

**Returns:**
- `boolean`: `true` if word is in the list, `false` otherwise

**Example:**
```typescript
isValidWord('HELLO'); // true
isValidWord('WORLD'); // true  
isValidWord('ZZZZZ'); // false
isValidWord('hello'); // true (case-insensitive)
```

**Note:** Function converts input to uppercase before checking.

## App Component

The main React component that renders the game UI.

### Props

The App component does not accept any props.

### State

#### Local State Variables

- `gameState` (GameState | null): Current game state
- `currentInput` (string): Current user input (not actively used)
- `showHelp` (boolean): Whether help modal is visible

#### Voice Recognition Hook State

- `isListening` (boolean): Whether microphone is actively listening
- `transcript` (string): Latest speech recognition result

### Effects

#### Game Initialization

```typescript
useEffect(() => {
  startNewGame();
}, []);
```

Runs once on mount to initialize a new game.

#### Transcript Processing

```typescript
useEffect(() => {
  if (transcript) {
    const word = transcript.trim().toUpperCase().replace(/[^A-Z]/g, '');
    if (word.length === WORD_LENGTH) {
      handleGuess(word);
    }
    setTranscript('');
  }
}, [transcript]);
```

Automatically processes and submits valid transcripts.

### Methods

#### `startNewGame()`

Initializes a new game with a random word.

```typescript
function startNewGame(): void
```

**Side Effects:**
- Selects random word from word list
- Resets game state
- Clears current input

#### `handleGuess(word: string)`

Processes a guess and updates game state.

```typescript
function handleGuess(word: string): void
```

**Parameters:**
- `word` (string): The guessed word

**Validation:**
- Checks word length equals 5
- Validates word is in word list
- Only processes if game is in 'playing' state

**Side Effects:**
- Updates game state with new guess
- Checks for win/loss conditions
- Triggers audio feedback
- Shows completion alerts

#### `handleMicPress()`

Activates voice recognition.

```typescript
function handleMicPress(): void
```

**Side Effects:**
- Starts speech recognition
- Sets listening state to true

#### `getLetterStyle(state: LetterState)`

Returns the appropriate style for a letter based on its state.

```typescript
function getLetterStyle(state: LetterState): StyleProp<ViewStyle>
```

**Parameters:**
- `state` (LetterState): The state of the letter

**Returns:**
- Style object for the letter tile

### Custom Hooks

#### `useSpeechRecognition()`

Hook that manages speech recognition functionality.

```typescript
const useSpeechRecognition = () => {
  // Returns:
  // {
  //   isListening: boolean,
  //   transcript: string,
  //   startListening: () => void,
  //   setTranscript: (transcript: string) => void
  // }
}
```

**Platform-Specific:**
- **Web**: Uses Web Speech API (SpeechRecognition)
- **Mobile**: Shows alert (full mobile support requires additional setup)

**Error Handling:**
- Detects unsupported browsers
- Handles recognition errors
- Displays user-friendly error messages

## Error Handling

### Common Error Scenarios

1. **Invalid Word Length**
   - Trigger: Guess is not 5 letters
   - Response: Alert with message "Word must be 5 letters long"

2. **Word Not in List**
   - Trigger: Guess is not in valid word list
   - Response: Alert with message "Not in word list"

3. **Browser Not Supported** (Web only)
   - Trigger: Browser doesn't support Web Speech API
   - Response: Alert suggesting Chrome or Edge

4. **Speech Recognition Error**
   - Trigger: Error during speech recognition
   - Response: Alert with error details

## Platform-Specific APIs

### Web Speech API (Web Platform)

```typescript
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';
recognition.continuous = false;
recognition.interimResults = false;
```

**Events:**
- `onstart`: Recognition starts
- `onresult`: Transcript received
- `onerror`: Error occurred
- `onend`: Recognition ends

### Expo Speech (All Platforms)

```typescript
import * as Speech from 'expo-speech';

Speech.speak(text: string);
```

Used for text-to-speech audio feedback on game completion.

## Best Practices

### Using the API

1. **Always validate words** before calling `handleGuess()`
2. **Check game status** before processing guesses
3. **Handle errors gracefully** with user-friendly messages
4. **Uppercase conversions** should be consistent
5. **State updates** should be immutable

### Performance Tips

1. Word list lookup is O(n) - consider Map for larger lists
2. Guess checking is O(n) where n = word length (efficient)
3. Minimize re-renders by using proper React keys
4. Speech recognition should be cleaned up on unmount

### Extension Points

To extend the game:

1. **Add new word lists**: Extend `WORD_LIST` in wordList.ts
2. **Change difficulty**: Modify `WORD_LENGTH` and adapt UI
3. **Add statistics**: Track wins/losses in state
4. **Internationalization**: Add language support to word lists
