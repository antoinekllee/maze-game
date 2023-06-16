import React, { useState, useEffect } from "react";
import "./App.css";
import Quiz from "./components/Quiz";
import Maze from "./components/Maze";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

const slideVariants = {
    initial: { x: 0 },
    animate: { x: "-10%", transition: { duration: 0.2 } },
    exit: { x: 0, transition: { duration: 0.2, delay: 0.2 } },
};

const popUpVariants = {
    initial: { scale: 0, transition: { delay: 0.2, type: 'spring', stiffness: 70 } },
    animate: { scale: 1, transition: { delay: 0.2, type: 'spring', stiffness: 70 } },
    exit: { scale: 0, transition: { duration: 0.2, ease: "easeInOut" } },
};

const App = () => {
    const [maze, setMaze] = useState([
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1],
        [1, 0, 1, 0, 0, 0, 1, 0, 1, 3, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
        [1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
        [1, 2, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 2, 1, 0, 1, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 2, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 2, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 4, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
      ]);
    const [player, setPlayer] = useState({ x: 7, y: 23 });
    // const [player, setPlayer] = useState({ x: 18, y: 23 });
    const [quizzes] = useState({
        "1,7": {
            question: "While the ease of doing business has improved, Timor-Leste remains a _ _ _ _ _ investment destination.",
            answer: "risky",
        },
        "7,13": {
            question: "Challenges included limited access to _ _ _   _ _ _ _ _ _ _ _ _ and the need for further investment.",
            answer: "raw materials",
        },
        "5,1": {
            question: "Timor Vita provided essential nutrients to pregnant women, lactating mothers, and children under five, reducing _ _ _ _ _ _ _ _ _ _ _ _ rates",
            answer: "malnutrition",
        },
        "17,9": {
            question: "The partnership promoted local economic growth, _ _ _ _ _ _ _ _ _ _ opportunities, and improved food security",
            answer: "employment",
        },
        "21,11": {
            question: "Timor Global's production of Timor Vita has potential for _ _ _ _ _ _ _ _ _ _ _ _ _ _ but faces challenges in increasing production and reducing costs.",
            answer: "sustainability",
        },
    });
    const [quizActive, setQuizActive] = useState(false);
    const [currentQuiz, setCurrentQuiz] = useState(null);
    const [canMove, setCanMove] = useState(true);

    const totalQuizzes = Object.keys(quizzes).length; // Track the total number of quizzes
    const [completedQuizzes, setCompletedQuizzes] = useState(0); // State to track the number of completed quizzes
    // const [completedQuizzes, setCompletedQuizzes] = useState(4); // State to track the number of completed quizzes
    const [checkpointVisible, setCheckpointVisible] = useState(false); // State to track whether the checkpoint is visible
    const [showInstructions, setShowInstructions] = useState(false); // State to track whether the instructions are visible
    const [directions, setDirections] = useState([]);

    const handleKeyDown = (event) => {
        if (!canMove) return;

        let newPlayer = { ...player };

        if (event.key === "ArrowUp") newPlayer.y--;
        else if (event.key === "ArrowDown") newPlayer.y++;
        else if (event.key === "ArrowLeft") newPlayer.x--;
        else if (event.key === "ArrowRight") newPlayer.x++;

        if (maze[newPlayer.y][newPlayer.x] === 4) {
            if (completedQuizzes < totalQuizzes)
                return;
            else
            {
                setDirections([]);
                setShowInstructions(true);
            }
        }

        if (maze[newPlayer.y][newPlayer.x] !== 1) setPlayer(newPlayer);

        if (maze[newPlayer.y][newPlayer.x] === 2) {
            const quiz = quizzes[`${newPlayer.x},${newPlayer.y}`];
            if (quiz) {
                setCurrentQuiz(quiz);
                setQuizActive(true);
                setCanMove(false);
            }
        }

        if (setShowInstructions) 
        {
            if (event.key === "ArrowUp" && directions[directions.length - 1] !== 'UP') setDirections((prevDirections) => [...prevDirections, "UP"]);
            else if (event.key === "ArrowLeft" && directions[directions.length - 1] !== 'LEFT') setDirections((prevDirections) => [...prevDirections, "LEFT"]);
            else if (event.key === "ArrowRight" && directions[directions.length - 1] !== 'RIGHT') setDirections((prevDirections) => [...prevDirections, "RIGHT"]);
        }
    };

    const handleQuizSubmit = (isCorrect) => {
        if (isCorrect) {
            const newMaze = maze.map((row) => [...row]);
            newMaze[player.y][player.x] = 0;
            setMaze(newMaze);
            setQuizActive(false);
            setCanMove(true);
            setCompletedQuizzes(completedQuizzes + 1);

            if (completedQuizzes === totalQuizzes - 1) {
                setCheckpointVisible(true);
            }
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [player, canMove]);

    const reset = () => 
    {
        setPlayer ({ x: 16, y: 23 });   
        setDirections([]);
    }

    return (
        <div className="main-container">
            <h1 className="title">Timor-Leste Investigation</h1>
            <div className="content" style={{ display: 'flex', justifyContent: 'center' }}> {/* Add flexbox */}
                <AnimatePresence>
                    <motion.div
                        key="maze"
                        variants={slideVariants}
                        initial="initial"
                        animate={quizActive ? "animate" : "initial"} // Slide only when the quiz is active
                    >
                        <Maze maze={maze} player={player} checkpointVisible={checkpointVisible} showInstructions={showInstructions} />
                    </motion.div>

                    {quizActive && currentQuiz && (
                        <motion.div
                            key="quiz"
                            variants={popUpVariants}
                            initial="initial"
                            animate="animate"
                        >
                            <Quiz
                                question={currentQuiz.question}
                                correctAnswer={currentQuiz.answer}
                                onSubmit={handleQuizSubmit}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <p>{completedQuizzes}/{totalQuizzes} puzzles solved</p>
            { showInstructions && <div className="instructionsContainer">
                {/* <p>Pay attention to your directions!</p> */}
                <div className="directions">
                    <p>{directions.join (" ") }</p>
                </div>
                <button onClick={reset}>Reset</button>
            </div> }
            { !showInstructions && <div className="instructionsContainer">
                <p>Move using the arrow keys.</p>
            </div> }
        </div>
    );
};

export default App;