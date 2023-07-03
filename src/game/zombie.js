import Phaser from '/src/lib/phaser.js';
import Player from "/src/game/player.js";

export default class Zombie extends Phaser.Physics.Arcade.Sprite{



        constructor(scene, x, y, texture){
            super(scene, x, y, texture)
            scene.physics.add.existing(this);
            this.setScale(0.4)
            const body = this.body

    
    body.setSize(60, this.height * 0.5);
    body.setOffset(18,65);
    this.body.onCollide = true;
            scene.physics.add.collider(scene.player, this);
            scene.physics.add.collider(this, this);
            
            
            
            
            
            
        }

    //     preupdate(){
    //           super.preupdate()
    //
    }


