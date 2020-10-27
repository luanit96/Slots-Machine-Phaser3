import Sprite from '../Class/Sprite';
import Audio from '../Class/Audio/Audio';
import Key from '../Key/keyScene';
import Config from '../Config/config';
//Scene Boot
export default class BootScene extends Phaser.Scene {
    constructor() {
        super(Key.boot);
    }

    create() {
        //Object scale
        const scaleObject = {
            default : 1.2,
            scale : 1.1,
            scale2 : 1,
            scale3 : 0.9
        };
        //Class Audio
        this.audioObject = new Audio(this, Key.audio);
        this.audioObject.musicBackgroundDefault.play();
        const bgloading = new Sprite(this, Config.width / 2, Config.height / 2, 'bgPreload', 'bg_menu.png');
        const title = new Sprite(this, Config.width / 2, Config.height - 500, 
            'logo', 'logo_game.png').setScale(scaleObject.default);
        //timer event loop setScale
        const timer = this.time.addEvent({
            delay: 150,
            callback: () => {
                if(title.scale === scaleObject.default) 
                    title.setScale(scaleObject.scale);
                else if(title.scale === scaleObject.scale) 
                    title.setScale(scaleObject.scale2);
                else if(title.scale === scaleObject.scale2) 
                    title.setScale(scaleObject.scale3);
                else 
                    title.setScale(scaleObject.default);
            },
            callbackScope: this,
            loop: true
        });
        this.btn = new Sprite(this, Config.width / 2, Config.height - 150, 'bgButtons', 'btn_play.png').setScale(0.9);
        this.btn.on('pointerdown', () => {
            //stop audio background Default
            this.audioObject.musicBackgroundDefault.stop();
            //remove timer event loop
            timer.remove();
            //play audio button
            this.audioObject.audioButton.play();
            this.scene.start(Key.game);
        });
    }
    /*end function create*/
}