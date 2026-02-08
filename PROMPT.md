# Shoutdle - AI/LLM Development Prompt

This document serves as a comprehensive prompt template for AI assistants and LLMs working on the Shoutdle project.

## Project Overview

**Project Name:** Shoutdle  
**Type:** Voice-Enabled Wordle Clone  
**Repository:** irjza/legendary-octo-train  
**Tech Stack:** React Native, Expo, TypeScript  
**Platforms:** Web, iOS, Android  

## Project Description

Shoutdle is a voice-enabled word-guessing game inspired by Wordle. Players have 6 attempts to guess a 5-letter word by speaking their guesses instead of typing. The game provides color-coded feedback (green for correct position, yellow for correct letter wrong position, gray for incorrect letter) and uses speech recognition for input and text-to-speech for feedback.

## Architecture Summary

### Core Components

1. **App.tsx** - Main React component
   - Renders game UI (grid, buttons, modals)
   - Manages game state
   - Handles user interactions
   - Integrates voice recognition

2. **gameLogic.ts** - Game logic module
   - Types: `LetterState`, `Letter`, `GameState`
   - Functions: `checkGuess()`, `initializeGame()`
   - Constants: `MAX_GUESSES = 6`, `WORD_LENGTH = 5`

3. **wordList.ts** - Word management
   - `WORD_LIST`: ~380 valid 5-letter words
   - `getRandomWord()`: Random word selection
   - `isValidWord()`: Word validation

### Technology Stack

- **Framework:** React Native with Expo SDK ~52.0.0
- **Language:** TypeScript 5.9+
- **Voice Recognition:** 
  - Web: Web Speech API
  - Mobile: expo-speech-recognition
- **Text-to-Speech:** expo-speech
- **Build Tool:** Metro bundler
- **Package Manager:** npm

### Key Dependencies

```json
{
  "expo": "~52.0.0",
  "react": "^18.3.1",
  "react-native": "^0.76.5",
  "typescript": "^5.9.3",
  "expo-speech": "^14.0.8",
  "expo-speech-recognition": "^3.1.0"
}
```

## Development Guidelines

### Code Style

- Use functional components with React hooks
- TypeScript strict mode enabled
- 2-space indentation
- Clear, descriptive variable names
- Document complex logic with comments
- Follow existing code patterns

### File Structure

```
legendary-octo-train/
├── App.tsx                  # Main app component
├── gameLogic.ts            # Core game logic
├── wordList.ts             # Word list and utilities
├── app.json                # Expo configuration
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
├── babel.config.js         # Babel config
├── assets/                 # Images and static files
└── docs/                   # Documentation files
```

### State Management

Uses React hooks for state management:
- `useState` for local component state
- `useEffect` for side effects
- No external state management library (Redux, MobX, etc.)

### Game Flow

1. Initialize game with random word
2. User taps microphone → starts voice recognition
3. Transcript captured → converted to uppercase → validated
4. Valid guess → check against target word → update grid
5. Win condition: All letters correct
6. Loss condition: 6 guesses exhausted
7. Game over → audio feedback → option to restart

## Common Development Tasks

### Adding a New Feature

1. Understand existing code structure
2. Identify affected files
3. Implement changes following existing patterns
4. Test on web and mobile platforms
5. Update documentation as needed
6. Ensure TypeScript types are correct

### Modifying Game Logic

- All game logic is in `gameLogic.ts`
- Keep logic pure and testable
- Maintain backward compatibility
- Update types if data structures change

### Updating Word List

- Edit `wordList.ts`
- Maintain uppercase format
- Keep words at 5 letters
- Ensure words are common/recognizable

### UI Changes

- All UI is in `App.tsx`
- Use React Native components
- Follow existing StyleSheet patterns
- Test on multiple screen sizes
- Maintain accessibility

## Testing Strategy

### Manual Testing Checklist

- [ ] Game initializes correctly
- [ ] Microphone button activates voice recognition
- [ ] Valid words are accepted
- [ ] Invalid words show appropriate errors
- [ ] Color coding is correct (green/yellow/gray)
- [ ] Win condition triggers correctly
- [ ] Loss condition triggers correctly
- [ ] Audio feedback plays
- [ ] New game resets state properly
- [ ] Help modal displays correctly

### Platform-Specific Testing

**Web:**
- [ ] Works in Chrome
- [ ] Works in Edge
- [ ] Works in Safari (with limitations)
- [ ] Microphone permissions requested
- [ ] HTTPS requirement met

**iOS:**
- [ ] Microphone permission requested
- [ ] Speech recognition permission requested
- [ ] Voice recognition works
- [ ] Layout adapts to screen size
- [ ] Works on iPhone and iPad

**Android:**
- [ ] Microphone permission requested
- [ ] Voice recognition works
- [ ] Layout adapts to screen size
- [ ] Works on various Android versions

## Common Issues and Solutions

### Voice Recognition Not Working

**Web:**
- Check browser compatibility (use Chrome/Edge)
- Ensure HTTPS is enabled
- Verify microphone permissions granted
- Check browser console for errors

**Mobile:**
- Verify permissions in app.json
- Check device settings for app permissions
- Test on physical device (simulators have limitations)
- Ensure expo-speech-recognition is properly configured

### Build Issues

```bash
# Clear cache
npx expo start -c

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Update Expo
npx expo upgrade
```

### TypeScript Errors

- Run `npx tsc --noEmit` to check types
- Ensure all imports are typed
- Check tsconfig.json configuration
- Use proper type assertions when needed

## AI Assistant Instructions

When working on this project:

### 1. Understanding Context

- Read existing code before making changes
- Understand the game flow and state management
- Review relevant documentation files
- Consider platform-specific implications

### 2. Making Changes

- Make minimal, focused changes
- Maintain existing code style
- Preserve TypeScript type safety
- Don't break existing functionality
- Test changes mentally before suggesting

### 3. Code Quality

- Write clear, self-documenting code
- Add comments for complex logic
- Use meaningful variable names
- Follow React best practices
- Keep functions small and focused

### 4. Communication

- Explain reasoning for changes
- Highlight potential issues
- Suggest testing strategies
- Provide code examples
- Reference documentation when relevant

### 5. Problem Solving

- Break down complex problems
- Consider edge cases
- Think about performance
- Maintain cross-platform compatibility
- Suggest alternatives when appropriate

## Example Prompts for AI Assistants

### Adding a Feature

```
I want to add [feature] to Shoutdle. This feature should [description].
Consider:
- Where in the codebase this belongs
- How it affects existing functionality
- Platform-specific requirements
- TypeScript type definitions needed
- UI/UX implications
```

### Fixing a Bug

```
There's a bug where [description]. The expected behavior is [expected].
Please:
- Identify the root cause
- Propose a fix
- Ensure the fix doesn't break other features
- Consider edge cases
- Update tests if needed
```

### Refactoring Code

```
I want to refactor [component/function] to [improvement].
Please:
- Maintain existing functionality
- Improve code quality/performance
- Update TypeScript types if needed
- Ensure backward compatibility
- Document significant changes
```

### Understanding Code

```
Can you explain how [feature/component] works?
Include:
- High-level overview
- Key functions/components involved
- Data flow
- Important edge cases
- Potential issues or limitations
```

## Project Constraints

### Must Maintain

- Cross-platform compatibility (Web, iOS, Android)
- Offline functionality (no external APIs)
- TypeScript type safety
- Existing game rules (6 guesses, 5 letters)
- Current word list (can be extended)
- Voice input as primary interaction

### Cannot Change

- Core game mechanics (Wordle rules)
- Expo framework (avoid ejecting)
- React Native architecture
- TypeScript as primary language

### Performance Requirements

- Quick app startup (<3 seconds)
- Instant game state updates
- Smooth animations
- Responsive voice recognition
- No memory leaks

## Security Considerations

- No sensitive data stored
- No external API calls
- Microphone access properly requested
- No user tracking (unless explicitly added)
- Follow platform security guidelines

## Future Roadmap

Potential enhancements (not yet implemented):

1. **Statistics & Persistence**
   - Track wins/losses
   - Save game state
   - Show streaks

2. **Social Features**
   - Share results
   - Daily challenges
   - Multiplayer mode

3. **Enhanced Voice**
   - Better error handling
   - Multi-language support
   - Voice feedback per guess

4. **UI Improvements**
   - Dark mode
   - Animations
   - Custom themes
   - Accessibility features

5. **Word Management**
   - Difficulty levels
   - Custom word lists
   - Hint system

## Resources

### Documentation
- README.md - General project information
- ARCHITECTURE.md - Technical architecture
- API.md - Code API documentation
- CONTRIBUTING.md - Contribution guidelines
- DEPLOYMENT.md - Deployment instructions
- CHANGELOG.md - Version history

### External Resources
- [Expo Documentation](https://docs.expo.dev)
- [React Native Documentation](https://reactnative.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)

## Contact & Support

For questions or issues:
- Open an issue on GitHub
- Check existing documentation
- Review code comments
- Test on multiple platforms

## Version Information

**Current Version:** 1.0.0  
**Expo SDK:** ~52.0.0  
**React Native:** ^0.76.5  
**TypeScript:** ^5.9.3  
**Node Version Required:** 18+  

---

## Quick Reference

### Commands

```bash
# Development
npm install              # Install dependencies
npm start               # Start Expo dev server
npm start -- --web      # Run on web
npm start -- --ios      # Run on iOS
npm start -- --android  # Run on Android

# Building
npx expo export:web     # Build for web
eas build --platform ios    # Build for iOS
eas build --platform android # Build for Android

# Maintenance
npx expo upgrade        # Update Expo
npm update              # Update dependencies
npx expo start -c       # Clear cache
```

### Key Files

- `App.tsx` - Main UI component
- `gameLogic.ts` - Game rules and logic
- `wordList.ts` - Word validation
- `app.json` - App configuration
- `package.json` - Dependencies

### Important Types

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

This prompt file should help AI assistants understand and work effectively with the Shoutdle codebase.
