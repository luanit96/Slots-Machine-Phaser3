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

    /*end function*/

    showPayTable() {
        //play audio button
        this.scene.audioPlayButton();
        //function show value
        this.showTable();
        //event click
        this.paytable.on('pointerdown', () => this.deleteTable());
    }

    /* end funtion */

    showTable() {
        this.paytable = new Sprite(this.scene, Config.width / 2, Config.height / 2,
            'about', 'paytable.png').setInteractive();

        // for(let i = 0; i < Options.payvalues.length; i++) {
        //     for(let j = 0; j < Options.payvalues[i].length; j++) {
        //         if(i % 3) {
        //             console.log('i' + i);
        //         } else {
        //             console.log('i' + i);
        //         }
        //     }
        // }
        //width - 235 && height - 30  
        //column1
        // this.value = this.scene.add.text(Config.width - 1100, Config.height / 2 - 115, 
        //     '100', Style.styleValueTable);
        // this.value2 = this.scene.add.text(Config.width - 1100, Config.height / 2 - 85, 
        //         '200', Style.styleValueTable);
        // this.value3 = this.scene.add.text(Config.width - 1100, Config.height / 2 - 55, 
        //     '300', Style.styleValueTable);
        //column2
        // this.value4 = this.scene.add.text(Config.width - 875, Config.height / 2 - 115, 
        //     '400', Style.styleValueTable);
        // this.value5 = this.scene.add.text(Config.width - 875, Config.height / 2 - 85, 
        //         '500', Style.styleValueTable);
        // this.value6 = this.scene.add.text(Config.width - 875, Config.height / 2 - 55, 
        //     '600', Style.styleValueTable);
        //column3
        // this.value7 = this.scene.add.text(Config.width - 645, Config.height / 2 - 115, 
        //     '400', Style.styleValueTable);
        // this.value8 = this.scene.add.text(Config.width - 645, Config.height / 2 - 85, 
        //         '500', Style.styleValueTable);
        // this.value9 = this.scene.add.text(Config.width - 645, Config.height / 2 - 55, 
        //     '600', Style.styleValueTable);
         //column4
        //  this.value10 = this.scene.add.text(Config.width - 415, Config.height / 2 - 115, 
        //     '400', Style.styleValueTable);
        // this.value11 = this.scene.add.text(Config.width - 415, Config.height / 2 - 85, 
        //         '500', Style.styleValueTable);
        // this.value12 = this.scene.add.text(Config.width - 415, Config.height / 2 - 55, 
        //     '600', Style.styleValueTable);
         //column5
        // this.value13 = this.scene.add.text(Config.width - 185, Config.height / 2 - 115, 
        //     '400', Style.styleValueTable);
        // this.value14 = this.scene.add.text(Config.width - 185, Config.height / 2 - 85, 
        //         '500', Style.styleValueTable);
        // this.value15 = this.scene.add.text(Config.width - 185, Config.height / 2 - 55, 
        //     '600', Style.styleValueTable);
    }

    /*end function*/

    deleteTable() {
        //play audio button
        this.scene.audioPlayButton();
        this.paytable.destroy();
    }

    /*end function*/
}