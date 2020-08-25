import Sprite from '../Class/Sprite';
import Audio from '../Class/Audio/Audio';
import Key from '../Key/keyScene';
import Config from '../Config/config';

export default class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: Key.boot });
    }

    create() {
        //Class Audio
        this.audioObject = new Audio(this, Key.audio);
        this.audioObject.musicBackgroundDefault.play();
        const bgloading = new Sprite(this, Config.width / 2, Config.height / 2, 'bgPreload', 'bg_menu.png');
        const title = new Sprite(this, Config.width / 2, Config.height - 550, 'title', 'game_title.png').setScale(0.9);
        this.btn = new Sprite(this, Config.width / 2, Config.height - 250, 'btn', 'btn_play.png').setScale(0.9);
        this.btn.on('pointerdown', () => {
            //stop audio background Default
            this.audioObject.musicBackgroundDefault.stop();
            this.btn.setScale(0.5);
            this.scene.start(Key.game);
        });
        this.btn.on('pointerup', () => this.btn.setScale(0.9));
    }
}