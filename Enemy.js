export default class Enemy {
  constructor(x, y, health, speedX = 0, speedY = 1) {
    this.x = x;
    this.y = y;
    this.health = health;
    this.width = 50;
    this.height = 80;
    this.speedX = speedX;
    this.speedY = speedY;

    // copied from player class, bullet control
    // this.bulletController = bulletController;
    // this.width = 50;
    // this.height = 50;
    // this.speed = 9;
    // this.canvas = canvas;
    // this.gun;

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
}
