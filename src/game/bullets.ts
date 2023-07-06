import Phaser from "phaser";

export default class bullet extends Phaser.Physics.Arcade.Sprite{

    constructor(scene: Phaser.Scene, x, y, texture){
        super(scene, x, y);

        this.bullet = scene.add
    }

}