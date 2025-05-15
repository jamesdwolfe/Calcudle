import React, { useState } from "react";
import { Button } from "./components/Button";
import PUZZLES from "./data/puzzles.json";

// Constants
const OPERATORS = ["+", "-", "*", "/", "=", "^", "!", "<", ">"];
const PLACEHOLDER = " ";

// Utility Functions
const getRandomPuzzle = () => PUZZLES[Math.floor(Math.random() * PUZZLES.length)];

const getFeedback = (guess, solution) => {
    const feedback = Array(guess.length).fill("not-in-solution");
    const usedSolutionIndices = new Set();

    for (let i = 0; i < guess.length; i++) {
        if (guess[i] === solution[i]) {
            feedback[i] = "correct";
            usedSolutionIndices.add(i);
        }
    }

    for (let i = 0; i < guess.length; i++) {
        if (feedback[i] === "correct") continue;

        for (let j = 0; j < solution.length; j++) {
            if (!usedSolutionIndices.has(j) && guess[i] === solution[j] && guess[j] !== solution[j]) {
                feedback[i] = "misplaced";
                usedSolutionIndices.add(j);
                break;
            }
        }
    }

    return feedback;
};

const getKeyStatuses = (attempts, feedback) => {
    const priority = { correct: 3, misplaced: 2, "not-in-solution": 1 };
    const keyStatuses = {};

    for (let i = 0; i < attempts.length; i++) {
        for (let j = 0; j < attempts[i].length; j++) {
            const char = attempts[i][j];
            const stat = feedback[i][j];

            if (!OPERATORS.includes(char)) {
                if (!keyStatuses[char] || priority[stat] > priority[keyStatuses[char]]) {
                    keyStatuses[char] = stat;
                }
            }
        }
    }

    return keyStatuses;
};

const Tile = ({ char, status, isOperator }) => {
    const baseStyle = "w-10 h-10 m-1 flex items-center justify-center text-xl font-bold rounded";

    let tileStyle;

    if (isOperator) {
        tileStyle = "bg-blue-500 text-white";
    } else {
        switch (status) {
            case "correct":
                tileStyle = "bg-green-500 text-white";
                break;
            case "misplaced":
                tileStyle = "bg-yellow-500 text-white";
                break;
            case "not-in-solution":
                tileStyle = "bg-gray-300 text-white";
                break;
            default:
                tileStyle = "bg-gray-200 text-black";
        }
    }

    return (
        <div className={`${baseStyle} ${tileStyle}`}>
            {char}
        </div>
    );
};

export default function Game() {
    const [puzzle, setPuzzle] = useState(getRandomPuzzle);
    const { expression, solution } = puzzle;

    const [attempts, setAttempts] = useState([]);
    const [feedback, setFeedback] = useState([]);
    const [currentInput, setCurrentInput] = useState("");
    const [gameOver, setGameOver] = useState(false);

    const digitsNeeded = solution.filter(char => !OPERATORS.includes(char)).length;
    const maxAttempts = digitsNeeded + 2;

    const handleSubmit = () => {
        if (currentInput.length !== digitsNeeded) return;

        let inputArr = [];
        let inputIdx = 0;

        for (let char of expression) {
            inputArr.push(OPERATORS.includes(char) ? char : currentInput[inputIdx++]);
        }

        const currentFeedback = getFeedback(inputArr, solution);
        const newAttempts = [...attempts, inputArr];
        const newFeedback = [...feedback, currentFeedback];

        setAttempts(newAttempts);
        setFeedback(newFeedback);
        setCurrentInput("");

        const isSolved = inputArr.join("") === solution.join("");
        const hasMoreTries = newAttempts.length < maxAttempts;

        setGameOver(isSolved || !hasMoreTries);
    };

    const handleNewGame = () => {
        const newPuzzle = getRandomPuzzle();
        setPuzzle(newPuzzle);
        setAttempts([]);
        setFeedback([]);
        setCurrentInput("");
        setGameOver(false);
    };

    const handleAddDigit = digit => {
        if (!gameOver && currentInput.length < digitsNeeded) {
            setCurrentInput(currentInput + digit);
        }
    };

    const handleBackspace = () => {
        if (!gameOver) {
            setCurrentInput(currentInput.slice(0, -1));
        }
    };

    const keyStatuses = getKeyStatuses(attempts, feedback);

    return (
        <div className="max-w-lg mx-auto mt-10 p-4 text-white">
            <h1 className="text-3xl font-bold text-center mb-4">Calcudle</h1>

            <div className={`grid grid-rows-${maxAttempts} gap-2`}>
                {Array.from({ length: maxAttempts }).map((_, i) => (
                    <div key={i} className="flex justify-center">
                        {expression.map((char, j) => {
                            const isOperator = OPERATORS.includes(char);

                            let tileChar;
                            if (attempts[i]) {
                                tileChar = attempts[i][j];
                            } else if (i === attempts.length) {
                                const digitsBefore = expression
                                    .slice(0, j)
                                    .filter(c => !OPERATORS.includes(c)).length;
                                tileChar = isOperator ? char : currentInput[digitsBefore] || PLACEHOLDER;
                            } else {
                                tileChar = isOperator ? char : PLACEHOLDER;
                            }

                            const status = feedback[i]?.[j] || null;

                            return (
                                <Tile key={j} char={tileChar} status={status} isOperator={isOperator} />
                            );
                        })}
                    </div>
                ))}
            </div>

            {!gameOver && (
                <div className="mt-6 space-y-2 text-center">
                    {[...[0, 1, 2, 3, 4], ...[5, 6, 7, 8, 9]].reduce(
                        (rows, digit, i) => {
                            if (i < 5) rows[0].push(digit);
                            else rows[1].push(digit);
                            return rows;
                        },
                        [[], []]
                    ).map((row, i) => (
                        <div key={i} className="grid grid-cols-5 gap-2 justify-center">
                            {row.map(d => {
                                const status = keyStatuses[d];
                                let style = "bg-blue-600 hover:bg-blue-700 text-black";

                                if (status === "correct") style = "bg-green-500 hover:bg-green-600 text-white";
                                else if (status === "misplaced") style = "bg-yellow-500 hover:bg-yellow-600 text-white";
                                else if (status === "not-in-solution") style = "bg-gray-300 hover:bg-gray-300 text-white";

                                return (
                                    <Button
                                        key={d}
                                        onClick={() => handleAddDigit(d.toString())}
                                        className={style}
                                    >
                                        {d}
                                    </Button>
                                );
                            })}
                        </div>
                    ))}

                    <div className="grid grid-cols-3 gap-2 justify-center mt-2">
                        <Button onClick={handleBackspace} variant="secondary">⌫</Button>
                        <Button onClick={handleSubmit}>Submit</Button>
                        <Button onClick={handleNewGame} variant="secondary">⟳</Button>
                    </div>
                </div>
            )}

            {gameOver && (
                <div className="text-center mt-4">
                    <p className="text-lg font-semibold">
                        {attempts[attempts.length - 1].join("") === solution.join("")
                            ? "🎉 Correct!"
                            : `Game Over. Solution was ${solution.join("")}`}
                    </p>
                    <Button className="mt-2" onClick={handleNewGame}>New Game</Button>
                </div>
            )}
        </div>
    );
}
