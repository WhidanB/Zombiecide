import Phaser from "phaser";
import SceneKeys from "../consts/SceneKeys";
import AnimationKeys from "../consts/AnimationKeys";
import TextureKeys from "../consts/TextureKeys";
import Zombie from "../game/zombie";
import Player from "../game/player";

export default class Game extends Phaser.Scene {
  public player!: Player;

  public zombie!: Zombie;

  public zombies!: Phaser.Physics.Arcade.Group;

  public cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  public laser!: Phaser.Physics.Arcade.Group;
  

  constructor() {
    super(SceneKeys.Game);
  }

 preload(){
  this.cursors = this.input.keyboard.createCursorKeys();
 }



  create(){

    const map = this.make.tilemap({
      key: "map",
      tileWidth: 32,
      tileHeight: 32,
    });

    const tileset = map.addTilesetImage("tilesheet", "tiles");
    const bottomLayer = map.createLayer("bottomLayer", tileset, 0, 0);
    const middleLayer = map.createLayer("middleLayer", tileset, 0, 0);
    const objets = map.createLayer("objets", tileset);
    const aboveLayer = map.createLayer("aboveLayer", tileset, 0, 0);
    
    objets.setCollisionByProperty({ collides: true });
    this.physics.world.setBounds(0, 0, 800, 800);

    this.laser = this.physics.add.group({
      classType: Phaser.Physics.Arcade.Image,
      collideWorldBounds: true,
      runChildUpdate: true
  });
    

    this.player = new Player(this, 300, 400, TextureKeys.Player)
    .setDepth(20)
    .setScale(0.25)
    
    this.add.existing(this.player);
    this.player.setCollideWorldBounds(true);
    console.log(this.player);
    this.physics.add.collider(this.player, objets);
    
    // this.player2 = new Player(this, 300, 220, "player");
    // this.add.existing(this.player2)
    // this.physics.add.existing(this.player2)
    // this.physics.add.collider(this.player, this.player2);


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
    });
    this.input.on('pointerdown', this.fireLaser, this);



    const child = this.zombies.getChildren();
   
    child.forEach((e) => {
     
      e.body.setCollideWorldBounds(true);
      e.setImmovable(true);
      e.setScale(0.25)
     
      this.enemyChasePlayer(e, this.player, 50);
    });


    this.physics.add.collider(this.zombies, objets)

      this.physics.add.collider(this.player, this.zombies)
      this.physics.add.collider(this.laser, this.zombies, this.handleLaserZombieCollision, undefined, this)
      this.physics.add.collider(this.laser, objets, this.zombieObjetsCollision, undefined, this)

  };



  update() {

  

    const child = this.zombies.getChildren();
  
    child.forEach((e) => {

      e.body.setCollideWorldBounds(true);
      e.setImmovable(true);
      e.setScale(0.25)
   
      this.enemyChasePlayer(e, this.player, 50);
      
    });

    if (this.cursors.left?.isDown) {
      this.player.setVelocityX(-100);
      this.player.anims.play(AnimationKeys.PlayerLeft);
      console.log(this.player);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(100);
      this.player.anims.play(AnimationKeys.PlayerRight);
    } else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-100);
      this.player.anims.play(AnimationKeys.PlayerLeft);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(100);
      this.player.anims.play(AnimationKeys.PlayerRight);
    } else {
      this.player.setVelocity(0);
      this.player.anims.play(AnimationKeys.PlayerIdle)
    }

    this.laser.getChildren().forEach((laser: Phaser.Physics.Arcade.Image) => {

      if (laser.active) {
          this.zombies.getChildren().forEach((zombie: Zombie) => {
              if (Phaser.Geom.Intersects.RectangleToRectangle(laser.getBounds(), zombie.getBounds())) {
                  laser.destroy();
                  zombie.destroy();
              }
          });
      }
  });

  }

  zombiespawn = () => {
    let x;
    let y;
    let rand1
    let rand2

    for (let i = 0; i < 10; i++) {
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


      this.zombies.get(x, y, TextureKeys.Zombie);
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
    enemy.anims.play(AnimationKeys.ZombieWalk)
  };

  fireLaser(pointer: Phaser.Input.Pointer) {
    const angle = Phaser.Math.Angle.Between(
        this.player.x,
        this.player.y,
        pointer.worldX,
        pointer.worldY
    );

    const velocityX = Math.cos(angle) * 500;
    const velocityY = Math.sin(angle) * 500;
if(velocityX>150 || velocityX< -150){
    const laser = this.laser.create(this.player.x, this.player.y, 'laser2') as Phaser.Physics.Arcade.Image;
    laser.setVelocity(velocityX, velocityY);
}else{
  const laser = this.laser.create(this.player.x, this.player.y, 'laser') as Phaser.Physics.Arcade.Image;
    laser.setVelocity(velocityX, velocityY);
}
}

handleLaserZombieCollision(laser: Phaser.GameObjects.GameObject, zombie: Phaser.GameObjects.GameObject) {

  (laser as Phaser.Physics.Arcade.Image).destroy();
  (zombie as Zombie).destroy();
}

zombieObjetsCollision(laser: Phaser.GameObjects.GameObject, objets: Phaser.GameObjects.GameObject){
  (laser as Phaser.Physics.Arcade.Image).destroy();
  (objets as Phaser.Physics.Arcade.Image).destroy();
}




}

