'use strict'

const MINE = '💥';
const FLAG = '🚩';
var gAudio = new Audio('audio/lowBoom.mp3');
var gAudio1 = new Audio('audio/reset.wav');
var gAudio2 = new Audio('audio/cell.wav');
var gAudio3 = new Audio('audio/win.wav');
var gLevel = '';
var gSize = 4;
var board = document.querySelector('.board');
var gBtn = document.querySelector('.button');
var gScore = 0;
var gSafe = false;


function handleClick() {
  var elBtn = document.querySelector('.reset');
  var elSafeBtn = document.querySelector('.safe');
  var elCell = document.querySelector('.level span2').innerHTML;
  if (elCell === 'Expert') {
    document.querySelector('.level span2').innerHTML = 'Beginner';
    elSafeBtn.innerHTML = 1;
    gSize = 4;
  } else if (elCell === 'Beginner') {
    document.querySelector('.level span2').innerHTML = 'Medium';
    elSafeBtn.innerHTML= 2;
    gSize = 8;
  } else {
    (elCell === 'Medium')
    document.querySelector('.level span2').innerHTML = 'Expert';
    elSafeBtn.innerHTML = 3;
    gSize = 12
  }
  if (elBtn.onclick) {
    restartGame();
    document.querySelector('button span').innerText = 'Play';
  }
}

restartGame();
function restartGame() {
  generateBoard();
  document.querySelector('.score span1').innerText = gScore;
  document.querySelector('button span').innerText = 'Play';
  gAudio1.play('audio/reset.wav');
  startTimer();
}

function generateBoard() {
  board.innerHTML = "";
  for (var i = 0; i < gSize; i++) {
    var row = board.insertRow(i);
    for (var j = 0; j < gSize; j++) {
      var cell = row.insertCell(j);
      cell.className = 'unClicked';
      cell.oncontextmenu = function () { addFlag(this) }
      cell.onclick = function () { clickCell(this) }
      var mine = document.createAttribute("data-mine");
      mine.value = "false";
      cell.setAttributeNode(mine);
    }
  }
  gScore = 0;
  addMines();
}


function addMines() {
  for (var i = 0; i < gSize*2; i++) {
    var row = Math.floor(Math.random() * gSize);
    var col = Math.floor(Math.random() * gSize);
    var cell = board.rows[row].cells[col];
    cell.setAttribute("data-mine", "true");
  }
}

function addFlag(cell) {
  board.oncontextmenu = (event) => {
    event.preventDefault();
    if (cell.getAttribute("data-mine") === "false") return;
    else {
      cell.innerHTML = FLAG;
    }
  }
}


function revealMines() {
  //Highlight all mines in red
  for (var i = 0; i < gSize; i++) {
    for (var j = 0; j < gSize; j++) {
      var cell = board.rows[i].cells[j];
      if (cell.getAttribute("data-mine") === "true") cell.innerHTML = MINE;
    }
  }
}

function checkLevelCompletion() {
  var levelComplete = true;
  for (var i = 0; i < gSize; i++) {
    for (var j = 0; j < gSize; j++) {
      if ((board.rows[i].cells[j].getAttribute("data-mine") === "false") &&
        (board.rows[i].cells[j].innerHTML === "")) levelComplete = false;
    }
  }
  if (levelComplete) {
    gAudio3.play('audio/win.wav');
    document.querySelector('button span').innerText = 'Winner!';
    alert("You Win!");
    revealMines();
    stopTimer();
  }
}


function clickCell(cell) {
  gIsTimerOn = true;
  // var elBtn = document.querySelector('.safe')
  //Check if the end-user clicked on a mine
  if (cell.getAttribute("data-mine") === "true") {
    revealMines();
    gAudio.play('audio/lowBoom.mp3');
    stopTimer();
    document.querySelector('button span').innerText = 'Reset Board';
    document.querySelector('.score span1').innerText = gScore;
    alert("Game Over");
  }
  else {
    cell.className = "clicked";
    document.querySelector('button span').innerText = 'Reset board';
    gAudio2.play('audio/cell.wav');
    var minesCount = 0;
    gScore++
    document.querySelector('.score span1').innerText = gScore;
    //Count and display the number of adjacent mines
    var cellRow = cell.parentNode.rowIndex;
    var cellCol = cell.cellIndex;
    for (var i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, gSize - 1); i++) {
      for (var j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, gSize - 1); j++) {
        if (board.rows[i].cells[j].getAttribute("data-mine") === "true") minesCount++;
      }
    }
    cell.innerHTML = minesCount;
    if (minesCount === 0) {
      //Reveal all adjacent cells as they do not have a mine
      for (var i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, gSize - 1); i++) {
        for (var j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, gSize - 1); j++) {
          //Recursive Call
          if (board.rows[i].cells[j].innerHTML === "") clickCell(board.rows[i].cells[j]);
        }
      }
    }
    checkLevelCompletion();
  }
}


function safeClick() {
  var elBtn = document.querySelector('.safe');
  if (elBtn.innerHTML > 0 && elBtn.innerHTML < 4) {
    elBtn.innerHTML--;
    alert('Click safe on cell!');
    gSafe = true;
    if (cell.getAttribute("data-mine") === "true") {
      renderCell();
    }
  }
}

function renderCell(cell) {
  var cell = document.createAttribute("class");
  cell.value = " ";
  cell.setAttribute("data-mine", "false");
  cell.setAttributeNode(cell);
}

// function getClassName(location) {
//   var cellClass = '.board' + ' ' + location.i + ' ' + location.j;
//   return cellClass;
// }