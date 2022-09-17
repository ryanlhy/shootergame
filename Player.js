// define player properties, draw, movement, shoot
export default class Player {
  constructor(x, y, bulletController) {
    this.x = x;
    this.y = y;
    // create bullets and update on screen on command
    this.bulletController = bulletController;
    this.width = 50;
    this.height = 50;
    this.speed = 4;

    // set image
    const image = new Image();
    image.src = "./img/spaceship.png";
    this.image = image;

    // add keyboard listeners, fired when key is pressed / released
    document.addEventListener("keydown", this.keydown);
    document.addEventListener("keyup", this.keyup);
  }

  // draw method
  draw(ctx) {
    this.move();

    //draw player as image
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

    // box
    // // strokeStyle	- Sets or returns the color, gradient, or pattern used for strokes
    // ctx.strokeStyle = "yellow";
    // // strokeRect() - Draws a rectangle (no fill)
    // ctx.strokeRect(this.x, this.y, this.width, this.height);
    // // fillStyle - Sets or returns the color, gradient, or pattern used to fill the drawing
    // ctx.fillStyle = "black";
    // // fillRect() - Draws a "filled" rectangle
    // ctx.fillRect(this.x, this.y, this.width, this.height);

    // shoot method
    this.shoot();
  }

  // shoot method to shoot bullets
  shoot() {
    if (this.shootPressed) {
      console.log("shoot");
      // how fast is the bullet
      const speed = 15;
      // delay between bullets. used to control number of shoot() loops before next bullet activation
      const delay = 7;
      // how much damage bullet cause
      const damange = 1;
      // where bullet originate in terms of x & y, (originally starts in top left corner of square)
      // middle of square - divide width of square by 2
      const bulletX = this.x + this.width / 2;
      const bulletY = this.y; //edge of the player - square
      this.bulletController.shoot(bulletX, bulletY, speed, damange, delay);
    }
  }

  // move method to specify what happens when key is true
  move() {
    // is downpress is true, increment y value to reposition it in y axis
    // same logic for the others
    if (this.downPressed) {
      this.y += this.speed;
    }
    if (this.upPressed) {
      this.y -= this.speed;
    }
    if (this.leftPressed) {
      this.x -= this.speed;
    }
    if (this.rightPressed) {
      this.x += this.speed;
    }
    // if all is false (eg, key is up), nothing happens
  }

  // keydown arrow function - when key is pressed down
  keydown = (e) => {
    // determine which key is pressed down
    // note: allows one key at a time but toggles very quickly so it moves diagonally i think
    if (e.code === "ArrowUp") {
      this.upPressed = true;
    }
    if (e.code === "ArrowDown") {
      this.downPressed = true;
    }
    if (e.code === "ArrowLeft") {
      this.leftPressed = true;
    }
    if (e.code === "ArrowRight") {
      this.rightPressed = true;
    }
    if (e.code === "Space") {
      this.shootPressed = true;
    }
  };

  // keyup arrow function - when key is up
  keyup = (e) => {
    // determine which key is released by toggling variables true or false
    if (e.code === "ArrowUp") {
      this.upPressed = false;
    }
    if (e.code === "ArrowDown") {
      this.downPressed = false;
    }
    if (e.code === "ArrowLeft") {
      this.leftPressed = false;
    }
    if (e.code === "ArrowRight") {
      this.rightPressed = false;
    }
    if (e.code === "Space") {
      this.shootPressed = false;
    }
  };
}
