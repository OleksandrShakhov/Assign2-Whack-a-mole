import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import GameScreen from './GameScreen';
import WhackAMole from './WhackAMole';

const App = () => {
    const [gameStarted, setGameStarted] = useState(false);
    const [currentLevel, setCurrentLevel] = useState(1);

    const startGame = (level) => {
        setCurrentLevel(level);
        setGameStarted(true);
    };

    const goHome = () => {
        setGameStarted(false);
    };

    return (
        <View style={styles.container}>
            {!gameStarted ? (
                <GameScreen onStartGame={() => startGame(1)} onStartLevel={startGame} />
            ) : (
                <WhackAMole onGoHome={goHome} currentLevel={currentLevel} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default App;
