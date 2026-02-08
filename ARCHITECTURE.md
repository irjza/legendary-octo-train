# Shoutdle Architecture

This document describes the technical architecture and design decisions of Shoutdle.

## Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Core Components](#core-components)
- [Game Logic](#game-logic)
- [Voice Recognition](#voice-recognition)
- [State Management](#state-management)
- [Platform Considerations](#platform-considerations)

## Overview

Shoutdle is a voice-enabled Wordle clone built with React Native and Expo, supporting web, iOS, and Android platforms. The application allows users to play the classic word-guessing game using voice input instead of typing.

## Technology Stack

### Core Technologies

- **React Native**: Cross-platform mobile development framework
- **Expo**: Development platform for React Native applications
- **TypeScript**: Type-safe JavaScript for better code quality
- **Metro**: JavaScript bundler for React Native

### Key Dependencies

- **expo-speech**: Text-to-speech for audio feedback
- **expo-speech-recognition**: Speech recognition for mobile platforms
- **Web Speech API**: Browser-based speech recognition (web only)

## Project Structure

```
legendary-octo-train/
├── App.tsx                 # Main application component
├── gameLogic.ts           # Core game logic and state management
├── wordList.ts            # Word list for the game
├── app.json               # Expo configuration
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── babel.config.js        # Babel configuration
└── assets/                # Images and static assets
    ├── icon.png
    ├── splash.png
    └── favicon.png
```

## Core Components

### App.tsx

The main application component that handles:
- UI rendering and layout
- User interactions
- Game state management
- Voice recognition integration
- Modal dialogs (help, game over)

**Key Responsibilities:**
- Manages the game board display
- Handles microphone button interactions
- Processes voice input and submits guesses
- Displays game status and feedback
- Provides help/instructions modal

### gameLogic.ts

Contains the core game logic and data structures:

**Types:**
```typescript
type LetterState = 'correct' | 'present' | 'absent' | 'empty';

interface Letter {
  char: string;
  state: LetterState;
}

interface GameState {
  guesses: Letter[][];
  currentGuess: number;
  gameStatus: 'playing' | 'won' | 'lost';
  targetWord: string;
}
```

**Key Functions:**
- `initializeGame(targetWord)`: Sets up a new game with empty guess board
- `checkGuess(guess, targetWord)`: Evaluates a guess and returns letter states
- Constants: `MAX_GUESSES = 6`, `WORD_LENGTH = 5`

**Guess Checking Algorithm:**
1. First pass: Mark all letters in correct positions as 'correct'
2. Second pass: Mark letters present in word but wrong position as 'present'
3. Remaining letters are marked as 'absent'
4. Handles duplicate letters correctly

### wordList.ts

Contains the word list for the game:
- `WORD_LIST`: Array of valid 5-letter words (~380 words)
- `getRandomWord()`: Returns a random word from the list
- `isValidWord(word)`: Validates if a word is in the acceptable list

## Game Logic

### Game Flow

1. **Initialization**
   - Random word selected from word list
   - Empty 6x5 grid initialized
   - Game status set to 'playing'

2. **User Input**
   - User taps microphone button
   - Voice recognition captures speech
   - Transcript converted to uppercase
   - Non-alphabetic characters filtered out

3. **Guess Validation**
   - Check if word is exactly 5 letters
   - Verify word exists in word list
   - Display error alert if invalid

4. **Guess Processing**
   - Run guess through checking algorithm
   - Update game board with color-coded results
   - Check for win/loss conditions
   - Provide audio feedback

5. **Game Completion**
   - Win: Show congratulations message
   - Loss: Reveal the target word
   - Offer option to start new game

### Color Coding

- **🟩 Green (Correct)**: Letter is in the word and in the correct position
- **🟨 Yellow (Present)**: Letter is in the word but in wrong position
- **⬜ Gray (Absent)**: Letter is not in the word at all
- **⬜ Empty**: No guess made yet

## Voice Recognition

### Web Platform

Uses the Web Speech API (SpeechRecognition):
- Browser-native API available in Chrome, Edge, Safari
- Requires microphone permissions
- Real-time transcription
- English language configured (`en-US`)

**Implementation:**
```typescript
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';
recognition.continuous = false;
recognition.interimResults = false;
```

### Mobile Platforms

- **iOS**: Uses expo-speech-recognition with iOS speech framework
- **Android**: Uses expo-speech-recognition with Android speech services
- Requires runtime permissions for microphone access

**Permissions:**
- iOS: `NSMicrophoneUsageDescription`, `NSSpeechRecognitionUsageDescription`
- Android: `android.permission.RECORD_AUDIO`

## State Management

Uses React's built-in state management with hooks:

**State Variables:**
- `gameState`: Current game state (guesses, status, target word)
- `currentInput`: Current user input (not heavily used)
- `isListening`: Boolean for microphone active state
- `transcript`: Latest voice recognition result
- `showHelp`: Boolean for help modal visibility

**Effects:**
- Game initialization on mount
- Transcript processing when new speech detected
- Automatic word submission when valid 5-letter word captured

## Platform Considerations

### Cross-Platform Compatibility

**Shared Code:**
- Game logic is 100% platform-agnostic
- React Native components work across all platforms
- UI adapts to different screen sizes

**Platform-Specific:**
- Voice recognition implementation differs (Web API vs. Expo)
- Permission handling varies by platform
- Audio feedback uses platform-native text-to-speech

### Performance

- Lightweight word list (~380 words)
- Efficient guess checking algorithm (O(n) where n = word length)
- Minimal re-renders with proper React state management
- No external API calls (fully offline capable)

### Accessibility

- Voice input as alternative to typing
- Audio feedback on game completion
- Clear visual feedback with color coding
- Help modal with instructions

## Future Architecture Considerations

Potential improvements and extensions:

1. **State Persistence**
   - Save game state to local storage
   - Track game statistics
   - Store user preferences

2. **Enhanced Voice Recognition**
   - Better error handling and retry logic
   - Support for multiple languages
   - Voice feedback for each guess

3. **Expanded Word List**
   - Difficulty levels (easy/medium/hard words)
   - Custom word lists
   - Daily challenge mode

4. **Social Features**
   - Share results
   - Multiplayer mode
   - Leaderboards

5. **Testing**
   - Unit tests for game logic
   - Integration tests for voice recognition
   - E2E tests for complete game flow
