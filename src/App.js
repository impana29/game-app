import React from 'react';
import './components/game1.css';
import ReactDOM from 'react-dom';
import './App.css';
export 
//when the board is clicked it displays the value of the player whether x or o,
//based on their turn.This is done using properties
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );//when clicked on the board it initiates  the squares function
    // and returns what shd be rendered
  }
//renders the value of each square 
  render() {
    return (
      <div> 
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }//to set default value of 9 indexes of array to null
      ],//setting starting step to 0 and first input to x
      stepNumber: 0,
      xIsNext: true
    };
  }
//history contains the entered value
//current contains remaining tries

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    //checks whether the square contains x or o
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {//used to concat n to display messages of whats going on
          squares: squares
        }
      ]),
      stepNumber: history.length,//displays step number
      xIsNext: !this.state.xIsNext
    });
  }
//in order to change to next state i.e, first checks whether
 //next is x or not using modulus2 n then decides whether x or o
 //since starting is step1 n x modulus2 will be 0 or 1 if 0 then next is o turn else x turn
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
//used to display appropriate messages
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
//if winner condition satisfies then displays winner
// else displays next player
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }
//displays the values of the board previously filled using handleclick method
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
//function to calculate the winner
// if all the 3 values are same in a row,column or diagonal it displays as winner
// all the values are first assigned to lines then checked using if statement
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }//checks for all the row ,column,diagonal to have same value
  }
  return null;
}

