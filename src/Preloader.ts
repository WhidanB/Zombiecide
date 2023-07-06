import Phaser from "phaser";
import TextureKeys from "./consts/TextureKeys";
import SceneKeys from "./consts/SceneKeys";
import AnimationKeys from "./consts/AnimationKeys";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Preloader);
  }


    
    preload() {
      this.load.image("tiles", "./assets/Tilesheet/tilesheet_complete.png");
      this.load.image(TextureKeys.Laser, "./assets/laserBlue01.png")
      this.load.image(TextureKeys.Laser2, "./assets/laserBlue02.png")
      this.load.tilemapTiledJSON("map", "./assets/map/map.json");
      // this.load.image("background", "./assets/background.png");
  
 

  
    this.load.atlas(
      TextureKeys.Player,
      "assets/player.png",
      "assets/player.json"
    );

    this.load.atlas(
      TextureKeys.Zombie,
      "./assets/zombie.png",
      "./assets/zombie.json"
    )
  }

  create() {

  
    this.anims.create({
      key: AnimationKeys.PlayerRight, 
    
      frames: this.anims.generateFrameNames(TextureKeys.Player, {
        start: 1,
        end: 3,
        prefix: "herosRight",
       
        suffix: ".png",
      }),
      frameRate: 10,
      repeat: -1, 
    });

    this.anims.create({
      key: AnimationKeys.PlayerLeft, 
    
      frames: this.anims.generateFrameNames(TextureKeys.Player, {
        start: 0,
        end: 2,
        prefix: "heros-left",
       
        suffix: ".png",
      }),
      frameRate: 10,
      repeat: -1, 
    });


this.anims.create({
  key: AnimationKeys.PlayerIdle,
  frames:[
    {
      key:TextureKeys.Player,
      frame: "heros.png"
    }
  ]
})
 
    this.anims.create({
      key: AnimationKeys.ZombieWalk, 
    
      frames: this.anims.generateFrameNames(TextureKeys.Zombie, {
        start: 0,
        end: 7,
        prefix: "character_zombie_walk",
       
        suffix: ".png",
      }),
      frameRate: 10,
      repeat: -1, 
    });

  
    this.scene.start(SceneKeys.Game);
}

}
