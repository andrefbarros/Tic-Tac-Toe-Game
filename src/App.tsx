import { useEffect, useState } from "react";
import BoardPosition from "./components/BoardPosition";
import { MouseEvent } from "react";

function App() {
  // -1 -> "X"
  // 1 -> "O"
  const players = [-1, 1];
  const [currentPlayer, setCurrentPlayer] = useState(players[0]);
  const [currentPlayNumber, setCurrentPlayNumber] = useState(0);
  const [currentXWins, setCurrentXWins] = useState(0);
  const [currentOWins, setCurrentOWins] = useState(0);

  /**
   * Tic-Tac-Toe board
   */
  const defaultBoard = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  // function to reset board
  function handleReset() {
    alert("Reset board with success");
    setBoard(defaultBoard);
    setCurrentPlayNumber(0);
    setCurrentPlayer(-1);
  }

  // function to reset score game
  function handleResetScore() {
    alert("Reset score with success");
    setCurrentXWins(0);
    setCurrentOWins(0);
  }

  const [board, setBoard] = useState<number[][]>(defaultBoard);

  // function to change player
  function changePlayer() {
    if (currentPlayer === 1) setCurrentPlayer(-1);
    else setCurrentPlayer(1);
  }

  // function to check if there is a winner in lines
  function checkLine(i: number) {
    if (
      board[i][0] + board[i][1] + board[i][2] === 3 ||
      board[i][0] + board[i][1] + board[i][2] === -3
    )
      return true;

    return false;
  }

  // function to check if there is a winner in columns
  function checkColumn(i: number) {
    if (
      board[0][i] + board[1][i] + board[2][i] === 3 ||
      board[0][i] + board[1][i] + board[2][i] === -3
    )
      return true;
    return false;
  }

  // function to check if there is a winner in diagonals
  function checkDiagonals() {
    if (
      board[0][0] + board[1][1] + board[2][2] === 3 ||
      board[0][0] + board[1][1] + board[2][2] === -3
    )
      return true;
    if (
      board[0][2] + board[1][1] + board[2][0] === 3 ||
      board[0][2] + board[1][1] + board[2][0] === -3
    )
      return true;

    return false;
  }

  // function to check if there is a winner
  function checkWin() {
    let win = false;

    for (let i = 0; i < board.length; i++) {
      win ||= checkLine(i);
      win ||= checkColumn(i);
    }

    win ||= checkDiagonals();

    return win;
  }

  // function to update play number
  function updatePlayNumber() {
    setCurrentPlayNumber((currentNumber) => {
      return currentNumber + 1;
    });
  }

  // function to update X wins
  function updateXWins() {
    setCurrentXWins((currentWins) => currentWins + 1);
  }

  // function to update O wins
  function updatedOWins() {
    setCurrentOWins((currentWins) => currentWins + 1);
  }

  // function to handle click in board position
  function handleClick(e: MouseEvent<HTMLDivElement>) {
    const [x, y] = e.currentTarget.id.split("");
    if (board[x][y] !== 0) return;

    setBoard((currentBoard) => {
      const updatedBoard = currentBoard;
      updatedBoard[x][y] = currentPlayer;
      return updatedBoard;
    });

    updatePlayNumber();

    changePlayer();
  }

  // function to check if there is a winner in real time
  useEffect(() => {
    if (checkWin()) {
      alert(`The player: ${currentPlayer === 1 ? "X" : "O"} won!`);
      if (currentPlayer === 1) updateXWins();
      else updatedOWins();
      setBoard(defaultBoard);
      setCurrentPlayer(-1);
      setCurrentPlayNumber(0);
    }
    if (currentPlayNumber === 9) {
      setCurrentPlayNumber(0);
      setCurrentPlayer(-1);
    }
  }, [currentPlayer, board]);

  return (
    <div className="bg-black w-screen h-screen flex flex-col items-center justify-center ">
      <div className="flex mb-2 gap-6">
        <p className="flex items-center justify-center bg-amber-400 w-44">
          Current number play: {currentPlayNumber}
        </p>
        <p className="flex items-center justify-center bg-amber-400 w-32">
          Current Player: {currentPlayer === -1 ? "X" : "O"}{" "}
        </p>
        <p className="flex items-center justify-center bg-amber-400 w-44">
          Player 1 wins (X): {currentXWins}{" "}
        </p>
        <p className="flex items-center justify-center bg-amber-400 w-44">
          Player 2 wins (O): {currentOWins}{" "}
        </p>
      </div>
      <div className="flex w-5/6 h-4/5 flex-col items-center justify-center bg-slate-200">
        <div className="flex flex-1 w-full h-full items-center justify-center">
          <BoardPosition
            id="00"
            player={board[0][0]}
            handleClick={handleClick}
          />
          <BoardPosition
            id="01"
            player={board[0][1]}
            handleClick={handleClick}
          />
          <BoardPosition
            id="02"
            player={board[0][2]}
            handleClick={handleClick}
          />
        </div>

        <div className="flex flex-1 w-full h-full items-center justify-center">
          <BoardPosition
            id="10"
            player={board[1][0]}
            handleClick={handleClick}
          />
          <BoardPosition
            id="11"
            player={board[1][1]}
            handleClick={handleClick}
          />
          <BoardPosition
            id="12"
            player={board[1][2]}
            handleClick={handleClick}
          />
        </div>

        <div className="flex flex-1 w-full h-full items-center justify-center">
          <BoardPosition
            id="20"
            player={board[2][0]}
            handleClick={handleClick}
          />
          <BoardPosition
            id="21"
            player={board[2][1]}
            handleClick={handleClick}
          />
          <BoardPosition
            id="22"
            player={board[2][2]}
            handleClick={handleClick}
          />
        </div>
      </div>

      <button
        onClick={handleReset}
        className="flex px-6 py-2.5 bg-blue-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-lg hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mb-1"
      >
        Reset Board
      </button>
      <button
        onClick={handleResetScore}
        className="flex px-7 py-2.5 bg-purple-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-lg hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mb"
      >
        Reset Score
      </button>
    </div>
  );
}

export default App;
