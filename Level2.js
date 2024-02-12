
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';

const WhackAMole = ({ onGoHome }) => {
    const [moles, setMoles] = useState([
        { id: 0, color: 'yellow' },
        { id: 1, color: 'yellow' },
        { id: 2, color: 'yellow' },
        { id: 3, color: 'yellow' },
        { id: 4, color: 'yellow' },
        { id: 5, color: 'yellow' },
        { id: 6, color: 'yellow' },
        { id: 7, color: 'yellow' },
        { id: 8, color: 'yellow' },
    ]);

    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(4);
    const [timeLeft, setTimeLeft] = useState(20);
    const [gameStatus, setGameStatus] = useState(null);
    const [gameInterval, setGameInterval] = useState(null);
    const [gameInProgress, setGameInProgress] = useState(true);

    const startGame = () => {
        setMoles([
            { id: 0, color: getRandomMoleColor() },
            { id: 1, color: getRandomMoleColor() },
            { id: 2, color: getRandomMoleColor() },
            { id: 3, color: getRandomMoleColor() },
            { id: 4, color: getRandomMoleColor() },
            { id: 5, color: getRandomMoleColor() },
            { id: 6, color: getRandomMoleColor() },
            { id: 7, color: getRandomMoleColor() },
            { id: 8, color: getRandomMoleColor() },
        ]);
        setScore(0);
        setLives(4);
        setTimeLeft(20);
        setGameStatus(null);
        setGameInProgress(true);
    };

    const getRandomMoleColor = () => {
        
        return Math.random() < 0.6 ? 'green' : 'black';
    };

    useEffect(() => {
        setGameInterval(
            setInterval(() => {
                const randomIndex = Math.floor(Math.random() * 9);

                setMoles((prevMoles) => {
                    const newMoles = [...prevMoles];
                    if (newMoles[randomIndex].color === 'green') {
                        
                        setLives((prevLives) => (prevLives > 0 ? prevLives - 1 : 0));
                    }
                    newMoles[randomIndex].color =
                        newMoles[randomIndex].color === 'yellow' ? 'green' : 'yellow';
                    return newMoles;
                });

                setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
            }, 1000)
        );

        const endGameTimeout = setTimeout(() => {
            clearInterval(gameInterval);

            if (score >= 12 && lives > 0) {
                setGameStatus('win');
            } else {
                setGameStatus('lose');
            }

            setGameInProgress(false);
        }, 20000);

        return () => {
            clearInterval(gameInterval);
            clearTimeout(endGameTimeout);
        };
    }, [score, lives, gameInProgress]);

    const handleMoleClick = (id) => {
        if (timeLeft > 0 && gameInProgress) {
            setMoles((prevMoles) => {
                const newMoles = [...prevMoles];
                const mole = newMoles.find((m) => m.id === id);

                if (mole.color === 'green') {
                    mole.color = 'yellow';
                    setScore((prevScore) => prevScore + 1);
                } else if (mole.color === 'black') {
                    setLives((prevLives) => (prevLives > 0 ? prevLives - 1 : 0));
                } else if (mole.color === 'yellow') {
                    setLives((prevLives) => (prevLives > 0 ? prevLives - 1 : 0));
                }

                return newMoles;
            });
        }
    };

    useEffect(() => {
        if (timeLeft === 0 || lives === 0) {
            clearInterval(gameInterval);



            if (score >= 12 && lives > 0) {
                setGameStatus('win');
            } else {
                setGameStatus('lose');
            }

            setGameInProgress(false);
        }
    }, [timeLeft, gameInterval, score, lives, gameInProgress]);

    return (
        <View style={styles.container}>
            {gameInProgress ? (
                <View>
                    <View style={styles.counterContainer}>
                        <Text style={styles.counter}>Score: {score}</Text>
                        <Text style={styles.lives}>Lives: {lives}</Text>
                    </View>
                    <View style={styles.gridContainer}>
                        {moles.map((mole) => (
                            <TouchableOpacity
                                key={mole.id}
                                onPress={() => handleMoleClick(mole.id)}
                                style={[styles.mole, { backgroundColor: mole.color }]}
                            />
                        ))}
                    </View>
                    <Text style={styles.timer}>Time left: {timeLeft}s</Text>
                </View>
            ) : (
                <View>
                    <Text style={styles.resultText}>
                        {gameStatus === 'win' ? 'Congratulations! You Win!' : 'Sorry, You Lose!'}
                    </Text>
                    <Text style={styles.infoText}>Score: {score}</Text>
                    <Text style={styles.infoText}>Lives Left: {lives}</Text>
                    <TouchableOpacity style={styles.button} onPress={startGame}>
                        <Text style={styles.buttonText}>Start Round Again</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={onGoHome}>
                        <Text style={styles.buttonText}>Go to Home Screen</Text>
                    </TouchableOpacity>
                </View>
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
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    mole: {
        width: 100,
        height: 100,
        borderRadius: 50,
        margin: 10,
    },
    counterContainer: {
        marginBottom: 20,
    },
    counter: {
        fontSize: 18,
    },
    lives: {
        fontSize: 18,
        marginTop: 10,
    },
    timer: {
        fontSize: 18,
    },
    resultText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    infoText: {
        fontSize: 18,
        marginBottom: 5,
    },
    button: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
        margin: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default WhackAMole;
