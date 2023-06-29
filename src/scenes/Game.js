import Phaser from "../lib/phaser.js";

import Zombie from "/src/game/zombie.js";

import Player from "/src/game/player.js";

export default class Game extends Phaser.Scene {
  /** @type {Phaser.Physics.Arcade.Sprite} */
  player;

  /** @type {Phaser.Physics.Arcade.Sprite} */
  zombie;

  /**@type {Phaser.Types.Input.Keyboard.CursorKeys} */
  cursors;
  /** @type {Phaser.Physics.Arcade.Sprite} */
  zombies;

  /**@type {Phaser.Physics.Arcade.Sprite} */
  child;

  constructor() {
    super("game");
  }

  preload() {
    this.load.image("background", "./assets/background.png");
    this.load.image("player", "./assets/heros.png");
    this.load.image("zombie", "./assets/zombie.png");

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    this.physics.world.setBounds(0, 0, 800, 800);
    this.add.image(400, 400, "background").setScale(0.8);
    // this.add.image(100, 100, 'player')
    // this.add.image(300, 300, 'zombie')

    // const player = this.physics.add.sprite(150, 110, 'player')
    // .setScale(0.4)
    // const playerBody = player.body
    this.player = new Player(this, 150, 110, "player");
    this.add.existing(this.player);
    this.physics.add.existing(this.player);
    this.player.setCollideWorldBounds(true);

    // this.player2 = new Player(this, 300, 220, "player");
    // this.add.existing(this.player2)
    // this.physics.add.existing(this.player2)
    // this.physics.add.collider(this.player, this.player2);

    // this.zombiespawn();
    console.log(this.zombies);
    this.zombies = this.physics.add.group({
      classType: Zombie,
    });

    for (let i = 0; i < 5; i++) {
      const x = Phaser.Math.Between(50, 800);

      const y = Phaser.Math.Between(110, 800);

      this.zombies.get(x, y, "zombie");
    }

    const child = this.zombies.getChildren();
    console.log(child);
    child.forEach((e) => {
      console.log(e);
      e.body.setCollideWorldBounds(true);
      e.setImmovable(true);
      // e.body.onCollide = true;
      this.enemyChasePlayer(e, this.player, 50);
    });

    setInterval(this.newSpawn, 5000);
    // setInterval(this.zombiespawn, 5000);
  }

  update() {
    const child = this.zombies.getChildren();
    child.forEach((e) => {
      this.enemyChasePlayer(e, this.player, 50);
    });

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-100);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(100);
    } else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-100);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(100);
    } else {
      this.player.setVelocity(0);
    }
  }

  zombiespawn = () => {
    this.zombies = this.physics.add.group({
      classType: Zombie,
    });
    for (let i = 0; i < 5; i++) {
      let rand = Math.floor(Math.random() * 2 + 1);
      let x;
      if (rand == 1) {
        x = Phaser.Math.Between(50, 300);
      } else if (rand == 2) {
        x = Phaser.Math.Between(500, 800);
      }
      const y = Phaser.Math.Between(110, 800);

      this.zombies.get(x, y, "zombie");

      this.enemyChasePlayer(this.zombies, this.player, 100);
    }
  };
  enemyChasePlayer(enemy, player, speed) {
    const angle = Phaser.Math.Angle.Between(
      enemy.x,
      enemy.y,
      player.x,
      player.y
    );
    const velocityX = Math.cos(angle) * speed;
    const velocityY = Math.sin(angle) * speed;

    enemy.setVelocity(velocityX, velocityY);
  }

  newSpawn() {
    this.zombies = this.physics.add.group({
      classType: Zombie,
    });

    for (let i = 0; i < 5; i++) {
      const x = Phaser.Math.Between(50, 800);

      const y = Phaser.Math.Between(110, 800);

      this.zombies.get(x, y, "zombie");
    }
  }
}
