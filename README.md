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

#### Build for Production (Web)
```bash
npm run build
```

This will create a production-ready build in the `dist` folder.

#### iOS (requires macOS)
```bash
npm start -- --ios
```

#### Android
```bash
npm start -- --android
```

## Deployment

### Deploying to Netlify

This project is ready to deploy to Netlify. You can deploy it in two ways:

#### Option 1: Connect to Git Repository
1. Go to [Netlify](https://app.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Connect your Git provider and select this repository
4. Netlify will automatically detect the `netlify.toml` configuration
5. Click "Deploy site"

#### Option 2: Manual Deploy
1. Build the project locally:
   ```bash
   npm run build
   ```
2. Go to [Netlify](https://app.netlify.com/)
3. Drag and drop the `dist` folder to the deploy zone

The deployed site will be fully functional with:
- Voice recognition support (requires microphone permissions)
- Full Wordle gameplay
- Responsive design

**Note:** Make sure users grant microphone permissions in their browser for voice input to work.

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
