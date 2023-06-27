import Phaser from './lib/phaser.js'
import Game from './scenes/Game.js';



export default new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 800,
    physics:{
        default: 'arcade',
        arcade: {
            gravity:{
            y:0
            },
            debug: true,
        },
    },
    scene: Game
})


