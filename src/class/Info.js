import { options } from '../constants/options';
import { style } from '../css/style';
import { config } from '../config/config'; 

export default class Info extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.setInteractive();
        var txtInfo = scene.add.text(config.width - 1060, config.height - 70, options.txtInfo, style.styleButton);
        this.on('pointerover', this.pointerOver, this);
        this.on('pointerout', this.pointerOut, this);
    }
    pointerOver() {
        if (!options.checkClick) {
            this.paytable = this.scene.add.sprite(config.width / 2, config.height / 2,
                'about', 'paytable.png');
        }
    }
    pointerOut() {
        if (this.paytable) {
            this.paytable.destroy();
        }
    }
}