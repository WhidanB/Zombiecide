import Phaser from "../lib/phaser.js";

import Zombie from "/src/game/zombie.js";

import Player from "/src/game/player.js";

export default class Game extends Phaser.Scene {
  /** @type {Phaser.Physics.Arcade.Sprite} */
  player;

  /** @type {Phaser.Physics.Arcade.Sprite} */
  zombie;

  constructor() {
    super("game");
  }

  preload() {
    this.load.image("background", "./assets/background.png");
    this.load.image("player", "./assets/heros.png");
    this.load.image("zombie", "./assets/zombie.png");
  }

  create() {
    this.add.image(400, 400, "background").setScale(0.8);
    // this.add.image(100, 100, 'player')
    // this.add.image(300, 300, 'zombie')

    // const player = this.physics.add.sprite(150, 110, 'player')
    // .setScale(0.4)
    // const playerBody = player.body
    const player = new Player(this, 150, 110, "player");
    this.add.existing(player);

    for (let i = 0; i < 5; i++) {
      const x = Phaser.Math.Between(110, 800);
      const y = Phaser.Math.Between(110, 800);

      const zombie = new Zombie(this, x, y, "zombie");
      this.add.existing(zombie);
      console.log(zombie);
      const body = zombie.body;
    }

    // const x = Phaser. Math.Between(0, 1000)
    // const y = Phaser. Math.Between(150, 750)
    // const zombie = this.physics.add.sprite(x, y, 'zombie')
    // .setScale(0.4)
  }

  update() {
    // this.enemyFollows();
  }

  // enemyFollows () {
  //     this.physics.moveToObject(this.player, this.zombies, 100);
  // }
}
