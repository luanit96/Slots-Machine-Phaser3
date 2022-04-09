import Options from '../options';
import Config from '../config';
import Sprite from './Sprite';
//Class Info
export default class Info {
    constructor(scene) {
        this.scene = scene;
        this.addInfo();
        this.click = false;
    }

    addInfo() {
        this.info = new Sprite(this.scene, Config.width - 1020, Config.height - 50, 'bgButtons', 'btn-info.png');
        //add bitmap text
        const txtInfo = this.scene.add.dynamicBitmapText(Config.width - 1060, Config.height - 70, 'txt_bitmap', Options.txtInfo, 38);
        txtInfo.setDisplayCallback(this.scene.textCallback);
        this.info.on('pointerdown', this.showPayTable, this);
    }

    showPayTable() {
        if(!this.click) {
            //set click = true
            this.click = true;
            //play audio button
            this.scene.audioPlayButton();
            //function show table
            this.showTable();
            this.btnExit = new Sprite(this.scene, Config.width - 30 , 
                Config.height - 635, 'bgButtons', 'btn_exit.png').
                setScale(0.9).setDepth(1);
            this.btnExit.on('pointerdown', this.deleteTable, this);
        }
    }

    showTable() {
        this.payValues = [];

        this.paytable = new Sprite(this.scene, Config.width / 2, Config.height / 2,
            'about', 'paytable.png').setDepth(1);

        var width = 190, width2 = width, height = 25, height2 = 245;

        for(let i = 0; i < Options.payvalues.length; i++) {
            if(i >= 5) {
                for(let j = 0; j < Options.payvalues[i].length; j++) {
                    height2 -= 30;
                    this.payValues.push(this.scene.add.text(width2, Config.height / 2 + height2, Options.payvalues[i][j], {
                        fontSize : '30px',
                        color : '#630066',
                        fontFamily : 'PT Serif'
                    }).setDepth(1));
                }
                width2 += 225;
                height2 = 245;
            } else {
                for(let j = 0; j < Options.payvalues[i].length; j++) {
                    height += 30;
                    this.payValues.push(this.scene.add.text(width, Config.height / 2 - height, Options.payvalues[i][j], {
                        fontSize : '30px',
                        color : '#630066',
                        fontFamily : 'PT Serif'
                    }).setDepth(1));
                }
                width += 225;
                height = 25;
            }
        }
    }

    deleteTable() {
        //set click = false
        this.click = false;
        //play audio button
        this.scene.audioPlayButton();
        this.paytable.destroy();
        this.btnExit.destroy();
        if(this.payValues.length > 0) {
            for(let i = 0; i < this.payValues.length; i++) {
                this.payValues[i].destroy();
            }
        }
    }
}