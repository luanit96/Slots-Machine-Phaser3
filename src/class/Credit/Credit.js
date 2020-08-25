import Key from '../../Key/keyScene';
import Options from '../../Constants/options';
import Sprite from '../Sprite';
import Config from '../../Config/config';

export default class Credit {
    constructor(scene, keyCredit = Key.credit) {
        this.scene = scene;
        this.addCredit();
    }

    addCredit() {
        this.credits = new Sprite(this.scene, Config.width - 235, Config.height - 680,
            'about', 'btn-credits.png').setScale(0.7);
        this.credits.on('pointerdown', () => {
            if (!Options.checkClick) {
                if(this.scene.audioSoundName === 'btn_sound.png') {
                    this.scene.audioObject.audioButton.play();
                }
                this.credits.setScale(0.6);
                this.paylines = new Sprite(this.scene,Config.width / 2, Config.height / 2,
                    'about', 'palines.png').setInteractive();
                this.paylines.on('pointerdown', () => {
                    if(this.scene.audioSoundName === 'btn_sound.png') {
                        this.scene.audioObject.audioButton.play();
                    }
                    this.paylines.destroy();
                    this.credits.setScale(0.7);
                });
            }
        });
    }
}