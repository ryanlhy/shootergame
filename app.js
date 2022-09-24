import Player from "./Player.js";
import Enemy from "./Enemy.js"; // not used yet
import BulletController, { BulletControllerEnemy } from "./BulletController.js";
import Fleet from "./Fleet.js";
// import { Bullet, EnemyBullet } from "./Bullet.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d"); // ctx will be used for drawing, "2d"
export { ctx };
let gameStart = true; // checker to start gameloop once
let gameStop = false;
let score = 0;
let pointsTextSize = 20; // text size on screen for points

// specify canvas dimensions
canvas.width = 550;
canvas.height = 600;
export { canvas };
// create bullet
const bulletController = new BulletController(canvas);
const bulletControllerEnemy = new BulletControllerEnemy(canvas);
export { bulletControllerEnemy };
// create player.
// takes x & y position to specify where the player is on the canvas
const player = new Player(
  canvas.width / 2.2,
  canvas.height / 1.3,
  bulletController, // pass in bulletcontroller to shoot
  canvas, // pass in canvas to specify player restrictions
  4 //gun
);

const fleet = new Fleet();
export { fleet };

startPage();

// set a loop
function gameLoop() {
  if (gameStop === false) {
    setCommonStyle();
    ctx.fillStyle = "black"; // clear the screen
    ctx.fillRect(0, 0, canvas.width, canvas.height); // draw from corner (0, 0)
    // draw bullet (draw below player so player goes on top of bullet)
    bulletController.draw(ctx);
    // call draw method
    player.draw(ctx); // not .draw also has shoot method

    // enemy and bullets
    fleet.enemies.forEach((enemy) => {
      // if bullet collided with enemy
      if (bulletController.collideWith(enemy)) {
        // check enemy health
        if (enemy.health <= 0) {
          // find index of enemy in question
          const index = fleet.enemies.indexOf(enemy);
          // removes 1 array element at index. overwrites array
          // essentially remove the 1 enemy from the array
          fleet.enemies.splice(index, 1);
          score += 10; // increment score at every enemy kill
        }
      }
      // draw as per normal if enemy not collidedwith
      else {
        bulletControllerEnemy.draw(ctx);
        enemy.draw(ctx);
      }
    });
    // if enemy bullet collided with enemy
    if (bulletControllerEnemy.collideWith(player)) {
      console.log("player loses health");

      // check player health
      if (player.health <= 0) {
        console.log("player loses");
        gameStop = true;
        // go to end page after 1 sec
        setTimeout(endPage, 1000);
      }
    }
    // add points on screen
    setTextCommonStyle();
    ctx.font = `${pointsTextSize}px Arial`;
    ctx.fillText(`Score: ${score}`, 50, canvas.height, canvas.width);
  } else {
    clearInterval(gameLoop); // this seems redundant
  }
}

// to add in notes
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
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
}

// start page
function startPage() {
  ctx.fillRect(0, 0, canvas.width, canvas.height); // draw from corner (0, 0)
  setTextCommonStyle(); // text properties
  ctx.fillText(
    "Welcome to Space Shooter!",
    canvas.width / 2,
    canvas.height / (2 + 0.25),
    canvas.width
  );
  ctx.fillText(
    "Please Click to start!",
    canvas.width / 2,
    canvas.height / (2 - 0.25),
    canvas.width
  );
}

// ending page
function endPage() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height); // draw from corner (0, 0)
  setTextCommonStyle();
  ctx.fillText("Game has ended!", canvas.width / 2, canvas.height / (2 - 0.25));
  ctx.fillText(
    `Your Score: ${score}`,
    canvas.width / 2,
    canvas.height / (2 + 0.3)
  );
  console.log("Score: " + score);
}
// function that runs setinterval
const startGameLoop = () => {
  setInterval(gameLoop, 1000 / 60); // 1000 / 60  - call it 60 times a second
};
const test = 0;
// start game loop on click in canvas
canvas.addEventListener("click", () => {
  if (gameStart === true) {
    gameStart = false; // checker to start gameloop only once
    startGameLoop();
  }
});

// end game
document.addEventListener("keydown", (e) => {
  if (e.code === "Escape") {
    console.log(e.code + " escape key pressed");
    // clearInterval(startGameLoop); //this not working, need to be in same scope?
    gameStop = true;
    endPage();
  }
});

// create array of enemies
// const enemies = [
// new Enemy(50, 20, "green", 5),
// new Enemy(150, 20, "green", 5),
// new Enemy(250, 20, "green", 5),
// new Enemy(350, 20, "green", 5),
// new Enemy(450, 20, "green", 5),
// new Enemy(50, 100, "green", 5),
// new Enemy(150, 100, "green", 5),
// new Enemy(250, 100, "green", 5),
// new Enemy(350, 100, "green", 5),
// new Enemy(450, 100, "green", 5),
// ];

// // in case didnt render
// const animate = () => {
//   requestAnimationFrame(animate);
//   ctx.fillStyle = "black";
//   player.draw(ctx);
//   //   console.log("animate");
// };

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


mouse to control
mobile responsive dimensions


AETHETICS
add animated images to enemies, players, bullets, collision,
make background image move continously
add sounds
add start button
add rotation when player move left or right


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
