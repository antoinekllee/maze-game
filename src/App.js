import React, { useState, useEffect } from "react";
import "./App.css";
import { MdBalcony, MdDoorFront, MdFlag, MdLock } from 'react-icons/md';
import Quiz from "./components/Quiz";

const Maze = ({ maze, player, finish, checkpointVisible, currentQuiz, handleQuizSubmit }) => (
  <div className="maze">
    {maze.map((row, y) => (
      <div key={y} className="row">
        {row.map((cell, x) => {
          let cellClass;
          let cellContent;
          if (cell === 1) cellClass = "wall";
          else if (cell === 0) cellClass = "path";
          else if (cell === 2){ cellClass = "quiz"; cellContent = <MdLock className="lock-icon" />;}
          else if (cell === 3)
            {cellClass = checkpointVisible ? "pass" : "fail";}
          else if (cell == 4){cellContent = finish ? <MdFlag className="flag-icon" /> : null;}

          const isQuizVisible =
            currentQuiz && player.x === x && player.y === y;


          return (
            <div
              key={x}
              className={`cell ${cellClass} ${
                cell === 0 && player.x === x && player.y === y ? "player" : ""
              }`}
            >
              {isQuizVisible && (
                <Quiz
                  question={currentQuiz.question}
                  correctAnswer={currentQuiz.correctAnswer}
                  onSubmit={handleQuizSubmit}
                />
              )}
              {cellContent}
            </div>
          );
        })}
      </div>
    ))}
  </div>
);

const App = () => {
    const [maze, setMaze] = useState([
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1],
        [1, 0, 1, 0, 0, 0, 1, 0, 1, 4, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1],
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
        [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 3, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
      ]);

  const [player, setPlayer] = useState({ x: 7, y: 23 });
  const [completedQuizzes, setCompletedQuizzes] = useState(0);
  const totalQuizzes = 5;

  const [quizzes] = useState({
    "1,7": {
        question: "While the ease of doing business has improved, Timor-Leste remains a _ _ _ _ _ investment destination.",
        answer: "risky",
    },
    "7,13": {
        question: "Challenges included limited access to _ _ _ materials and the need for further investment.",
        answer: "raw",
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
  const [directions, setDirections] = useState([]);
  const [val, setVal] = useState(false);
  const [showDiv, setShowDiv] = useState(false);
  const [final, setFinal] = useState(false);

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
      if (quiz){
        setCurrentQuiz(quiz);
        setQuizActive(true);
        setCanMove(false);
      }
    }

    const toggleDiv = () => {
        setShowDiv(!showDiv);
      };

    if (maze[newPlayer.y][newPlayer.x] === 3) {
        if (completedQuizzes === totalQuizzes){
            setVal(true);
            setFinal(true);
      } else {
        setPlayer({ x: 7, y: 23 });
      }
    }

    if (completedQuizzes === totalQuizzes && val) {
        if (event.key === "ArrowUp" && directions[directions.length - 1] != 'UP') setDirections((prevDirections) => [...prevDirections, "UP"]);
        else if (event.key === "ArrowLeft" && directions[directions.length - 1] != 'LEFT') setDirections((prevDirections) => [...prevDirections, "LEFT"]);
        else if (event.key === "ArrowRight" && directions[directions.length - 1] != 'RIGHT') setDirections((prevDirections) => [...prevDirections, "RIGHT"]);
    }

      if (maze[newPlayer.y][newPlayer.x] === 4) {
        // Player reached the cell with value 4
        setCanMove(false);
      }
    };


   const handleQuizSubmit = (isCorrect) => {
    if (isCorrect) {
      setCompletedQuizzes((prevCount) => prevCount + 1);
      const newMaze = maze.map((row) => [...row]);
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

            <Maze maze={maze} player={player} finish={final} checkpointVisible={completedQuizzes === totalQuizzes} />
            {quizActive && currentQuiz && (
                 <div className="slide-in-bottom">
                    <Quiz
                    question={currentQuiz.question}
                    correctAnswer={currentQuiz.answer}
                    onSubmit={handleQuizSubmit}
                    />
                </div>
            )}
        </div>
        <div className="directions">
            <p>{directions.join(' ')}</p>
        </div>
    </div>
);
};

export default App;
