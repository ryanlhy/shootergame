// dynamically create group of enemies and move in a fleet
import { bulletControllerEnemy } from "./app.js";
import BulletController, { BulletControllerEnemy } from "./BulletController.js";
import Enemy from "./Enemy.js";
export default class Fleet {
  constructor() {
    this.x = 100; // x position of first
    this.y = 200;
    this.health = 3;
    this.speedX = 0; //speed of movement towards x (create diagonal movement)
    this.speedY = 2; //speed of movement towards positive y downwards (create Vertical movement)

    this.enemies = [];

    this.columns = 4;
    this.rows = 2;
    const columns = 4;
    const rows = 1;

    // one
    this.enemies.push(
      new Enemy(
        200,
        -100,
        this.health,
        this.speedX,
        this.speedY,
        bulletControllerEnemy,
        1
      )
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
  draw() {
    // create rows and cols of enemies, 1st wave
    for (let x = 1; x <= this.columns; x++) {
      for (let y = 1; y <= this.rows; y++) {
        // randomise if there will be enemies created
        if (Math.floor(Math.random() * 2) === 0)
          this.enemies.push(
            new Enemy(
              x * 100 + Math.floor(Math.random() * 25),
              y * -this.y,
              this.health,
              this.speedX,
              this.speedY,
              bulletControllerEnemy,
              1
            )
          );
      }
    }
  }
}
