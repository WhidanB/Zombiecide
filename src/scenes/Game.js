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

  /** @type {Phaser.GameObjects.Text} */
  hpText;

  constructor() {
    super("game");
  }

  preload() {
    this.load.image("player", "./assets/heros.png");
    this.load.image("zombie", "./assets/zombie.png");
    this.load.image("tiles", "./assets/Tilesheet/tilesheet_complete.png");
    this.load.tilemapTiledJSON("map", "./assets/map/map.json");
    // this.load.image("background", "./assets/background.png");

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    const map = this.make.tilemap({
      key: "map",
      tileWidth: 32,
      tileHeight: 32,
    });

    console.log(map);
    const tileset = map.addTilesetImage("tilesheet", "tiles");
    const bottomLayer = map.createLayer("bottomLayer", tileset, 0, 0);
    const middleLayer = map.createLayer("middleLayer", tileset, 0, 0);
    const objets = map.createLayer("objets", tileset);
    const aboveLayer = map.createLayer("aboveLayer", tileset, 0, 0);
    console.log(objets);
    objets.setCollisionByProperty({ collides: true });
    this.physics.world.setBounds(0, 0, 800, 800);
    // this.add.image(400, 400, "background").setScale(0.8);
    // this.add.image(100, 100, 'player')
    // this.add.image(300, 300, 'zombie')
    
    // const player = this.physics.add.sprite(150, 110, 'player')
    // .setScale(0.4)
    // const playerBody = player.body
    this.player = new Player(this, 300, 400, "player", 100);
    
    this.add.existing(this.player);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, objets)
    
    // this.player2 = new Player(this, 300, 220, "player");
    // this.add.existing(this.player2)
    // this.physics.add.existing(this.player2)
    // this.physics.add.collider(this.player, this.player2);

    // this.zombiespawn();
    // console.log(this.zombies);
    this.zombies = this.physics.add.group({
      classType: Zombie,
    });

    this.zombiespawn();
    this.time.addEvent({
      delay: 5000,
      loop: true,
      callback: ()=>{ this.zombiespawn()
      }
    })

//     let x;
//     let y;
//     let rand1
//     let rand2

//     for (let i = 0; i < 5; i++) {
//       rand1 = Math.floor(Math.random()*2 + 1)
//       rand2 = Math.floor(Math.random()*2 + 1)

//       if (rand1 == 1){
// x = Phaser.Math.Between(0, 200);
//       }else if(rand1 == 2){
//         x = Phaser.Math.Between(600,800);
//       }

// if (rand2 == 1){
//   y = Phaser.Math.Between(0, 200);
//         }else if(rand2 == 2){
//           y = Phaser.Math.Between(600,800);
//         }


//       this.zombies.get(x, y, "zombie");
//     }

    const child = this.zombies.getChildren();
    // console.log(child);
    child.forEach((e) => {
      // console.log(e);
      e.body.setCollideWorldBounds(true);
      e.setImmovable(true);
      // e.body.onCollide = true;
      this.enemyChasePlayer(e, this.player, 50);
    });

    // setInterval(this.newSpawn, 5000);
    // // setInterval(this.zombiespawn, 5000);
    this.physics.add.collider(this.zombies, objets)
    this.physics.add.collider(this.zombies, this.zombies)
    console.log(this.player);
    const style = {color: '#000', fontsize: 72}
    this.hpText = this.add.text(400, 700, 'HP: '+ this.player.hp, style)
      .setOrigin(0.5, 0)

      console.log(this.hpText);
      this.physics.add.collider(this.player, this.zombies, this.handleHP(this.player, this.hpText))
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
    let x;
    let y;
    let rand1
    let rand2

    for (let i = 0; i < 5; i++) {
      rand1 = Math.floor(Math.random()*2 + 1)
      rand2 = Math.floor(Math.random()*2 + 1)

      if (rand1 == 1){
x = Phaser.Math.Between(0, 200);
      }else if(rand1 == 2){
        x = Phaser.Math.Between(600,800);
      }

if (rand2 == 1){
  y = Phaser.Math.Between(0, 200);
        }else if(rand2 == 2){
          y = Phaser.Math.Between(600,800);
        }


      this.zombies.get(x, y, "zombie");
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

  handleHP(player, text)
  {

      

      player.hp - 10;

      const value = "HP:" + player.hp
      console.log("collision");
      console.log(player.hp);
      text.text = value
  }


}
