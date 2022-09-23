// dynamically create group of enemies and move in a fleet
import { canvas } from "./app.js";
import BulletController from "./BulletController.js";
import Enemy from "./Enemy.js";
export default class Fleet {
  constructor() {
    this.x = 100; // x position of first
    this.y = 20;
    this.health = 5;
    this.speedX = 1; //speed of movement towards x (create diagonal movement)
    this.speedY = 0;

    this.enemies = [];
    const columns = 4;
    const rows = 4;
    const bulletController = new BulletController(canvas);

    // one
    this.enemies.push(new Enemy(300, 200, this.health, 0, 0, bulletController));

    // // create rows and cols of enemies, 1st wave
    // for (let x = 0; x < columns; x++) {
    //   for (let y = 0; y < rows; y++) {
    //     this.enemies.push(
    //       new Enemy(x * 100 + this.x, y * 80 + this.y, this.health)
    //     );
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
}
