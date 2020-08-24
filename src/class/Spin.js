import Config from '../Config/config';
import Options from '../Constants/options';
import Style from '../Css/style';
import gameOptions from '../Constants/gameOptions';
import FreeSpin from '../Class/FreeSpin/FreeSpin';

export default class Spin extends Phaser.Scene {
    constructor(scene) {
        super(scene);
        scene.add.existing(this);
        this.scene = scene;
        this.printResult();
        this.setColor();
        this.time = 0;
    }

    setColor() {
        this.scene.bgSpin.clearTint();
        this.scene.maxBet.clearTint();
        this.scene.coin.clearTint();
        this.scene.btnLine.clearTint();
        this.scene.info.clearTint();
        this.scene.credits.clearTint();
        this.scene.btnMusic.clearTint();
        this.scene.btnSound.clearTint();
    }

    printResult() {
        const s1 = this.scene.columnTween1.targets[0];
        const s2 = this.scene.columnTween2.targets[0];
        const s3 = this.scene.columnTween3.targets[0];
        const s4 = this.scene.columnTween4.targets[0];
        const s5 = this.scene.columnTween5.targets[0];
        Options.result.push([s1.list[3].frame.name, s2.list[3].frame.name, s3.list[3].
            frame.name, s4.list[3].frame.name, s5.list[3].frame.name], [s1.list[2].frame.name, s2.list[2].frame.name,
            s3.list[2].frame.name, s4.list[2].frame.name, s5.list[2].frame.name], [s1.list[1].frame.name, s2.list[1].frame.name,
            s3.list[1].frame.name, s4.list[1].frame.name, s5.list[1].frame.name]);
        this.getvalues();
    }

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

    resetOptions() {
        //reset win && result 
        Options.win = 0;
        Options.moneyWin = 0;
        Options.result = [];
    }

    getLine1() {
        if (Options.result[1][0] === Options.result[1][1] &&
            Options.result[1][1] === Options.result[1][2] &&
            Options.result[1][2] === Options.result[1][3] &&
            Options.result[1][3] === Options.result[1][4]) {
            if (this.scene.audioMusicName === 'btn_music.png') {
                //play audio win
                this.scene.audioWin.play();
            }
            //get money
            Options.lineArray.push(this.scene.add.sprite(Config.width / 2, Config.height / 2,
                'line', 'payline_1.png'));
            this.threeMoney(Options.result[1][0]);
        } else if (Options.result[1][0] === Options.result[1][1] &&
            Options.result[1][1] === Options.result[1][2] && Options.result[1][2]
            === Options.result[1][3]) {
            if (this.scene.audioMusicName === 'btn_music.png') {
                //play audio win
                this.scene.audioWin.play();
            }
            //get money
            Options.lineArray.push(this.scene.add.sprite(Config.width / 2, Config.height / 2,
                'line', 'payline_1.png'));
            this.twoMoney(Options.result[1][0]);
        } else if (Options.result[1][0] === Options.result[1][1] && Options.result[1][1]
            === Options.result[1][2]) {
            if (this.scene.audioMusicName === 'btn_music.png') {
                //play audio win
                this.scene.audioWin.play();
            }
            //get money 
            Options.lineArray.push(this.scene.add.sprite(Config.width / 2, Config.height / 2,
                'line', 'payline_1.png'));
            this.oneMoney(Options.result[1][0]);
        } else {
            if (this.scene.audioMusicName === 'btn_music.png') {
                //play audio win
                this.scene.audioLose.play();
            }
        }
    }

    getLine2() {
        if (Options.result[0][0] === Options.result[0][1] &&
            Options.result[0][1] === Options.result[0][2] && Options.result[0][2]
            === Options.result[0][3] && Options.result[0][3] === Options.result[0][4]) {
            if (this.scene.audioMusicName === 'btn_music.png') {
                //play audio win
                this.scene.audioWin.play();
            }
            // get money
            Options.lineArray.push(this.scene.add.sprite(Config.width / 2, Config.height / 2,
                'line', 'payline_2.png'));
            this.threeMoney(Options.result[0][0]);
        } else if (Options.result[0][0] === Options.result[0][1] &&
            Options.result[0][1] === Options.result[0][2] && 
            Options.result[0][2] === Options.result[0][3]) {
            if (this.scene.audioMusicName === 'btn_music.png') {
                //play audio win
                this.scene.audioWin.play();
            }
            // get money
            Options.lineArray.push(this.scene.add.sprite(Config.width / 2, Config.height / 2,
                'line', 'payline_2.png'));
            this.twoMoney(Options.result[0][0]);
        } else if (Options.result[0][0] === Options.result[0][1] && Options.result[0][1]
            === Options.result[0][2]) {
            if (this.scene.audioMusicName === 'btn_music.png') {
                //play audio win
                this.scene.audioWin.play();
            }
            // get money
            Options.lineArray.push(this.scene.add.sprite(Config.width / 2,
                Config.height / 2,
                'line', 'payline_2.png'));
            this.oneMoney(Options.result[0][0]);
        } else {
            if (this.scene.audioMusicName === 'btn_music.png') {
                //play audio lose
                this.scene.audioLose.play();
            }
        }
    }

    getLine3() {
        if (Options.result[2][0] === Options.result[2][1] &&
            Options.result[2][1] === Options.result[2][2] && Options.result[2][2]
            === Options.result[2][3] && Options.result[2][3] === Options.result[2][4]) {
            if (this.scene.audioMusicName === 'btn_music.png') {
                //play audio win
                this.scene.audioWin.play();
            }
            //get money
            Options.lineArray.push(this.scene.add.sprite(Config.width / 2, Config.height / 2,
                'line', 'payline_3.png'));
            this.threeMoney(Options.result[2][0]);
        } else if (Options.result[2][0] === Options.result[2][1] &&
            Options.result[2][1] === Options.result[2][2] && Options.result[2][2]
            === Options.result[2][3]) {
            if (this.scene.audioMusicName === 'btn_music.png') {
                //play audio win
                this.scene.audioWin.play();
            }
            //get money
            Options.lineArray.push(this.scene.add.sprite(Config.width / 2, Config.height / 2,
                'line', 'payline_3.png'));
            this.twoMoney(Options.result[2][0]);
        } else if (Options.result[2][0] === Options.result[2][1] && Options.result[2][1]
            === Options.result[2][2]) {
            if (this.scene.audioMusicName === 'btn_music.png') {
                //play audio win
                this.scene.audioWin.play();
            }
            //get money
            Options.lineArray.push(this.scene.add.sprite(Config.width / 2, Config.height / 2,
                'line', 'payline_3.png'));
            this.oneMoney(Options.result[2][0]);
        } else {
            if (this.scene.audioMusicName === 'btn_music.png') {
                //play audio lose
                this.scene.audioLose.play();
            }
        }
    }
    getLine4() {
        if (Options.result[0][0] === Options.result[1][1] &&
            Options.result[1][1] === Options.result[2][2] && Options.result[2][2] ===
            Options.result[1][3] && Options.result[1][3] === Options.result[0][4]) {
            if (this.scene.audioMusicName === 'btn_music.png') {
                //play audio win
                this.scene.audioWin.play();
            }
            // get money
            Options.lineArray.push(this.scene.add.sprite(Config.width / 2, Config.height / 2,
                'line', 'payline_4.png'));
            this.threeMoney(Options.result[0][0]);
        } else if (Options.result[0][0] === Options.result[1][1] &&
            Options.result[1][1] === Options.result[2][2] && Options.result[2][2] ===
            Options.result[1][3]) {
            if (this.scene.audioMusicName === 'btn_music.png') {
                //play audio win
                this.scene.audioWin.play();
            }
            // get money
            Options.lineArray.push(this.scene.add.sprite(Config.width / 2, Config.height / 2,
                'line', 'payline_4.png'));
            this.twoMoney(Options.result[0][0]);
        } else if (Options.result[0][0] === Options.result[1][1] &&
            Options.result[1][1] === Options.result[2][2]) {
            if (this.scene.audioMusicName === 'btn_music.png') {
                //play audio win
                this.scene.audioWin.play();
            }
            // get money
            Options.lineArray.push(this.scene.add.sprite(Config.width / 2, Config.height / 2,
                'line', 'payline_4.png'));
            this.oneMoney(Options.result[0][0]);
        } else {
            if (this.scene.audioMusicName == 'btn_music.png') {
                //play audio lose
                this.scene.audioLose.play();
            }
        }
    }
    getLine5() {
        if (Options.result[2][0] === Options.result[1][1] &&
            Options.result[1][1] === Options.result[0][2] &&
            Options.result[0][2] === Options.result[1][3] && Options.result[1][3]
            === Options.result[2][4]) {
            if (this.scene.audioMusicName === 'btn_music.png') {
                //play audio win
                this.scene.audioWin.play();
            }
            // get money
            Options.lineArray.push(this.scene.add.sprite(Config.width / 2, config.height / 2,
                'line', 'payline_5.png'));
            this.threeMoney(Options.result[2][0]);
        } else if (Options.result[2][0] === Options.result[1][1] &&
            Options.result[1][1] === Options.result[0][2] &&
            Options.result[0][2] === Options.result[1][3]) {
            if (this.scene.audioMusicName === 'btn_music.png') {
                //play audio win
                this.scene.audioWin.play();
            }
            // get money
            Options.lineArray.push(this.scene.add.sprite(Config.width / 2, Config.height / 2,
                'line', 'payline_5.png'));
            this.twoMoney(Options.result[2][0]);
        } else if (Options.result[2][0] === Options.result[1][1] &&
            Options.result[1][1] === Options.result[0][2]) {
            if (this.scene.audioMusicName === 'btn_music.png') {
                //play audio win
                this.scene.audioWin.play();
            }
            // get money
            Options.lineArray.push(this.scene.add.sprite(Config.width / 2, Config.height / 2,
                'line', 'payline_5.png'));
            this.oneMoney(Options.result[2][0]);
        } else {
            if (this.scene.audioMusicName === 'btn_music.png') {
                //play audio lose
                this.scene.audioLose.play();
            }
        }
    }

    getLine6() {
        if (Options.result[1][0] === Options.result[0][1] &&
            Options.result[0][1] === Options.result[0][2] && Options.result[0][2] ===
            Options.result[0][3] && Options.result[0][3] === Options.result[1][4]) {
            if (this.scene.audioMusicName === 'btn_music.png') {
                //play audio win
                this.scene.audioWin.play();
            }
            // get money
            Options.lineArray.push(this.scene.add.sprite(Config.width / 2, Config.height / 2,
                'line', 'payline_6.png'));
            this.threeMoney(Options.result[1][0]);
        } else if (Options.result[1][0] === Options.result[0][1] &&
            Options.result[0][1] === Options.result[0][2] && Options.result[0][2] ===
            Options.result[0][3]) {
            if (this.scene.audioMusicName === 'btn_music.png') {
                //play audio win
                this.scene.audioWin.play();
            }
            // get money
            Options.lineArray.push(this.scene.add.sprite(Config.width / 2, Config.height / 2,
                'line', 'payline_6.png'));
            this.twoMoney(Options.result[1][0]);
        } else if (Options.result[1][0] === Options.result[0][1] &&
            Options.result[0][1] === Options.result[0][2]) {
            if (this.scene.audioMusicName === 'btn_music.png') {
                //play audio win
                this.scene.audioWin.play();
            }
            // get money
            Options.lineArray.push(this.scene.add.sprite(Config.width / 2, Config.height / 2,
                'line', 'payline_6.png'));
            this.oneMoney(Options.result[1][0]);
        } else {
            if (this.scene.audioMusicName === 'btn_music.png') {
                //play audio lose
                this.scene.audioLose.play();
            }
        }
    }

    getLine7() {
        if (Options.result[1][0] === Options.result[2][1] &&
            Options.result[2][1] === Options.result[2][2] && Options.result[2][2]
            === Options.result[2][3] && Options.result[2][3] === Options.result[1][4]) {
            if (this.scene.audioMusicName === 'btn_music.png') {
                //play audio win
                this.scene.audioWin.play();
            }
            // get money
            Options.lineArray.push(this.scene.add.sprite(Config.width / 2, Config.height / 2,
                'line', 'payline_7.png'));
            this.threeMoney(Options.result[1][0]);
        } else if (Options.result[1][0] === Options.result[2][1] &&
            Options.result[2][1] === Options.result[2][2] && Options.result[2][2]
            === Options.result[2][3]) {
            if (this.scene.audioMusicName === 'btn_music.png') {
                //play audio win
                this.scene.audioWin.play();
            }
            // get money
            Options.lineArray.push(this.scene.add.sprite(Config.width / 2, Config.height / 2,
                'line', 'payline_7.png'));
            this.twoMoney(Options.result[1][0]);
        } else if (Options.result[1][0] === Options.result[2][1] &&
            Options.result[2][1] === Options.result[2][2]) {
            if (this.scene.audioMusicName === 'btn_music.png') {
                //play audio win
                this.scene.audioWin.play();
            }
            // get money
            Options.lineArray.push(this.scene.add.sprite(Config.width / 2, Config.height / 2,
                'line', 'payline_7.png'));
            this.oneMoney(Options.result[1][0]);
        } else {
            if (this.scene.audioMusicName === 'btn_music.png') {
                //play audio lose
                this.scene.audioLose.play();
            }
        }
    }

    getLine8() {
        if (Options.result[0][0] === Options.result[0][1] &&
            Options.result[0][1] === Options.result[1][2] && Options.result[1][2] ===
            Options.result[2][3] && Options.result[2][3] === Options.result[2][4]) {
            if (this.scene.audioMusicName === 'btn_music.png') {
                //play audio win
                this.scene.audioWin.play();
            }
            // get money
            Options.lineArray.push(this.scene.add.sprite(Config.width / 2, Config.height / 2,
                'line', 'payline_8.png'));
            this.threeMoney(Options.result[0][0]);
        } else if (Options.result[0][0] === Options.result[0][1] &&
            Options.result[0][1] === Options.result[1][2] && Options.result[1][2] ===
            Options.result[2][3]) {
            if (this.scene.audioMusicName === 'btn_music.png') {
                //play audio win
                this.scene.audioWin.play();
            }
            // get money
            Options.lineArray.push(this.scene.add.sprite(Config.width / 2, Config.height / 2,
                'line', 'payline_8.png'));
            this.twoMoney(Options.result[0][0]);
        } else if (Options.result[0][0] === Options.result[0][1] &&
            Options.result[0][1] === Options.result[1][2]) {
            if (this.scene.audioMusicName === 'btn_music.png') {
                //play audio win
                this.scene.audioWin.play();
            }
            // get money
            Options.lineArray.push(this.scene.add.sprite(Config.width / 2, Config.height / 2,
                'line', 'payline_8.png'));
            this.oneMoney(Options.result[0][0]);
        } else {
            if (this.scene.audioMusicName === 'btn_music.png') {
                //play audio lose
                this.scene.audioLose.play();
            }
        }
    }

    getLine9() {
        if (Options.result[2][0] === Options.result[2][1] &&
            Options.result[2][1] === Options.result[1][2] && Options.result[1][2] ===
            Options.result[0][3] && Options.result[0][3] === Options.result[0][4]) {
            if (this.scene.audioMusicName === 'btn_music.png') {
                //play audio win
                this.scene.audioWin.play();
            }
            // get money
            Options.lineArray.push(this.scene.add.sprite(Config.width / 2, Config.height / 2,
                'line', 'payline_9.png'));
            this.threeMoney(Options.result[2][0]);
        } else if (Options.result[2][0] === Options.result[2][1] &&
            Options.result[2][1] === Options.result[1][2] && Options.result[1][2] ===
            Options.result[0][3]) {
            if (this.scene.audioMusicName === 'btn_music.png') {
                //play audio win
                this.scene.audioWin.play();
            }
            // get money
            Options.lineArray.push(this.scene.add.sprite(Config.width / 2, Config.height / 2,
                'line', 'payline_9.png'));
            this.twoMoney(Options.result[2][0]);
        } else if (Options.result[2][0] === Options.result[2][1] &&
            Options.result[2][1] === Options.result[1][2]) {
            if (this.scene.audioMusicName === 'btn_music.png') {
                //play audio win
                this.scene.audioWin.play();
            }
            // get money
            Options.lineArray.push(this.scene.add.sprite(Config.width / 2, Config.height / 2,
                'line', 'payline_9.png'));
            this.oneMoney(Options.result[2][0]);
        } else {
            if (this.scene.audioMusicName === 'btn_music.png') {
                //play audio lose
                this.scene.audioLose.play();
            }
        }
    }

    getLine10() {
        if (Options.result[1][0] === Options.result[2][1] &&
            Options.result[2][1] === Options.result[1][2] && Options.result[1][2] ===
            Options.result[0][3] && Options.result[0][3] === Options.result[1][4]) {
            if (this.scene.audioMusicName === 'btn_music.png') {
                //play audio win
                this.scene.audioWin.play();
            }
            // get money
            Options.lineArray.push(this.scene.add.sprite(Config.width / 2, Config.height / 2,
                'line', 'payline_10.png'));
            this.threeMoney(Options.result[1][0]);
        } else if (Options.result[1][0] === Options.result[2][1] &&
            Options.result[2][1] === Options.result[1][2] && Options.result[1][2] ===
            Options.result[0][3]) {
            if (this.scene.audioMusicName === 'btn_music.png') {
                //play audio win
                this.scene.audioWin.play();
            }
            // get money
            Options.lineArray.push(this.scene.add.sprite(Config.width / 2, Config.height / 2,
                'line', 'payline_10.png'));
            this.twoMoney(Options.result[1][0]);
        } else if (Options.result[1][0] === Options.result[2][1] &&
            Options.result[2][1] === Options.result[1][2]) {
            if (this.scene.audioMusicName === 'btn_music.png') {
                //play audio win
                this.scene.audioWin.play();
            }
            // get money
            Options.lineArray.push(this.scene.add.sprite(Config.width / 2, Config.height / 2,
                'line', 'payline_10.png'));
            this.oneMoney(Options.result[1][0]);
        } else {
            if (this.scene.audioMusicName === 'btn_music.png') {
                //play audio lose
                this.scene.audioLose.play();
            }
        }
    }

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

    getMoney(money) {
        let maxBet = Options.line * Options.coin;
        let payValue = money / Options.line;
        Options.win += (payValue * maxBet);
        this.setTextureWin(Options.win);
        //free spin
        gameOptions.countFree++;
        //count free >= 5 
        if(gameOptions.countFree >= 5) {
            this.classFreeSpin = new FreeSpin(this.scene);
        }
    }

    setTextureWin(value) {
        Options.moneyWin = value;
        this.scene.valueMoney += Options.moneyWin;
        //count money win >= 2000
        if(Options.moneyWin >= 2000) {
            //set check click = true
            Options.checkClick = true;
            this.bigWin();
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
        this.scene.saveLocalStorage();
    }

    bigWin() {
        if(this.scene.audioMusicName === 'btn_music.png') {
            this.scene.musicDefault.stop();
            this.scene.audioBigWin.play(); 
        }
        //add effect win
        this.youWin = this.scene.add.sprite(Config.width / 2, Config.height / 2, 'youwin', 'win.png').setInteractive();
        this.timeWin = Options.moneyWin;
        this.timeMoneyWin = this.scene.add.text(Config.width / 2 - 50, Config.height / 2 - 50, 0, Style.styleTimeMoney);
        this.txtDollars = this.scene.add.text(Config.width / 2 + 70, Config.height / 2 - 50, '$', Style.styleDollar);
        
        //time event loop
        this.timer = this.scene.time.addEvent({
            delay: 0,
            callback: function() {
                this.time ++;
                if(this.time <= this.timeWin) {
                    this.timeMoneyWin.setText(this.time);
                    if(this.time >= 100000) {
                        this.timeMoneyWin.x = 515;
                        this.txtDollars.x = 785;
                    } else if(this.time >= 10000) {
                        this.timeMoneyWin.x = 520;
                        this.txtDollars.x = 770;
                    } else if(this.time >= 1000) {
                        this.timeMoneyWin.x = 530;
                        this.txtDollars.x = 760;
                    } else if(this.time >= 100) {
                        this.timeMoneyWin.x = 560;
                        this.txtDollars.x = 740;
                    } else {
                        this.timeMoneyWin.x = 580;
                        this.txtDollars.x = 710;
                    }
                } else {
                    this.timer.remove();
                    if(this.scene.audioMusicName === 'btn_music.png') {
                        //stop audio
                        this.scene.audioBigWin.stop();
                        this.scene.audioWin.stop();
                    }
                    //reset check click
                    Options.checkClick = false;
                    //remove image and text
                    this.youWin.on('pointerdown', () => {
                        if(this.youWin && this.timeMoneyWin && this.txtDollars) {
                            this.youWin.destroy();
                            this.timeMoneyWin.destroy();
                            this.txtDollars.destroy();
                            if(this.scene.audioMusicName === 'btn_music.png') {
                                //play audio default
                                this.scene.musicDefault.play();
                            }
                        }
                    });
                }
            },
            callbackScope: this,
            loop: true
        });
    }
}