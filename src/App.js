import React, { useState, useEffect } from "react";
import "./App.css"; // Import your CSS file to style the game

const Maze = ({ maze, player }) => (
    <div className="maze">
        {maze.map((row, y) => (
            <div key={y} className="row">
                {row.map((cell, x) => (
                    <div
                        key={x}
                        className={`cell ${cell ? "wall" : "path"} ${
                            player.x === x && player.y === y ? "player" : ""
                        }`}
                    ></div>
                ))}
            </div>
        ))}
    </div>
);

const App = () => {
    const [maze, setMaze] = useState([
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1],
        [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
        [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1]
    ]);

    const [player, setPlayer] = useState({ x: 5, y: 5 });

    const handleKeyDown = (event) => {
        switch (event.key) {
            case "ArrowUp":
                if (player.y - 1 >= 0 && maze[player.y - 1][player.x] === 0) {
                    console.log("UP");
                    setPlayer((prevState) => ({
                        ...prevState,
                        y: prevState.y - 1,
                    }));
                }
                break;
            case "ArrowDown":
                if (
                    player.y + 1 < maze.length &&
                    maze[player.y + 1][player.x] === 0
                ) {
                    console.log("DOWN");
                    setPlayer((prevState) => ({
                        ...prevState,
                        y: prevState.y + 1,
                    }));
                }
                break;
            case "ArrowLeft":
                if (player.x - 1 >= 0 && maze[player.y][player.x - 1] === 0) {
                    console.log("LEFT");
                    setPlayer((prevState) => ({
                        ...prevState,
                        x: prevState.x - 1,
                    }));
                }
                break;
            case "ArrowRight":
                if (
                    player.x + 1 < maze[0].length &&
                    maze[player.y][player.x + 1] === 0
                ) {
                    console.log("RIGHT");
                    setPlayer((prevState) => ({
                        ...prevState,
                        x: prevState.x + 1,
                    }));
                }
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [player, maze]);

    useEffect(() => {
        // assuming the finish point is {x: 9, y: 9}
        if (player.x === 9 && player.y === 9) {
            alert("You've reached the finish point!");
        }
    }, [player]);

    return <Maze maze={maze} player={player} />;
};

export default App;