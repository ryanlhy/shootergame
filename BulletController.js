import Bullet from "./Bullet.js";

export default class BulletController {
  // array to store bullets
  bullets = [];
  // gap between bullets
  timerTillNextBullet = 0;
  constructor(canvas) {
    this.canvas = canvas;
  }

  shoot(x, y, speed, damage, delay) {
    // if timerTillNextBullet is 0 or less, we can fire the next bullet
    if (this.timerTillNextBullet <= 0) {
      // create a bullet and push to bullet array
      this.bullets.push(new Bullet(x, y, speed, damage)); //delay used by bulletcontroller
      this.timerTillNextBullet = delay;
    }

    // decrease the value of timeTillNextBullet for every time shoot get called
    this.timerTillNextBullet--;
  }
  draw(ctx) {
    // loop over all the bullets
    // and for each bullet, draw
    this.bullets.forEach((bullet) => bullet.draw(ctx));
  }
}
