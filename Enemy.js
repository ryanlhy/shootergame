export default class Enemy {
  constructor(x, y, color, health) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.health = health;
    this.width = 50;
    this.height = 50;
  }

  draw(ctx) {
    // fill the rect
    ctx.fillStyle = this.color;
    // create a shield if health greater than 1
    if (this.health > 1) {
      // draw the outline
      ctx.strokeStyle = "white";
    } else {
      // outline is the same color, so looks like no shield
      ctx.strokeStyle = this.color;
    }

    //  Draws a "filled" rectangle
    ctx.fillRect(this.x, this.y, this.width, this.height);
    // Draws a rectangle (no fill) / outline
    ctx.strokeRect(this.x, this.y, this.width, this.height);

    // draw text
    ctx.fillStyle = "black";
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
}
