import Phaser from '/src/lib/phaser.js';
import Player from "/src/game/player.js";

export default class Zombie extends Phaser.Physics.Arcade.Sprite{



        constructor(scene, x, y, texture){
            super(scene, x, y, texture)
            scene.physics.add.existing(this);
            this.setScale(0.4)
            scene.physics.add.collider(scene.player, this);
            scene.physics.add.collider(this, scene.zombies);
            this.body.onCollide = true;
            
            
            
            
            
        }

    //     preupdate(){
    //           super.preupdate()
    //
    }


