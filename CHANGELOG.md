# Changelog

All notable changes to Shoutdle will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Comprehensive documentation suite
- CONTRIBUTING.md with contribution guidelines
- CODE_OF_CONDUCT.md with community standards
- ARCHITECTURE.md with technical architecture details
- API.md with code API documentation
- DEPLOYMENT.md with deployment instructions
- PROMPT.md with AI/LLM prompt template

## [1.0.0] - 2024

### Added
- Initial release of Shoutdle
- Voice-enabled Wordle clone gameplay
- 6 guess attempts to find 5-letter word
- Voice input via microphone
- Cross-platform support (Web, iOS, Android)
- Word validation from curated word list (~380 words)
- Color-coded feedback (green, yellow, gray)
- Audio feedback on game completion
- Help modal with game instructions
- New game functionality

### Features
- React Native with Expo framework
- TypeScript for type safety
- Web Speech API for browser voice recognition
- expo-speech-recognition for mobile platforms
- expo-speech for text-to-speech feedback
- Responsive UI that adapts to different screen sizes

### Technical
- Game logic module with word checking algorithm
- Word list management
- State management with React hooks
- Platform-specific voice recognition implementations
- Permission handling for microphone access

## Release Notes

### Version 1.0.0

This is the first public release of Shoutdle - a voice-enabled Wordle clone. The game allows players to speak their guesses instead of typing, making it a unique and accessible variation of the popular word game.

**Key Features:**
- Play Wordle by speaking instead of typing
- Works on web browsers, iOS, and Android devices
- Clean, intuitive interface
- Audio feedback for game results
- No external dependencies or API calls - works completely offline

**Supported Platforms:**
- Web (Chrome, Edge, Safari)
- iOS (requires microphone and speech recognition permissions)
- Android (requires microphone permission)

**Known Limitations:**
- Mobile speech recognition requires proper permissions setup
- Web Speech API is browser-dependent (best on Chrome/Edge)
- Limited to English language words
- No game statistics or persistence yet

---

## Future Releases

### Planned for 2.0.0
- Game statistics (wins, losses, streaks)
- Local storage for game persistence
- Daily challenge mode
- Multiple language support
- Enhanced mobile voice recognition
- Share game results functionality
- Dark mode theme

### Under Consideration
- Multiplayer mode
- Leaderboards
- Custom word lists
- Difficulty levels (word frequency-based)
- Hints system
- Achievement system
- Social media integration
