// controls the bullet array, timeTillNextBullet
import { Bullet, EnemyBullet } from "./Bullet.js";
import { ctx } from "./app.js";

export default class BulletController {
  // canvas = document.getElementById("game");
  constructor(canvas) {
    this.canvas = canvas;
  }
  // array to store bullets
  bullets = [];
  // gap between bullets, initialise
  timerTillNextBullet = 0;

  shoot(x, y, speedX, speedY, damage, delay, gun) {
    // if timerTillNextBullet is 0 or less, we can fire the next bullet
    if (this.timerTillNextBullet <= 0) {
      // for loop to shoot bullets according to num of guns
      // create a bullet and push to bullet array
      if (gun === 1) {
        this.bullets.push(new Bullet(x, y, speedX, speedY, damage));
      } else {
        for (let i = 0; i < Math.floor(gun / 2); i++) {
          // gun comes in pairs, unless single
          this.bullets.push(new Bullet(x + 10, y, speedX - i, speedY, damage)); //delay used by bulletcontroller
          this.bullets.push(new Bullet(x - 10, y, speedX + i, speedY, damage));
        }
      }
      this.timerTillNextBullet = delay;
    }

    // decrease the value of timeTillNextBullet for every time shoot get called, collision detection
    this.timerTillNextBullet--;
  }

  // loop over all the bullets in array and call draw method (bullet.draw)
  draw(ctx) {
    // console.log(this.bullets.length);
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
      // try: if enemy draw different bullet
      bullet.draw(ctx);
    });
  }

  // collide with method. can use for enemy or player
  collideWith(sprite, source) {
    // if there is at least one bullet (in array) hitting our sprite
    // create a test using some method
    return this.bullets.some((bullet) => {
      if (source === "playershoots") {
        // if there is a collision
        if (bullet.collideWith(sprite)) {
          // remove bullet from bullet array, since it collided with something
          this.bullets.splice(this.bullets.indexOf(bullet), 1);
          return true;
        }
      } else if (source === "enemyshoots") {
        console.log("Enemy Shoots: " + source);
        if (bullet.collideWith(sprite)) {
          // remove bullet from bullet array, since it collided with something
          this.bullets.splice(this.bullets.indexOf(bullet), 1);
          return true;
        }
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

class BulletControllerEnemy extends BulletController {
  constructor(canvas) {
    super(canvas);
  }

  shoot(x, y, speedX, speedY, damage, delay, gun) {
    // if timerTillNextBullet is 0 or less, we can fire the next bullet
    if (this.timerTillNextBullet <= 0) {
      // note to set an identifier bullet source, enemy or player
      // for loop to shoot bullets according to num of guns
      // create a bullet and push to bullet array
      if (gun === 1) {
        this.bullets.push(new EnemyBullet(x, y, speedX, speedY, damage));
      } else {
        for (let i = 0; i < Math.floor(gun / 2); i++) {
          // gun comes in pairs, unless single
          this.bullets.push(
            new EnemyBullet(x + 10, y, speedX - i, speedY, damage)
          );
          //delay used by bulletcontroller
          this.bullets.push(
            new EnemyBullet(x - 10, y, speedX + i, speedY, damage)
          );
        }
      }
      this.timerTillNextBullet = delay;
    }

    // decrease the value of timeTillNextBullet for every time shoot get called, collision detection
    this.timerTillNextBullet--;
  }

  draw(ctx) {
    // console.log("enemy" + this.bullets.length);
    // loop over all the bullets
    // and for each bullet, draw
    // console.log("bulletcontrolenemy");
    // console.log(bullets);
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
      console.log("bullet drawing without keypress");
    });
  }
  isBulletOffScreen(bullet) {
    return bullet.y <= bullet.height;
  }
}
export { BulletControllerEnemy };
