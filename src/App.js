import React, { useState, useEffect } from "react";
import "./App.css";

const sampleWordList = [
    {
        word: "KUBERNETES",
        description: "An open-source system for automating deployment, scaling, and management of containerized applications."
    },
    {
        word: "WORLD",
        description: "The planet we live on, which is full of land and water."
    },
    {
        word: "DEBUGGING",
        description: 
"The process of identifying and fixing errors in code to ensure a program works as intended."
    },
    {
        word: "FRONTEND",
        description: "The part of a website or application that users interact with directly."
    },
    {
        word: "PROGRAMMING",
        description: "The process of developing code to assist computers to perform tasks."
    },
    {
        word: "GITHUB",
        description: "A platform for version control and collaborative software development using Git."
    }
];

const getRandomWordData = () => {
    const randomIndex = Math.floor(Math.random() * sampleWordList.length);
    return sampleWordList[randomIndex];
};

const WordGuessGame = () => {
    const [currentWord, setCurrentWord] = useState(getRandomWordData());
    const [message, setMessage] = useState("");
    const [selectedChars, setSelectedChars] = useState([]);
    const [hintCount, setHintCount] = useState(3);
    const [revealWord, setRevealWord] = useState(false);
    const [gameOverFlag, setGameOverFlag] = useState(false);
    const [errorCount, setErrorCount] = useState(0);

    useEffect(() => {
        if (errorCount >= 3) {
            window.alert("Game Over! You made too many wrong guesses.");
            resetGame();
        }
    }, [errorCount]);

    const handleCharSelection = (char) => {
        if (!selectedChars.includes(char)) {
            setSelectedChars([...selectedChars, char]);
            if (!currentWord.word.includes(char)) {
                setErrorCount(errorCount + 1);
            }
        }
    };

    const useHint = () => {
        if (hintCount > 0) {
            const hiddenCharIndex = currentWord.word
                .split("")
                .findIndex((char) => !selectedChars.includes(char));
            setSelectedChars([...selectedChars, currentWord.word[hiddenCharIndex]]);
            setHintCount(hintCount - 1);
        }
    };

    const removeLastChar = () => {
        setSelectedChars(selectedChars.slice(0, -1));
    };

    const renderCharButtons = () => {
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        return Array.from(alphabet).map((char, index) => (
            <button
                key={index}
                onClick={() => handleCharSelection(char)}
                disabled={selectedChars.includes(char)}
                className={`char-btn ${
                    selectedChars.includes(char) ? "selected" : ""
                }`}
            >
                {char}
            </button>
        ));
    };

    const isWordGuessed = () => {
        return currentWord.word.split("").every((char) => selectedChars.includes(char));
    };

    const checkGuess = () => {
        if (isWordGuessed()) {
            setMessage("Congratulations! You guessed the word!");
        } else {
            setMessage("Wrong Guess! Try again.");
            setRevealWord(true);
        }
    };

    const resetGame = () => {
        setCurrentWord(getRandomWordData());
        setMessage("");
        setSelectedChars([]);
        setHintCount(3);
        setRevealWord(false);
        setGameOverFlag(false);
        setErrorCount(0);
    };

    return (
        <div className="wrapper">
            <h1 className="title">Word Puzzle Game</h1>
            <div className="word-box">
                {Array.from(currentWord.word).map((char, index) => (
                    <div
                        key={index}
                        className={`character ${
                            selectedChars.includes(char) ? "visible" : ""
                        }`}
                    >
                        {selectedChars.includes(char) ? char : ""}
                    </div>
                ))}
            </div>
            <p className="word-hint">Hint: {currentWord.description}</p>
            {message && (
                <div className="notification">
                    <p>{message}</p>
                    {revealWord && <p>Correct word was: {currentWord.word}</p>}
                </div>
            )}
            <div className="action-section">
                <div className="action-buttons">
                    <button
                        onClick={resetGame}
                        className="reset-btn"
                    >
                        Restart
                    </button>
                    <button
                        onClick={removeLastChar}
                        disabled={!selectedChars.length}
                        className="undo-btn"
                    >
                        Remove Letter
                    </button>
                </div>
                <div className="character-selection">
                    {renderCharButtons()}
                </div>
                <div className="hints-section">
                    Hints Remaining: {hintCount}{" "}
                    <button
                        onClick={useHint}
                        disabled={hintCount === 0}
                        className="hint-btn"
                    >
                        Use Hint
                    </button>
                </div>
            </div>
            <button
                className="check-btn"
                onClick={checkGuess}
                disabled={gameOverFlag}
            >
                Check Guess
            </button>
        </div>
    );
};

export default WordGuessGame;
