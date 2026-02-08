import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Platform,
  ScrollView,
  Modal,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Speech from 'expo-speech';
import { getRandomWord, isValidWord } from './wordList';
import {
  GameState,
  Letter,
  LetterState,
  checkGuess,
  initializeGame,
  MAX_GUESSES,
  WORD_LENGTH,
} from './gameLogic';

// Speech recognition for web
const useSpeechRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  
  const startListening = () => {
    if (Platform.OS === 'web') {
      // Web Speech API
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (!SpeechRecognition) {
        Alert.alert('Not Supported', 'Speech recognition is not supported in this browser. Try Chrome or Edge.');
        return;
      }
      
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onstart = () => {
        setIsListening(true);
      };
      
      recognition.onresult = (event: any) => {
        const result = event.results[0][0].transcript;
        setTranscript(result);
        setIsListening(false);
      };
      
      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        Alert.alert('Error', `Speech recognition error: ${event.error}`);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognition.start();
    } else {
      // For mobile, we'll use a simpler approach with text input for now
      Alert.alert('Mobile Support', 'Speech recognition on mobile requires additional setup. Please use the web version or type your guess.');
    }
  };
  
  return { isListening, transcript, startListening, setTranscript };
};

export default function App() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [currentInput, setCurrentInput] = useState('');
  const { isListening, transcript, startListening, setTranscript } = useSpeechRecognition();
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    startNewGame();
  }, []);

  useEffect(() => {
    if (transcript) {
      const word = transcript.trim().toUpperCase().replace(/[^A-Z]/g, '');
      if (word.length === WORD_LENGTH) {
        handleGuess(word);
      }
      setTranscript('');
    }
  }, [transcript]);

  const startNewGame = () => {
    const targetWord = getRandomWord();
    setGameState(initializeGame(targetWord));
    setCurrentInput('');
  };

  const handleGuess = (word: string) => {
    if (!gameState || gameState.gameStatus !== 'playing') return;

    const upperWord = word.toUpperCase();
    
    if (upperWord.length !== WORD_LENGTH) {
      Alert.alert('Invalid Word', `Word must be ${WORD_LENGTH} letters long`);
      return;
    }

    if (!isValidWord(upperWord)) {
      Alert.alert('Invalid Word', 'Not in word list');
      return;
    }

    const checkedGuess = checkGuess(upperWord, gameState.targetWord);
    const newGuesses = [...gameState.guesses];
    newGuesses[gameState.currentGuess] = checkedGuess;

    const isWin = checkedGuess.every((letter) => letter.state === 'correct');
    const isLastGuess = gameState.currentGuess === MAX_GUESSES - 1;

    setGameState({
      ...gameState,
      guesses: newGuesses,
      currentGuess: gameState.currentGuess + 1,
      gameStatus: isWin ? 'won' : isLastGuess ? 'lost' : 'playing',
    });

    // Provide feedback
    if (isWin) {
      Speech.speak('Correct! You won!');
      setTimeout(() => {
        Alert.alert('🎉 Congratulations!', `You guessed the word: ${gameState.targetWord}`, [
          { text: 'Play Again', onPress: startNewGame },
        ]);
      }, 500);
    } else if (isLastGuess) {
      Speech.speak(`Game over! The word was ${gameState.targetWord}`);
      setTimeout(() => {
        Alert.alert('😢 Game Over', `The word was: ${gameState.targetWord}`, [
          { text: 'Play Again', onPress: startNewGame },
        ]);
      }, 500);
    }
  };

  const handleMicPress = () => {
    startListening();
  };

  const getLetterStyle = (state: LetterState) => {
    switch (state) {
      case 'correct':
        return styles.letterCorrect;
      case 'present':
        return styles.letterPresent;
      case 'absent':
        return styles.letterAbsent;
      default:
        return styles.letterEmpty;
    }
  };

  if (!gameState) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>SHOUTDLE</Text>
        <TouchableOpacity onPress={() => setShowHelp(true)} style={styles.helpButton}>
          <Text style={styles.helpButtonText}>?</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Game Board */}
        <View style={styles.board}>
          {gameState.guesses.map((guess, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {guess.map((letter, colIndex) => (
                <View
                  key={colIndex}
                  style={[styles.letter, getLetterStyle(letter.state)]}
                >
                  <Text style={styles.letterText}>{letter.char}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        {/* Status */}
        {gameState.gameStatus === 'playing' && (
          <Text style={styles.status}>
            Guess {gameState.currentGuess + 1} of {MAX_GUESSES}
          </Text>
        )}

        {/* Microphone Button */}
        <TouchableOpacity
          style={[styles.micButton, isListening && styles.micButtonActive]}
          onPress={handleMicPress}
          disabled={gameState.gameStatus !== 'playing' || isListening}
        >
          <Text style={styles.micButtonText}>
            {isListening ? '🎤 Listening...' : '🎤 Tap to Speak'}
          </Text>
        </TouchableOpacity>

        {/* New Game Button */}
        <TouchableOpacity style={styles.newGameButton} onPress={startNewGame}>
          <Text style={styles.newGameButtonText}>New Game</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Help Modal */}
      <Modal visible={showHelp} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>How to Play SHOUTDLE</Text>
            <Text style={styles.modalText}>
              🎯 Guess the 5-letter word in 6 tries{'\n\n'}
              🎤 Tap the microphone button and say your guess{'\n\n'}
              🟩 Green = Correct letter in correct position{'\n\n'}
              🟨 Yellow = Correct letter in wrong position{'\n\n'}
              ⬜ Gray = Letter not in word{'\n\n'}
              💡 Make sure to allow microphone access
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowHelp(false)}
            >
              <Text style={styles.closeButtonText}>Got it!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#d3d6da',
    position: 'relative',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
    letterSpacing: 2,
  },
  helpButton: {
    position: 'absolute',
    right: 20,
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  helpButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  board: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  letter: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: '#d3d6da',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
  letterText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },
  letterEmpty: {
    backgroundColor: '#fff',
  },
  letterAbsent: {
    backgroundColor: '#787c7e',
    borderColor: '#787c7e',
  },
  letterPresent: {
    backgroundColor: '#c9b458',
    borderColor: '#c9b458',
  },
  letterCorrect: {
    backgroundColor: '#6aaa64',
    borderColor: '#6aaa64',
  },
  status: {
    fontSize: 18,
    marginBottom: 20,
    color: '#666',
  },
  micButton: {
    backgroundColor: '#6aaa64',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 10,
    minWidth: 200,
    alignItems: 'center',
  },
  micButtonActive: {
    backgroundColor: '#c9b458',
  },
  micButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  newGameButton: {
    backgroundColor: '#787c7e',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
  },
  newGameButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 10,
    width: '80%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#6aaa64',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
