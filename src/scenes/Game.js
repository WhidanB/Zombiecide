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
    this.add.image(400, 400, "background").setScale(0.8);
    // this.add.image(100, 100, 'player')
    // this.add.image(300, 300, 'zombie')

    // const player = this.physics.add.sprite(150, 110, 'player')
    // .setScale(0.4)
    // const playerBody = player.body
    this.player = new Player(this, 150, 110, "player");
    this.add.existing(this.player);
    this.physics.add.existing(this.player)
    
    // this.player2 = new Player(this, 300, 220, "player");
    // this.add.existing(this.player2)
    // this.physics.add.existing(this.player2)
    // this.physics.add.collider(this.player, this.player2);
    this.zombiespawn();
      setInterval(this.zombiespawn, 5000)
    }


    // const x = Phaser. Math.Between(0, 1000)
    // const y = Phaser. Math.Between(150, 750)
    // const zombie = this.physics.add.sprite(x, y, 'zombie')
    // .setScale(0.4)
  

  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-200);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(200);
    }else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-200);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(200);
    } else {
      this.player.setVelocity(0);
    }

//     enemyChasePlayer(this.zombie, this.player, 200); // Utilisez la vitesse appropriée
//     }
//     // this.zombie.enemyFollows(this.player, this.zombie, 100);
  


// //  const enemyFollows = function(){
// //   this.physics.moveToObject(this.player, this.zombie, 100);
// //   }
//  enemyChasePlayer(enemy, player, speed) {
//   const angle = Phaser.Math.Angle.Between(enemy.x, enemy.y, player.x, player.y);
//   const velocityX = Math.cos(angle) * speed;
//   const velocityY = Math.sin(angle) * speed;
  
//   enemy.setVelocity(velocityX, velocityY);

}

zombiespawn(){
  for (let i = 0; i < 5; i++) {
  const x = Phaser.Math.Between(110, 800);
  const y = Phaser.Math.Between(110, 800);
  
  this.zombie = new Zombie(this, x, y, "zombie");
  this.add.existing(this.zombie);
  this.physics.add.existing(this.zombie)
  console.log(this.zombie);
  this.physics.add.collider(this.player, this.zombie);
  this.physics.add.collider(this.zombie, this.zombie);
}}
}
