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

    // countInterval for demo
    this.xLeftRight = "left";
    this.demoSpeed = 3;

    // add keyboard listeners, fired when key is pressed / released
    document.addEventListener("keydown", this.keydown);
    document.addEventListener("keyup", this.keyup);
    // document.addEventListener("pointerdown", this.pointerDown);
    // add the touch event listeners to the canvas
    document.addEventListener("touchstart", this.touchstart);
    document.addEventListener("touchend", this.touchend);
    document.addEventListener("touchmove", this.touchmove);
  }

  // draw method
  draw(ctx) {
    this.move();

    //draw player as image
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

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
      e.preventDefault();
    }
    if (e.code === "ArrowDown") {
      this.downPressed = true;
      e.preventDefault();
    }
    if (e.code === "ArrowLeft") {
      this.leftPressed = true;
      e.preventDefault();
    }
    if (e.code === "ArrowRight") {
      this.rightPressed = true;
      e.preventDefault();
    }
    this.shootPressed = true; // always shoot
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

  // pointerDown = (e) => {
  //   const dot = document.createElement("div");
  //   dot.classList.add("dot");
  //   dot.id = e.pointerId;
  //   positionDot(e, dot);
  //   document.body.append(dot);
  // };

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

  // touchstart event listener - when the screen is touched
  touchstart = (e) => {
    // get the x and y coordinates of the touch event
    let touch = e.touches[0];
    this.touchX = touch.clientX;
    this.touchY = touch.clientY;
  };

  // touchend event listener - when the screen is no longer touched
  touchend = (e) => {
    // reset the touch coordinates
    this.touchX = -1;
    this.touchY = -1;
  };

  // touchmove event listener - when the touch is moved
  touchmove = (e) => {
    e.preventDefault();

    // get the x and y coordinates of the touch event
    let touch = e.touches[0];
    this.touchX = touch.clientX;
    this.touchY = touch.clientY;
  };

  // in your update function, use the touch coordinates to determine the direction of movement
  update = () => {
    // check if up is pressed
    if (this.touchY < innerHeight / 2) {
      this.upPressed = true;
    } else {
      this.upPressed = false;
    }

    // check if down is pressed
    if (this.touchY > innerHeight / 2) {
      this.downPressed = true;
    } else {
      this.downPressed = false;
    }

    // check if left is pressed
    if (this.touchX < innerWidth / 2) {
      this.leftPressed = true;
    } else {
      this.leftPressed = false;
    }

    // check if right is pressed
    if (this.touchX > innerWidth / 2) {
      this.rightPressed = true;
    } else {
      this.rightPressed = false;
    }
  };




  demo(gameStop){
    
    if (gameStop === true && this.shootPressed === true){
      // make player move
      switch(this.xLeftRight){
        case "left":
          this.x -= this.demoSpeed;
          break;
        case "right":
          this.x += this.demoSpeed;
          break;
      }

      // boundaries
      if (this.xLeftRight === "left" && this.x < this.width) this.xLeftRight = "right";
      if (this.xLeftRight === "right" && this.x > this.canvas.width - 2 * this.width) this.xLeftRight = "left";
    }
  
  }
}
