// controls the bullet array, timeTillNextBullet
import Bullet from "./Bullet.js";

export default class BulletController {
  // array to store bullets
  bullets = [];
  // gap between bullets
  timerTillNextBullet = 0;
  // canvas = document.getElementById("game");
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

    // decrease the value of timeTillNextBullet for every time shoot get called, collision detection
    this.timerTillNextBullet--;
  }

  // loop over all the bullets in array and call draw method (bullet.draw)
  draw(ctx) {
    console.log(this.bullets.length);
    // loop over all the bullets
    // and for each bullet, draw
    this.bullets.forEach((bullet) => {
      //   remove bullets that are off screen
      if (this.isBulletOffScreen(bullet)) {
        // identify index of bullet in question
        const index = this.bullets.indexOf(bullet);
        // removes 1 array element at index. overwrites array
        // essentially remove 1 bullet from the array
        this.bullets.splice(index, 1);
      }
      bullet.draw(ctx);
    });
  }

  // collide with method. can use for enemy or player
  collideWith(sprite) {
    // if there is at least one bullet (in array) hitting our sprite
    // create a test using some method
    return this.bullets.some((bullet) => {
      // if there is a collision
      if (bullet.collideWith(sprite)) {
        // remove bullet from bullet array, since it collided with something
        this.bullets.splice(this.bullets.indexOf(bullet), 1);
        return true;
      }
      return false;
    });
  }

  // bullets continue to be saved in the array, even if they are past outside the screen,
  // so, remove bullets when they are off screen
  isBulletOffScreen(bullet) {
    // is bullet's y position smaller/= (above the x axis/ top of screen) to bullet's height
    // negative height because full length of bullet must past the top of screen before it is removed
    // y will keep decreasing value as bullet moves higher
    // eg. bullet.y = 0, -bullet.height = -15, === false (bullet top touches screen top)
    // eg. bullet.y = -15, -bullet.height = -15, === true (bullet bottom just past screen top)
    return bullet.y <= -bullet.height;
  }
}
