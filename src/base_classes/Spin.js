import Config from '../config';
import Options from '../options';
import Sprite from './Sprite';
//Class Spin
export default class Spin {
    constructor(scene) {
        this.scene = scene;
        this.printResult();
        this.clearColor();
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

    printResult() {
        let s1, s2, s3, s4, s5, autoSpin = this.scene.autoSpin.tweens,
        baseSpin = this.scene.baseSpin.tweens;
        if(autoSpin) {
            s1 = autoSpin.columnTween1.targets[0];
            s2 = autoSpin.columnTween2.targets[0];
            s3 = autoSpin.columnTween3.targets[0];
            s4 = autoSpin.columnTween4.targets[0];
            s5 = autoSpin.columnTween5.targets[0];   
        } else {
            s1 = baseSpin.columnTween1.targets[0];
            s2 = baseSpin.columnTween2.targets[0];
            s3 = baseSpin.columnTween3.targets[0];
            s4 = baseSpin.columnTween4.targets[0];
            s5 = baseSpin.columnTween5.targets[0];
        }
        //push symbols name
        Options.result.push([s1.list[3].frame.name, s1.list[2].frame.name,
        s1.list[1].frame.name],[s2.list[3].frame.name, s2.list[2].frame.name,
        s2.list[1].frame.name],[s3.list[3].frame.name, s3.list[2].frame.name,
        s3.list[1].frame.name],[s4.list[3].frame.name, s4.list[2].frame.name,
        s4.list[1].frame.name],[s5.list[3].frame.name, s5.list[2].frame.name,
        s5.list[1].frame.name]);
        //function winning lines
        this.getWinningLines();
    }

    getWinningLines() {
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
                    streak ++;
                }
            }
            //check streak >= 3
            if(streak >= 3) {
                lineIndx ++;
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

    getLineArray(lineArr) {
        if(!lineArr.length) {
            return;
        }
        for(let i = 0; i < lineArr.length; i++) {
            let lineName = 'payline_' + lineArr[i] + '.png';
            Options.lineArray.push(new Sprite(this.scene, Config.width / 2, 
                Config.height / 2, 'line', lineName));
        }
    }

    mathMoney(symbolName, streak) {
        let index = streak - 3;
        if(streak === 3)
            this.symbolValue(symbolName, index); 
        else if(streak === 4) 
            this.symbolValue(symbolName, index);
        else 
            this.symbolValue(symbolName, index);
    }

    resetOptions() {
        //reset win && result 
        Options.win = 0;
        Options.moneyWin = 0;
        Options.result = [];
        Options.winningLines = [];
    }

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

    audioPlayWin() {
        if (this.scene.audioMusicName === 'btn_music.png') {
            //play audio win
            this.scene.audioObject.audioWin.play();
        }
    }

    audioPlayLose() {
        if (this.scene.audioMusicName === 'btn_music.png') {
            //play audio lose
            this.scene.audioObject.audioLose.play();
        }
    }

    getMoney(money) {
        let maxBet = Options.line * Options.coin;
        let payValue = money / Options.line;
        Options.win += (payValue * maxBet);
        this.setTextureWin(Options.win);
    }

    setTextureWin(value) {
        Options.moneyWin = value;
        this.scene.valueMoney += Options.moneyWin;
        //function set width text win
        let width = this.setTextWidthWin();
        //check empty text win
        if (!this.scene.txtWin) {
            this.scene.txtWin = this.scene.add.text(width, Config.height - 130, 'WIN: ' + Options.moneyWin + ' $ ', {
                fontSize : '20px',
                color : '#25a028',
                fontFamily : 'PT Serif'
            });
        } else {
            this.scene.txtWin.destroy();
            this.scene.txtWin = this.scene.add.text(width, Config.height - 130, 'WIN: ' + Options.moneyWin + ' $ ', {
                fontSize : '20px',
                color : '#25a028',
                fontFamily : 'PT Serif'
            });
        }
        //save localStorage
        this.scene.baseSpin.saveLocalStorage();
    }

    setTextWidthWin() {
        let width;
        if(Options.moneyWin >= 100000) 
            width = Config.width - 340;
        else if(Options.moneyWin >= 10000) 
            width = Config.width - 335;
        else if(Options.moneyWin >= 1000) 
            width = Config.width - 330;
        else if(Options.moneyWin >= 100) 
            width = Config.width - 322;
        else 
            width = Config.width - 340;
        return width;
    }
}