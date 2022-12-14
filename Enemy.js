import { fleet, canvas, enemyWidth, enemyHeight } from "./app.js";
export default class Enemy {
  constructor(
    x,
    y,
    health,
    speedX = 0,
    speedY = 0, //speeed of enemy moving
    bulletControllerEnemy,
    // canvas,
    gun
  ) {
    this.x = x;
    this.y = y;
    this.health = health;
    this.width = enemyWidth; //dimensions of enemy
    this.height = enemyHeight; //dimension of enemy
    this.speedX = speedX;
    this.speedY = speedY;

    // copied from player class, bullet control
    this.bulletControllerEnemy = bulletControllerEnemy;
    // this.bulletWidth = 50;
    // this.bulletHeight = 50;

    //speed of the bullet
    this.bulletSpeedX = 0;
    this.bulletSpeedY = -7;
    // this.canvas = canvas;
    this.gun = gun;

    // delay between bullets. used to control number of shoot() loops before next bullet activation
    this.delay = 200; //600;
    // damage of bullet from enemies
    this.damage = 1;

    // set image
    const image = new Image();
    image.src = "./img/enemy_rocket.png";
    this.image = image;
  }

  draw(ctx) {
    //draw player as image
    this.move();
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    this.shoot();
  }

  takeDamage(damage) {
    this.health -= damage;
  }

  move() {
    // this.x -= this.speedX;
    this.y += this.speedY;
    this.x += this.speedX;
    // console.log("x pos: " + this.x);
  }
  shoot() {
    // where bullet originate in terms of x & y, (originally starts in top left corner of square)
    // middle of square - divide width of square by 2
    // console.log("y position" + fleet.enemies + this.y);
    const bulletX = this.x + this.width / 2; // start from middle of plane
    const bulletY = this.y + this.height - 10; //edge of the player - square. but  + 10 makes bullet source inside plane
    this.bulletControllerEnemy.shoot(
      bulletX,
      bulletY,
      this.bulletSpeedX,
      this.bulletSpeedY,
      this.damage,
      this.delay,
      this.gun,
      this.y
    );
  }
}
