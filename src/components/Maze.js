const Maze = ({ maze, player, checkpointVisible, showInstructions }) => (
    <div className="maze">
        {maze.map((row, y) => (
            <div key={y} className="row">
                {row.map((cell, x) => {
                    let cellClass;
                    if (cell === 1) cellClass = "wall";
                    else if (cell === 0) cellClass = "path";
                    else if (cell === 2) cellClass = "quiz";
                    else if (cell === 3) cellClass = checkpointVisible ? "checkpoint" : "path";
                    else if (cell === 4) cellClass = showInstructions ? "path" : "gate";

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

export default Maze;