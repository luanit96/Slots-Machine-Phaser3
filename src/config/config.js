import GameScene from '../scenes/GameScene';

export const config = {
    type: Phaser.WEBGL,
    parent: "slot-game-phaser3",
    width: 1280,
    height: 720,
    physics : {
        default : 'arcade',
        arcade : {
            debug : false
        }
    },
    scene: GameScene
};