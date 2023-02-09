import Player from "./Player.js";
import Enemy from "./Enemy.js"; // not used yet
import BulletController, {
  BulletControllerEnemy,
  StarsController,
} from "./BulletController.js";
import Fleet from "./Fleet.js";
// import { Bullet, EnemyBullet } from "./Bullet.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d"); // ctx will be used for drawing, "2d"
export { ctx };

let gameStartPage = true; // checker to show startpage once
let gameStop = true; // check if game should stop
let score = 0
let highScore = localStorage.getItem("highScore") || 0; // get highscore from local storage
let leaderBoardObjString =  localStorage.getItem("leaderBoardObj")||{'SFCCA':0, '99.co': 0,'NTT': 0,'IMDA': 0,'CREX PTE LTD': 0,'CIMB Bank Berhad': 0,'Wiley Edge': 0,'Decathlon Singapore': 0,'FDM': 0,'Allied Container Group': 0, 'Adecco':0}; // get leaderboard from local storage
let leaderBoardObj = typeof(leaderBoardObjString) === "string"? JSON.parse(leaderBoardObjString) :leaderBoardObjString
console.log(typeof(leaderBoardObjString))
let archivedLeaderBoardObj = localStorage.getItem("archivedLeaderBoardObj")
// let leaderBoardObj = {'a':10, 'b': 13,'c': 14,'4': 15,'Singapore Federation of Chinese': 13,'d': 16,'e': 16,'f': 71,'g': 23,'h': 1, 'i':12};
let leaderBoardKeyPressed = false;
let leaderBoardKeyPressedEnd = false;

let pointsTextSize = 20; // text size on screen for points
let timeToNextEnemy = 0; //delay till next row of enemy is drawn. height of enemy, start from 0

// specify canvas dimensions
canvas.width = 500; //394; //innerWidth - 550
canvas.height = 600; //700; //innerHeight -600
export { canvas };

//specify enemy width and height
const enemyWidth = 30;
const enemyHeight = 50;
export { enemyWidth, enemyHeight };

// create bullet, stars
const bulletController = new BulletController(canvas);
const bulletControllerEnemy = new BulletControllerEnemy(canvas);
const starsController = new StarsController(canvas);
export { bulletControllerEnemy, starsController };

// create player.
const player = new Player(
  canvas.width / 2.2,
  canvas.height / 1.3,
  bulletController, // pass in bulletcontroller to shoot
  canvas, // pass in canvas to specify player restrictions (to remove)
  4 // number of guns
);

// create fleet
let fleet = new Fleet();
export { fleet };

// sounds
let selectionSound = new Audio(
  "./sfx/mixkit-negative-game-notification-249.wav"
);
let collideSound = new Audio("./sfx/mixkit-falling-hit-757-trimmed.wav");
collideSound.volume = 0.05; // lower volume
selectionSound.volume = 0.3; // lower volume
let gameOverSound = new Audio("./sfx/mixkit-funny-system-break-down-2955.wav");
gameOverSound.volume = 0.3;
let music = new Audio("./sfx/mixkit-space-game-668.mp3");
music.volume = 0.1;
// sound effects: selection. destory enemies, lose. background

// function that runs setinterval
let startGameLoop = setInterval(gameLoop, 1000 / 60); // call it 60 times a second

let pageCounter = 100; // counter for start page
const pageDuration = 200; // duration of start page

// set main loop
function gameLoop() {
  setCommonStyle();
  ctx.fillStyle = "black"; // clear screen
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // draw
  bulletController.draw(ctx);
  player.draw(ctx); // .draw contains shoot method
  starsController.draw(ctx);

  // demo
  player.demo(gameStop);
  // logic for pages
  if (gameStartPage === true) {
    if (leaderBoardKeyPressed === true) leaderBoard();
    else if (pageCounter > 0) startPage();
    else if (pageCounter <= 0) leaderBoard();
    pageCounter--;
    if (pageCounter < -pageDuration) pageCounter = pageDuration;
    
  }

  // start of actual game
  if (gameStop === false) {
    music.play()
    leaderBoardKeyPressedEnd = false;
    if (fleet.enemies.length < 8 && timeToNextEnemy <= 0) {
      fleet.draw(score);
      timeToNextEnemy = 50; //height of enemy
    }
    timeToNextEnemy--;

    // enemy and bullets
    fleet.enemies.forEach((enemy) => {
      // find index of enemy in question
      const index = fleet.enemies.indexOf(enemy);
      // if bullet collided with enemy
      if (bulletController.collideWith(enemy)) {
        // check enemy health
        if (enemy.health <= 0) {
          // removes 1 array element at index. overwrites array
          // essentially remove the 1 enemy from the array
          fleet.enemies.splice(index, 1);
          score += 10; // increment score at every enemy kill
        }
      } // player collide with enemy
      else if (player.collideWith(enemy)) {
        collideSound.play();
        fleet.enemies.splice(index, 1);
      } // if enemy is out of screen or canvas
      else if (enemy.y >= canvas.height + enemy.height) {
        fleet.enemies.splice(index, 1);
        score -= 10;
      }
      // draw as per normal if enemy not collidedwith
      else {
        bulletControllerEnemy.draw(ctx);
        enemy.draw(ctx);
      }
      // player collide with enemy. player health deducted
      bulletControllerEnemy.collideWith(player);
    });

    inGameText();
  }
  checkPlayerHealth();
}

function checkPlayerHealth() {
  if (player.health <= 0) {
    console.log("player health function passed through")
    gameStop = true;
    clearInterval(startGameLoop); // pauses game loop
    setTimeout(endPage, 500);
  }
}

// set style properties for better aesthetics
function setCommonStyle() {
  ctx.shadowColor = "#d53";
  ctx.shadowBlur = 20;
  ctx.lineJoin = "bevel";
  ctx.lineWidth = 5;
}

// set common text properties
function setTextCommonStyle() {
  ctx.fillStyle = "white";
  ctx.font = "30px Driod Sans";
  ctx.textAlign = "center";
}

// start page
function startPage() {
  setTextCommonStyle(); // text properties
  ctx.fillText(
    "Welcome to Space Shooter!",
    canvas.width / 2,
    canvas.height / (2 + 0.8),
    canvas.width
  );
  
  ctx.font = "20px Arial";
  ctx.fillText(
    "Move with Arrow Keys",
    canvas.width / 2,
    canvas.height / (2 - 0.1),
    canvas.width
  );
  ctx.font = "18px Driod Sans";
  ctx.fillText(
    `You have ${player.health} lives`,
    canvas.width / 2,
    canvas.height / (2 - 0.3),
    canvas.width
  );
  ctx.font = "35px Driod Sans";
  ctx.fillText(
    `ELIMINATE ALL ENEMIES!`,
    canvas.width / 2,
    canvas.height / (2 - 0.5),
    canvas.width
  );
  displayPressSpace();
  displayScoreAndHealth();
}
function displayScoreAndHealth () {
  setTextCommonStyle(); // text properties
  ctx.font = `${pointsTextSize}px Arial`;
  ctx.textAlign = "left";
  ctx.fillText(
    `High Score: ${highScore}`,
    pointsTextSize,
    canvas.height - pointsTextSize / 2,
    canvas.width
  );
  ctx.fillText(
    `Health: ${player.health}`,
    canvas.width - pointsTextSize * 5,
    canvas.height - pointsTextSize / 2,
    canvas.width
  );
}

function fillTextMultiLine(ctx, text, x, y) {
  var lineHeight = ctx.measureText("M").width * 1.2;
  var lines = text.split("\n");
  for (var i = 0; i < lines.length; ++i) {
    ctx.fillText(lines[i], x, y);
    y += lineHeight;
  }
}

function accessObjects(obj) {
  let returnString =``;
  let sortable = [];
  for (var vehicle in obj) {
    sortable.push([vehicle, obj[vehicle]]);
}
sortable.sort(function(a, b) {
    return b[1] - a[1];
});
  for (let i = 0; i < 10; i++) {
    returnString = returnString.concat(`${sortable[i][0]}: ${sortable[i][1]}\n`);
  }
  return returnString
}

function leaderBoard() {
  setTextCommonStyle(); // text properties
  ctx.fillText(
    `LEADERBOARD`,
    canvas.width / 2,
    canvas.height / (10),
    canvas.width
  );
  
  fillTextMultiLine(ctx, `${accessObjects(leaderBoardObj)}`, canvas.width / 2,canvas.height / (5) )
  displayPressSpace();
  displayScoreAndHealth();
}

function displayPressSpace() {
  setTextCommonStyle(); // text properties
  ctx.fillText(
    "Press Space to start!",
    canvas.width / 2,
    canvas.height / (1.13),
    canvas.width
  );
}

function promptName() {
    let currentScore = score;
    let currentScoreName
    do {
      currentScoreName = prompt("Enter Company name for the Leaderboard (max 30 characters)")
    }
    while (currentScoreName.length >= 30) {
      alert("Entered into leaderboard. Top 10 scores will be displayed!")
    }
    
    let currentScoreObj = {
      [currentScoreName]: currentScore
    };
    console.log(currentScoreObj)
    // leaderBoardObj = Object.assign(currentScoreObj, leaderBoardObj);
    for (const key in currentScoreObj) {
      leaderBoardObj[key] = currentScoreObj[key];
    }
    console.log(leaderBoardObj)
    localStorage.setItem("leaderBoardObj", JSON.stringify(leaderBoardObj)); 
    localStorage.setItem("archivedLeaderBoardObj", JSON.stringify(leaderBoardObj)); // to achive the leaderboard
    console.log(leaderBoardObj)
    if (highScore < score) {
      highScore = score;
      localStorage.setItem("highScore", highScore); 
    }
    
    gameStop = false;
    gameStartPage = false;
    if (startGameLoop) {
      clearInterval(startGameLoop);
    }
    selectionSound.play();
    pageCounter = 500;
    resetValues();
    startGameLoop = setInterval(gameLoop, 1000 / 60); // start game loop
  // if current score is higher than any of the scores in object, replace the score with current score
  // if current score is lower than any of the scores in object, add to object
  // sort the object in descending order
  
}
function endPage() {
  leaderBoardKeyPressedEnd = true;
  
  gameStop = true;
  gameOverSound.play();
  // ctx.globalAlpha = 0.5; // make transparent
  ctx.fillStyle = "black";
  setTextCommonStyle();
  ctx.font = "70px Driod Sans";
  ctx.fillText("GAME OVER!", canvas.width / 2, canvas.height / (3));
  ctx.fillText(
    `Score: ${score}`,
    canvas.width / 2,
    canvas.height / (2 + 0.2)
  );
  ctx.font = "20px Driod Sans";
  ctx.fillText(
    "Press Space to play again",
    canvas.width / 2,
    canvas.height / (2 - 0.5)
  );
  ctx.fillText(
    "Left-Shift to Enter Leaderboard",
    canvas.width / 2,
    canvas.height / (2 - 0.65)
  );
}

function pausePage() {
  setTextCommonStyle();
  ctx.fillText("Game Paused!", canvas.width / 2, canvas.height / (2 - 0 ));
  ctx.fillText(
    "Press Enter to continue",
    canvas.width / 2,
    canvas.height / (2 - 0.25)
  );
}
// add points, health, high score on screen
function inGameText() {
  setTextCommonStyle();
  ctx.font = `${pointsTextSize}px Arial`;
  ctx.textAlign = "left";
  ctx.fillText(
    `Score: ${score}`,
    pointsTextSize,
    canvas.height - pointsTextSize / 2 - pointsTextSize,
    canvas.width
  );
  ctx.fillText(
    `High Score: ${highScore}`,
    pointsTextSize,
    canvas.height - pointsTextSize / 2,
    canvas.width
  );
  ctx.fillText(
    `Health: ${player.health}`,
    canvas.width - pointsTextSize * 5,
    canvas.height - pointsTextSize / 2,
    canvas.width
  );
}
// on key down
document.addEventListener("keydown", (e) => {
  // START GAME
  if (e.code === "Space" && gameStop === true) {
    e.preventDefault(); 
    resetValues();
    gameStop = false;
    gameStartPage = false;
    if (startGameLoop) {
      clearInterval(startGameLoop);
    }
    selectionSound.play();
    startGameLoop = setInterval(gameLoop, 1000 / 60); // start game loop
  }
  // shift key to end game and enter name
  if (e.code === "ShiftLeft" && gameStop === true) {
    e.preventDefault(); 
    console.log("shift ")
    promptName();
    gameStop = true;
    gameStartPage = true;
    leaderBoardKeyPressed = true;
    if (startGameLoop) {
      clearInterval(startGameLoop);
    }
    selectionSound.play();
    startGameLoop = setInterval(gameLoop, 1000 / 60); // start game loop
  }
  // leftctrl to access leaderboard
  if (e.code === "ControlLeft" && gameStop === true) {
    console.log("ControlLeft ")
    // gameStop = true;
    // gameStartPage = true;
    // if (startGameLoop) {
    //   clearInterval(startGameLoop);
    //   clearInterval(endPage )
    // }
    leaderBoardKeyPressed = true;
    // startGameLoop = setInterval(gameLoop, 1000 / 60); // start game loop
    

  }
  // pause game
  if (e.code === "Enter" && gameStop === false && gameStartPage === false && leaderBoardKeyPressedEnd === false) {
    gameStop = true;
    selectionSound.play();
    pausePage();
    if (startGameLoop) {
      clearInterval(startGameLoop);
    }
  } //continue game
  else if (e.code === "Enter" && gameStop === true && gameStartPage === false && leaderBoardKeyPressedEnd === false) {
    gameStop = false;
    selectionSound.play();
    if (startGameLoop) {
      clearInterval(startGameLoop);
    }
    selectionSound.play();
    startGameLoop = setInterval(gameLoop, 1000 / 60);
  }
});

// // start game loop on click in canvas
// canvas.addEventListener("click", () => {
//   if (gameStop === true) {
//     gameStop = false; // check if game is stopped
//     if (startGameLoop) {
//       clearInterval(startGameLoop);
//     }
//     selectionSound.play();
//     startGameLoop = setInterval(gameLoop, 1000 / 60); // does not do anything
//   }
// });

// key to immediately end game
document.addEventListener("keydown", (e) => {
  if (e.code === "KeyN") {
    selectionSound.play();
    console.log(e.code + " n key pressed");
    clearInterval(startGameLoop);
    gameStop = true;
    localStorage.removeItem("highScore");
    localStorage.removeItem("leaderBoardObj");
    // localStorage.removeItem("archivedLeaderBoardObj")
    // localStorage.clear();
    endPage();
  }
});

function resetValues() {
  player.health = 3;
  fleet.enemies = [];
  score = 0;
  bulletController.bullets = [];
  bulletControllerEnemy.bullets = [];
  fleet = new Fleet();
  leaderBoardKeyPressed = false;
  leaderBoardKeyPressedEnd = false;
  music.pause();
  music.currentTime = 0;
}


////////////////////////////////////////////////////////////
// NOTES FOR UNDERSTANDING THIS SCRIPT
////////////////////////////////////////////////////////////
/*
HTMLCanvasElement.getContext()
The HTMLCanvasElement.getContext() method returns a drawing context on the canvas,
https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext

CanvasRenderingContext2D
"2d", part of the Canvas API, provides the 2D rendering context for the drawing surface of a <canvas> element. 
It is used for drawing shapes, text, images, and other objects.
https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D

CanvasRenderingContext2D.strokeStyle
property of the Canvas 2D API specifies the color, gradient, or pattern to use for the strokes (outlines) around shapes. The default is #000 (black)

CANVAS API
The Canvas API provides a means for drawing graphics via JavaScript and the HTML <canvas> element
https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API

HTML Canvas Reference
fillStyle - Sets or returns the color, gradient, or pattern used to fill the drawing
fillRect() - Draws a "filled" rectangle
strokeRect() - Draws a rectangle (no fill)
strokeStyle	- Sets or returns the color, gradient, or pattern used for strokes
https://www.w3schools.com/TAGs/ref_canvas.asp

export
The export declaration is used to export values from a JavaScript module
https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export

/////////////////////////////////////////////////////////
KEYBOARD EVENTS
/////////////////////////////////////////////////////////
Element: keydown event
The keydown event is fired when a key is pressed.
https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event

Element: keyup event
The keyup event is fired when a key is released.
https://developer.mozilla.org/en-US/docs/Web/API/Element/keyup_event

KeyboardEvent.code
property represents a physical key on the keyboard (as opposed to the character generated by pressing the key). 
In other words, this property returns a value that isn't altered by keyboard layout or the state of the modifier keys.
https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code

Keyboard Event Code Values
https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_code_values

////////////////////////////////////////////////
ARRAY METHODS
////////////////////////////////////////////////
Array.prototype.indexOf()
The indexOf() method returns the first index at which a given element can be found in the array,
or -1 if it is not present.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf

Array.prototype.splice()
The splice() method adds and/or removes array elements.
The splice() method overwrites the original array.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice

Array.prototype.some()
tests whether at least one element in the array passes the test implemented by the provided function.
It returns true if, in the array, it finds an element for which the provided function returns true; otherwise it returns false.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some

//////////////////////////////////////////////
COLLISION DETECTION
//////////////////////////////////////////////

https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection



///////////////////////////////////////////////
CSS
///////////////////////////////////////////////
Relative length units
Relative length units are relative to something else, perhaps the size of the parent element's font, or the size of the viewport. 
You can make it so the size of text or other elements scales relative to everything else on the page.

What is The Viewport?
The viewport is the user's visible area of a web page
https://www.w3schools.com/css/css_rwd_viewport.asp

viewport height (vh)
100 of viewport height
height: 100vh
https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units

CSS Units
CSS has several different units for expressing a length.
Many CSS properties take "length" values, such as width, margin, padding, font-size, etc.
Length is a number followed by a length unit, such as 10px, 2em, etc.
em: Relative to the font-size of the element (2em means 2 times the size of the current font)	


https://www.w3schools.com/cssref/css_units.asp


/////////////////////////////////////////////
THINGS TO IMRPOVE
/////////////////////////////////////////////

To do
add animated images to enemies, players, bullets, collision,
when enemy hit, blink red = see grayscale: https://www.hongkiat.com/blog/grayscale-image-web/
add score system
add score on every kill


mouse control
pointer
mobile responsive dimensions


AETHETICS
add animated images to enemies, players, bullets, collision,
add more sounds
add start button
add rotation when player move left or right
add animated images for objects


LOGIC
make enemies appear according to time, or stage completion
make enemies appear randomly
create a point system according to number of enemies defeated
create different type of enemies
make enemies move towards player
make enemies move around player in a pattern
make enemies shoot in a straight line
make enemies shoot at player (diagonal)

create a winning and losing scenario

Player UX
Ask for player name
Create 3 lives, or a health bar
when player collide with enemy, lose and end game
more than one stream of bullets from player as game progress
diagonal bullet from player
Create an ulti option
autoshoot bullets
add additional player
pause button

nice to have
add mouse mouse movement option to move the player
add mobile touch movement option to move the player on mobile

















*/
