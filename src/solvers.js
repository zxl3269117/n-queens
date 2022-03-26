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
  var solutionCount = 0; //fixme
  //Declare a variable rowIndex = 0
  var rowIndex = 0;
  //Declare a colSize = n
  var colSize = n;

  //Declare innerFunc that takes in a variable nRooks //nRooks = 4, 3, 2, 1, 0
  var innerFunc = function(nRooks) {
    //Base case:
    //There is no rook left to be placed on the board
    if (nRooks === 0) {
      //solutionCount + 1
      //rowIndex - 1
      //return
      solutionCount ++;
      rowIndex --;
      return;
    }

    //Recursive case:
    //When there's still rooks left to be placed
    if (nRooks > 0) {
      //Iterate from col from 0 to colSize - 1
      for (var i = 0; i < colSize; i++) {
        //Place the rook at the current row and col
        board.togglePiece(rowIndex, i);

        //if there's not a rook conflict by row or col
        if (!board.hasAnyRooksConflicts()) {
          //increase rowIndex by 1
          rowIndex++;
          //call the innerFunc with nRooks - 1
          innerFunc(nRooks - 1);
          board.togglePiece(rowIndex, i);
        } else {
          //if there's a rook conflict (column or row)
          //remove rook from current place
          board.togglePiece(rowIndex, i);
        }
      }
    }

    //rowIndex - 1
    rowIndex --;
    //return
    return;
  };

  //invoke innerFunc with n
  // debugger;
  innerFunc(n);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = new Board({n: n});

  if (n === 0) {
    return solution.rows();
  }

  var rowIndex = 0;
  var colIndex = 1;

  while (n > 0) {
    solution.togglePiece(rowIndex, colIndex);
    n --;

    if (solution.hasAnyQueensConflicts()) {
      solution.togglePiece(rowIndex, colIndex);
      n ++;
      colIndex ++;
    } else {
      rowIndex ++;
      colIndex ++;
    }

    if (solution.get(rowIndex)[colIndex] === undefined) {
      colIndex = 0;
    }
  }

  solution = solution.rows();
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
