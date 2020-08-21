import Options from '../Constants/options';
import Style from '../Css/style';
import Config from '../Config/config'; 

export default class Info extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.game = scene;
        scene.add.existing(this);
        this.setInteractive();
        const txtInfo = scene.add.dynamicBitmapText(Config.width - 1060, Config.height - 70, 'txt_bitmap', Options.txtInfo, Style.fontSize);
        txtInfo.setDisplayCallback(scene.textCallback);
        this.on('pointerdown', this.showPayTable, this);
    }

    showPayTable() {
        if (!Options.checkClick) {
            if(this.scene.audioSoundName === 'btn_sound.png') {
                this.scene.audioButton.play();
            }
            this.paytable = this.scene.add.sprite(Config.width / 2, Config.height / 2,
                'about', 'paytable.png').setInteractive();
            this.paytable.on('pointerdown', () => {
                if(this.scene.audioSoundName === 'btn_sound.png') {
                    this.scene.audioButton.play();
                }
                this.paytable.destroy();
            });
        }
    }
}