import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Modal } from 'react-native';
import WhackAMole from './WhackAMole';
import Level2 from './Level2';
import Level3 from './Level3';

const GameScreen = ({ onStartGame }) => {
    const [currentLevel, setCurrentLevel] = useState(1);
    const [isModalVisible, setModalVisible] = useState(false);

    const startGame = () => {
        setCurrentLevel(1);
    };

    const startLevel = (level) => {
        setCurrentLevel(level);
    };

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const renderCurrentLevel = () => {
        switch (currentLevel) {
            case 1:
                return (
                    <View style={styles.container}>
                     
                        <Image
                            source={require('./assets/WAM-LOGO.jpg')}
                            style={styles.logo}
                        />
                        <Text style={styles.h1}>
                            Welcome to Whack-A-Mole!
                        </Text>
                        <Text style={styles.rules}>
                            "Discover the thrill: Read the rules, select your level, and let the enjoyment unfold!"
                        </Text>
                        
                        <TouchableOpacity onPress={toggleModal} style={styles.modalButton}>
                            <Text style={styles.buttonText}>Show Rules for each round</Text>
                        </TouchableOpacity>
                        
                        <Modal
                            animationType="slide"
                            transparent={false}
                            visible={isModalVisible}
                            onRequestClose={() => {
                                toggleModal();
                            }}
                        >
                            <View style={styles.modalContainer}>
                                <Text style={styles.modalText}>
                                    <Text style={styles.modalRule}>
                                        "Easy Round: Whack vibrant green moles, score above 10, and protect 5 lives in 20 seconds. Miss a green mole or hit black/yellow? Lose a life. Dodge those crafty black moles for victory!"
                                    </Text>
                                    {'\n\n'}
                                    <Text style={styles.modalRule}>
                                        "Moderate Round: Grab elusive green moles, aim for a score beyond 12, and guard 4 lives in a 20-second challenge. Miss a green mole or hit black/yellow? Lose a life. Navigate carefully to avoid crafty black moles for a win!"
                                    </Text>
                                    {'\n\n'}
                                    <Text style={styles.modalRule}>
                                        "Hard Round: Seize speedy green moles, target a score above 14, and defend 3 lives in a 20-second showdown. Miss a green mole or hit black/yellow? Lose a life. Navigate precisely to avoid cunning black moles for triumph!"
                                    </Text>
                                </Text>
                                <TouchableOpacity onPress={toggleModal} style={styles.modalButton}>
                                    <Text style={styles.buttonText}>Choose Level</Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>
                        <Text style={styles.levelH1}>
                            Choose Level
                        </Text>
                        <TouchableOpacity onPress={onStartGame} style={styles.startButton}>
                            <Text style={styles.buttonText}>Easy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => startLevel(2)} style={styles.startButton}>
                            <Text style={styles.buttonText}>Moderate</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => startLevel(3)} style={styles.startButton}>
                            <Text style={styles.buttonText}>Hard</Text>
                        </TouchableOpacity>
                        <Text style={styles.footer}>Made by Oleksandr Shakhov</Text>
                    </View>
                );
            case 2:
                return <Level2 onGoHome={() => setCurrentLevel(1)} />;
            case 3:
                return <Level3 onGoHome={() => setCurrentLevel(1)} />;
            default:
                return null;
        }
    };

    return renderCurrentLevel();
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    h1: {
        fontSize: 44,
        marginBottom: 20,
        textAlign: 'center',
    },
    rules: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
    startButton: {
        width: 200,
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',

    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
        color: 'black',
    },
    modalButton: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        margin: 10,
    },
    modalRule: {
        fontSize: 16,
    },
    footer: {
        marginTop:50,
    },
    levelH1: {
        fontSize: 30,
        margin: 20,
        textAlign: 'center',
    }
});

export default GameScreen;
