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
window.findNQueensSolution = function(n) {
  var solution = new Board({n: n});
  var nQueens = n;

  if (n === 0) {
    return solution.rows();
  }

  var rowIndex = 0;
  var colSize = n;

  var innerFunc = function(nQueens) {
    // BASE CASE
    if (nQueens === 0) {
      // solutionCount ++;
      // rowIndex --;
      return;
    }

    // RECURSIVE CASE
    if (nQueens > 0) {
      for (var i = 0; i < colSize; i++) {
        solution.togglePiece(rowIndex, i);

        if (!solution.hasAnyQueensConflicts()) {
          rowIndex++;
          innerFunc(nQueens - 1);
          solution.togglePiece(rowIndex, i);
        } else {
          solution.togglePiece(rowIndex, i);
        }
      }
    }

    rowIndex --;
    return;
  };

  innerFunc(n);

  // var innerFunc = function (startRow, startCol) {
  //   // first place the first piece on the startRow and startCol
  //   solution.togglePiece(startRow, startCol);
  //   // nQueens --
  //   nQueens --;
  //   // iterate from 1 to n - 1 (row)
  //   for (var i = 1; i < n; i ++) {
  //     // iterate from 0 to n - 1 (col)
  //     for (var j = 0; j < n; j ++) {
  //       // place Queen at current row,col
  //       solution.togglePiece(i, j);
  //       // nQueens --
  //       nQueens --;
  //       // if has conflict
  //       if (solution.hasAnyQueensConflicts()) {
  //         // remove piece
  //         solution.togglePiece(i, j);
  //         // nQueens ++
  //         nQueens ++;
  //       } else { // if no conflict
  //         break;
  //       }
  //     }
  //   }

  //   if (nQueens === 0) {
  //     return;
  //   }

  //   // if nQueens is not 0
  //   if (nQueens > 0 && startCol + 1 < n) {
  //     // call find solution again with col + 1 and row stay the same
  //     solution = new Board({n: n});
  //     nQueens = n;
  //     innerFunc(startRow, startCol + 1);
  //   }

  // };

  // innerFunc(0, 0, n);
  // solution = solution.rows();

  solution = solution.rows();
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board ({n: n});
  var rowIndex = 0;
  var colSize = n;

  var innerFunc = function(nQueens) {
    // BASE CASE
    if (nQueens === 0) {
      solutionCount ++;
      rowIndex --;
      return;
    }

    // RECURSIVE CASE
    if (nQueens > 0) {
      for (var i = 0; i < colSize; i++) {
        board.togglePiece(rowIndex, i);

        if (!board.hasAnyQueensConflicts()) {
          rowIndex++;
          innerFunc(nQueens - 1);
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

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
