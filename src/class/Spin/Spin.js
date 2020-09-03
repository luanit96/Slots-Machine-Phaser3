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

        Options.result.push([s1.list[3].frame.name, s1.list[2].frame.name,s1.list[1].frame.name],
        [s2.list[3].frame.name, s2.list[2].frame.name,s2.list[1].frame.name],
        [s3.list[3].frame.name, s3.list[2].frame.name,s3.list[1].frame.name],
        [s4.list[3].frame.name, s4.list[2].frame.name,s4.list[1].frame.name],
        [s5.list[3].frame.name, s5.list[2].frame.name,s5.list[1].frame.name]);
        this.getvaluesResults();
    }

    /*end function*/

    getvaluesResults() {
        for(let lineIndx = 0; lineIndx < Options.line; 
            lineIndx ++) {
            let streak = 0;
            let currentkind = null;
            for(let coordIndx = 0; coordIndx < Options.payLines[lineIndx].
                length; coordIndx ++) {
                let coords = Options.payLines[lineIndx][coordIndx];
                let symbolAtCoords = Options.result[coords[0]][coords[1]];
                if(coordIndx === 0) {
                    currentkind = symbolAtCoords;
                    streak = 1;
                } else {
                    if(symbolAtCoords != currentkind) {
                        break;
                    }
                    streak += 1;
                }
            }

            if(streak >= 3) {
                Options.winningLines.push(lineIndx);
                //audio win
                this.audioPlayWin();
                //function math money
                this.mathMoney(currentkind, streak);
            }
            //audio lose
            this.audioPlayLose();
        }
        //get line array
        this.getLineArray(Options.winningLines); 
        //reset Options
        this.resetOptions();
    }

    /*end function*/

    getLineArray(lineArr) {
        if(!lineArr.length) {
            return;
        }
        for(let i= 0; i < lineArr.length; i++) {
            Options.lineArray.push(new Sprite(this.scene, Config.width / 2, 
            Config.height / 2, 'line', 'payline_' + lineArr[i] +'.png'));
        }
    }

    /*end function*/

    mathMoney(symbolName, streak) {
        if(streak === 3)
            this.symbolValue(symbolName, 0); 
        else if(streak === 4) 
            this.symbolValue(symbolName, 1);
        else 
            this.symbolValue(symbolName, 2);
    }

    /*end function*/

    resetOptions() {
        //reset win && result 
        Options.win = 0;
        Options.moneyWin = 0;
        Options.result = [];
        Options.winningLines = [];
    }

    /*end function*/

    symbolValue(symbolName, index) {
        switch(symbolName) {
            case 'symbols_0.png':
                this.getMoney(Options.payvalues[0][index]);
                break;
            case 'symbols_1.png':
                this.getMoney(Options.payvalues[1][index]);
                break;
            case 'symbols_2.png':
                this.getMoney(Options.payvalues[2][index]);
                break;
            case 'symbols_3.png':
                this.getMoney(Options.payvalues[3][index]);
                break;
            case 'symbols_4.png':
                this.getMoney(Options.payvalues[4][index]);
                break;
            case 'symbols_5.png':
                this.getMoney(Options.payvalues[5][index]);
                break;
            case 'symbols_6.png':
                this.getMoney(Options.payvalues[6][index]);
                break;
            case 'symbols_7.png':
                this.getMoney(Options.payvalues[7][index]);
                break;
            case 'symbols_8.png':
                this.getMoney(Options.payvalues[8][index]);
                break;
            default:
                this.getMoney(Options.payvalues[9][index]);
                break;
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
     /*end function*/
}