import { config } from '../config/config';
import { options } from '../constants/options';
import { style } from '../css/style';

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.result = [];
        this.lineArray = [];
    }

    preload() {
        this.load.path = '../../src/assets/jsons/images/';
        this.load.atlas('background', 'bg/bg.png', 'bg/bg.json');
        this.load.atlas('bgButtons', 'buttons/button.png', 'buttons/button.json');
        this.load.atlas('symbols', 'symbols/symbols.png', 'symbols/symbols.json');
        this.load.atlas('symbols_blur', 'symbols/symbols_blur.png', 'symbols/symbols_blur.json');
        this.load.atlas('line', 'lines/line.png', 'lines/line.json');
    }

    create() {
        this.add.sprite(config.width / 2, config.height / 2, 'background', 'bg.jpg');
        const symbolHeight = 150;
        //symbols column 1
        const symbolsImage4 = this.add.sprite(0, -symbolHeight * 4, 'symbols', 'symbols_1.png');
        const symbolsImage3 = this.add.sprite(0, -symbolHeight * 3, 'symbols', 'symbols_2.png');
        const symbolsImage2 = this.add.sprite(0, -symbolHeight * 2, 'symbols', 'symbols_3.png');
        const symbolsImage1 = this.add.sprite(0, -symbolHeight, 'symbols', 'symbols_4.png');
        const symbolsImage = this.add.sprite(0, 0, 'symbols', 'symbols_5.png');
        //container 1
        var container = this.add.container(340, 630);
        container.add([symbolsImage, symbolsImage1, symbolsImage2, symbolsImage3, symbolsImage4]);
        //symbols column 2
        const symbols2Image4 = this.add.sprite(0, -symbolHeight * 4, 'symbols', 'symbols_5.png');
        const symbols2Image3 = this.add.sprite(0, -symbolHeight * 3, 'symbols', 'symbols_6.png');
        const symbols2Image2 = this.add.sprite(0, -symbolHeight * 2, 'symbols', 'symbols_7.png');
        const symbols2Image1 = this.add.sprite(0, -symbolHeight, 'symbols', 'symbols_8.png');
        const symbols2Image = this.add.sprite(0, 0, 'symbols', 'symbols_9.png');
        //container 2
        var container2 = this.add.container(490, 630);
        container2.add([symbols2Image, symbols2Image1, symbols2Image2, symbols2Image3, symbols2Image4]);
        //symbols column 3
        const symbols3Image4 = this.add.sprite(0, -symbolHeight * 4, 'symbols', 'symbols_0.png');
        const symbols3Image3 = this.add.sprite(0, -symbolHeight * 3, 'symbols', 'symbols_8.png');
        const symbols3Image2 = this.add.sprite(0, -symbolHeight * 2, 'symbols', 'symbols_4.png');
        const symbols3Image1 = this.add.sprite(0, -symbolHeight, 'symbols', 'symbols_3.png');
        const symbols3Image = this.add.sprite(0, 0, 'symbols', 'symbols_2.png');
        //container 3
        var container3 = this.add.container(640, 630);
        container3.add([symbols3Image, symbols3Image1, symbols3Image2, symbols3Image3, symbols3Image4]);
        //symbols column 4
        const symbols4Image4 = this.add.sprite(0, -symbolHeight * 4, 'symbols', 'symbols_9.png');
        const symbols4Image3 = this.add.sprite(0, -symbolHeight * 3, 'symbols', 'symbols_1.png');
        const symbols4Image2 = this.add.sprite(0, -symbolHeight * 2, 'symbols', 'symbols_2.png');
        const symbols4Image1 = this.add.sprite(0, -symbolHeight, 'symbols', 'symbols_8.png');
        const symbols4Image = this.add.sprite(0, 0, 'symbols', 'symbols_5.png');
        //container 4
        var container4 = this.add.container(790, 630);
        container4.add([symbols4Image, symbols4Image1, symbols4Image2, symbols4Image3, symbols4Image4]);
        //symbols column 5
        const symbols5Image4 = this.add.sprite(0, -symbolHeight * 4, 'symbols', 'symbols_7.png');
        const symbols5Image3 = this.add.sprite(0, -symbolHeight * 3, 'symbols', 'symbols_2.png');
        const symbols5Image2 = this.add.sprite(0, -symbolHeight * 2, 'symbols', 'symbols_1.png');
        const symbols5Image1 = this.add.sprite(0, -symbolHeight, 'symbols', 'symbols_3.png');
        const symbols5Image = this.add.sprite(0, 0, 'symbols', 'symbols_6.png');
        //container 5
        var container5 = this.add.container(940, 630);
        container5.add([symbols5Image, symbols5Image1, symbols5Image2, symbols5Image3, symbols5Image4]);
        //add image machine
        this.add.sprite(config.width / 2, config.height / 2, 'background', 'machine.png');
        this.valueMoney = localStorage.getItem('money') ? localStorage.getItem('money') :
            ptions.money;
        this.txtMoney = this.add.text(config.width - 1040, config.height - 695, this.valueMoney + '$', style.styleTextPoint);
        //add image buttons
        this.bgMaxBet();
        this.bgCoin();
        this.bgLine();
        this.bgInfo();
        this.spin();
        this.bgSpin.on('pointerdown', () => {
            for(let i = 0; i < this.lineArray.length; i++) {
                this.lineArray[i].destroy(true, true);
            }
            //this.lineArray.destroy();
            if (!options.checkClick) {
                options.checkClick = true;
                //set money
                this.valueMoney -= (options.coin * options.line);
                this.txtMoney.setText(this.valueMoney + '$');
                //remove text txtwin
                if (this.txtWin) {
                    this.txtWin.destroy();
                }
                //column tweens 1
                this.columnTween1 = this.tweens.add({
                    targets: container,
                    props: { y: { value: "+=" + symbolHeight, duration: 100 } },
                    repeat: 20,
                    onRepeat: function () {
                        let randomNumber = Phaser.Math.RND.between(0, 9);
                        this.updateTo('y', container.y + symbolHeight, true);
                        this.targets[0].first.y = this.targets[0].last.y - symbolHeight;
                        let symbol = this.targets[0].first;
                        symbol.setVisible(true).setTexture('symbols_blur', 'symbols_' + randomNumber + '.png');
                        this.targets[0].moveTo(symbol, 4);
                    },
                    onComplete: function () {
                        this.updateTo('y', container.y + symbolHeight, true);
                        this.targets[0].first.y = this.targets[0].last.y - symbolHeight;
                        let symbol = this.targets[0].first;
                        this.targets[0].moveTo(symbol, 4);
                        //set texture symbols
                        for (let i = 3; i > 0; i--) {
                            let symbolsName = this.targets[0].list[i].frame.name;
                            this.targets[0].list[i].setTexture('symbols', symbolsName);
                        }
                    }
                }, this);
                //column tweens 2
                this.columnTween2 = this.tweens.add({
                    targets: container2,
                    props: { y: { value: "+=" + symbolHeight, duration: 100 } },
                    repeat: 25,
                    onRepeat: function () {
                        let randomNumber = Phaser.Math.RND.between(0, 9);
                        this.updateTo('y', container2.y + symbolHeight, true);
                        this.targets[0].first.y = this.targets[0].last.y - symbolHeight;
                        let symbol = this.targets[0].first;
                        symbol.setVisible(true).setTexture('symbols_blur', 'symbols_' + randomNumber + '.png');
                        this.targets[0].moveTo(symbol, 4);
                    },
                    onComplete: function () {
                        this.updateTo('y', container2.y + symbolHeight, true);
                        this.targets[0].first.y = this.targets[0].last.y - symbolHeight;
                        let symbol = this.targets[0].first;
                        this.targets[0].moveTo(symbol, 4);
                        //set texture symbols
                        for (let i = 3; i > 0; i--) {
                            let symbolsName = this.targets[0].list[i].frame.name;
                            this.targets[0].list[i].setTexture('symbols', symbolsName);
                        }
                    }
                }, this);
                //column tweens 3
                this.columnTween3 = this.tweens.add({
                    targets: container3,
                    props: { y: { value: "+=" + symbolHeight, duration: 100 } },
                    repeat: 30,
                    onRepeat: function () {
                        let randomNumber = Phaser.Math.RND.between(0, 9);
                        this.updateTo('y', container3.y + symbolHeight, true);
                        this.targets[0].first.y = this.targets[0].last.y - symbolHeight;
                        let symbol = this.targets[0].first;
                        symbol.setVisible(true).setTexture('symbols_blur', 'symbols_' + randomNumber + '.png');
                        this.targets[0].moveTo(symbol, 4);
                    },
                    onComplete: function () {
                        this.updateTo('y', container3.y + symbolHeight, true);
                        this.targets[0].first.y = this.targets[0].last.y - symbolHeight;
                        let symbol = this.targets[0].first;
                        this.targets[0].moveTo(symbol, 4);
                        //set texture symbols
                        for (let i = 3; i > 0; i--) {
                            let symbolsName = this.targets[0].list[i].frame.name;
                            this.targets[0].list[i].setTexture('symbols', symbolsName);
                        }
                    }
                }, this);
                //column tweens 4
                this.columnTween4 = this.tweens.add({
                    targets: container4,
                    props: { y: { value: "+=" + symbolHeight, duration: 100 } },
                    repeat: 35,
                    onRepeat: function () {
                        let randomNumber = Phaser.Math.RND.between(0, 9);
                        this.updateTo('y', container4.y + symbolHeight, true);
                        this.targets[0].first.y = this.targets[0].last.y - symbolHeight;
                        let symbol = this.targets[0].first;
                        symbol.setVisible(true).setTexture('symbols_blur', 'symbols_' + randomNumber + '.png');
                        this.targets[0].moveTo(symbol, 4);
                    },
                    onComplete: function () {
                        this.updateTo('y', container4.y + symbolHeight, true);
                        this.targets[0].first.y = this.targets[0].last.y - symbolHeight;
                        let symbol = this.targets[0].first;
                        this.targets[0].moveTo(symbol, 4);
                        //set texture symbols
                        for (let i = 3; i > 0; i--) {
                            let symbolsName = this.targets[0].list[i].frame.name;
                            this.targets[0].list[i].setTexture('symbols', symbolsName);
                        }
                    }
                }, this);
                //column tweens 5
                this.columnTween5 = this.tweens.add({
                    targets: container5,
                    props: { y: { value: "+=" + symbolHeight, duration: 100 } },
                    repeat: 40,
                    onRepeat: function () {
                        let randomNumber = Phaser.Math.RND.between(0, 9);
                        this.updateTo('y', container5.y + symbolHeight, true);
                        this.targets[0].first.y = this.targets[0].last.y - symbolHeight;
                        let symbol = this.targets[0].first;
                        symbol.setVisible(true).setTexture('symbols_blur', 'symbols_' + randomNumber + '.png');
                        this.targets[0].moveTo(symbol, 4);
                    },
                    onComplete: function () {
                        this.updateTo('y', container5.y + symbolHeight, true);
                        this.targets[0].first.y = this.targets[0].last.y - symbolHeight;
                        let symbol = this.targets[0].first;
                        this.targets[0].moveTo(symbol, 4);
                        //set texture symbols
                        for (let i = 3; i > 0; i--) {
                            let symbolsName = this.targets[0].list[i].frame.name;
                            this.targets[0].list[i].setTexture('symbols', symbolsName);
                        }
                        this.targets[0].scene.printResult();
                        //reset check click
                        options.checkClick = false;
                    }
                }, this);
            }
        });
    }

    printResult() {
        let s1 = this.columnTween1.targets[0];
        let s2 = this.columnTween2.targets[0];
        let s3 = this.columnTween3.targets[0];
        let s4 = this.columnTween4.targets[0];
        let s5 = this.columnTween5.targets[0];
        this.result.push([s1.list[3].frame.name, s2.list[3].frame.name, s3.list[3].
            frame.name, s4.list[3].frame.name, s5.list[3].frame.name], [s1.list[2].frame.name, s2.list[2].frame.name,
            s3.list[2].frame.name, s4.list[2].frame.name, s5.list[2].frame.name], [s1.list[1].frame.name, s2.list[1].frame.name,
            s3.list[1].frame.name, s4.list[1].frame.name, s5.list[1].frame.name]);
        this.getvalues();
    }

    resetOptions() {
        //reset win && result 
        options.win = 0;
        options.moneyWin = 0;
        this.result = [];
    }

    getvalues() {
        switch (options.line) {
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

    getLine1() {
        if (this.result[1][0] == this.result[1][1] &&
            this.result[1][1] == this.result[1][2] && this.result[1][2] == this.result[1][3]) {
            //get money
            this.fourMoney(this.result[1][0]);
        } else if (this.result[1][0] == this.result[1][1] &&
            this.result[1][1] == this.result[1][2]) {
            //get money
            this.threeMoney(this.result[1][0]);
        } else if (this.result[1][0] == this.result[1][1]) {
            //get money
            this.twoMoney(this.result[1][0]);
        } else {
            //get money
            this.oneMoney(this.result[1][0]);
        }
    }

    getLine2() {
        if (this.result[0][0] == this.result[0][1] &&
            this.result[0][1] == this.result[0][2] && this.result[0][2]
            == this.result[0][3]) {
            // get money
            this.fourMoney(this.result[0][0]);
        } else if (this.result[0][0] == this.result[0][1] &&
            this.result[0][1] == this.result[0][2]) {
            // get money 
            this.threeMoney(this.result[0][0]);
        } else if (this.result[0][0] == this.result[0][1]) {
            // get money 
            this.twoMoney(this.result[0][0]);
        } else {
            // get money 
            this.oneMoney(this.result[0][0]);
        }
    }

    getLine3() {
        if (this.result[2][0] == this.result[2][1] &&
            this.result[2][1] == this.result[2][2] && this.result[2][2]
            == this.result[2][3]) {
            //get money
            this.fourMoney(this.result[2][0]);
        } else if (this.result[2][0] == this.result[2][1] &&
            this.result[2][1] == this.result[2][2]) {
            //get money
            this.threeMoney(this.result[2][0]);
        } else if (this.result[2][0] == this.result[2][1]) {
            //get money
            this.twoMoney(this.result[2][0]);
        } else {
            //get money
            this.oneMoney(this.result[2][0]);
        }
    }
    getLine4() {
        if (this.result[0][0] == this.result[1][1] &&
            this.result[1][1] == this.result[2][2] && this.result[2][2] == this.result[1][3]) {
            // get money
            this.fourMoney(this.result[0][0]);
        } else if (this.result[0][0] == this.result[1][1] &&
            this.result[1][1] == this.result[2][2]) {
            // get money 
            this.threeMoney(this.result[0][0]);
        } else if (this.result[0][0] == this.result[1][1]) {
            // get money 
            this.twoMoney(this.result[0][0]);
        }
    }
    getLine5() {
        if (this.result[2][0] == this.result[1][1] &&
            this.result[1][1] == this.result[0][2] &&
            this.result[0][2] == this.result[1][3]) {
            // get money
            this.fourMoney(this.result[2][0]);
        } else if (this.result[2][0] == this.result[1][1] &&
            this.result[1][1] == this.result[0][2]) {
            // get money 
            this.threeMoney(this.result[2][0]);
        } else if (this.result[2][0] == this.result[1][1]) {
            // get money 
            this.twoMoney(this.result[2][0]);
        }
    }

    getLine6() {
        if (this.result[1][0] == this.result[0][1] &&
            this.result[0][1] == this.result[0][2] && this.result[0][2] ==
            this.result[0][3]) {
            // get money
            this.fourMoney(this.result[1][0]);
        } else if (this.result[1][0] == this.result[0][1] &&
            this.result[0][1] == this.result[0][2]) {
            // get money 
            this.threeMoney(this.result[1][0]);
        } else if (this.result[1][0] == this.result[0][1]) {
            // get money 
            this.twoMoney(this.result[1][0]);
        }
    }

    getLine7() {
        if (this.result[1][0] == this.result[2][1] &&
            this.result[2][1] == this.result[2][2] && this.result[2][2]
            == this.result[2][3]) {
            // get money
            this.fourMoney(this.result[1][0]);
        } else if (this.result[1][0] == this.result[2][1] &&
            this.result[2][1] == this.result[2][2]) {
            // get money 
            this.threeMoney(this.result[1][0]);
        } else if (this.result[1][0] == this.result[2][1]) {
            // get money 
            this.twoMoney(this.result[1][0]);
        }
    }

    getLine8() {
        if (this.result[0][0] == this.result[0][1] &&
            this.result[0][1] == this.result[1][2] && this.result[1][2] == this.result[2][3]) {
            // get money
            this.fourMoney(this.result[0][0]);
        } else if (this.result[0][0] == this.result[0][1] &&
            this.result[0][1] == this.result[1][2]) {
            // get money 
            this.threeMoney(this.result[0][0]);
        }
    }

    getLine9() {
        if (this.result[2][0] == this.result[2][1] &&
            this.result[2][1] == this.result[1][2] && this.result[1][2] == this.result[0][3]) {
            // get money
            this.fourMoney(this.result[2][0]);
        } else if (this.result[2][0] == this.result[2][1] &&
            this.result[2][1] == this.result[1][2]) {
            // get money 
            this.threeMoney(this.result[2][0]);
        }
    }

    getLine10() {
        if (this.result[1][0] == this.result[2][1] &&
            this.result[2][1] == this.result[1][2] && this.result[1][2] == this.result[0][3]) {
            // get money
            this.fourMoney(this.result[1][0]);
        } else if (this.result[1][0] == this.result[2][1] &&
            this.result[2][1] == this.result[1][2]) {
            // get money 
            this.threeMoney(this.result[1][0]);
        }
    }

    //get money
    oneMoney(value) {
        switch (value) {
            case 'symbols_1.png':
                options.win += (options.payvalues[1][0] * options.bet);
                this.setTextureWin(options.win);
                break;
            case 'symbols_2.png':
                options.win += (options.payvalues[2][0] * options.bet);
                this.setTextureWin(options.win);
                break;
            case 'symbols_3.png':
                options.win += (options.payvalues[3][0] * options.bet);
                this.setTextureWin(options.win);
                break;
            case 'symbols_4.png':
                options.win += (options.payvalues[4][0] * options.bet);
                this.setTextureWin(options.win);
                break;
            case 'symbols_5.png':
                options.win += (options.payvalues[5][0] * options.bet);
                this.setTextureWin(options.win);
                break;
        }
    }

    twoMoney(value) {
        switch (value) {
            case 'symbols_0.png':
                options.win += (options.payvalues[0][1] * options.bet);
                this.setTextureWin(options.win);
                break;
            case 'symbols_1.png':
                options.win += (options.payvalues[1][1] * options.bet);
                this.setTextureWin(options.win);
                break;
            case 'symbols_2.png':
                options.win += (options.payvalues[2][1] * options.bet);
                this.setTextureWin(options.win);
                break;
            case 'symbols_3.png':
                options.win += (options.payvalues[3][1] * options.bet);
                this.setTextureWin(options.win);
                break;
            case 'symbols_4.png':
                options.win += (options.payvalues[4][1] * options.bet);
                this.setTextureWin(options.win);
                break;
            case 'symbols_5.png':
                options.win += (options.payvalues[5][1] * options.bet);
                this.setTextureWin(options.win);
                break;
            case 'symbols_6.png':
                options.win += (options.payvalues[6][1] * options.bet);
                this.setTextureWin(options.win);
                break;
            case 'symbols_7.png':
                options.win += (options.payvalues[7][1] * options.bet);
                this.setTextureWin(options.win);
                break;
            case 'symbols_8.png':
                options.win += (options.payvalues[8][1] * options.bet);
                this.setTextureWin(options.win);
                break;
            default:
                options.win += (options.payvalues[9][1] * options.bet);
                this.setTextureWin(options.win);
        }
    }

    threeMoney(value) {
        switch (value) {
            case 'symbols_0.png':
                options.win += (options.payvalues[0][2] * options.bet);
                this.setTextureWin(options.win);
                break;
            case 'symbols_1.png':
                options.win += (options.payvalues[1][2] * options.bet);
                this.setTextureWin(options.win);
                break;
            case 'symbols_2.png':
                options.win += (options.payvalues[2][2] * options.bet);
                this.setTextureWin(options.win);
                break;
            case 'symbols_3.png':
                options.win += (options.payvalues[3][2] * options.bet);
                this.setTextureWin(options.win);
                break;
            case 'symbols_4.png':
                options.win += (options.payvalues[4][2] * options.bet);
                this.setTextureWin(options.win);
                break;
            case 'symbols_5.png':
                options.win += (options.payvalues[5][2] * options.bet);
                this.setTextureWin(options.win);
                break;
            case 'symbols_6.png':
                options.win += (options.payvalues[6][2] * options.bet);
                this.setTextureWin(options.win);
                break;
            case 'symbols_7.png':
                options.win += (options.payvalues[7][2] * options.bet);
                this.setTextureWin(options.win);
                break;
            case 'symbols_8.png':
                options.win += (options.payvalues[8][2] * options.bet);
                this.setTextureWin(options.win);
                break;
            default:
                options.win += (options.payvalues[9][2] * options.bet);
                this.setTextureWin(options.win);
        }
    }

    fourMoney(value) {
        switch (value) {
            case 'symbols_0.png':
                options.win += (options.payvalues[0][3] * options.bet);
                this.setTextureWin(options.win);
                break;
            case 'symbols_1.png':
                options.win += (options.payvalues[1][3] * options.bet);
                this.setTextureWin(options.win);
                break;
            case 'symbols_2.png':
                options.win += (options.payvalues[2][3] * options.bet);
                this.setTextureWin(options.win);
                break;
            case 'symbols_3.png':
                options.win += (options.payvalues[3][3] * options.bet);
                this.setTextureWin(options.win);
                break;
            case 'symbols_4.png':
                options.win += (options.payvalues[4][3] * options.bet);
                this.setTextureWin(options.win);
                break;
            case 'symbols_5.png':
                options.win += (options.payvalues[5][3] * options.bet);
                this.setTextureWin(options.win);
                break;
            case 'symbols_6.png':
                options.win += (payvalues[6][3] * options.bet);
                this.setTextureWin(options.win);
                break;
            case 'symbols_7.png':
                options.win += (options.payvalues[7][3] * options.bet);
                this.setTextureWin(options.win);
                break;
            case 'symbols_8.png':
                options.win += (options.payvalues[8][3] * options.bet);
                this.setTextureWin(options.win);
                break;
            default:
                options.win += (options.payvalues[9][3] * options.bet);
                this.setTextureWin(options.win);
        }
    }

    setTextureWin(value) {
        switch (options.line) {
            case 1 :
                this.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
                    'line', 'payline_1.png'));
                break;
            case 2 :
                for(let i = 1 ; i < 3; i++) {
                    this.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
                        'line', 'payline_' + i + '.png'));
                }
                break;
            case 3 :
                for(let i = 1 ; i < 4; i++) {
                    this.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
                        'line', 'payline_' + i + '.png'));
                }
                break;
            case 4 :
                for(let i = 1 ; i < 5; i++) {
                    this.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
                        'line', 'payline_' + i + '.png'));
                }
                break;
            case 5 :
                for(let i = 1 ; i < 6; i++) {
                    this.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
                        'line', 'payline_' + i + '.png'));
                }
                break;
            case 6 :
                for(let i = 1 ; i < 7; i++) {
                    this.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
                        'line', 'payline_' + i + '.png'));
                }
                break;
            case 7 :
                for(let i = 1 ; i < 8; i++) {
                    this.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
                        'line', 'payline_' + i + '.png'));
                }
                break;
            case 8 :
                for(let i = 1 ; i < 9; i++) {
                    this.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
                        'line', 'payline_' + i + '.png'));
                }
                break;
            case 9 :
                for(let i = 1 ; i < 10; i++) {
                    this.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
                        'line', 'payline_' + i + '.png'));
                }
                break;
            default :
            for(let i = 1 ; i < 11; i++) {
                this.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
                    'line', 'payline_' + i + '.png'));
            }
        }
        options.moneyWin += value;
        this.valueMoney += options.moneyWin;
        if (!this.txtWin) {
            this.txtWin = this.add.text(config.width - 340, config.height - 130, 'WIN: ' + options.moneyWin + ' $ ', style.styleWin);
        } else {
            this.txtWin.destroy();
            this.txtWin = this.add.text(config.width - 340, config.height - 130, 'WIN: ' + options.moneyWin + ' $ ', style.styleWin);
        }
        //save localStorage
        if (localStorage.getItem('money')) {
            localStorage.removeItem('money');
            localStorage.setItem('money', this.valueMoney);
        }
        this.txtMoney.setText(this.valueMoney + '$');
    }

    spin() {
        this.bgSpin = this.add.sprite(config.width - 275, config.height - 50, 'bgButtons', 'btn-spin.png').setInteractive();
        //text spin
        this.txtSpin = this.add.text(config.width - 310, config.height - 70, options.txtSpin, style.styleButton);
    }

    bgMaxBet() {
        this.maxBet = this.add.sprite(config.width - 475, config.height - 50, 'bgButtons', 'btn-maxbet.png').setInteractive();
        this.txtMaxBet = this.add.text(config.width - 550, config.height - 70, options.txtMaxBet, style.styleButton);
        this.txtCountMaxBet = this.add.text(config.width - 550, config.height - 140, 'BET: ' + options.bet, style.styleButton);
        this.maxBet.on('pointerdown', () => {
            if (!options.checkClick) {
                options.line = 10;
                this.txtCountLine.setText(options.line);
                options.coin = 50;
                this.txtCountCoin.setText(options.coin);
                this.txtCountMaxBet.setText('BET: ' + options.line * options.coin);
            }
        });
    }

    bgCoin() {
        this.coin = this.add.sprite(config.width - 678, config.height - 50, 'bgButtons', 'btn-coin.png').setInteractive();
        this.txtCoin = this.add.text(config.width - 720, config.height - 70, options.txtCoin, style.styleButton);
        this.txtCountCoin = this.add.text(config.width - 700, config.height - 140, options.coin, style.styleButton);
        this.coin.on('pointerdown', () => {
            if (!options.checkClick) {
                if (options.coin < 50) {
                    options.coin += 10;
                    this.txtCountCoin.setText(options.coin);
                    this.txtCountMaxBet.setText('BET: ' + options.coin * options.line);
                } else {
                    options.coin = 10;
                    this.txtCountCoin.setText(options.coin);
                    this.txtCountMaxBet.setText('BET: ' + options.coin * options.line);
                }
            }
        });
    }

    bgLine() {
        this.btnLine = this.add.sprite(config.width - 865, config.height - 50, 'bgButtons', 'btn-line.png').setInteractive();
        this.txtLine = this.add.text(config.width - 915, config.height - 70, options.txtLine, style.styleButton);
        this.txtCountLine = this.add.text(config.width - 880, config.height - 140, options.line, style.styleButton);

        this.btnLine.on('pointerdown', () => {
            if (!options.checkClick) {
                if (options.line < 10) {
                    options.line++;
                    this.txtCountLine.setText(options.line);
                    this.txtCountMaxBet.setText('BET: ' + options.line * options.coin);
                } else {
                    options.line = 1;
                    this.txtCountLine.setText(options.line);
                    this.txtCountMaxBet.setText('BET: ' + options.line * options.coin);
                }
            }
        });
    }

    bgInfo() {
        this.add.sprite(config.width - 1020, config.height - 50, 'bgButtons', 'btn-info.png');
        this.txtInfo = this.add.text(config.width - 1060, config.height - 70, options.txtInfo, style.styleButton);
    }

    update() { }
}

export default GameScene;