const gridItemsEl = document.querySelectorAll('.gridItem');
const resetEl = document.getElementById('reset');
const playerTurnEl = document.querySelector('.playerTurn');
const playerWinEl = document.querySelector('.playerWin');
const playerWinContainerEl = document.querySelector('.winMsgContainer');
const turnContainerEl = document.querySelector('.turnContainer');
let turnCounter = 0;
playerWinContainerEl.style.display = "none";


function PlayGame() {
  gridItemsEl.forEach(function (ItemsEl) {
    ItemsEl.addEventListener('click', updateTile);
  });
}

resetEl.addEventListener('click', resetGame);

function resetGame()
{
  playerWinContainerEl.style.display = "none";
  turnContainerEl.style.display = "block";
  playerTurnEl.innerText = playerX.playerValue;
  playerO.turn = false;
  playerX.turn = true;
  playerX.moves = [];
  playerO.moves = [];
  turnCounter = 0;
  gridItemsEl.forEach(function (ItemsEl) 
  {
    ItemsEl.innerText = "";
  });
  PlayGame();
}

function endGame(player)
{
  turnContainerEl.style.display = "none";
  playerWinContainerEl.style.display = "block";
  playerWinEl.innerText = player.playerValue;
  player.isWin = false;
  gridItemsEl.forEach(function (ItemsEl) 
  {
    ItemsEl.removeEventListener('click', updateTile)
  });
}

function endGameTie()
{
  turnContainerEl.style.display = "none";
  playerWinContainerEl.style.display = "block";
  playerWinEl.innerText = "Tie";
  gridItemsEl.forEach(function (ItemsEl) 
  {
    ItemsEl.removeEventListener('click', updateTile)
  });
}

function checkTie(turnNum)
{
  console.log(turnNum)
  if (turnNum === 9)
  {
    console.log("game tied");
    endGameTie();
  }
}

function updateTile(evt)
{
  turnCounter++;
  if(playerX.turn === true)
  {
    evt.target.innerText = playerX.playerValue;
    playerX.addMoves(evt.target.id);
    playerTurnEl.innerText = playerO.playerValue;
    playerX.turn = false;
    playerO.turn = true;
    playerX.checkWinCon(playerX.moves)
    if(playerX.isWin === true)
    {
      endGame(playerX);
    }
    else
    {
      checkTie(turnCounter)
      evt.target.removeEventListener('click', updateTile)
    }
  }
  else if (playerO.turn === true)
  {
    evt.target.innerText = playerO.playerValue;
    playerO.addMoves(evt.target.id);
    playerTurnEl.innerText = playerX.playerValue;
    playerO.turn = false;
    playerX.turn = true;
    playerO.checkWinCon()
    if(playerO.isWin === true)
    {
      endGame(playerO);
    }
    else
    {
      checkTie(turnCounter)
      evt.target.removeEventListener('click', updateTile);
    }
  }
}

let Player = class {
  moves = [];
  turn;
  playerValue;
  isWin = false;

  winConditions = 
  [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]

  checkWinCon()
  {
    this.winConditions.forEach((arr) =>
    {
      let found = 0;
      arr.forEach((val)=>
      {
        if (this.moves.includes(val))
        {
          found ++;
        }
        if (found===3)
        {
          this.isWin = true;
        }
      })
    })
  }

  addMoves(placement)
  {
    this.moves.push(parseInt(placement));
  }

  constructor(playerValue, turn){
    this.playerValue = playerValue;
    this.turn = turn;
  }
};

const playerX = new Player("X", true);
const playerO = new Player("O", false);

PlayGame();