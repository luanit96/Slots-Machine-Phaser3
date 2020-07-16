import { config } from '../config/config';
import { options, audioMusic, gameConfig } from '../constants/options';
import { style } from '../css/style';

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.result = [];
        this.lineArray = [];
    }

    preload() {
        //load image
        this.load.path = '../../src/assets/jsons/';
        this.load.atlas('about', 'images/about/about.png', 'images/about/about.json');
        this.load.atlas('background', 'images/bg/bg.png', 'images/bg/bg.json');
        this.load.atlas('bgButtons', 'images/buttons/button.png', 'images/buttons/button.json');
        this.load.atlas('symbols', 'images/symbols/symbols.png', 'images/symbols/symbols.json');
        this.load.atlas('symbols_blur', 'images/symbols/symbols_blur.png', 'images/symbols/symbols_blur.json');
        this.load.atlas('line', 'images/lines/line.png', 'images/lines/line.json');
        //load audio
        this.load.audio('reels', 'audio/reels.mp3');
        this.load.audio('reelStop', 'audio/reel_stop.mp3');
        this.load.audio('win', 'audio/win.mp3');
        this.load.audio('button', 'audio/button.mp3');
    }

    create() {
        //add audio
        audioMusic.reels = this.sound.add('reels');
        audioMusic.reelStop = this.sound.add('reelStop');
        audioMusic.win = this.sound.add('win');
        audioMusic.button = this.sound.add('button');

        this.add.sprite(config.width / 2, config.height / 2, 'background', 'bg.jpg');
        //symbols column 1
        const symbolsImage4 = this.add.sprite(0, -gameConfig.symbolHeight * 4, 'symbols', 'symbols_1.png');
        const symbolsImage3 = this.add.sprite(0, -gameConfig.symbolHeight * 3, 'symbols', 'symbols_2.png');
        const symbolsImage2 = this.add.sprite(0, -gameConfig.symbolHeight * 2, 'symbols', 'symbols_3.png');
        const symbolsImage1 = this.add.sprite(0, -gameConfig.symbolHeight, 'symbols', 'symbols_4.png');
        const symbolsImage = this.add.sprite(0, 0, 'symbols', 'symbols_5.png');
        //container 1
        var container = this.add.container(340, 630);
        container.add([symbolsImage, symbolsImage1, symbolsImage2, symbolsImage3, symbolsImage4]);
        //symbols column 2
        const symbols2Image4 = this.add.sprite(0, -gameConfig.symbolHeight * 4, 'symbols', 'symbols_5.png');
        const symbols2Image3 = this.add.sprite(0, -gameConfig.symbolHeight * 3, 'symbols', 'symbols_6.png');
        const symbols2Image2 = this.add.sprite(0, -gameConfig.symbolHeight * 2, 'symbols', 'symbols_7.png');
        const symbols2Image1 = this.add.sprite(0, -gameConfig.symbolHeight, 'symbols', 'symbols_8.png');
        const symbols2Image = this.add.sprite(0, 0, 'symbols', 'symbols_9.png');
        //container 2
        var container2 = this.add.container(490, 630);
        container2.add([symbols2Image, symbols2Image1, symbols2Image2, symbols2Image3, symbols2Image4]);
        //symbols column 3
        const symbols3Image4 = this.add.sprite(0, -gameConfig.symbolHeight * 4, 'symbols', 'symbols_0.png');
        const symbols3Image3 = this.add.sprite(0, -gameConfig.symbolHeight * 3, 'symbols', 'symbols_8.png');
        const symbols3Image2 = this.add.sprite(0, -gameConfig.symbolHeight * 2, 'symbols', 'symbols_4.png');
        const symbols3Image1 = this.add.sprite(0, -gameConfig.symbolHeight, 'symbols', 'symbols_3.png');
        const symbols3Image = this.add.sprite(0, 0, 'symbols', 'symbols_2.png');
        //container 3
        var container3 = this.add.container(640, 630);
        container3.add([symbols3Image, symbols3Image1, symbols3Image2, symbols3Image3, symbols3Image4]);
        //symbols column 4
        const symbols4Image4 = this.add.sprite(0, -gameConfig.symbolHeight * 4, 'symbols', 'symbols_9.png');
        const symbols4Image3 = this.add.sprite(0, -gameConfig.symbolHeight * 3, 'symbols', 'symbols_1.png');
        const symbols4Image2 = this.add.sprite(0, -gameConfig.symbolHeight * 2, 'symbols', 'symbols_2.png');
        const symbols4Image1 = this.add.sprite(0, -gameConfig.symbolHeight, 'symbols', 'symbols_8.png');
        const symbols4Image = this.add.sprite(0, 0, 'symbols', 'symbols_5.png');
        //container 4
        var container4 = this.add.container(790, 630);
        container4.add([symbols4Image, symbols4Image1, symbols4Image2, symbols4Image3, symbols4Image4]);
        //symbols column 5
        const symbols5Image4 = this.add.sprite(0, -gameConfig.symbolHeight * 4, 'symbols', 'symbols_7.png');
        const symbols5Image3 = this.add.sprite(0, -gameConfig.symbolHeight * 3, 'symbols', 'symbols_2.png');
        const symbols5Image2 = this.add.sprite(0, -gameConfig.symbolHeight * 2, 'symbols', 'symbols_1.png');
        const symbols5Image1 = this.add.sprite(0, -gameConfig.symbolHeight, 'symbols', 'symbols_3.png');
        const symbols5Image = this.add.sprite(0, 0, 'symbols', 'symbols_6.png');
        //container 5
        var container5 = this.add.container(940, 630);
        container5.add([symbols5Image, symbols5Image1, symbols5Image2, symbols5Image3, symbols5Image4]);
        //add image machine
        this.add.sprite(config.width / 2, config.height / 2, 'background', 'machine.png');
        this.valueMoney = localStorage.getItem('money') ? localStorage.getItem('money') :
            options.money;
        this.txtMoney = this.add.text(config.width - 1050, config.height - 695, this.valueMoney + '$', style.styleTextPoint);
        this.credits = this.add.sprite(config.width - 235, config.height - 680,
            'about', 'btn-credits.png').setInteractive().setScale(0.7);
        this.credits.on('pointerover', () => {
            if (!options.checkClick) {
                this.paylines = this.add.sprite(config.width / 2, config.height / 2,
                    'about', 'palines.png');
            }
        });
        this.credits.on('pointerout', () => {
            if (this.paylines) {
                this.paylines.destroy();
            }
        });
        //add image buttons
        this.bgMaxBet();
        this.bgCoin();
        this.bgLine();
        this.bgInfo();
        this.spin();
        this.bgSpin.on('pointerup', () => this.bgSpin.setScale(1));
        this.bgSpin.on('pointerdown', () => {
            if (this.lineArray.length > 0) {
                for (let i = 0; i < this.lineArray.length; i++) {
                    this.lineArray[i].destroy();
                }
            }
            //this.lineArray.destroy();
            if (!options.checkClick && this.valueMoney >=
                (options.coin * options.line)) {
                options.checkClick = true;
                this.bgSpin.setScale(0.9);
                //audio play
                audioMusic.button.play();
                audioMusic.reels.play();
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
                    props: { y: { value: "+=" + gameConfig.symbolHeight, 
                    duration: gameConfig.duration }},
                    repeat: gameConfig.repeat[0],
                    onRepeat: function () {
                        let randomNumber = Phaser.Math.RND.between(0, 9);
                        this.updateTo('y', container.y + gameConfig.symbolHeight, true);
                        this.targets[0].first.y = this.targets[0].last.y - gameConfig.symbolHeight;
                        let symbol = this.targets[0].first;
                        symbol.setVisible(true).setTexture('symbols_blur', 'symbols_' + randomNumber + '.png');
                        this.targets[0].moveTo(symbol, 4);
                    },
                    onComplete: this.stopTweens,
                }, this);
                //column tweens 2
                this.columnTween2 = this.tweens.add({
                    targets: container2,
                    props: { y: { value: "+=" + gameConfig.symbolHeight, 
                    duration: gameConfig.duration } },
                    repeat: gameConfig.repeat[1],
                    onRepeat: function () {
                        let randomNumber = Phaser.Math.RND.between(0, 9);
                        this.updateTo('y', container2.y + gameConfig.symbolHeight, true);
                        this.targets[0].first.y = this.targets[0].last.y - gameConfig.symbolHeight;
                        let symbol = this.targets[0].first;
                        symbol.setVisible(true).setTexture('symbols_blur', 'symbols_' + randomNumber + '.png');
                        this.targets[0].moveTo(symbol, 4);
                    },
                    onComplete: this.stopTweens
                }, this);
                //column tweens 3
                this.columnTween3 = this.tweens.add({
                    targets: container3,
                    props: { y: { value: "+=" + gameConfig.symbolHeight, 
                    duration: gameConfig.duration } },
                    repeat: gameConfig.repeat[2],
                    onRepeat: function () {
                        let randomNumber = Phaser.Math.RND.between(0, 9);
                        this.updateTo('y', container3.y + gameConfig.symbolHeight, true);
                        this.targets[0].first.y = this.targets[0].last.y - gameConfig.symbolHeight;
                        let symbol = this.targets[0].first;
                        symbol.setVisible(true).setTexture('symbols_blur', 'symbols_' + randomNumber + '.png');
                        this.targets[0].moveTo(symbol, 4);
                    },
                    onComplete: this.stopTweens
                }, this);
                //column tweens 4
                this.columnTween4 = this.tweens.add({
                    targets: container4,
                    props: { y: { value: "+=" + gameConfig.symbolHeight, 
                    duration: gameConfig.duration } },
                    repeat: gameConfig.repeat[3],
                    onRepeat: function () {
                        let randomNumber = Phaser.Math.RND.between(0, 9);
                        this.updateTo('y', container4.y + gameConfig.symbolHeight, true);
                        this.targets[0].first.y = this.targets[0].last.y - gameConfig.symbolHeight;
                        let symbol = this.targets[0].first;
                        symbol.setVisible(true).setTexture('symbols_blur', 'symbols_' + randomNumber + '.png');
                        this.targets[0].moveTo(symbol, 4);
                    },
                    onComplete: this.stopTweens
                }, this);
                //column tweens 5
                this.columnTween5 = this.tweens.add({
                    targets: container5,
                    props: { y: { value: "+=" + gameConfig.symbolHeight, 
                    duration: gameConfig.duration } },
                    repeat: gameConfig.repeat[4],
                    onRepeat: function () {
                        let randomNumber = Phaser.Math.RND.between(0, 9);
                        this.updateTo('y', container5.y + gameConfig.symbolHeight, true);
                        this.targets[0].first.y = this.targets[0].last.y - gameConfig.symbolHeight;
                        let symbol = this.targets[0].first;
                        symbol.setVisible(true).setTexture('symbols_blur', 'symbols_' + randomNumber + '.png');
                        this.targets[0].moveTo(symbol, 4);
                    },
                    onComplete: function () {
                        this.targets[0].first.y = this.targets[0].last.y - gameConfig.symbolHeight;
                        let symbol = this.targets[0].first;
                        this.targets[0].moveTo(symbol, 4);
                        //set texture symbols
                        for (let i = 0; i < 5; i++) {
                            let symbolsName = this.targets[0].list[i].frame.name;
                            this.targets[0].list[i].setTexture('symbols', symbolsName);
                        }
                        this.targets[0].scene.printResult();
                        //play audio
                        audioMusic.reelStop.play();
                        //stop audio
                        audioMusic.reels.stop();
                        //reset check click
                        options.checkClick = false;
                    },
                }, this);
            }
        });
    }

    stopTweens() {
        this.targets[0].first.y = this.targets[0].last.y - 
        gameConfig.symbolHeight;
        let symbol = this.targets[0].first;
        this.targets[0].moveTo(symbol, 4);
        //set texture symbols
        for (let i = 0; i < 5; i++) {
            let symbolsName = this.targets[0].list[i].frame.name;
            this.targets[0].list[i].setTexture('symbols', symbolsName);
        }
        //play audio
        audioMusic.reelStop.play();
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
            this.result[1][1] == this.result[1][2] && 
            this.result[1][2] == this.result[1][3] && 
            this.result[1][3] == this.result[1][4]) {
            //play audio win
            audioMusic.win.play();
            //get money
            this.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_1.png'));
            this.threeMoney(this.result[1][0]);
        } else if (this.result[1][0] == this.result[1][1] &&
            this.result[1][1] == this.result[1][2] && this.result[1][2]
            == this.result[1][3]) {
            //play audio win
            audioMusic.win.play();
            //get money
            this.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_1.png'));
            this.twoMoney(this.result[1][0]);
        } else if (this.result[1][0] == this.result[1][1] && this.result[1][1]
            == this.result[1][2]) {
            //play audio win
            audioMusic.win.play();
            //get money 
            this.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_1.png'));
            this.oneMoney(this.result[1][0]);
        }
    }

    getLine2() {
        if (this.result[0][0] == this.result[0][1] &&
            this.result[0][1] == this.result[0][2] && this.result[0][2]
            == this.result[0][3] && this.result[0][3] == this.result[0][4]) {
            //play audio win
            audioMusic.win.play();
            // get money
            this.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_2.png'));
            this.threeMoney(this.result[0][0]);
        } else if (this.result[0][0] == this.result[0][1] &&
            this.result[0][1] == this.result[0][2] && this.result[0][2] ==
            this.result[0][3]) {
            //play audio win
            audioMusic.win.play();
            // get money
            this.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_2.png'));
            this.twoMoney(this.result[0][0]);
        } else if (this.result[0][0] == this.result[0][1] && this.result[0][1]
            == this.result[0][2]) {
            //play audio win
            audioMusic.win.play();
            // get money
            this.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_2.png'));
            this.oneMoney(this.result[0][0]);
        }
    }

    getLine3() {
        if (this.result[2][0] == this.result[2][1] &&
            this.result[2][1] == this.result[2][2] && this.result[2][2]
            == this.result[2][3] && this.result[2][3] == this.result[2][4]) {
            //play audio win
            audioMusic.win.play();
            //get money
            this.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_3.png'));
            this.threeMoney(this.result[2][0]);
        } else if (this.result[2][0] == this.result[2][1] &&
            this.result[2][1] == this.result[2][2] && this.result[2][2]
            == this.result[2][3]) {
            //play audio win
            audioMusic.win.play();
            //get money
            this.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_3.png'));
            this.twoMoney(this.result[2][0]);
        } else if (this.result[2][0] == this.result[2][1] && this.result[2][1]
            == this.result[2][2]) {
            //play audio win
            audioMusic.win.play();
            //get money
            this.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_3.png'));
            this.oneMoney(this.result[2][0]);
        }
    }
    getLine4() {
        if (this.result[0][0] == this.result[1][1] &&
            this.result[1][1] == this.result[2][2] && this.result[2][2] == 
            this.result[1][3] && this.result[1][3] == this.result[0][4]) {
            //play audio win
            audioMusic.win.play();
            // get money
            this.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_4.png'));
            this.threeMoney(this.result[0][0]);
        } else if (this.result[0][0] == this.result[1][1] &&
            this.result[1][1] == this.result[2][2] && this.result[2][2] == 
            this.result[1][3]) {
            //play audio win
            audioMusic.win.play();
            // get money
            this.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_4.png'));
            this.twoMoney(this.result[0][0]);
        } else if (this.result[0][0] == this.result[1][1] &&
            this.result[1][1] == this.result[2][2]) {
            //play audio win
            audioMusic.win.play();
            // get money
            this.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_4.png'));
            this.oneMoney(this.result[0][0]);
        }
    }
    getLine5() {
        if (this.result[2][0] == this.result[1][1] &&
            this.result[1][1] == this.result[0][2] &&
            this.result[0][2] == this.result[1][3] && this.result[1][3]
            == this.result[2][4]) {
            //play audio win
            audioMusic.win.play();
            // get money
            this.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_5.png'));
            this.threeMoney(this.result[2][0]);
        } else if (this.result[2][0] == this.result[1][1] &&
            this.result[1][1] == this.result[0][2] &&
            this.result[0][2] == this.result[1][3]) {
            //play audio win
            audioMusic.win.play();
            // get money
            this.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_5.png'));
            this.twoMoney(this.result[2][0]);
        } else if (this.result[2][0] == this.result[1][1] &&
            this.result[1][1] == this.result[0][2]) {
            //play audio win
            audioMusic.win.play();
            // get money
            this.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_5.png'));
            this.oneMoney(this.result[2][0]);
        }
    }

    getLine6() {
        if (this.result[1][0] == this.result[0][1] &&
            this.result[0][1] == this.result[0][2] && this.result[0][2] ==
            this.result[0][3] && this.result[0][3] == this.result[1][4]) {
            //play audio win
            audioMusic.win.play();
            // get money
            this.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_6.png'));
            this.threeMoney(this.result[1][0]);
        } else if (this.result[1][0] == this.result[0][1] &&
            this.result[0][1] == this.result[0][2] && this.result[0][2] ==
            this.result[0][3]) {
            //play audio win
            audioMusic.win.play();
            // get money
            this.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_6.png'));
            this.twoMoney(this.result[1][0]);
        } else if (this.result[1][0] == this.result[0][1] &&
            this.result[0][1] == this.result[0][2]) {
            //play audio win
            audioMusic.win.play();
            // get money
            this.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_6.png'));
            this.oneMoney(this.result[1][0]);
        }
    }

    getLine7() {
        if (this.result[1][0] == this.result[2][1] &&
            this.result[2][1] == this.result[2][2] && this.result[2][2]
            == this.result[2][3] && this.result[2][3] == this.result[1][4]) {
            //play audio win
            audioMusic.win.play();
            // get money
            this.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_7.png'));
            this.threeMoney(this.result[1][0]);
        } else if (this.result[1][0] == this.result[2][1] &&
            this.result[2][1] == this.result[2][2] && this.result[2][2]
            == this.result[2][3]) {
            //play audio win
            audioMusic.win.play();
            // get money
            this.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_7.png'));
            this.twoMoney(this.result[1][0]);
        } else if (this.result[1][0] == this.result[2][1] &&
            this.result[2][1] == this.result[2][2]) {
            //play audio win
            audioMusic.win.play();
            // get money
            this.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_7.png'));
            this.oneMoney(this.result[1][0]);
        }
    }

    getLine8() {
        if (this.result[0][0] == this.result[0][1] &&
            this.result[0][1] == this.result[1][2] && this.result[1][2] == 
            this.result[2][3] && this.result[2][3] == this.result[2][4]) {
            //play audio win
            audioMusic.win.play();
            // get money
            this.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_8.png'));
            this.threeMoney(this.result[0][0]);
        } else if (this.result[0][0] == this.result[0][1] &&
            this.result[0][1] == this.result[1][2] && this.result[1][2] == 
            this.result[2][3]) {
            //play audio win
            audioMusic.win.play();
            // get money
            this.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_8.png'));
            this.twoMoney(this.result[0][0]);
        } else if(this.result[0][0] == this.result[0][1] &&
            this.result[0][1] == this.result[1][2]) {
            //play audio win
            audioMusic.win.play();
            // get money
            this.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_8.png'));
            this.oneMoney(this.result[0][0]);
        }
    }

    getLine9() {
        if (this.result[2][0] == this.result[2][1] &&
            this.result[2][1] == this.result[1][2] && this.result[1][2] == 
            this.result[0][3] && this.result[0][3] == this.result[0][4]) {
            //play audio win
            audioMusic.win.play();
            // get money
            this.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_9.png'));
            this.threeMoney(this.result[2][0]);
        } else if (this.result[2][0] == this.result[2][1] &&
            this.result[2][1] == this.result[1][2] && this.result[1][2] == 
            this.result[0][3]) {
            //play audio win
            audioMusic.win.play();
            // get money
            this.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_9.png'));
            this.twoMoney(this.result[2][0]);
        } else if(this.result[2][0] == this.result[2][1] &&
            this.result[2][1] == this.result[1][2]) {
            //play audio win
            audioMusic.win.play();
            // get money
            this.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_9.png'));
            this.oneMoney(this.result[2][0]);
        }
    }

    getLine10() {
        if (this.result[1][0] == this.result[2][1] &&
            this.result[2][1] == this.result[1][2] && this.result[1][2] == 
            this.result[0][3] && this.result[0][3] == this.result[1][4]) {
            //play audio win
            audioMusic.win.play();
            // get money
            this.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_10.png'));
            this.threeMoney(this.result[1][0]);
        } else if (this.result[1][0] == this.result[2][1] &&
            this.result[2][1] == this.result[1][2] && this.result[1][2] == 
            this.result[0][3]) {
            //play audio win
            audioMusic.win.play();
            // get money
            this.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_10.png'));
            this.twoMoney(this.result[1][0]);
        } else if(this.result[1][0] == this.result[2][1] &&
            this.result[2][1] == this.result[1][2]) {
            //play audio win
            audioMusic.win.play();
            // get money
            this.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_10.png'));
            this.oneMoney(this.result[1][0]);
        }
    }

    //get money

    oneMoney(value) {
        switch (value) {
            case 'symbols_0.png':
                options.win += (options.payvalues[0][0] / options.line) * 
                (options.line * options.coin);
                this.setTextureWin(options.win);
                break;
            case 'symbols_1.png':
                options.win += (options.payvalues[1][0] / options.line) * 
                (options.line * options.coin);
                this.setTextureWin(options.win);
                break;
            case 'symbols_2.png':
                options.win += (options.payvalues[2][0] / options.line)* 
                (options.line * options.coin);
                this.setTextureWin(options.win);
                break;
            case 'symbols_3.png':
                options.win += (options.payvalues[3][0] / options.line) * 
                (options.line * options.coin);
                this.setTextureWin(options.win);
                break;
            case 'symbols_4.png':
                options.win += (options.payvalues[4][0] / options.line) * 
                (options.line * options.coin);
                this.setTextureWin(options.win);
                break;
            case 'symbols_5.png':
                options.win += (options.payvalues[5][0] / options.line) * 
                (options.line * options.coin);
                this.setTextureWin(options.win);
                break;
            case 'symbols_6.png':
                options.win += (options.payvalues[6][0] / options.line) * 
                (options.line * options.coin);
                this.setTextureWin(options.win);
                break;
            case 'symbols_7.png':
                options.win += (options.payvalues[7][0] / options.line) *
                    (options.line * options.coin);
                this.setTextureWin(options.win);
                break;
            case 'symbols_8.png':
                options.win += (options.payvalues[8][0] / options.line) *
                    (options.line * options.coin);
                this.setTextureWin(options.win);
                break;
            default:
                options.win += (options.payvalues[9][0] / options.line) *
                    (options.line * options.coin);
                this.setTextureWin(options.win);
        }
    }

    twoMoney(value) {
        switch (value) {
            case 'symbols_0.png':
                options.win += (options.payvalues[0][1] / options.line) * 
                    (options.line * options.coin);
                this.setTextureWin(options.win);
                break;
            case 'symbols_1.png':
                options.win += (options.payvalues[1][1] / options.line) *
                    (options.line * options.coin);
                this.setTextureWin(options.win);
                break;
            case 'symbols_2.png':
                options.win += (options.payvalues[2][1] / options.line) *
                    (options.line * options.coin);
                this.setTextureWin(options.win);
                break;
            case 'symbols_3.png':
                options.win += (options.payvalues[3][1] / options.line) *
                    (options.line * options.coin);
                this.setTextureWin(options.win);
                break;
            case 'symbols_4.png':
                options.win += (options.payvalues[4][1] / options.line) *
                    (options.line * options.coin);
                this.setTextureWin(options.win);
                break;
            case 'symbols_5.png':
                options.win += (options.payvalues[5][1] / options.line) *
                    (options.line * options.coin);
                this.setTextureWin(options.win);
                break;
            case 'symbols_6.png':
                options.win += (options.payvalues[6][1] / options.line) *
                    (options.line * options.coin);
                this.setTextureWin(options.win);
                break;
            case 'symbols_7.png':
                options.win += (options.payvalues[7][1] / options.line) *
                    (options.line * options.coin);
                this.setTextureWin(options.win);
                break;
            case 'symbols_8.png':
                options.win += (options.payvalues[8][1] / options.line) *
                    (options.line * options.coin);
                this.setTextureWin(options.win);
                break;
            default:
                options.win += (options.payvalues[9][1] / options.line) *
                    (options.line * options.coin);
                this.setTextureWin(options.win);
        }
    }

    threeMoney(value) {
        switch (value) {
            case 'symbols_0.png':
                options.win += (options.payvalues[0][2] / options.line) *
                    (options.line * options.coin);
                this.setTextureWin(options.win);
                break;
            case 'symbols_1.png':
                options.win += (options.payvalues[1][2] / options.line) *
                    (options.line * options.coin);
                this.setTextureWin(options.win);
                break;
            case 'symbols_2.png':
                options.win += (options.payvalues[2][2] / options.line) *
                    (options.line * options.coin);
                this.setTextureWin(options.win);
                break;
            case 'symbols_3.png':
                options.win += (options.payvalues[3][2] / options.line) *
                    (options.line * options.coin);
                this.setTextureWin(options.win);
                break;
            case 'symbols_4.png':
                options.win += (options.payvalues[4][2] / options.line) *
                    (options.line * options.coin);
                this.setTextureWin(options.win);
                break;
            case 'symbols_5.png':
                options.win += (options.payvalues[5][2] / options.line) *
                    (options.line * options.coin);
                this.setTextureWin(options.win);
                break;
            case 'symbols_6.png':
                options.win += (options.payvalues[6][2] / options.line) *
                    (options.line * options.coin);
                this.setTextureWin(options.win);
                break;
            case 'symbols_7.png':
                options.win += (options.payvalues[7][2] / options.line) *
                    (options.line * options.coin);
                this.setTextureWin(options.win);
                break;
            case 'symbols_8.png':
                options.win += (options.payvalues[8][2] / options.line) *
                    (options.line * options.coin);
                this.setTextureWin(options.win);
                break;
            default:
                options.win += (options.payvalues[9][2] / options.line) *
                    (options.line * options.coin);
                this.setTextureWin(options.win);
        }
    }

    setTextureWin(value) {
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
        localStorage.setItem('money', this.valueMoney);
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
        //pointer down
        this.maxBet.on('pointerdown', () => {
            if (!options.checkClick) {
                this.maxBet.setScale(0.9);
                //audio play
                audioMusic.button.play();
                options.line = 10;
                this.txtCountLine.setText(options.line);
                options.coin = 50;
                this.txtCountCoin.setText(options.coin);
                this.txtCountMaxBet.setText('BET: ' + options.line * options.coin);
            }
        });
        //pointer up
        this.maxBet.on('pointerup', () => this.maxBet.setScale(1));
    }

    bgCoin() {
        this.coin = this.add.sprite(config.width - 678, config.height - 50, 'bgButtons', 'btn-coin.png').setInteractive();
        this.txtCoin = this.add.text(config.width - 720, config.height - 70, options.txtCoin, style.styleButton);
        this.txtCountCoin = this.add.text(config.width - 700, config.height - 140, options.coin, style.styleButton);
        //pointer down
        this.coin.on('pointerdown', () => {
            if (!options.checkClick) {
                this.coin.setScale(0.9);
                //audio play
                audioMusic.button.play();
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
        //pointer up
        this.coin.on('pointerup', () => this.coin.setScale(1));
    }

    bgLine() {
        this.btnLine = this.add.sprite(config.width - 865, config.height - 50, 'bgButtons', 'btn-line.png').setInteractive();
        this.txtLine = this.add.text(config.width - 915, config.height - 70, options.txtLine, style.styleButton);
        this.txtCountLine = this.add.text(config.width - 880, config.height - 140, options.line, style.styleButton);
        //pointer down
        this.btnLine.on('pointerdown', () => {
            if (!options.checkClick) {
                this.btnLine.setScale(0.9);
                //audio play
                audioMusic.button.play();
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
        //pointer up
        this.btnLine.on('pointerup', () => this.btnLine.setScale(1));
    }

    bgInfo() {
        this.info = this.add.sprite(config.width - 1020, config.height - 50, 'bgButtons', 'btn-info.png').setInteractive();
        this.txtInfo = this.add.text(config.width - 1060, config.height - 70, options.txtInfo, style.styleButton);
        this.info.on('pointerover', () => {
            if (!options.checkClick) {
                this.paytable = this.add.sprite(config.width / 2, config.height / 2,
                    'about', 'paytable.png');
            }
        });
        this.info.on('pointerout', () => {
            if (this.paytable) {
                this.paytable.destroy();
            }
        });
    }

    update() { }
}

export default GameScene;