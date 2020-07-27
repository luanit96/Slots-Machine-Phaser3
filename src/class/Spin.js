import { config } from '../Config/config';
import { options, audioMusic } from '../Constants/options';
import { style } from '../Css/style';

export default class Spin extends Phaser.Scene {
    constructor(scene) {
       super(scene);
       scene.add.existing(this);
       this.scene = scene;
       this.printResult();
       this.setColor();
    }

    setColor() {
        this.scene.bgSpin.setTint(0xffffff);
        this.scene.maxBet.setTint(0xffffff);
        this.scene.coin.setTint(0xffffff);
        this.scene.btnLine.setTint(0xffffff);
        this.scene.info.setTint(0xffffff);
        this.scene.credits.setTint(0xffffff);
        this.scene.btnMusic.setTint(0xffffff);
        this.scene.btnSound.setTint(0xffffff);
    }

    printResult() {
        const s1 = this.scene.columnTween1.targets[0];
        const s2 = this.scene.columnTween2.targets[0];
        const s3 = this.scene.columnTween3.targets[0];
        const s4 = this.scene.columnTween4.targets[0];
        const s5 = this.scene.columnTween5.targets[0];
        options.result.push([s1.list[3].frame.name, s2.list[3].frame.name, s3.list[3].
            frame.name, s4.list[3].frame.name, s5.list[3].frame.name], [s1.list[2].frame.name, s2.list[2].frame.name,
            s3.list[2].frame.name, s4.list[2].frame.name, s5.list[2].frame.name], [s1.list[1].frame.name, s2.list[1].frame.name,
            s3.list[1].frame.name, s4.list[1].frame.name, s5.list[1].frame.name]);
        this.getvalues();
    }

    getvalues() {
        switch(options.line) {
            case 1:
                this.getLine1();
                this.resetOptions();
                break;
            case 2:
                this.getLine1();
                this.getLine2();
                this.resetOptions();
                break;
            case 3:
                this.getLine1();
                this.getLine2();
                this.getLine3();
                this.resetOptions();
                break;
            case 4:
                this.getLine1();
                this.getLine2();
                this.getLine3();
                this.getLine4();
                this.resetOptions();
                break;
            case 5:
                this.getLine1();
                this.getLine2();
                this.getLine3();
                this.getLine4();
                this.getLine5();
                this.resetOptions();
                break;
            case 6:
                this.getLine1();
                this.getLine2();
                this.getLine3();
                this.getLine4();
                this.getLine5();
                this.getLine6();
                this.resetOptions();
                break;
            case 7:
                this.getLine1();
                this.getLine2();
                this.getLine3();
                this.getLine4();
                this.getLine5();
                this.getLine6();
                this.getLine7();
                this.resetOptions();
                break;
            case 8:
                this.getLine1();
                this.getLine2();
                this.getLine3();
                this.getLine4();
                this.getLine5();
                this.getLine6();
                this.getLine7();
                this.getLine8();
                this.resetOptions();
                break;
            case 9:
                this.getLine1();
                this.getLine2();
                this.getLine3();
                this.getLine4();
                this.getLine5();
                this.getLine6();
                this.getLine7();
                this.getLine8();
                this.getLine9();
                this.resetOptions();
                break;
            default:
                this.getLine1();
                this.getLine2();
                this.getLine3();
                this.getLine4();
                this.getLine5();
                this.getLine6();
                this.getLine7();
                this.getLine8();
                this.getLine9();
                this.getLine10();
                this.resetOptions();
        }
    }

    resetOptions() {
        //reset win && result 
        options.win = 0;
        options.moneyWin = 0;
        options.result = [];
    }

    getLine1() {
        if (options.result[1][0] == options.result[1][1] &&
            options.result[1][1] == options.result[1][2] && 
            options.result[1][2] == options.result[1][3] && 
            options.result[1][3] == options.result[1][4]) {
            if(options.musicName == 'btn_music.png') {
                //play audio win
                audioMusic.win.play();
            }
            //get money
            options.lineArray.push(this.scene.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_1.png'));
            this.threeMoney(options.result[1][0]);
        } else if (options.result[1][0] == options.result[1][1] &&
            options.result[1][1] == options.result[1][2] && options.result[1][2]
            == options.result[1][3]) {
            if(options.musicName == 'btn_music.png') {
                //play audio win
                audioMusic.win.play();
            }
            //get money
            options.lineArray.push(this.scene.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_1.png'));
            this.twoMoney(options.result[1][0]);
        } else if (options.result[1][0] == options.result[1][1] && options.result[1][1]
            == options.result[1][2]) {
            if(options.musicName == 'btn_music.png') {
                //play audio win
                audioMusic.win.play();
            }
            //get money 
            options.lineArray.push(this.scene.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_1.png'));
            this.oneMoney(options.result[1][0]);
        }
    }

    getLine2() {
        if (options.result[0][0] == options.result[0][1] &&
            options.result[0][1] == options.result[0][2] && options.result[0][2]
            == options.result[0][3] && options.result[0][3] == options.result[0][4]) {
            if(options.musicName == 'btn_music.png') {
                //play audio win
                audioMusic.win.play();
            }
            // get money
            options.lineArray.push(this.scene.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_2.png'));
            this.threeMoney(options.result[0][0]);
        } else if (options.result[0][0] == options.result[0][1] &&
            options.result[0][1] == options.result[0][2] && options.result[0][2] ==
            options.result[0][3]) {
            if(options.musicName == 'btn_music.png') {
                //play audio win
                audioMusic.win.play();
            }
            // get money
            options.lineArray.push(this.scene.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_2.png'));
            this.twoMoney(options.result[0][0]);
        } else if (options.result[0][0] == options.result[0][1] && options.result[0][1]
            == options.result[0][2]) {
            if(options.musicName == 'btn_music.png') {
                //play audio win
                audioMusic.win.play();
            }
            // get money
            options.lineArray.push(this.scene.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_2.png'));
            this.oneMoney(options.result[0][0]);
        }
    }

    getLine3() {
        if (options.result[2][0] == options.result[2][1] &&
            options.result[2][1] == options.result[2][2] && options.result[2][2]
            == options.result[2][3] && options.result[2][3] == options.result[2][4]) {
            if(options.musicName == 'btn_music.png') {
                //play audio win
                audioMusic.win.play();
            }
            //get money
            options.lineArray.push(this.scene.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_3.png'));
            this.threeMoney(options.result[2][0]);
        } else if (options.result[2][0] == options.result[2][1] &&
            options.result[2][1] == options.result[2][2] && options.result[2][2]
            == options.result[2][3]) {
            if(options.musicName == 'btn_music.png') {
                //play audio win
                audioMusic.win.play();
            }
            //get money
            options.lineArray.push(this.scene.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_3.png'));
            this.twoMoney(options.result[2][0]);
        } else if (options.result[2][0] == options.result[2][1] && options.result[2][1]
            == options.result[2][2]) {
            if(options.musicName == 'btn_music.png') {
                //play audio win
                audioMusic.win.play();
            }
            //get money
            options.lineArray.push(this.scene.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_3.png'));
            this.oneMoney(options.result[2][0]);
        }
    }
    getLine4() {
        if (options.result[0][0] == options.result[1][1] &&
            options.result[1][1] == options.result[2][2] && options.result[2][2] == 
            options.result[1][3] && options.result[1][3] == options.result[0][4]) {
            if(options.musicName == 'btn_music.png') {
                //play audio win
                audioMusic.win.play();
            }
            // get money
            options.lineArray.push(this.scene.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_4.png'));
            this.threeMoney(options.result[0][0]);
        } else if (options.result[0][0] == options.result[1][1] &&
            options.result[1][1] == options.result[2][2] && options.result[2][2] == 
            options.result[1][3]) {
            if(options.musicName == 'btn_music.png') {
                //play audio win
                audioMusic.win.play();
            }
            // get money
            options.lineArray.push(this.scene.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_4.png'));
            this.twoMoney(options.result[0][0]);
        } else if (options.result[0][0] == options.result[1][1] &&
            options.result[1][1] == options.result[2][2]) {
            if(options.musicName == 'btn_music.png') {
                //play audio win
                audioMusic.win.play();
            }
            // get money
            options.lineArray.push(this.scene.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_4.png'));
            this.oneMoney(options.result[0][0]);
        }
    }
    getLine5() {
        if (options.result[2][0] == options.result[1][1] &&
            options.result[1][1] == options.result[0][2] &&
            options.result[0][2] == options.result[1][3] && options.result[1][3]
            == options.result[2][4]) {
            if(options.musicName == 'btn_music.png') {
                //play audio win
                audioMusic.win.play();
            }
            // get money
            options.lineArray.push(this.scene.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_5.png'));
            this.threeMoney(options.result[2][0]);
        } else if (options.result[2][0] == options.result[1][1] &&
            options.result[1][1] == options.result[0][2] &&
            options.result[0][2] == options.result[1][3]) {
            if(options.musicName == 'btn_music.png') {
                //play audio win
                audioMusic.win.play();
            }
            // get money
            options.lineArray.push(this.scene.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_5.png'));
            this.twoMoney(options.result[2][0]);
        } else if (options.result[2][0] == options.result[1][1] &&
            options.result[1][1] == options.result[0][2]) {
            if(options.musicName == 'btn_music.png') {
                //play audio win
                audioMusic.win.play();
            }
            // get money
            options.lineArray.push(this.scene.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_5.png'));
            this.oneMoney(options.result[2][0]);
        }
    }

    getLine6() {
        if (options.result[1][0] == options.result[0][1] &&
            options.result[0][1] == options.result[0][2] && options.result[0][2] ==
            options.result[0][3] && options.result[0][3] == options.result[1][4]) {
            if(options.musicName == 'btn_music.png') {
                //play audio win
                audioMusic.win.play();
            }
            // get money
            options.lineArray.push(this.scene.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_6.png'));
            this.threeMoney(options.result[1][0]);
        } else if (options.result[1][0] == options.result[0][1] &&
            options.result[0][1] == options.result[0][2] && options.result[0][2] ==
            options.result[0][3]) {
            if(options.musicName == 'btn_music.png') {
                //play audio win
                audioMusic.win.play();
            }
            // get money
            options.lineArray.push(this.scene.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_6.png'));
            this.twoMoney(options.result[1][0]);
        } else if (options.result[1][0] == options.result[0][1] &&
            options.result[0][1] == options.result[0][2]) {
            if(options.musicName == 'btn_music.png') {
                //play audio win
                audioMusic.win.play();
            }
            // get money
            options.lineArray.push(this.scene.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_6.png'));
            this.oneMoney(options.result[1][0]);
        }
    }

    getLine7() {
        if (options.result[1][0] == options.result[2][1] &&
            options.result[2][1] == options.result[2][2] && options.result[2][2]
            == options.result[2][3] && options.result[2][3] == options.result[1][4]) {
            if(options.musicName == 'btn_music.png') {
                //play audio win
                audioMusic.win.play();
            }
            // get money
            options.lineArray.push(this.scene.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_7.png'));
            this.threeMoney(options.result[1][0]);
        } else if (options.result[1][0] == options.result[2][1] &&
            options.result[2][1] == options.result[2][2] && options.result[2][2]
            == options.result[2][3]) {
            if(options.musicName == 'btn_music.png') {
                //play audio win
                audioMusic.win.play();
            }
            // get money
            options.lineArray.push(this.scene.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_7.png'));
            this.twoMoney(options.result[1][0]);
        } else if (options.result[1][0] == options.result[2][1] &&
            options.result[2][1] == options.result[2][2]) {
            if(options.musicName == 'btn_music.png') {
                //play audio win
                audioMusic.win.play();
            }
            // get money
            options.lineArray.push(this.scene.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_7.png'));
            this.oneMoney(options.result[1][0]);
        }
    }

    getLine8() {
        if (options.result[0][0] == options.result[0][1] &&
            options.result[0][1] == options.result[1][2] && options.result[1][2] == 
            options.result[2][3] && options.result[2][3] == options.result[2][4]) {
            if(options.musicName == 'btn_music.png') {
                //play audio win
                audioMusic.win.play();
            }
            // get money
            options.lineArray.push(this.scene.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_8.png'));
            this.threeMoney(options.result[0][0]);
        } else if (options.result[0][0] == options.result[0][1] &&
            options.result[0][1] == options.result[1][2] && options.result[1][2] == 
            options.result[2][3]) {
            if(options.musicName == 'btn_music.png') {
                //play audio win
                audioMusic.win.play();
            }
            // get money
            options.lineArray.push(this.scene.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_8.png'));
            this.twoMoney(options.result[0][0]);
        } else if(options.result[0][0] == options.result[0][1] &&
            options.result[0][1] == options.result[1][2]) {
            if(options.musicName == 'btn_music.png') {
                //play audio win
                audioMusic.win.play();
            }
            // get money
            options.lineArray.push(this.scene.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_8.png'));
            this.oneMoney(options.result[0][0]);
        }
    }

    getLine9() {
        if (options.result[2][0] == options.result[2][1] &&
            options.result[2][1] == options.result[1][2] && options.result[1][2] == 
            options.result[0][3] && options.result[0][3] == options.result[0][4]) {
            if(options.musicName == 'btn_music.png') {
                //play audio win
                audioMusic.win.play();
            }
            // get money
            options.lineArray.push(this.scene.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_9.png'));
            this.threeMoney(options.result[2][0]);
        } else if (options.result[2][0] == options.result[2][1] &&
            options.result[2][1] == options.result[1][2] && options.result[1][2] == 
            options.result[0][3]) {
            if(options.musicName == 'btn_music.png') {
                //play audio win
                audioMusic.win.play();
            }
            // get money
            options.lineArray.push(this.scene.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_9.png'));
            this.twoMoney(options.result[2][0]);
        } else if(options.result[2][0] == options.result[2][1] &&
            options.result[2][1] == options.result[1][2]) {
            if(options.musicName == 'btn_music.png') {
                //play audio win
                audioMusic.win.play();
            }
            // get money
            options.lineArray.push(this.scene.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_9.png'));
            this.oneMoney(options.result[2][0]);
        }
    }

    getLine10() {
        if (options.result[1][0] == options.result[2][1] &&
            options.result[2][1] == options.result[1][2] && options.result[1][2] == 
            options.result[0][3] && options.result[0][3] == options.result[1][4]) {
            if(options.musicName == 'btn_music.png') {
                //play audio win
                audioMusic.win.play();
            }
            // get money
            options.lineArray.push(this.scene.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_10.png'));
            this.threeMoney(options.result[1][0]);
        } else if (options.result[1][0] == options.result[2][1] &&
            options.result[2][1] == options.result[1][2] && options.result[1][2] == 
            options.result[0][3]) {
            if(options.musicName == 'btn_music.png') {
                //play audio win
                audioMusic.win.play();
            }
            // get money
            options.lineArray.push(this.scene.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_10.png'));
            this.twoMoney(options.result[1][0]);
        } else if(options.result[1][0] == options.result[2][1] &&
            options.result[2][1] == options.result[1][2]) {
            if(options.musicName == 'btn_music.png') {
                //play audio win
                audioMusic.win.play();
            }
            // get money
            options.lineArray.push(this.scene.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_10.png'));
            this.oneMoney(options.result[1][0]);
        }
    }

    //get money
    oneMoney(value) {
        switch (value) {
            case 'symbols_0.png':
                this.getMoney(options.payvalues[0][0]);
                break;
            case 'symbols_1.png':
                this.getMoney(options.payvalues[1][0]);
                break;
            case 'symbols_2.png':
                this.getMoney(options.payvalues[2][0]);
                break;
            case 'symbols_3.png':
                this.getMoney(options.payvalues[3][0]);
                break;
            case 'symbols_4.png':
                this.getMoney(options.payvalues[4][0]);
                break;
            case 'symbols_5.png':
                this.getMoney(options.payvalues[5][0]);
                break;
            case 'symbols_6.png':
                this.getMoney(options.payvalues[6][0]);
                break;
            case 'symbols_7.png':
                this.getMoney(options.payvalues[7][0]);
                break;
            case 'symbols_8.png':
                this.getMoney(options.payvalues[8][0]);
                break;
            default:
                this.getMoney(options.payvalues[9][0]);
        }
    }

    twoMoney(value) {
        switch (value) {
            case 'symbols_0.png':
                this.getMoney(options.payvalues[0][1]);
                break;
            case 'symbols_1.png':
                this.getMoney(options.payvalues[1][1]);
                break;
            case 'symbols_2.png':
                this.getMoney(options.payvalues[2][1]);
                break;
            case 'symbols_3.png':
                this.getMoney(options.payvalues[3][1]);
                break;
            case 'symbols_4.png':
                this.getMoney(options.payvalues[4][0]);
                break;
            case 'symbols_5.png':
                this.getMoney(options.payvalues[5][1]);
                break;
            case 'symbols_6.png':
                this.getMoney(options.payvalues[6][1]);
                break;
            case 'symbols_7.png':
                this.getMoney(options.payvalues[7][1]);
                break;
            case 'symbols_8.png':
                this.getMoney(options.payvalues[8][1]);
                break;
            default:
                this.getMoney(options.payvalues[9][1]);
        }
    }

    threeMoney(value) {
        switch (value) {
            case 'symbols_0.png':
                this.getMoney(options.payvalues[0][2]);
                break;
            case 'symbols_1.png':
                this.getMoney(options.payvalues[1][2]);
                break;
            case 'symbols_2.png':
                this.getMoney(options.payvalues[2][2]);
                break;
            case 'symbols_3.png':
                this.getMoney(options.payvalues[3][2]);
                break;
            case 'symbols_4.png':
                this.getMoney(options.payvalues[4][2]);
                break;
            case 'symbols_5.png':
                this.getMoney(options.payvalues[5][2]);
                break;
            case 'symbols_6.png':
                this.getMoney(options.payvalues[6][2]);
                break;
            case 'symbols_7.png':
                this.getMoney(options.payvalues[7][2]);
                break;
            case 'symbols_8.png':
                this.getMoney(options.payvalues[8][2]);
                break;
            default:
                this.getMoney(options.payvalues[9][2]);
        }
    }

    getMoney(money) {
        let maxBet = options.line * options.coin;
        let payValue = money / options.line;
        options.win += (payValue * maxBet);
        this.setTextureWin(options.win);
    }

    setTextureWin(value) {
        options.moneyWin = value;
        this.scene.valueMoney += options.moneyWin;
        if (!this.scene.txtWin) {
            this.scene.txtWin = this.scene.add.text(config.width - 340, config.height - 130, 'WIN: ' + options.moneyWin + ' $ ', style.styleWin);
        } else {
            this.scene.txtWin.destroy();
            this.scene.txtWin = this.scene.add.text(config.width - 340, config.height - 130, 'WIN: ' + options.moneyWin + ' $ ', style.styleWin);
        }
        //save localStorage
        this.scene.saveLocalStorage();
    }
}