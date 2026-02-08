# Shoutdle 🎤

A voice-enabled Wordle clone - guess the word by speaking it!

## Features

- 🎮 Classic Wordle gameplay with 6 guesses
- 🎤 Voice input - speak your guesses instead of typing
- 🌐 Cross-platform support (Web, iOS, Android)
- 🎯 Word validation from curated word list
- 🟩🟨⬜ Color-coded feedback for guesses
- 🔊 Audio feedback on game completion

## How to Play

1. Tap the microphone button
2. Say a 5-letter word
3. Get color-coded feedback:
   - 🟩 Green: Correct letter in correct position
   - 🟨 Yellow: Correct letter in wrong position
   - ⬜ Gray: Letter not in word
4. You have 6 guesses to find the word!

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

```bash
npm install
```

### Running the App

#### Web
```bash
npm start -- --web
```

#### iOS (requires macOS)
```bash
npm start -- --ios
```

#### Android
```bash
npm start -- --android
```

## Technology Stack

- React Native with Expo
- TypeScript
- expo-speech for text-to-speech feedback
- Web Speech API for voice recognition (web)
- Cross-platform UI components

## Browser Compatibility

For the best voice recognition experience on web, use:
- Google Chrome
- Microsoft Edge
- Safari (with microphone permissions)

## License

ISC
