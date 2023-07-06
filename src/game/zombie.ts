import Phaser from 'phaser';
import Player from './player';
import TextureKeys from '../consts/TextureKeys';
import AnimationKeys from '../consts/AnimationKeys';

export default class Zombie extends Phaser.Physics.Arcade.Sprite{

        


        constructor(scene, x, y, texture){
            super(scene, x, y, texture)

            this.cursors = scene.input.keyboard.createCursorKeys();

            this.zombie=scene.add
            .sprite(0, 0, TextureKeys.Zombie)
            .setScale(0.3)
            .setOrigin(0.5, 1)
            .play(AnimationKeys.ZombieWalk)
            

                // this.add(this.player);
            scene.physics.add.existing(this);


            const body = this.body as Phaser.Physics.Arcade.Body
            this.hp = 100

    
    body.setSize(125, this.height * 0.4);
    body.setOffset(30,150);

    

        
        }
}


