// function renderBoard(board, selector) {
//     var strHTML = '<table><tbody>';
//     for (var i = 0; i < board.length; i++) {
//         strHTML += '<tr>';
//         for (var j = 0; j < board[0].length; j++) {
//             var className = `cell-${i}-${j}`;
//             strHTML += `<td class="${className}" 
//                         onclick="cellClicked(this,${i},${j})" 
//                         oncontextmenu="cellMarked(this,${i},${j})">
//                     </td>`;
//         }
//         strHTML += '</tr>';
//     }
//     strHTML += '</tbody></table>';
//     var elContainer = document.querySelector(selector);
//     elContainer.innerHTML = strHTML;
// }
var gIsTimerOn;
var gTimeDisplay;
var startTime;

function startTimer() {
    gIsTimerOn = true;
    startTime = Date.now();
    timer();
}

function timer() {
    var endTime = Date.now();
    var diffTime = endTime - startTime;

    var hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((diffTime % (1000 * 60)) / 1000);

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    // gNewScore = Math.floor((diffTime /= 1000));

    if (gIsTimerOn) {
        window.setTimeout(timer, 1000);
        gTimeDisplay = document.querySelector('.time span').innerHTML =
            hours + ':' + minutes + ':' + seconds;
    }
}

function stopTimer() {
    gIsTimerOn = false;
    document.querySelector('.time span').innerHTML = gTimeDisplay;
}

// function checkBestScore() {
//     var bestScore = extractFromLocalStorage('bestScore');
//     if (bestScore && gNewScore < bestScore || !bestScore) {
//         bestScore = gNewScore;
//     }
//     saveToLocalStorage('bestScore', bestScore)
//     extractFromLocalStorage('bestScore')
// }

// function saveToLocalStorage(key, value) {
//     return localStorage.setItem(key, value);
// }

// function extractFromLocalStorage(key) {
//     return localStorage.getItem(key);
// }

// function removeFromLocalStorage(key) {
//     return localStorage.removeItem(key);
// }
