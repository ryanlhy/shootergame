// define player properties, draw, movement, shoot
export default class Player {
  constructor(x, y, bulletController, canvas, gun = 1) {
    this.x = x;
    this.y = y;
    // create bullets and update on screen on command
    this.bulletController = bulletController;
    this.width = 50;
    this.height = 50;
    this.speed = 9;
    this.canvas = canvas;
    this.gun = gun; // states number of guns the object holds. manipulates bullet stream
    this.health = 3; // health of player

    // set image
    const image = new Image();
    image.src = "./img/spaceship.png";
    this.image = image;

    // collision damage with enemy
    this.collideDamage = 1;

    // add keyboard listeners, fired when key is pressed / released
    document.addEventListener("keydown", this.keydown);
    document.addEventListener("keyup", this.keyup);
    // document.addEventListener("mousemove", mouseMoveHandler, false);
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

    // shoot method, always running, but false is no spacebar
    this.shoot();
  }

  // shoot method to shoot bullets
  shoot() {
    //adjust to 'true' to always shoot
    if (this.shootPressed) {
      // console.log("shoot");
      // how fast is the bullet
      const speedY = 10;
      const speedX = 0;
      // delay between bullets. used to control number of shoot() loops before next bullet activation
      const delay = 7;
      // how much damage bullet cause
      const damage = 1;
      // where bullet originate in terms of x & y, (originally starts in top left corner of square)
      // middle of square - divide width of square by 2
      const bulletX = this.x + this.width / 2; // start from middle of plane
      const bulletY = this.y + 10; //edge of the player - square. but  + 10 makes bullet source inside plane
      this.bulletController.shoot(
        bulletX,
        bulletY,
        speedX,
        speedY,
        damage,
        delay,
        this.gun
      );
    }
  }

  // move method to specify what happens when key is true
  move() {
    // add player bounderies for (down,up,left,right)
    if (this.y > this.canvas.height - this.height) {
      this.y = this.canvas.height - this.height;
    } else if (this.y < 0) {
      this.y = 0;
    } else if (this.x < 0) {
      this.x = 0;
    } else if (this.x >= this.canvas.width - this.width) {
      this.x = this.canvas.width - this.width;
    }
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
    // if (e.code === "Space") {
    //   this.shootPressed = true;
    // }
    this.shootPressed = true; // always shoot
    e.preventDefault();
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
    // if (e.code === "Space") {
    //   this.shootPressed = false;
    // }
  };
  takeDamage(damage) {
    this.health -= damage;
  }
  collideWith(sprite) {
    // if this is all true, a collision occured
    if (
      this.x < sprite.x + sprite.width &&
      this.x + this.width > sprite.x &&
      this.y < sprite.y + sprite.height &&
      this.y + this.height > sprite.y
    ) {
      // damage taken
      sprite.takeDamage(this.collideDamage);
      this.takeDamage(this.collideDamage);

      return true;
    }
    return false;
  }
}
