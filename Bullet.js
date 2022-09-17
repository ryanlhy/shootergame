// define bullet class properties and draw method
export default class Bullet {
  // create bullet class properties and methods
  constructor(x, y, speed, damage) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.damage = damage;

    this.width = 5;
    this.height = 15;
    this.color = "red";
  }

  // draw bullets
  draw(ctx) {
    // fill the rect
    ctx.fillStyle = this.color;
    // bullets will go up the y axis, so negative
    this.y -= this.speed;
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
