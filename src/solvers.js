/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
// time complexity: O(n)
window.findNRooksSolution = function(n) {
  var solution = new Board({n: n});

  var rowIndex = 0;
  var colIndex = 0;
  while (solution.get(rowIndex) !== undefined && solution.get(rowIndex)[colIndex] !== undefined) {
    solution.togglePiece(rowIndex, colIndex);
    rowIndex ++;
    colIndex ++;
  }

  solution = solution.rows();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
// time complexity: O(n^4)
window.countNRooksSolutions = function(n) {
  var board = new Board ({n: n});
  var solutionCount = 0;
  var rowIndex = 0;
  var colSize = n;

  var innerFunc = function(nRooks) {
    // BASE CASE
    if (nRooks === 0) {
      solutionCount ++;
      rowIndex --;
      return;
    }

    // RECURSIVE CASE
    if (nRooks > 0) {
      for (var i = 0; i < colSize; i++) {
        board.togglePiece(rowIndex, i);

        if (!board.hasAnyRooksConflicts()) {
          rowIndex++;
          innerFunc(nRooks - 1);
          board.togglePiece(rowIndex, i);
        } else {
          board.togglePiece(rowIndex, i);
        }
      }
    }

    rowIndex --;
    return;
  };

  innerFunc(n);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
// time complexity: O(n^5)
window.findNQueensSolution = function(n) {
  var solution = new Board({n: n});

  if (n === 0) {
    return solution.rows();
  }

  var occupiedColArr = [];
  var innerFunc = function (nQueens) {
    // BASE CASE
    if (nQueens < 0) {
      solutionMatrix = new Board(solution.rows());
      return;
    }

    // RECURSIVE CASE
    for (var i = 0; i < n; i ++) {
      if (occupiedColArr.includes(i)) {
        continue;
      } else {
        solution.togglePiece(nQueens, i);
      }

      if (solution.hasAnyQueensConflicts()) {
        solution.togglePiece(nQueens, i);
        continue;
      } else {
        occupiedColArr.push(i);
        innerFunc(nQueens - 1);
        if (occupiedColArr.length === n) {
          break;
        }
        solution.togglePiece(nQueens, i);
        occupiedColArr.pop();
      }
    }
    // return
    return;
  };
  innerFunc(n - 1);

  solution = solution.rows();
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
// time complexity: O(n^5)
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board ({n: n});
  var occupiedColArr = [];

  var innerFunc = function(nQueens) {
    // BASE CASE
    if (nQueens < 0) {
      solutionCount ++;
      return;
    }

    // RECURSIVE CASE
    if (nQueens >= 0) {
      for (var i = 0; i < n; i++) {
        if (occupiedColArr.includes(i)) {
          continue;
        } else {
          board.togglePiece(nQueens, i);
        }

        if (!board.hasAnyQueensConflicts()) {
          occupiedColArr.push(i);
          innerFunc(nQueens - 1);
          board.togglePiece(nQueens, i);
          occupiedColArr.pop();
        } else {
          board.togglePiece(nQueens, i);
        }
      }
    }

    return;
  };

  innerFunc(n - 1);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
