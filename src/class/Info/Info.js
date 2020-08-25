import Options from '../../Constants/options';
import Style from '../../Css/style';
import Config from '../../Config/config';
import Key from '../../Key/keyScene';
import Sprite from '../Sprite';

export default class Info {
    constructor(scene, keyInfo = Key.info) {
        this.scene = scene;
        this.addInfo();
    }

    addInfo() {
        this.info = new Sprite(this.scene, Config.width - 1020, Config.height - 50, 'bgButtons', 'btn-info.png');
        //add bitmap text
        const txtInfo = this.scene.add.dynamicBitmapText(Config.width - 1060, Config.height - 70, 'txt_bitmap', Options.txtInfo, Style.fontSize);
        txtInfo.setDisplayCallback(this.scene.textCallback);
        this.info.on('pointerdown', () => this.showPayTable(), this);
    }

    showPayTable() {
        if (!Options.checkClick) {
            if(this.scene.audioSoundName === 'btn_sound.png') {
                this.scene.audioObject.audioButton.play();
            }
            this.paytable = this.scene.add.sprite(Config.width / 2, Config.height / 2,
                'about', 'paytable.png').setInteractive();
            this.paytable.on('pointerdown', () => {
                if(this.scene.audioSoundName === 'btn_sound.png') {
                    this.scene.audioObject.audioButton.play();
                }
                this.paytable.destroy();
            });
        }
    }
}