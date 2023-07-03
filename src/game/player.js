import Phaser from '/src/lib/phaser.js';

export default class Player extends Phaser.Physics.Arcade.Sprite{

        /**
     * @param {Phaser.Scene} scene
     * @param {number} x
     * @param {number} y 
     * @param {string} texture
    
     */

        constructor(scene, x, y, texture){
            super(scene, x, y, texture)
            this.setScale(0.4)
            scene.physics.add.existing(this);
            const body = this.body

    
    body.setSize(60, this.height * 0.5);
    body.setOffset(18,65);

        
        }
}