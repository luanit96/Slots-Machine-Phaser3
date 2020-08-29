import Key from '../../Key/keyScene';
import Config from '../../Config/config';
import Options from '../../Constants/options';
import Style from '../../Css/style';
import gameOptions from '../../Constants/gameOptions';
import FreeSpin from '../FreeSpin/FreeSpin';
import Sprite from '../Sprite';

export default class Spin {
    constructor(scene, keySpin = Key.spin) {
        this.scene = scene;
        this.printResult();
        this.clearColor();
        this.time = 0;
    }

    clearColor() {
        this.scene.baseSpin.bgSpin.clearTint();
        this.scene.autoSpin.buttonAuto.clearTint();
        this.scene.maxBet.maxBet.clearTint();
        this.scene.coin.coin.clearTint();
        this.scene.btnLine.btnLine.clearTint();
        //this.scene.info.info.clearTint();
        //this.scene.credits.credits.clearTint();
        this.scene.btnMusic.clearTint();
        this.scene.btnSound.clearTint();
    }

    /*end function*/

    printResult() {
        var s1, s2, s3, s4, s5;
        if(this.scene.baseSpin.tweens) {
            s1 = this.scene.baseSpin.tweens.columnTween1.targets[0];
            s2 = this.scene.baseSpin.tweens.columnTween2.targets[0];
            s3 = this.scene.baseSpin.tweens.columnTween3.targets[0];
            s4 = this.scene.baseSpin.tweens.columnTween4.targets[0];
            s5 = this.scene.baseSpin.tweens.columnTween5.targets[0];   
        } else {
            s1 = this.scene.autoSpin.tweens.columnTween1.targets[0];
            s2 = this.scene.autoSpin.tweens.columnTween2.targets[0];
            s3 = this.scene.autoSpin.tweens.columnTween3.targets[0];
            s4 = this.scene.autoSpin.tweens.columnTween4.targets[0];
            s5 = this.scene.autoSpin.tweens.columnTween5.targets[0];
        }
        Options.result.push([s1.list[3].frame.name, s2.list[3].frame.name, s3.list[3].
            frame.name, s4.list[3].frame.name, s5.list[3].frame.name], [s1.list[2].frame.name, s2.list[2].frame.name,
            s3.list[2].frame.name, s4.list[2].frame.name, s5.list[2].frame.name], [s1.list[1].frame.name, s2.list[1].frame.name,
            s3.list[1].frame.name, s4.list[1].frame.name, s5.list[1].frame.name]);
        this.getvalues();
    }

    /*end function*/

    getvalues() {
        switch (Options.line) {
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

    /*end function*/

    resetOptions() {
        //reset win && result 
        Options.win = 0;
        Options.moneyWin = 0;
        Options.result = [];
    }

    /*end function*/

    getLine1() {
        if (Options.result[1][0] === Options.result[1][1] &&
            Options.result[1][1] === Options.result[1][2] &&
            Options.result[1][2] === Options.result[1][3] &&
            Options.result[1][3] === Options.result[1][4]) {
            //play audio
            this.audioPlayWin();
            //get money
            Options.lineArray.push(new Sprite(this.scene, Config.width / 2, Config.height / 2,
                'line', 'payline_1.png'));
            this.threeMoney(Options.result[1][0]);
        } else if (Options.result[1][0] === Options.result[1][1] &&
            Options.result[1][1] === Options.result[1][2] && Options.result[1][2]
            === Options.result[1][3]) {
            //play audio
            this.audioPlayWin();
            //get money
            Options.lineArray.push(new Sprite(this.scene, Config.width / 2, Config.height / 2,
                'line', 'payline_1.png'));
            this.twoMoney(Options.result[1][0]);
        } else if (Options.result[1][0] === Options.result[1][1] && Options.result[1][1]
            === Options.result[1][2]) {
            //play audio
            this.audioPlayWin();
            //get money 
            Options.lineArray.push(new Sprite(this.scene, Config.width / 2, Config.height / 2,
                'line', 'payline_1.png'));
            this.oneMoney(Options.result[1][0]);
        } else {
            //play audio
            this.audioPlayLose();
        }
    }

    /*end function*/

    getLine2() {
        if (Options.result[0][0] === Options.result[0][1] &&
            Options.result[0][1] === Options.result[0][2] && Options.result[0][2]
            === Options.result[0][3] && Options.result[0][3] === Options.result[0][4]) {
            //play audio
            this.audioPlayWin();
            // get money
            Options.lineArray.push(new Sprite(this.scene, Config.width / 2, Config.height / 2,
                'line', 'payline_2.png'));
            this.threeMoney(Options.result[0][0]);
        } else if (Options.result[0][0] === Options.result[0][1] &&
            Options.result[0][1] === Options.result[0][2] && 
            Options.result[0][2] === Options.result[0][3]) {
            //play audio
            this.audioPlayWin();
            // get money
            Options.lineArray.push(new Sprite(this.scene, Config.width / 2, Config.height / 2,
                'line', 'payline_2.png'));
            this.twoMoney(Options.result[0][0]);
        } else if (Options.result[0][0] === Options.result[0][1] && Options.result[0][1]
            === Options.result[0][2]) {
            //play audio
            this.audioPlayWin();
            // get money
            Options.lineArray.push(new Sprite(this.scene, Config.width / 2,
                Config.height / 2,
                'line', 'payline_2.png'));
            this.oneMoney(Options.result[0][0]);
        } else {
            //play audio
            this.audioPlayLose();
        }
    }

    /*end function*/

    getLine3() {
        if (Options.result[2][0] === Options.result[2][1] &&
            Options.result[2][1] === Options.result[2][2] && Options.result[2][2]
            === Options.result[2][3] && Options.result[2][3] === Options.result[2][4]) {
            //play audio
            this.audioPlayWin();
            //get money
            Options.lineArray.push(new Sprite(this.scene, Config.width / 2, Config.height / 2,
                'line', 'payline_3.png'));
            this.threeMoney(Options.result[2][0]);
        } else if (Options.result[2][0] === Options.result[2][1] &&
            Options.result[2][1] === Options.result[2][2] && Options.result[2][2]
            === Options.result[2][3]) {
            //play audio
            this.audioPlayWin();
            //get money
            Options.lineArray.push(new Sprite(this.scene, Config.width / 2, Config.height / 2,
                'line', 'payline_3.png'));
            this.twoMoney(Options.result[2][0]);
        } else if (Options.result[2][0] === Options.result[2][1] && Options.result[2][1]
            === Options.result[2][2]) {
            //play audio
            this.audioPlayWin();
            //get money
            Options.lineArray.push(new Sprite(this.scene, Config.width / 2, Config.height / 2,
                'line', 'payline_3.png'));
            this.oneMoney(Options.result[2][0]);
        } else {
            //play audio
            this.audioPlayLose();
        }
    }

    /*end function*/

    getLine4() {
        if (Options.result[0][0] === Options.result[1][1] &&
            Options.result[1][1] === Options.result[2][2] && Options.result[2][2] ===
            Options.result[1][3] && Options.result[1][3] === Options.result[0][4]) {
            //play audio
            this.audioPlayWin();
            // get money
            Options.lineArray.push(new Sprite(this.scene, Config.width / 2, Config.height / 2,
                'line', 'payline_4.png'));
            this.threeMoney(Options.result[0][0]);
        } else if (Options.result[0][0] === Options.result[1][1] &&
            Options.result[1][1] === Options.result[2][2] && Options.result[2][2] ===
            Options.result[1][3]) {
            //play audio
            this.audioPlayWin();
            // get money
            Options.lineArray.push(new Sprite(this.scene, Config.width / 2, Config.height / 2,
                'line', 'payline_4.png'));
            this.twoMoney(Options.result[0][0]);
        } else if (Options.result[0][0] === Options.result[1][1] &&
            Options.result[1][1] === Options.result[2][2]) {
            //play audio
            this.audioPlayWin();
            // get money
            Options.lineArray.push(new Sprite(this.scene, Config.width / 2, Config.height / 2,
                'line', 'payline_4.png'));
            this.oneMoney(Options.result[0][0]);
        } else {
            //play audio
            this.audioPlayLose();
        }
    }

    /*end function*/

    getLine5() {
        if (Options.result[2][0] === Options.result[1][1] &&
            Options.result[1][1] === Options.result[0][2] &&
            Options.result[0][2] === Options.result[1][3] && Options.result[1][3]
            === Options.result[2][4]) {
            //play audio
            this.audioPlayWin();
            // get money
            Options.lineArray.push(new Sprite(this.scene, Config.width / 2, Config.height / 2,
                'line', 'payline_5.png'));
            this.threeMoney(Options.result[2][0]);
        } else if (Options.result[2][0] === Options.result[1][1] &&
            Options.result[1][1] === Options.result[0][2] &&
            Options.result[0][2] === Options.result[1][3]) {
            //play audio
            this.audioPlayWin();
            // get money
            Options.lineArray.push(new Sprite(this.scene,Config.width / 2, Config.height / 2,
                'line', 'payline_5.png'));
            this.twoMoney(Options.result[2][0]);
        } else if (Options.result[2][0] === Options.result[1][1] &&
            Options.result[1][1] === Options.result[0][2]) {
            //play audio
            this.audioPlayWin();
            // get money
            Options.lineArray.push(new Sprite(this.scene, Config.width / 2, Config.height / 2,
                'line', 'payline_5.png'));
            this.oneMoney(Options.result[2][0]);
        } else {
            //play audio
            this.audioPlayLose();
        }
    }

    /*end function*/

    getLine6() {
        if (Options.result[1][0] === Options.result[0][1] &&
            Options.result[0][1] === Options.result[0][2] && Options.result[0][2] ===
            Options.result[0][3] && Options.result[0][3] === Options.result[1][4]) {
            //play audio
            this.audioPlayWin();
            // get money
            Options.lineArray.push(new Sprite(this.scene, Config.width / 2, Config.height / 2,
                'line', 'payline_6.png'));
            this.threeMoney(Options.result[1][0]);
        } else if (Options.result[1][0] === Options.result[0][1] &&
            Options.result[0][1] === Options.result[0][2] && Options.result[0][2] ===
            Options.result[0][3]) {
            //play audio
            this.audioPlayWin();
            // get money
            Options.lineArray.push(new Sprite(this.scene, Config.width / 2, Config.height / 2,
                'line', 'payline_6.png'));
            this.twoMoney(Options.result[1][0]);
        } else if (Options.result[1][0] === Options.result[0][1] &&
            Options.result[0][1] === Options.result[0][2]) {
            //play audio
            this.audioPlayWin();
            // get money
            Options.lineArray.push(new Sprite(this.scene, Config.width / 2, Config.height / 2,
                'line', 'payline_6.png'));
            this.oneMoney(Options.result[1][0]);
        } else {
           //play audio
           this.audioPlayLose();
        }
    }

    /*end function*/

    getLine7() {
        if (Options.result[1][0] === Options.result[2][1] &&
            Options.result[2][1] === Options.result[2][2] && Options.result[2][2]
            === Options.result[2][3] && Options.result[2][3] === Options.result[1][4]) {
           //play audio
           this.audioPlayWin();
            // get money
            Options.lineArray.push(new Sprite(this.scene, Config.width / 2, Config.height / 2,
                'line', 'payline_7.png'));
            this.threeMoney(Options.result[1][0]);
        } else if (Options.result[1][0] === Options.result[2][1] &&
            Options.result[2][1] === Options.result[2][2] && Options.result[2][2]
            === Options.result[2][3]) {
            //play audio
            this.audioPlayWin();
            // get money
            Options.lineArray.push(new Sprite(this.scene, Config.width / 2, Config.height / 2,
                'line', 'payline_7.png'));
            this.twoMoney(Options.result[1][0]);
        } else if (Options.result[1][0] === Options.result[2][1] &&
            Options.result[2][1] === Options.result[2][2]) {
            //play audio
            this.audioPlayWin();
            // get money
            Options.lineArray.push(new Sprite(this.scene, Config.width / 2, Config.height / 2,
                'line', 'payline_7.png'));
            this.oneMoney(Options.result[1][0]);
        } else {
            //play audio
            this.audioPlayLose();
        }
    }

    /*end function*/

    getLine8() {
        if (Options.result[0][0] === Options.result[0][1] &&
            Options.result[0][1] === Options.result[1][2] && Options.result[1][2] ===
            Options.result[2][3] && Options.result[2][3] === Options.result[2][4]) {
            //play audio
            this.audioPlayWin();
            // get money
            Options.lineArray.push(new Sprite(this.scene, Config.width / 2, Config.height / 2,
                'line', 'payline_8.png'));
            this.threeMoney(Options.result[0][0]);
        } else if (Options.result[0][0] === Options.result[0][1] &&
            Options.result[0][1] === Options.result[1][2] && Options.result[1][2] ===
            Options.result[2][3]) {
            //play audio
            this.audioPlayWin();
            // get money
            Options.lineArray.push(new Sprite(this.scene, Config.width / 2, Config.height / 2,
                'line', 'payline_8.png'));
            this.twoMoney(Options.result[0][0]);
        } else if (Options.result[0][0] === Options.result[0][1] &&
            Options.result[0][1] === Options.result[1][2]) {
            //play audio
            this.audioPlayWin();
            // get money
            Options.lineArray.push(new Sprite(this.scene, Config.width / 2, Config.height / 2,
                'line', 'payline_8.png'));
            this.oneMoney(Options.result[0][0]);
        } else {
           //play audio
           this.audioPlayLose();
        }
    }

    /*end function*/

    getLine9() {
        if (Options.result[2][0] === Options.result[2][1] &&
            Options.result[2][1] === Options.result[1][2] && Options.result[1][2] ===
            Options.result[0][3] && Options.result[0][3] === Options.result[0][4]) {
            //play audio
            this.audioPlayWin();
            // get money
            Options.lineArray.push(new Sprite(this.scene, Config.width / 2, Config.height / 2,
                'line', 'payline_9.png'));
            this.threeMoney(Options.result[2][0]);
        } else if (Options.result[2][0] === Options.result[2][1] &&
            Options.result[2][1] === Options.result[1][2] && Options.result[1][2] ===
            Options.result[0][3]) {
            //play audio
            this.audioPlayWin();
            // get money
            Options.lineArray.push(new Sprite(this.scene, Config.width / 2, Config.height / 2,
                'line', 'payline_9.png'));
            this.twoMoney(Options.result[2][0]);
        } else if (Options.result[2][0] === Options.result[2][1] &&
            Options.result[2][1] === Options.result[1][2]) {
            //play audio
            this.audioPlayWin();
            // get money
            Options.lineArray.push(new Sprite(this.scene, Config.width / 2, Config.height / 2,
                'line', 'payline_9.png'));
            this.oneMoney(Options.result[2][0]);
        } else {
            //play audio
            this.audioPlayLose();
        }
    }

    /*end function*/

    getLine10() {
        if (Options.result[1][0] === Options.result[2][1] &&
            Options.result[2][1] === Options.result[1][2] && Options.result[1][2] ===
            Options.result[0][3] && Options.result[0][3] === Options.result[1][4]) {
            //play audio
            this.audioPlayWin();
            // get money
            Options.lineArray.push(new Sprite(this.scene, Config.width / 2, Config.height / 2,
                'line', 'payline_10.png'));
            this.threeMoney(Options.result[1][0]);
        } else if (Options.result[1][0] === Options.result[2][1] &&
            Options.result[2][1] === Options.result[1][2] && Options.result[1][2] ===
            Options.result[0][3]) {
            //play audio
            this.audioPlayWin();
            // get money
            Options.lineArray.push(new Sprite(this.scene, Config.width / 2, Config.height / 2,
                'line', 'payline_10.png'));
            this.twoMoney(Options.result[1][0]);
        } else if (Options.result[1][0] === Options.result[2][1] &&
            Options.result[2][1] === Options.result[1][2]) {
            //play audio
            this.audioPlayWin();
            //get money
            Options.lineArray.push(new Sprite(this.scene, Config.width / 2, Config.height / 2,
                'line', 'payline_10.png'));
            this.oneMoney(Options.result[1][0]);
        } else {
            this.audioPlayLose();
        }
    }

    /*end function*/

    audioPlayWin() {
        if (this.scene.audioMusicName === 'btn_music.png') {
            //play audio win
            this.scene.audioObject.audioWin.play();
        }
    }

    /*end function*/

    audioPlayLose() {
        if (this.scene.audioMusicName === 'btn_music.png') {
            //play audio lose
            this.scene.audioObject.audioLose.play();
        }
    }

    /*end function*/

    //get money
    oneMoney(value) {
        switch (value) {
            case 'symbols_0.png':
                this.getMoney(Options.payvalues[0][0]);
                break;
            case 'symbols_1.png':
                this.getMoney(Options.payvalues[1][0]);
                break;
            case 'symbols_2.png':
                this.getMoney(Options.payvalues[2][0]);
                break;
            case 'symbols_3.png':
                this.getMoney(Options.payvalues[3][0]);
                break;
            case 'symbols_4.png':
                this.getMoney(Options.payvalues[4][0]);
                break;
            case 'symbols_5.png':
                this.getMoney(Options.payvalues[5][0]);
                break;
            case 'symbols_6.png':
                this.getMoney(Options.payvalues[6][0]);
                break;
            case 'symbols_7.png':
                this.getMoney(Options.payvalues[7][0]);
                break;
            case 'symbols_8.png':
                this.getMoney(Options.payvalues[8][0]);
                break;
            default:
                this.getMoney(Options.payvalues[9][0]);
        } 
    }

    /*end function*/

    twoMoney(value) {
        switch (value) {
            case 'symbols_0.png':
                this.getMoney(Options.payvalues[0][1]);
                break;
            case 'symbols_1.png':
                this.getMoney(Options.payvalues[1][1]);
                break;
            case 'symbols_2.png':
                this.getMoney(Options.payvalues[2][1]);
                break;
            case 'symbols_3.png':
                this.getMoney(Options.payvalues[3][1]);
                break;
            case 'symbols_4.png':
                this.getMoney(Options.payvalues[4][0]);
                break;
            case 'symbols_5.png':
                this.getMoney(Options.payvalues[5][1]);
                break;
            case 'symbols_6.png':
                this.getMoney(Options.payvalues[6][1]);
                break;
            case 'symbols_7.png':
                this.getMoney(Options.payvalues[7][1]);
                break;
            case 'symbols_8.png':
                this.getMoney(Options.payvalues[8][1]);
                break;
            default:
                this.getMoney(Options.payvalues[9][1]);
        }
    }

    /*end function*/

    threeMoney(value) {
        switch(value) {
            case 'symbols_0.png':
                this.getMoney(Options.payvalues[0][2]);
                break;
            case 'symbols_1.png':
                this.getMoney(Options.payvalues[1][2]);
                break;
            case 'symbols_2.png':
                this.getMoney(Options.payvalues[2][2]);
                break;
            case 'symbols_3.png':
                this.getMoney(Options.payvalues[3][2]);
                break;
            case 'symbols_4.png':
                this.getMoney(Options.payvalues[4][2]);
                break;
            case 'symbols_5.png':
                this.getMoney(Options.payvalues[5][2]);
                break;
            case 'symbols_6.png':
                this.getMoney(Options.payvalues[6][2]);
                break;
            case 'symbols_7.png':
                this.getMoney(Options.payvalues[7][2]);
                break;
            case 'symbols_8.png':
                this.getMoney(Options.payvalues[8][2]);
                break;
            default:
                this.getMoney(Options.payvalues[9][2]);
        }
    }

    /*end function*/

    getMoney(money) {
        let maxBet = Options.line * Options.coin;
        let payValue = money / Options.line;
        Options.win += (payValue * maxBet);
        this.setTextureWin(Options.win);
        //free spin
        //gameOptions.countFree++;
        //count free >= 5 
        // if(gameOptions.countFree >= 2) {
        //      this.classFreeSpin = new FreeSpin(this.scene, Key.FreeSpin);
        // }
    }

    /*end function*/

    setTextureWin(value) {
        Options.moneyWin = value;
        this.scene.valueMoney += Options.moneyWin;
        //count money win >= 2000
        if(Options.moneyWin >= 2000) {
            //set check click = true
            Options.checkClick = true;
            //set timer auto spin = true
            if(typeof this.scene.autoSpin.timer != 'undefined') {
                this.scene.autoSpin.timer.paused = true;
                this.bigWin();
            } else {
                this.bigWin();
            }
        }
        var width;
        if(Options.moneyWin >= 100000) {
            width = Config.width - 340;
        } else if(Options.moneyWin >= 10000) {
            width = Config.width - 335;
        } else if(Options.moneyWin >= 1000) {
            width = Config.width - 330;
        } else if(Options.moneyWin >= 100) {
            width = Config.width - 322;
        } else {
            width = Config.width - 340;
        }
        if (!this.scene.txtWin) {
            this.scene.txtWin = this.scene.add.text(width, Config.height - 130, 'WIN: ' + Options.moneyWin + ' $ ', Style.styleWin);
        } else {
            this.scene.txtWin.destroy();
            this.scene.txtWin = this.scene.add.text(width, Config.height - 130, 'WIN: ' + Options.moneyWin + ' $ ', Style.styleWin);
        }
        //save localStorage
        this.scene.baseSpin.saveLocalStorage();
    }

    /*end function*/

    bigWin() {
        if(this.scene.audioMusicName === 'btn_music.png') {
            this.scene.audioObject.musicDefault.stop();
            this.scene.audioObject.audioBigWin.play(); 
        }
        //add effect win
        this.youWin = new Sprite(this.scene, Config.width / 2, Config.height / 2, 'youwin', 'win.png').setDepth(1);
        this.timeWin = Options.moneyWin;
        this.timeMoneyWin = this.scene.add.text(Config.width / 2 - 50, Config.height / 2 - 50, 0, Style.styleTimeMoney).setDepth(1);
        this.txtDollars = this.scene.add.text(Config.width / 2 + 70, Config.height / 2 - 50, '$', Style.styleDollar).setDepth(1);
        
        //time event loop
        this.timer = this.scene.time.addEvent({
            delay: 0,
            callback: () => {
                this.time ++;
                if(this.time <= this.timeWin) {
                    this.timeMoneyWin.setText(this.time);
                    //set text x
                    this.setTextX(this.time);
                } else {
                    //remove timer event
                    this.timer.remove();
                    //reset check click = false
                    Options.checkClick = false;
                    if(this.scene.audioMusicName === 'btn_music.png') {
                        //stop audio
                        this.scene.audioObject.audioBigWin.stop();
                        this.scene.audioObject.audioWin.stop();
                    }
                    //timer event loop
                    this.timerRemove = this.scene.time.addEvent({
                        delay : 2000,
                        callback : () => {
                            if(this.scene.audioMusicName === 'btn_music.png') {
                                //play audio default
                                this.scene.audioObject.musicDefault.play();
                            }
                            this.youWin.destroy();
                            this.timeMoneyWin.destroy();
                            this.txtDollars.destroy();
                            //remove timer event loop
                            this.timerRemove.remove();
                            //set timer auto spin = false
                            if(typeof this.scene.autoSpin.timer != 'undefined')
                                this.scene.autoSpin.timer.paused = false;
                        },
                        callbackScope : this,
                        loop : true
                    });
                }
            },
            callbackScope: this,
            loop: true
        });
    }
    /*end function */

    setTextX(value) {
        if(value >= 100000) {
            this.timeMoneyWin.x = 515;
            this.txtDollars.x = 785;
        } else if(value >= 10000) {
            this.timeMoneyWin.x = 520;
            this.txtDollars.x = 770;
        } else if(value >= 1000) {
            this.timeMoneyWin.x = 525;
            this.txtDollars.x = 760;
        } else if(value >= 100) {
            this.timeMoneyWin.x = 560;
            this.txtDollars.x = 740;
        } else {
            this.timeMoneyWin.x = 580;
            this.txtDollars.x = 710;
        }
    }
}