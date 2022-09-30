// dynamically create group of enemies and move in a fleet
import {
  bulletControllerEnemy,
  canvas,
  enemyWidth,
  enemyHeight,
} from "./app.js";
import BulletController, { BulletControllerEnemy } from "./BulletController.js";
import Enemy from "./Enemy.js";
export default class Fleet {
  constructor() {
    this.columns = 4;
    this.rows = 1;

    this.x = canvas.width / 4; //100; // distance till next enemy
    this.y = 200; // distance till next enemy
    this.health = 3;
    this.speedX = 0; //speed of movement towards x
    this.speedY = 2; //speed of movement towards positive y downwards (create Vertical movement)

    this.enemies = [];
    this.timeToNextEnemy = 50; // height of enemy

    // one
    this.enemies.push(
      new Enemy(200, 100, this.health, this.speedX, 0, bulletControllerEnemy, 1)
    );
    // this.enemies.push(
    //   new Enemy(
    //     150,
    //     -100,
    //     this.health,
    //     this.speedX,
    //     this.speedY,
    //     bulletControllerEnemy,
    //     1
    //   )
    // );

    // // create rows and cols of enemies, 1st wave
    // for (let x = 0; x < this.columns; x++) {
    //   for (let y = 0; y < this.rows; y++) {
    //     // randomise if there will be enemies created
    //     if (Math.floor(Math.random() * 2) === 0)
    //       this.enemies.push(
    //         new Enemy(
    //           x * 100 + this.x + Math.floor(Math.random() * 50),
    //           y * -80 + this.y,
    //           this.health,
    //           this.speedX,
    //           this.speedY,
    //           bulletControllerEnemy,
    //           1
    //         )
    //       );
    //   }
    // }
    // // create 2nd way of enemies, make y negative
    // for (let x = 0; x < columns; x++) {
    //   for (let y = 0; y < rows; y++) {
    //     this.enemies.push(
    //       new Enemy(x * 100 + this.x, -y * 80 - 500, this.health)
    //     );
    //   }
    // }
  }
  draw(score) {
    let stage = this.determineStage(score);
    console.log("stage " + stage);
    // create rows and cols of enemies, 1st wave
    for (let x = 0; x < this.columns; x++) {
      for (let y = 1; y <= this.rows; y++) {
        // randomise if there will be enemies created
        if (Math.floor(Math.random() * 1.5) === 0)
          this.enemies.push(
            new Enemy(
              this.x / 2 +
                x * this.x -
                enemyWidth / 2 -
                (Math.random() * this.x - this.x / 2) / 2,
              y * -this.y,
              this.health,
              this.speedX,
              this.speedY,
              bulletControllerEnemy,
              Math.floor(Math.random() * (stage + 1))
            )
          );
      }
      // diaganal enemies, higher speed.
      if (Math.floor(Math.random() * stage) >= 2)
        if (this.enemies.length <= 8)
          this.enemies.push(
            new Enemy(
              this.x +
                this.x / Math.floor(Math.random() * 2 + 1) -
                (Math.random() * this.x - this.x / 2) / 2,
              -this.y,
              this.health,
              this.speedX + (Math.random() * 0.7 - 0.7 / 2),
              this.speedY + 1,
              bulletControllerEnemy,
              Math.floor(Math.random() * stage + 1) //gun
            )
          );
    }
  }
  determineStage(score) {
    if (score <= 100) return 0;
    else if (score <= 200) return 1;
    else if (score <= 300) return 2;
    else if (score <= 400) return 3;
    else if (score <= 500) return 4;
    else return 4;
  }
}
