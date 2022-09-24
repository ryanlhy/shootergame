import { fleet } from "./app.js";
// define bullet class properties and draw method
export class Bullet {
  // create bullet class properties and methods
  constructor(x, y, speedX = 0, speedY, damage) {
    this.x = x;
    this.y = y;
    this.speedY = speedY;
    this.speedX = speedX; // diagonal bullets, angle
    this.damage = damage;

    this.width = 5;
    this.height = 15;
    this.color = "blue";
  }

  // draw bullets
  draw(ctx) {
    // fill the rect
    ctx.fillStyle = this.color;
    // bullets will go up the y axis, so negative
    this.y -= this.speedY;
    this.x -= this.speedX;
    // fillRect() - Draws a "filled" rectangle (bullet)
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  collideWith(sprite) {
    // function adaapted from 2d collision detection
    // if this is all true, a collision occured
    if (
      this.x < sprite.x + sprite.width &&
      this.x + this.width > sprite.x &&
      this.y < sprite.y + sprite.height &&
      this.y + this.height > sprite.y
    ) {
      // damage taken
      sprite.takeDamage(this.damage);
      return true;
    }
    return false;
  }
}

export class EnemyBullet extends Bullet {
  constructor(x, y, speedX = 0, speedY, damage) {
    super(x, y, speedX, speedY, damage);
    this.color = "red";
  }
  collideWith(sprite) {
    // console.log("enemy shoots");
    // function adaapted from 2d collision detection
    // if this is all true, a collision occured
    if (
      this.x < sprite.x + sprite.width &&
      this.x + this.width > sprite.x &&
      this.y < sprite.y + sprite.height &&
      this.y + this.height > sprite.y
    ) {
      // damage taken
      sprite.takeDamage(this.damage);
      return true;
    }
    return false;
  }

  // draw bullets
  draw(ctx) {
    // fill the rect
    ctx.fillStyle = this.color;
    // bullets will go up the y axis, so negative
    //bug: bullets speed up after each elimninated enemy
    this.y -= this.speedY / (fleet.enemies.length + 1); // temperory solution
    this.x -= this.speedX;
    // fillRect() - Draws a "filled" rectangle (bullet)
    ctx.fillRect(this.x, this.y, this.width, this.height);
    // ctx.arc(this.x, this.y, this.width, 0, 2 * Math.PI);
  }
}
