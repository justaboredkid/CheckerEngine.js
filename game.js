let checkerBoard = [
  [0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [2, 0, 2, 0, 2, 0, 2, 0],
  [0, 2, 0, 2, 0, 2, 0, 2],
  [2, 0, 2, 0, 2, 0, 2, 0],
]
let possibleMoves = [];
let legalPlayerMoves = [];
let captures = [0, 0];
let redMove;
let blackMove;
let clicks = [];
let playerID = ['black', 'red', 'bKing', 'rKing'];

function playerPromotions() {
  for (let i = 0; i < 8; i++) {
    if (checkerBoard[0][i] == 2) {
      checkerBoard[0][i] = 4;
    }
  }
}
//Finds the legal moves for the player
function playerMoves() {
  legalPlayerMoves = [];
  //Check every piece on the board
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      //if it's a black piece than find the possible moves
      if (checkerBoard[i][j] == 2) {
        for (let right = -1; right <= 1; right += 2) {
          try {
            //If the spaces diagonally forwards are clear then add to moves list
            if (checkerBoard[i - 1][j + right] == 0) {
              legalPlayerMoves.push(String(i) + String(j) + String(i - 1) + String(j + right));
              //If the spaces diagonally forwards are enemy pieces and the pieces
              //two spaces diagonally are clear, then hop and capture piece
            }
            else if (checkerBoard[i - 1][j + right] == 1 && checkerBoard[i - 2][j + (right * 2)] == 0 || checkerBoard[i - 1][j + right] == 3 && checkerBoard[i - 2][j + (right * 2)] == 0) {
              legalPlayerMoves.push(String(i) + String(j) + String(i - 2) + String(j + (right * 2)) + String(i - 1) + String(j + right));
              let doubleMidPosRight = j + (right * 2);
              let doubleMidPosDown = i - 2;
              for (let right2 = -1; right2 <= 1; right2 += 2) {
                if (checkerBoard[doubleMidPosDown - 1][doubleMidPosRight + right2] == 1 && checkerBoard[doubleMidPosDown - 2][doubleMidPosRight + (right2 * 2)] == 0) {
                  legalPlayerMoves.push(String(i) + String(j) + String(doubleMidPosDown - 2) + String(doubleMidPosRight + (right2 * 2)) + String(i - 1) + String(j + right) + String(doubleMidPosDown - 1) + String(doubleMidPosRight + right2));
                  let tripleMidPosRight = doubleMidPosRight + (right2 * 2);
                  let tripleMidPosDown = i - 4;
                  for (let right3 = -1; right3 <= 1; right3 += 2) {
                    if (checkerBoard[tripleMidPosDown - 1][tripleMidPosRight + right3] == 1 && checkerBoard[tripleMidPosDown - 2][tripleMidPosRight + (right3 * 2)] == 0) {
                      legalPlayerMoves.push(String(i) + String(j) + String(tripleMidPosDown - 2) + String(tripleMidPosRight + (right3 * 2)) + String(i - 1) + String(j + right) + String(doubleMidPosDown - 1) + String(doubleMidPosRight + right2) + String(tripleMidPosDown - 1) + String(tripleMidPosRight + right3));
                      break;
                    }
                  }
                }
              }
            }
          } catch (err) { }
        }
      } else if (checkerBoard[i][j] == 4) {
        for (let right = -1; right <= 1; right += 2) {
          for (let down = -1; down <= 1; down += 2) {
            try {
              //If the spaces diagonally forwards are clear then add to moves list
              if (checkerBoard[i + down][j + right] == 0) {
                legalPlayerMoves.push(String(i) + String(j) + String(i + down) + String(j + right));
                //If the spaces diagonally forwards are enemy pieces and the pieces
                //two spaces diagonally are clear, then hop and capture piece
              }
              else if (checkerBoard[i + down][j + right] == 1 && checkerBoard[i + (down * 2)][j + (right * 2)] == 0 || checkerBoard[i + down][j + right] == 3 && checkerBoard[i + (down * 2)][j + (right * 2)] == 0) {
                legalPlayerMoves.push(String(i) + String(j) + String(i + (down * 2)) + String(j + (right * 2)) + String(i + down) + String(j + right));
                let doubleMidPosRight = j + (right * 2);
                let doubleMidPosDown = i + (down * 2);
                for (let right2 = -1; right2 <= 1; right2 += 2) {
                  for (let down2 = -1; down2 <= 1; down2 += 2) {
                    if (checkerBoard[doubleMidPosDown + down2][doubleMidPosRight + right2] == 1 && checkerBoard[doubleMidPosDown + (down2 * 2)][doubleMidPosRight + (right2 * 2)] == 0 || checkerBoard[doubleMidPosDown + down2][doubleMidPosRight + right2] == 3 && checkerBoard[doubleMidPosDown + (down2 * 2)][doubleMidPosRight + (right2 * 2)] == 0) {
                      legalPlayerMoves.push(String(i) + String(j) + String(doubleMidPosDown + (down2 * 2)) + String(doubleMidPosRight + (right2 * 2)) + String(i + down) + String(j + right) + String(doubleMidPosDown + down2) + String(doubleMidPosRight + right2));
                      let tripleMidPosRight = doubleMidPosRight + (right2 * 2);
                      let tripleMidPosDown = doubleMidPosDown + (down2 * 2);
                      for (let right3 = -1; right3 <= 1; right3 += 2) {
                        for (let down3 = -1; down3 <= 1; down3 += 2) {
                          if (checkerBoard[tripleMidPosDown + down3][tripleMidPosRight + right3] == 1 && checkerBoard[tripleMidPosDown + (down3 * 2)][tripleMidPosRight + (right3 * 2)] == 0 || checkerBoard[tripleMidPosDown + down3][tripleMidPosRight + right3] == 3 && checkerBoard[tripleMidPosDown + (down3 * 2)][tripleMidPosRight + (right3 * 2)] == 0) {
                            legalPlayerMoves.push(String(i) + String(j) + String(tripleMidPosDown + (down3 * 2)) + String(tripleMidPosRight + (right3 * 2)) + String(i + down) + String(j + right) + String(doubleMidPosDown + down2) + String(doubleMidPosRight + right2) + String(tripleMidPosDown + down3) + String(tripleMidPosRight + right3));
                            break;
                          }
                        }
                      }
                    }
                  }
                }
              }
            } catch (err) { }
          }
        }
      }
    }
  }
}

function mandatoryThreePieceMoves() {
  for (let i = 0; i < legalPlayerMoves.length; i++) {
    if (legalPlayerMoves[i].length == 10) {
      legalPlayerMoves.splice(i - 2, 2);
      break;
    }
  }
  for (let i = 0; i < legalPlayerMoves.length; i++) {
    if (legalPlayerMoves[i].length == 8) {
      legalPlayerMoves.splice(i - 1, 1);
      break;
    }
  }
}

function blackPromotions() {
  for (let i = 0; i < 8; i++) {
    if (checkerBoard[7][i] == 1) {
      checkerBoard[7][i] = 3;
    }
  }
}
//Finds every possible computer move and assigns them to 1 of 4 arrays
//depending on how beneficial they are
function blackMoves() {
  possibleMoves = [];
  //Check every piece on the board
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      //if it's a black piece than find the possible moves
      if (checkerBoard[i][j] == 1) {
        for (let right = -1; right <= 1; right += 2) {
          try {
            //If the spaces diagonally forwards are clear then add to moveslist
            if (checkerBoard[i + 1][j + right] === 0) {
              possibleMoves.push(String(i) + String(j) + String(i + 1) + String(j + right));
              //If the spaces diagonally forwards are enemy pieces and the pieces
              //two spaces diagonally are clear, then hop and capture piece
            }
            else if (checkerBoard[i + 1][j + right] == 2 && checkerBoard[i + 2][j + (right * 2)] == 0 || checkerBoard[i + 1][j + right] == 4 && checkerBoard[i + 2][j + (right * 2)] == 0) {
              possibleMoves.push(String(i) + String(j) + String(i + 2) + String(j + (right * 2)) + String(i + 1) + String(j + right));
              let doubleMidPosRight = j + (right * 2);
              let doubleMidPosDown = i + 2;
              for (let right2 = -1; right2 <= 1; right2 += 2) {
                if (checkerBoard[doubleMidPosDown + 1][doubleMidPosRight + right2] == 2 && checkerBoard[doubleMidPosDown + 2][doubleMidPosRight + (right2 * 2)] == 0 || checkerBoard[doubleMidPosDown + 1][doubleMidPosRight + right2] == 4 && checkerBoard[doubleMidPosDown + 2][doubleMidPosRight + (right2 * 2)] == 0) {
                  possibleMoves.push(String(i) + String(j) + String(doubleMidPosDown + 2) + String(doubleMidPosRight + (right2 * 2)) + String(i + 1) + String(j + right) + String(doubleMidPosDown + 1) + String(doubleMidPosRight + right2));
                  let tripleMidPosRight = doubleMidPosRight + (right2 * 2);
                  let tripleMidPosDown = i + 4;
                  for (let right3 = -1; right3 <= 1; right3 += 2) {
                    if (checkerBoard[tripleMidPosDown + 1][tripleMidPosRight + right3] == 2 && checkerBoard[tripleMidPosDown + 2][tripleMidPosRight + (right3 * 2)] == 0 || checkerBoard[tripleMidPosDown + 1][tripleMidPosRight + right3] == 4 && checkerBoard[tripleMidPosDown + 2][tripleMidPosRight + (right3 * 2)] == 0) {
                      possibleMoves.push(String(i) + String(j) + String(tripleMidPosDown + 2) + String(tripleMidPosRight + (right3 * 2)) + String(i + 1) + String(j + right) + String(doubleMidPosDown + 1) + String(doubleMidPosRight + right2) + String(tripleMidPosDown + 1) + String(tripleMidPosRight + right3));
                      break;
                    }
                  }
                }
              }
            }
          } catch (err) { }
        }
      } else if (checkerBoard[i][j] == 3) {
        for (let right = -1; right <= 1; right += 2) {
          for (let down = -1; down <= 1; down += 2) {
            try {
              //If the spaces diagonally forwards are clear then add to moveslist
              if (checkerBoard[i + down][j + right] == 0) {
                possibleMoves.push(String(i) + String(j) + String(i + down) + String(j + right));
                //If the spaces diagonally forwards are enemy pieces and the pieces
                //two spaces diagonally are clear, then hop and capture piece
              }
              else if (checkerBoard[i + down][j + right] == 2 && checkerBoard[i + (down * 2)][j + (right * 2)] == 0 || checkerBoard[i + down][j + right] == 4 && checkerBoard[i + (down * 2)][j + (right * 2)] == 0) {
                possibleMoves.push(String(i) + String(j) + String(i + (down * 2)) + String(j + (right * 2)) + String(i + down) + String(j + right));
                let doubleMidPosRight = j + (right * 2);
                let doubleMidPosDown = i + (down * 2);
                for (let right2 = -1; right2 <= 1; right2 += 2) {
                  for (let down2 = -1; down2 <= 1; down2 += 2) {
                    if (checkerBoard[doubleMidPosDown + down2][doubleMidPosRight + right2] == 2 && checkerBoard[doubleMidPosDown + (down2 * 2)][doubleMidPosRight + (right2 * 2)] == 0 || checkerBoard[doubleMidPosDown + down2][doubleMidPosRight + right2] == 4 && checkerBoard[doubleMidPosDown + (down2 * 2)][doubleMidPosRight + (right2 * 2)] == 0) {
                      possibleMoves.push(String(i) + String(j) + String(doubleMidPosDown + (down2 * 2)) + String(doubleMidPosRight + (right2 * 2)) + String(i + down) + String(j + right) + String(doubleMidPosDown + down2) + String(doubleMidPosRight + right2));
                      let tripleMidPosRight = doubleMidPosRight + (right2 * 2);
                      let tripleMidPosDown = doubleMidPosDown + (down2 * 2);
                      for (let right3 = -1; right3 <= 1; right3 += 2) {
                        for (let down3 = -1; down3 <= 1; down3 += 2) {
                          if (checkerBoard[tripleMidPosDown + down3][tripleMidPosRight + right3] == 2 && checkerBoard[tripleMidPosDown + (down3 * 2)][tripleMidPosRight + (right3 * 2)] == 0 || checkerBoard[tripleMidPosDown + down3][tripleMidPosRight + right3] == 4 && checkerBoard[tripleMidPosDown + (down3 * 2)][tripleMidPosRight + (right3 * 2)] == 0) {
                            possibleMoves.push(String(i) + String(j) + String(tripleMidPosDown + (down3 * 2)) + String(tripleMidPosRight + (right3 * 2)) + String(i + down) + String(j + right) + String(doubleMidPosDown + down2) + String(doubleMidPosRight + right2) + String(tripleMidPosDown + down3) + String(tripleMidPosRight + right3));
                            break;
                          }
                        }
                      }
                    }
                  }
                }
              }
            } catch (err) { }
          }
        }
      }
    }
  }
}
//Checks if any of the possibleMoves moves a piece to the center pieces or end,
//if so it adds that piece to the favourableMoves array
function blackMoveScoring(p) {
  for (let i = 0; i < p.length; i++) {
    let newMoveValue = {
      move: p[i],
      score: 0
    };

    if (p[i].length == 10) {
      newMoveValue.score += 35;
    } else if (p[i].length == 8) {
      newMoveValue.score += 22;
    } else if (p[i].length == 6) {
      newMoveValue.score += 9;
    } else if (p[i].length == 4) {
      newMoveValue.score += 5;
    }

    if (captures[0] > captures[1] && p[i].length > 4) {
      newMoveValue.score += 4;
    }

    if (checkerBoard[p[i].charAt(2)][p[i].charAt(3)] == 4) {
      newMoveValue.score += 9;
    }

    if (p[i].charAt(2) == 3 || p[i].charAt(2) == 4) {
      if (p[i].charAt(3) == 2 || p[i].charAt(3) == 3 || p[i].charAt(3) == 4 || p[i].charAt(3) == 5) {
        newMoveValue.score += 3;
      }
    }

    if (p[i].charAt(2) == 7 && checkerBoard[p[i].charAt(0)][p[i].charAt(1)] == 1) {
      newMoveValue.score += 4;
    }

    if (p[i].charAt(0) == 0) {
      newMoveValue.score -= 2;
    }

    p[i] = newMoveValue;
  }
  let randomizer = Math.floor(Math.random() * p.length);
  p[randomizer].score += 2.5;

}

//Computer determines which move to make
function chooseBlackMove(p) {
  let highestScore = 0;
  for (let i = 0; i < p.length; i++) {
    if (highestScore < p[i].score) {
      highestScore = p[i].score;
      blackMove = p[i];
    }
  }
}

function win() {
  alert("You won!!!!");
  reset();

}

function lose() {
  alert("You lost!!!!");
  reset();
}

function reset() {
  possibleMoves = [];
  favourableMoves = [];
  legalPlayerMoves = [];
  bestMoves = [];
  tripleMoves = '';
  captures = [0, 0];
  redMove = '';
  blackMove = '';
  clicks = [];
  if (confirm("Play again?")) {
    checkerBoard = [
      [0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 1, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [2, 0, 2, 0, 2, 0, 2, 0],
      [0, 2, 0, 2, 0, 2, 0, 2],
      [2, 0, 2, 0, 2, 0, 2, 0],
    ];
  }
  guiUpdate();
}

//Changes the move string of the players move to an actual change in the main checkerBoard array
function movePiece(player) {
  if (player == 2) {
    for (let i = 0; i < legalPlayerMoves.length; i++) {
      if (legalPlayerMoves[i] == redMove) {
        captures[1] += (legalPlayerMoves[i].length - 4) / 2;
        if (legalPlayerMoves[i].length == 4) {
          //  console.log(legalPlayerMoves[i].slice(0, 2))
          //console.log(legalPlayerMoves[i].slice(2, 4))
          // sweet sweet linear algebra
          updateBoard(2, legalPlayerMoves[i].slice(0, 2), legalPlayerMoves[i].slice(2, 4));
        } else {
          caps = [];
          for (let c = 4; c < legalPlayerMoves[i].length; c += 2) {
            caps.push(legalPlayerMoves[i].slice(c, c + 2));
          }
          updateBoard(2, legalPlayerMoves[i].slice(0, 2), legalPlayerMoves[i].slice(2, 4), caps);
          redMove = '';
        }
        blackMoves();
        blackMoveScoring(possibleMoves);
        chooseBlackMove(possibleMoves);
        movePiece(1);
      }
    }
  } else if (player == 1) {
    $("#player").html("Computer Thinking... " + (possibleMoves.length * 50))
    $('td').attr('disabled', 'disabled');
    captures[0] += (blackMove.move.length - 4) / 2;
    caps = [];
    if (blackMove.move.length != 4) {
      for (let c = 4; c < blackMove.move.length; c += 2) {
        caps.push(blackMove.move.slice(c, c + 2));
      }
    }
    updateBoard(1, blackMove.move.slice(0, 2), blackMove.move.slice(2, 4), caps);
    $("#player").html("RED MOVE")
    $('td').removeAttr('disabled');
  }
}
//Finds which piece the player clicked on based off of the coordinates of the pieces compared to the click
//Once you click twice, the moveRedPiece function is called
function selectRedPiece(c) {
  if ($("#" + c.slice(0, 2)).hasClass("red") || $("#" + c.slice(0, 2)).hasClass("rKing")) {
    //  do player move
    redMove = c;
    movePiece(2);
  }
}

function updateBoard(player, start, finish, capture = []) {
  guiUpdate();
  if (typeof player == "number" || typeof start == "string" || typeof finish == "string" || typeof capture == "object" || player - 1 < 0 || player - 1 >= 2) {
    // Checks if player is actually at the start
    // All hail the mighty king
    if (checkerBoard[start.charAt(0)][start.charAt(1)] >= 3) {
      player += 2;
    }
    checkerBoard[start.charAt(0)][start.charAt(1)] = 0;
    checkerBoard[finish.charAt(0)][finish.charAt(1)] = player;
    $('#' + start).removeClass(playerID[player - 1]);
    $('#' + finish).addClass(playerID[player - 1]);
    // captures
    playerID.slice(player - 1);
    capture.forEach(i => {
      checkerBoard[i.charAt(0)][i.charAt(1)] = 0;
      $('#' + i).removeClass(playerID[player]);
    });
    playerPromotions();
  } else {
    return Error("Incorrect player value. Use int for player and string for the rest. Uses the player number on checkerBoard");
  }
  playerPromotions();
  blackPromotions();
  guiUpdate()
}

// updates board from the console
function guiUpdate() {
  if (captures[1] == 12) {
    win();
    return
  } else if (captures[0] == 12) {
    lose();
    return
  }
  $("td").removeClass();
  for (let i = 0; i < 77; i++) {
    if (i <= 9) {
      i = '0' + String(i);
    }
    let board = checkerBoard[String(i).charAt(0)][String(i).charAt(1)];
    if (board == 0) {
      $('#' + i).removeClass();
      continue;
    }
    $('#' + i).addClass(playerID[board - 1]);

  }
}


$(document).ready(() => {
  guiUpdate();
  $("tbody tr").on("click", "td", function () {
    //console.log("id clicked: " + this.id)
    clicks.push(String(this.id));
    // check empty clicks and multiple clicks
    if (clicks[0] != this.id && !$('#' + this.id).hasClass('helper')) {
      clicks = []
    } else if (clicks[0] == this.id) {
      clicks = [this.id]
    }
    $(".helper").off();
    $(".helper").removeClass("helper");
    playerMoves();
    mandatoryThreePieceMoves();
    if (clicks.length == 1) {
      // legalPlayerMoves: aabbccc... a = first pos b = final pos c = captures
      legalPlayerMoves.forEach(i => {
        if (i.slice(0, 2) == this.id) {
          $("#" + i.slice(2, 4)).addClass("helper");
        }
      });


    }
  });
  $("tbody tr").on("click", ".helper", function () {
    legalPlayerMoves.forEach(i => {
      if (i.slice(0, 4) == clicks.join('')) {
        selectRedPiece(i);
        clicks = [];
      }
    });
  });

});
