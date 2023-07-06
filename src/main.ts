


import Phaser from "phaser";

import Game from "./scenes/Game";
import Preloader from "./Preloader";
import SceneKeys from "./consts/SceneKeys";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "app",
  width: 800,
  height: 800,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  scene: [Preloader, Game],
};

export default new Phaser.Game(config);