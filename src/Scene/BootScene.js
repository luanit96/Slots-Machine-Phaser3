import Sprite from '../Class/Sprite';
import Config from '../Config/config';

export default class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    create() {
        //add music audio
        this.musicBackgroundDefault = this.sound.add('backgroundDefault', {
            loop: true,
            volume: 1.5
        });
        this.musicBackgroundDefault.play();
        const bgloading = new Sprite(this, Config.width / 2, Config.height / 2, 'bgPreload', 'bg_menu.png');
        const title = new Sprite(this, Config.width / 2, Config.height - 550, 'title', 'game_title.png').setScale(0.9);
        this.btn = new Sprite(this, Config.width / 2, Config.height - 250, 'btn', 'btn_play.png').setScale(0.9);
        this.btn.on('pointerdown', () => {
            //stop audio background Default
            this.musicBackgroundDefault.stop();
            this.btn.setScale(0.5);
            this.scene.start('GameScene');
        });
        this.btn.on('pointerup', () => this.btn.setScale(0.9));
    }
}