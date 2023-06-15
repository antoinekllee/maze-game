import React, { useState, useEffect } from "react";
import "./App.css";
import Quiz from "./components/Quiz";

const Maze = ({ maze, player, checkpointVisible }) => (
    <div className="maze">
        {maze.map((row, y) => (
            <div key={y} className="row">
                {row.map((cell, x) => {
                    let cellClass;
                    if (cell === 1) cellClass = "wall";
                    else if (cell === 0) cellClass = "path";
                    else if (cell === 2) cellClass = "quiz";
                    else if (cell === 3) cellClass = checkpointVisible ? "checkpoint" : "path";

                    return (
                        <div
                            key={x}
                            className={`cell ${cellClass} ${
                                player.x === x && player.y === y ? "player" : ""
                            }`}
                        ></div>
                    );
                })}
            </div>
        ))}
    </div>
);

const App = () => {
    const [maze, setMaze] = useState([
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1],
        [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
        [1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
        [1, 2, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 1, 2, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
      ]);
    const [player, setPlayer] = useState({ x: 7, y: 23 });
    const quizzes = ({
        "1,7": {
            question: "While the ease of doing business has improved, Timor-Leste remains a _ _ _ _ _ investment destination.",
            answer: "risky",
        },
        "9,23": {
            question: "Challenges included limited access to _ _ _ materials and the need for further investment.",
            answer: "raw",
        },
    });
    const [quizActive, setQuizActive] = useState(false);
    const [currentQuiz, setCurrentQuiz] = useState(null);
    const [canMove, setCanMove] = useState(true);

    const totalQuizzes = Object.keys(quizzes).length; // Track the total number of quizzes
    const [completedQuizzes, setCompletedQuizzes] = useState(0); // State to track the number of completed quizzes

    const handleKeyDown = (event) => {
        if (!canMove) return;

        let newPlayer = { ...player };

        if (event.key === "ArrowUp") newPlayer.y--;
        else if (event.key === "ArrowDown") newPlayer.y++;
        else if (event.key === "ArrowLeft") newPlayer.x--;
        else if (event.key === "ArrowRight") newPlayer.x++;

        if (maze[newPlayer.y][newPlayer.x] !== 1) setPlayer(newPlayer);

        if (maze[newPlayer.y][newPlayer.x] === 2) {
            const quiz = quizzes[`${newPlayer.x},${newPlayer.y}`];
            if (quiz) {
                setCurrentQuiz(quiz);
                setQuizActive(true);
                setCanMove(false);
            }
        }

        console.log(newPlayer.x, newPlayer.y);
    };

    const handleQuizSubmit = (isCorrect) => {
        if (isCorrect) {
            const newMaze = maze.map(row => [...row]);
            newMaze[player.y][player.x] = 0;
            setMaze(newMaze);
            setQuizActive(false);
            setCanMove(true);
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [player, canMove]);

    return (
        <div className="main-container">
            <h1 className="title">Timor-Leste Investigation</h1>
            <div className="content">
                <Maze maze={maze} player={player} checkpointVisible={completedQuizzes === totalQuizzes} />
                {quizActive && currentQuiz && (
                    <Quiz 
                        question={currentQuiz.question} 
                        correctAnswer={currentQuiz.answer} 
                        onSubmit={handleQuizSubmit} 
                    />
                )}
            </div>
        </div>
    );
};

export default App;