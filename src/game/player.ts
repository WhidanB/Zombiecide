import Phaser from 'phaser';
import TextureKeys from '../consts/TextureKeys';
import AnimationKeys from '../consts/AnimationKeys';

export default class Player extends Phaser.Physics.Arcade.Sprite{

private lasers?: Phaser.Physics.Arcade.Group


        constructor(scene, x, y, texture){
            super(scene, x, y, texture)



            this.player=scene.add
            .sprite(0, 0, TextureKeys.Player)
            .setScale(0.3)
            .setOrigin(0.5, 1)
            .play(AnimationKeys.PlayerRight)
            

                // this.add(this.player);
            scene.physics.add.existing(this);




    


        

}

setLasers(lasers: Phaser.Physics.Arcade.Group){
this.lasers=lasers;
}

private throwLaser()
{
        this
}

preUpdate() {
        const body = this.body as Phaser.Physics.Arcade.Body;
        body.setSize(125, this.height * 0.4);
        body.setOffset(30,150);
        
        
}

update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
if(!cursors){
        return
}

if(Phaser.Input.Keyboard.JustDown(cursors.space!)){
       
        this.throwLaser()
        return
}

}

}

                  
            
              
                
        