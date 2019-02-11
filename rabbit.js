/**
 * function that accepts an array and returns the middle index and its value
 * in the case of an even array, the middle is the highest value of the two
 * @param arr
 * @returns {{index: number, value: *}}
 */

function getMiddleCol (arr = []) {
  const _arr = arr;
  if (_arr.length % 2 === 0) {
    //even length array; "middle" comprises 2 indices
    const firstMidIndex = Math.floor(_arr.length / 2) - 1;
    const secondMidIndex = Math.floor(_arr.length / 2);
    //return the index with the largest value
    return {
      index: _arr[firstMidIndex] > _arr [secondMidIndex] ? firstMidIndex: secondMidIndex,
      value: _arr[firstMidIndex] > _arr [secondMidIndex] ? _arr[firstMidIndex]: _arr [secondMidIndex]
    };
  } else {
    return {
      index: Math.floor(_arr.length / 2),
      value: _arr[Math.floor(_arr.length / 2)]
    };
  }
}

/**
 * function that accepts a matrix and returns the center.
 * in the case of an even number array, the center is the coordinates with the highest value
 * @param matrix
 * @returns {{value: *, coords: number[]}}
 */
function getCenter (matrix = [[]]) {
  //empty matrix
  if (matrix.length === 0) {
    return
  }

  // Single row matrix
  if (matrix.length === 1) {
    return {
      coords: [0, getMiddleCol(matrix[0]).index],
      value: matrix[0][getMiddleCol(matrix[0]).index]
    }
  }

  // Even row num
  if (Math.floor(matrix.length % 2) === 0) {
    const centerRow1 = Math.floor(matrix.length / 2) -1;
    const centerRow2 = Math.floor(matrix.length / 2);
    const centerRow = getMiddleCol(matrix[centerRow1]).value > getMiddleCol(matrix[centerRow2]).value ? centerRow1: centerRow2;
    return {
      coords: [centerRow, getMiddleCol(matrix[centerRow]).index],
      value: matrix[centerRow][getMiddleCol(matrix[centerRow]).index]
    }
  }

  // Odd row numbers
  const centerRow = Math.floor(matrix.length / 2);
  return {
    coords: [centerRow, getMiddleCol(matrix[centerRow]).index],
    value: matrix[centerRow][getMiddleCol(matrix[centerRow]).index]
  }
}

/**
 * function that takes the current position in the matrix and returns the coordinates
 * of the next position with the highest value
 * @param matrix
 * @param current
 * @param total
 * @returns {*}
 */
function getCarrots (matrix = [[]], current = [], total = 0) {
  let [r, c] = current;
  let maxValue = 0;
  if (!total) {
    [r, c] = getCenter(matrix).coords;
    total = getCenter(matrix).value;
    matrix[getCenter(matrix).coords[0]][getCenter(matrix).coords[1]] = 0;
  }

  let totalValue = total;
  let adjacent = [
    [r-1, c],
    [r, c+1],
    [r+1, c],
    [r, c-1]
  ];

  /**
   * Helper function to ensure that coordinates do not exceed the size of the matrix
   * @param x
   * @param y
   * @returns {boolean}
   */
  function withinBounds([x, y]) {
    return (x >= 0 && x < matrix.length && y >= 0 && y < matrix[0].length);
  }
  // filter out adjacent cells that are not within the matrix
  let neighbours = adjacent.filter(withinBounds);
  let next = null;

  /**
   * Helper function to find the maximum value given coordinate
   * @param coord
   */
  function findMax (coord) {
    const [x, y] = coord;
    if (matrix[x][y] > maxValue) {
      maxValue = matrix[x][y];
      next = [x, y];
    }
  }
  // return neighbour with maximum value
  neighbours.forEach(findMax);

  if (next) {
    // if coordinates exist, add it's value to running total then zero out so that it's not added again
    if (matrix[next[0]][next[1]] > 0) {
      total += matrix[next[0]][next[1]];
      matrix[next[0]][next[1]] = 0;
      return getCarrots(matrix, next, total);
    }
  }
  return totalValue;

}




console.log(getCarrots([[1, 4, 3, 5,], [2, 4, 7, 0], [1, 1, 1, 1]]))
