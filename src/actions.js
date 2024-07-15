const generateMatrix = () => {
  return Array.from({ length: 30 }, () =>
    Array.from({ length: 30 }, () => false),
  );
};

export const getDefaultMatrix = () => {
  let matrix = generateMatrix();

  matrix[11][5] = true;
  matrix[12][5] = true;
  matrix[13][5] = true;
  matrix[14][5] = true;
  matrix[15][5] = true;
  matrix[15][6] = true;
  matrix[15][7] = true;
  matrix[11][9] = true;
  matrix[12][9] = true;
  matrix[13][9] = true;
  matrix[14][9] = true;
  matrix[15][9] = true;
  matrix[15][10] = true;
  matrix[15][11] = true;
  matrix[14][11] = true;
  matrix[13][11] = true;
  matrix[12][11] = true;
  matrix[11][11] = true;
  matrix[11][13] = true;
  matrix[12][13] = true;
  matrix[13][13] = true;
  matrix[14][13] = true;
  matrix[15][13] = true;
  matrix[11][14] = true;
  matrix[11][15] = true;
  matrix[13][14] = true;
  matrix[13][15] = true;
  matrix[11][17] = true;
  matrix[12][17] = true;
  matrix[13][17] = true;
  matrix[14][17] = true;
  matrix[15][17] = true;
  matrix[11][18] = true;
  matrix[11][19] = true;
  matrix[13][18] = true;
  matrix[13][19] = true;
  matrix[11][21] = true;
  matrix[12][21] = true;
  matrix[13][21] = true;
  matrix[13][22] = true;
  matrix[11][23] = true;
  matrix[12][23] = true;
  matrix[13][23] = true;
  matrix[14][23] = true;
  matrix[15][23] = true;
  matrix[15][22] = true;
  matrix[15][21] = true;
  return matrix;
};

export const getUpdatedMatrix = (prevMatrix) => {
  const updatedMatrix = generateMatrix();

  prevMatrix.forEach((currRow, i) => {
    currRow.forEach((cell, j) => {
      const neighbouringCells = [
        [i, j - 1],
        [i, j + 1],
        [i - 1, j],
        [i + 1, j],
        [i - 1, j - 1],
        [i - 1, j + 1],
        [i + 1, j - 1],
        [i + 1, j + 1],
      ];

      let totalNeighboursAlive = 0;

      neighbouringCells.forEach((cellNum) => {
        const [row, cell] = cellNum;
        prevMatrix[row] && prevMatrix[row][cell]
          ? totalNeighboursAlive++
          : null;
      });

      cell
        ? totalNeighboursAlive === 2 || totalNeighboursAlive === 3
          ? (updatedMatrix[i][j] = true)
          : (updatedMatrix[i][j] = false)
        : totalNeighboursAlive === 3
          ? (updatedMatrix[i][j] = true)
          : null;
    });
  });
  return updatedMatrix;
};
