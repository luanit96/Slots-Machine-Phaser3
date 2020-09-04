import Options from '../../Constants/options';
import Style from '../../Css/style';
import Config from '../../Config/config';
import Key from '../../Key/keyScene';
import Sprite from '../Sprite';
//Class Info
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

    /*end function add info*/

    showPayTable() {
        //play audio button
        this.scene.audioPlayButton();
        //function show value
        this.showTable();
        //event click
        this.paytable.on('pointerdown', () => this.deleteTable());
    }

    /* end funtion show paytable*/

    showTable() {
        this.paytable = new Sprite(this.scene, Config.width / 2, Config.height / 2,
            'about', 'paytable.png').setInteractive();
    }

    /*end function show table*/

    deleteTable() {
        //play audio button
        this.scene.audioPlayButton();
        this.paytable.destroy();
    }

    /*end function delete table*/
}