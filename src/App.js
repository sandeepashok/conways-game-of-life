import { useState } from "react";
import "./styles.css";
import { FaPlay, FaStop, FaHandshakeAngle } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { RiShareForwardFill } from "react-icons/ri";
import { GiNinjaHeroicStance, GiStarfighter, GiSentryGun, GiVillage } from "react-icons/gi";
import { getDefaultMatrix, getUpdatedMatrix, getGliderMatrix, getTwoWorriorsMatrix, getGreateDefenceMatrix, getTruceMatrix, generateMatrix, getPeaceMatrix } from "./actions";
import useInterval from "@use-it/interval";

export default function App() {
  const [matrix, setMatrix] = useState(getDefaultMatrix());
  const [isRunning, setIsRunning] = useState(false);

  const handleCellClick = (i, j) => {
    console.log(`matrix[${i}][${j}] = true;`)
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

  const handleGlider = () => {
    setMatrix(getGliderMatrix());
  }

  const handleWar = () => {
    setMatrix(getTwoWorriorsMatrix());
  }

  const handleDefence = () => {
    setMatrix(getGreateDefenceMatrix());
  }

  const handleTruce = () => {
    setMatrix(getTruceMatrix());
  }

  const handlePeace = () => {
    setMatrix(getPeaceMatrix());
  }

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
        <button className="controls-small" onClick={handleReset}>
          <ImCross />
          reset
        </button>
        {isRunning ? (
          <button className="controls" onClick={handleStart}>
            <FaStop />
            stop
          </button>
        ) : (
          <button className="controls" onClick={handleStart}>
            <FaPlay />
            start
          </button>
        )}
        <button className="controls-small" onClick={handleNext}>
          <RiShareForwardFill />
          next
        </button>
      </div>
      <div className="button-group2">
        <button className="category-button" onClick={handleGlider}>
          <GiStarfighter />
          glider
        </button>
        <button className="category-button" onClick={handleWar}>
          <GiNinjaHeroicStance />
          war-zone
        </button>
        <button className="category-button" onClick={handleDefence}>
          <GiSentryGun />
          defence
        </button>
        <button className="category-button" onClick={handleTruce}>
          <FaHandshakeAngle />
          truce
        </button>
        <button className="category-button" onClick={handlePeace}>
          <GiVillage />
          peace
        </button>
      </div>
    </div>
  );
}
