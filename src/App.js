import { useState } from "react";
import "./styles.css";
import { FaPlay, FaStop } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { RiShareForwardFill } from "react-icons/ri";
import { getDefaultMatrix, getUpdatedMatrix } from "./actions";
import useInterval from "@use-it/interval";

export default function App() {
  const [matrix, setMatrix] = useState(getDefaultMatrix());
  const [isRunning, setIsRunning] = useState(false);

  const handleCellClick = (i, j) => {
    let matrixCopy = [...matrix];
    matrix[i][j] = !matrix[i][j];
    setMatrix(matrixCopy);
  };

  const handleNext = () => {
    setMatrix((matrix) => getUpdatedMatrix(matrix));
  };

  const handleStart = () => {
    setIsRunning((isRunning) => !isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setMatrix(getDefaultMatrix());
  };

  useInterval(
    () => {
      isRunning ? handleNext() : null;
    },
    isRunning ? 500 : null
  );

  return (
    <div className="App">
      <h1 className="heading">Conway's Game Of Life</h1>
      <div className="game-container">
        {matrix.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, cellIndex) => (
              <div
                key={cellIndex}
                className={cell ? "cell alive-cell" : "cell"}
                onClick={() => handleCellClick(rowIndex, cellIndex)}
              ></div>
            ))}
          </div>
        ))}
      </div>
      <div className="button-group">
        <button className="medium-button" onClick={handleReset}>
          <ImCross />
          reset
        </button>
        {isRunning ? (
          <button className="large-button" onClick={handleStart}>
            <FaStop />
            stop
          </button>
        ) : (
          <button className="large-button" onClick={handleStart}>
            <FaPlay />
            start
          </button>
        )}
        <button className="medium-button" onClick={handleNext}>
          <RiShareForwardFill />
          next
        </button>
      </div>
    </div>
  );
}
