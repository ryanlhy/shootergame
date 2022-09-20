export default class Enemy {
  constructor(
    x,
    y,
    health,
    speedX = 0,
    speedY = 1,
    bulletController,
    canvas,
    gun
  ) {
    this.x = x;
    this.y = y;
    this.health = health;
    this.width = 50; //dimensions of enemy
    this.height = 80; //dimension of enemy
    this.speedX = speedX;
    this.speedY = speedY;

    // copied from player class, bullet control
    this.bulletController = bulletController;
    this.bulletWidth = 50;
    this.bulletHeight = 50;
    this.BulletspeedX = 9;
    this.BulletspeedY = 9;
    this.canvas = canvas;
    this.gun = 0;

    // set image
    const image = new Image();
    image.src = "./img/enemy_rocket.png";
    this.image = image;
  }

  draw(ctx) {
    //draw player as image
    this.move();
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

    //default box
    // // fill the rect
    // ctx.fillStyle = this.color;
    // // create a shield if health greater than 1
    // if (this.health > 1) {
    //   // draw the outline
    //   ctx.strokeStyle = "white";
    // } else {
    //   // outline is the same color, so looks like no shield
    //   ctx.strokeStyle = this.color;
    // }

    // //  Draws a "filled" rectangle
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    // // Draws a rectangle (no fill) / outline
    // ctx.strokeRect(this.x, this.y, this.width, this.height);

    // draw text
    ctx.fillStyle = "gray";
    ctx.font = "25px Arial";
    ctx.fillText(
      this.health,
      this.x + this.width / 3.5,
      this.y + this.height / 1.5
    );
  }

  takeDamage(damage) {
    this.health -= damage;
  }

  move() {
    // this.x -= this.speedX;
    this.y += this.speedY;
    console.log("called enemy.move()");
  }
  //not working
  shoot() {
    if (this.shootPressed) {
      console.log("shoot");
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
}
