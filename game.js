let checkerBoard = [
  [0, 1, 0, 1, 0, 1, 0, 0],
  [1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [2, 0, 2, 0, 2, 0, 1, 0],
  [0, 2, 0, 2, 0, 2, 0, 2],
  [2, 0, 2, 0, 2, 0, 2, 0],
];
let possibleMoves = [];
let favourableMoves = [];
let legalPlayerMoves = [];
let bestMoves = [];
let tripleMoves = '';
let whoseMove = 2;
let stalemate;
let winner;
let captures = [0, 0];
let redMove;
let blackMove;
let clicks = [];
let playerID = ['black', 'red'];
let blackStalemate;

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
              if (checkerBoard[i - 1][j + right] === 0) {
                legalPlayerMoves.push(String(i) + String(j) + String(i - 1) + String(j + right));
                //If the spaces diagonally forwards are enemy pieces and the pieces
                //two spaces diagonally are clear, then hop and capture piece
              }
              else if (checkerBoard[i - 1][j + right] == 1 && checkerBoard[i - 2][j + (right * 2)] == 0) {
                legalPlayerMoves.push(String(i) + String(j) + String(i - 2) + String(j + (right * 2)) + String(i - 1) + String(j + right));
                let doubleMidPosRight = j + (right * 2);
                let doubleMidPosDown = i - 2;
                for (let right2 = -1; right2 <= 1; right2 += 2) {
                  if (checkerBoard[doubleMidPosDown - 1][doubleMidPosRight + right2] == 1 && checkerBoard[doubleMidPosDown - 2][doubleMidPosRight + (right2 * 2)] == 0) {
                    legalPlayerMoves.push(String(i) + String(j) + String(doubleMidPosDown - 2) + String(doubleMidPosRight + (right2 * 2)) + String(i - 1) + String(j + right) + String(doubleMidPosDown - 1) + String(doubleMidPosRight + right2));
                    let tripleMidPosRight = doubleMidPosRight + (right2 * 2);
                    let tripleMidPosDown = i - 4;
                    console.log("hello");
                    for (let right3 = -1; right3 <= 1; right3 += 2) {
                      console.log("helloo");
                      if (checkerBoard[tripleMidPosDown - 1][tripleMidPosRight + right3] == 1 && checkerBoard[tripleMidPosDown - 2][tripleMidPosRight + (right3 * 2)] == 0) {
                        legalPlayerMoves.push(String(i) + String(j) + String(tripleMidPosDown - 2) + String(tripleMidPosRight + (right3 * 2)) + String(i - 1) + String(j + right) + String(doubleMidPosDown - 1) + String(doubleMidPosRight + right2) + String(tripleMidPosDown - 1) + String(tripleMidPosRight + right3));
                        break;
                      }
                    }
                  }
                }
              }
            }
            catch (err) { }
          }
        }
      }
    }
  }

  function mandatoryTripleMoves() {

  }
  //Finds every possible computer move and assigns them to 1 of 3 arrays
  //depending on how beneficial they are
  function blackMoves() {
    //Check every piece on the board
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        //if it's a black piece than find the possible moves
        if (checkerBoard[i][j] === 1) {
          for (let right = -1; right <= 1; right += 2) {
            try {
              //If the spaces diagonally forwards are clear then add to moveslist
              if (checkerBoard[i + 1][j + right] === 0) {
                possibleMoves.push(String(i) + String(j) + String(i + 1) + String(j + right));
                //If the spaces diagonally forwards are enemy pieces and the pieces
                //two spaces diagonally are clear, then hop and capture piece
              }
              else if (checkerBoard[i + 1][j + right] == 2 && checkerBoard[i + 2][j + (right * 2)] == 0) {
                favourableMoves.push(String(i) + String(j) + String(i + 2) + String(j + (right * 2)) + String(i + 1) + String(j + right));
                let doubleMidPosRight = j + (right * 2);
                let doubleMidPosDown = i + 2;
                for (let right2 = -1; right2 <= 1; right2 += 2) {
                  if (checkerBoard[doubleMidPosDown + 1][doubleMidPosRight + right2] == 2 && checkerBoard[doubleMidPosDown + 2][doubleMidPosRight + (right2 * 2)] == 0) {
                    bestMoves.push(String(i) + String(j) + String(doubleMidPosDown + 2) + String(doubleMidPosRight + (right2 * 2)) + String(i + 1) + String(j + right) + String(doubleMidPosDown + 1) + String(doubleMidPosRight + right2));
                    let tripleMidPosRight = doubleMidPosRight + (right2 * 2);
                    let tripleMidPosDown = i + 4;
                    console.log("hello");
                    for (let right3 = -1; right3 <= 1; right3 += 2) {
                      if (checkerBoard[tripleMidPosDown + 1][tripleMidPosRight + right3] == 2 && checkerBoard[tripleMidPosDown + 2][tripleMidPosRight + (right3 * 2)] == 0) {
                        tripleMoves = (String(i) + String(j) + String(tripleMidPosDown + 2) + String(tripleMidPosRight + (right3 * 2)) + String(i + 1) + String(j + right) + String(doubleMidPosDown + 1) + String(doubleMidPosRight + right2) + String(tripleMidPosDown + 1) + String(tripleMidPosRight + right3));
                        break;
                      }
                    }
                  }
                }
              }
            }
            catch (err) { }
          }
        }
      }
    }
  }
  //Checks if any of the possibleMoves moves a piece to the center pieces,
  //if so it adds that piece to the favourableMoves array
  function moreFavourableMoves(p) {
    if (tripleMoves.length == 0) {
      console.log("moreFavourableMoves");
      for (let i = 0; i < p.length; i++) {
        if (p[i].charAt(2) == 3 || p[i].charAt(2) == 4) {
          if (p[i].charAt(3) == 3 || p[i].charAt(3) == 4) {
            favourableMoves.push(possibleMoves[i]);
          }
        }
      }
    }
  }
  //Computer determines which move to make
  function chooseBlackMove(p, f, b, t) {
    if (t) {
      blackMove = tripleMoves;
    } else if (b.length > 0) {
      blackMove = bestMoves[Math.floor(Math.random() * b.length)];
    } else if (f.length > 0) {
      blackMove = favourableMoves[Math.floor(Math.random() * f.length)];
    } else if (p.length > 0) {
      blackMove = possibleMoves[Math.floor(Math.random() * p.length)];
    } else {
      blackStalemate = true;
    }

  }

}
//Changes the move string of the players move to an actual change in the main checkerBoard array
function movePiece(player) {
  if (player == 2) {
    console.log(legalPlayerMoves);
    for (let i = 0; i < legalPlayerMoves.length; i++) {
      if (legalPlayerMoves[i] === redMove) {
        captures[1] += (legalPlayerMoves[i].length - 4) / 2;
        if (legalPlayerMoves[i].length == 4) {
          // sweet sweet linear algebra
          updateBoard(2, legalPlayerMoves[i].slice(0, 2), legalPlayerMoves[i].slice(2, 4));
        }
        else {
          caps = [];
          for (let c = 4; c < legalPlayerMoves[i].length; c += 2) {
            caps.push(legalPlayerMoves[i].slice(c, c + 1));
          }
          redMove = '';
          whoseMove = 1;
          blackMoves();
          moreFavourableMoves(possibleMoves);
          chooseBlackMove(possibleMoves, favourableMoves, bestMoves, tripleMoves);
          movePiece(1);
        }
      }
    }
  }
  else if (player == 1) {
    setTimeout(function () {
      $(".sidestat").innerHTML = "Computer Thinking..."
    }, (blackMove.length * 50))
    captures[0] += (blackMove.length - 4) / 2;
    if (blackMove.length == 4) {
      updateBoard(1, blackMove.slice(0, 2), blackMove.slice(2, 4));
    }
    else {
      caps = [];
      for (let c = 4; c < blackMove.length; c += 2) {
        caps.push(blackMove.slice(c, c + 1));
      }
      whoseMove = 2;
    }
  }
  //Finds which piece the player clicked on based off of the coordinates of the pieces compared to the click
  //Once you click twice, the moveRedPiece function is called
  function selectRedPiece(c) {
    if ($("#" + c.slice(0, 2)).hasClass("red")) {
      //  do player move
      redMove = c;
      movePiece(2);
    } else {
      console.log(c);
    }
  }
  function updateBoard(player, start, finish, capture = []) {
    guiUpdate();
    if (typeof player == "number" || typeof start == "string" || typeof finish == "string" || typeof capture == "object" || player - 1 < 0 || player - 1 >= 2) {
      // Checks if player is actually at the start
      if (player === checkerBoard[start.charAt(0)][start.charAt(1)]) {
        checkerBoard[start.charAt(0)][start.charAt(1)] = 0;
        $('#' + start).removeClass(playerID[player - 1]);
        $('#' + finish).addClass(playerID[player - 1]);
        checkerBoard[finish.charAt(0)][finish.charAt(1)] = player;
        // captures
        playerID.slice(player - 1);
        capture.forEach(i => {
          checkerBoard[i.charAt(0)][i.charAt(1)] = 0;
          $('#' + i).removeClass(playerID[0]);
        });
      }
      else {
        return Error("NOT VALID MOVE " + checkerBoard[start.charAt(0)][start.charAt(1)] + checkerBoard[finish.charAt(0)][finish.charAt(1)]);
      }
    }
    else {
      return Error("Incorrect player value. Use int for player and string for the rest. Uses the player number on checkerBoard");
    }
  }
  // updates board from the console
  function guiUpdate() {
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

}
$(document).ready(() => {
  guiUpdate();
  $("tbody tr td").on("click", function () {
    clicks.push(String(this.id));
    // check empty clicks and multiple clicks
    if (clicks[0] != this.id && !$('#' + this.id).hasClass('helper')) {
      clicks = []
    } else if (clicks[0] == this.id) {
      clicks = [this.id]
    }
    $(".helper").off();
    $(".helper").removeClass("checkerPiece helper");
    playerMoves();
    $(".sidestat").innerHTML = "RED MOVE"
    // legalPlayerMoves: aabbccc... a = first pos b = final pos c = captures
    legalPlayerMoves.forEach(i => {
      if (i.slice(0, 2) == this.id) {
        $("#" + i.slice(2, 4)).addClass("checkerPiece helper");
      }
    });
    if (clicks.length == 1) {
        console.log(legalPlayerMoves)
        // legalPlayerMoves: aabbccc... a = first pos b = final pos c = captures
        legalPlayerMoves.forEach(i => {
          if (i.slice(0, 2) == this.id) {
            $("#" + i.slice(2, 4)).addClass("helper");
          }
        });
        if (clicks.length == 1) {
          $(".helper").on("click", function () {
            console.log(legalPlayerMoves)
            legalPlayerMoves.forEach(i => {
              console.log(i.slice(0, 4));

              if (i.slice(0, 4) == clicks.join('')) {
                selectRedPiece(i);
                clicks = [];
              }
            });
            console.log("done")
          });
        }
      });
  });
