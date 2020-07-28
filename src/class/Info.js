import Options from '../Constants/options';
import Style from '../Css/style';
import Config from '../Config/config'; 

export default class Info extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.setInteractive();
        const txtInfo = scene.add.text(Config.width - 1060, Config.height - 70, Options.txtInfo, Style.styleButton);
        this.on('pointerover', this.pointerOver, this);
        this.on('pointerout', this.pointerOut, this);
    }
    pointerOver() {
        if (!Options.checkClick) {
            this.paytable = this.scene.add.sprite(Config.width / 2, Config.height / 2,
                'about', 'paytable.png');
        }
    }
    pointerOut() {
        if (this.paytable) {
            this.paytable.destroy();
        }
    }
}