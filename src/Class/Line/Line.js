import Key from '../../Key/keyScene';
import Config from '../../Config/config';
import Options from '../../Constants/options';
import Style from '../../Css/style';
import Sprite from '../Sprite';
//Class Line
export default class Line {
    constructor(scene, keyLine = Key.lines) {
        this.scene = scene;
        this.addLine();
    }

    addLine() {
        this.btnLine = new Sprite(this.scene, Config.width - 865, Config.height - 50, 'bgButtons', 'btn-line.png');
        this.txtLine = this.scene.add.dynamicBitmapText(Config.width - 915, Config.height - 70, 'txt_bitmap', Options.txtLine, Style.fontSize);
        this.txtLine.setDisplayCallback(this.scene.textCallback);
        this.txtCountLine = this.scene.add.text(Config.width - 880, Config.height - 140, Options.line, Style.styleButton);
        //pointer down
        this.btnLine.on('pointerdown', () => {
            if (!Options.checkClick && Options.txtAutoSpin === 'AUTO') {
                this.btnLine.setScale(0.9);
                //play audio button
                this.scene.audioPlayButton();
            
                if (Options.line < 20) {
                    Options.line ++;
                    this.txtCountLine.setText(Options.line);
                    this.scene.maxBet.txtCountMaxBet.setText('BET: ' + Options.line * Options.coin);
                } else {
                    Options.line = 1;
                    this.txtCountLine.setText(Options.line);
                    this.scene.maxBet.txtCountMaxBet.setText('BET: ' + Options.line * Options.coin);
                }
            }
        });
        //pointer up
        this.btnLine.on('pointerup', () => this.btnLine.setScale(1));
    }
    /*end function add line*/
}