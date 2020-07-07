import { config } from '../config/config';
import { options } from '../constants/options';
import { style } from '../css/style';

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.linesArray = [];
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
        this.txtMoney = this.add.text(config.width - 1040, config.height - 695, options.money + '$', style.styleTextPoint);
        //add image buttons
        this.bgMaxBet();
        this.bgCoin();
        this.bgLine();
        this.bgInfo();
        this.spin();
        this.bgSpin.on('pointerdown', () => {
            if(this.line1 || this.line2 || this.line3 || 
                this.line4 || this.line5 || this.line6 || 
                this.line7 || this.line8 || this.line9 || this.line10) {
                    this.line1.destroy(true, true);
                    this.line2.destroy(true, true);
                    this.line3.destroy(true, true);
                    this.line4.destroy(true, true);
                    this.line5.destroy(true, true);
                    this.line6.destroy(true, true);
                    this.line7.destroy(true, true);
                    this.line8.destroy(true, true);
                    this.line9.destroy(true, true);
                    this.line10.destroy(true, true);
            }
            if (!options.checkClick) {
                options.checkClick = true;
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
                        //reset check click
                        options.checkClick = false;
                    }
                }, this);
            }
        });
    }

    spin() {
        this.bgSpin = this.add.sprite(config.width - 275, config.height - 50, 'bgButtons', 'btn-spin.png').setInteractive();
        //text spin
        this.txtSpin = this.add.text(config.width - 310, config.height - 70, options.txtSpin, style.styleButton);
    }

    bgMaxBet() {
        this.add.sprite(config.width - 475, config.height - 50, 'bgButtons', 'btn-maxbet.png');
        this.txtMaxBet = this.add.text(config.width - 550, config.height - 70, options.txtMaxBet, style.styleButton);
        this.txtCountMaxBet = this.add.text(config.width - 550, config.height - 140, 'BET: ' + options.maxBet, style.styleButton);
    }

    bgCoin() {
        this.add.sprite(config.width - 678, config.height - 50, 'bgButtons', 'btn-coin.png');
        this.txtCoin = this.add.text(config.width - 720, config.height - 70, options.txtCoin, style.styleButton);
        this.txtCountCoin = this.add.text(config.width - 710, config.height - 140, options.coin, style.styleButton);
    }

    bgLine() {
        this.btnLine = this.add.sprite(config.width - 865, config.height - 50, 'bgButtons', 'btn-line.png').setInteractive();
        this.txtLine = this.add.text(config.width - 915, config.height - 70, options.txtLine, style.styleButton);
        this.txtCountLine = this.add.text(config.width - 870, config.height - 140, options.line, style.styleButton);
        
        this.btnLine.on('pointerdown', () => {
            if(!options.checkClick) {
                switch(options.line) {
                    case 1:
                        if(this.line1 || this.line2 || this.line3 || 
                            this.line4 || this.line5 || this.line6 || 
                            this.line7 || this.line8 || this.line9 || this.line10) {
                                this.line1.destroy(true, true);
                                this.line2.destroy(true, true);
                                this.line3.destroy(true, true);
                                this.line4.destroy(true, true);
                                this.line5.destroy(true, true);
                                this.line6.destroy(true, true);
                                this.line7.destroy(true, true);
                                this.line8.destroy(true, true);
                                this.line9.destroy(true, true);
                                this.line10.destroy(true, true);
                        }
                        this.txtCountLine.x = 410;
                        this.txtCountLine.setText(options.line);
                        this.line1 = this.add.sprite(config.width / 2, config.height / 2, 'line', 'payline_' + options.line +'.png');
                        options.line++;
                        break;
                    case 2:
                        this.txtCountLine.setText(options.line);
                        this.line2 = this.add.sprite(config.width / 2, config.height / 2, 'line', 'payline_' + options.line +'.png');
                        options.line++;
                        break;
                    case 3:
                        this.txtCountLine.setText(options.line);
                        this.line3 = this.add.sprite(config.width / 2, config.height / 2, 'line', 'payline_' + options.line +'.png');
                        options.line++;
                        break;
                    case 4:
                        this.txtCountLine.setText(options.line);
                        this.line4 = this.add.sprite(config.width / 2, config.height / 2, 'line', 'payline_' + options.line +'.png');
                        options.line++;
                        break;
                    case 5:
                        this.txtCountLine.setText(options.line);
                        this.line5 = this.add.sprite(config.width / 2, config.height / 2, 'line', 'payline_' + options.line +'.png');
                        options.line++;
                        break;
                    case 6:
                        this.txtCountLine.setText(options.line);
                        this.line6 = this.add.sprite(config.width / 2, config.height / 2, 'line', 'payline_' + options.line +'.png');
                        options.line++;
                        break;
                    case 7:
                        this.txtCountLine.setText(options.line);
                        this.line7 = this.add.sprite(config.width / 2, config.height / 2, 'line', 'payline_' + options.line +'.png');
                        options.line++;
                        break;
                    case 8:
                        this.txtCountLine.setText(options.line);
                        this.line8 = this.add.sprite(config.width / 2, config.height / 2, 'line', 'payline_' + options.line +'.png');
                        options.line++;
                        break;
                    case 9:
                        this.txtCountLine.setText(options.line);
                        this.line9 = this.add.sprite(config.width / 2, config.height / 2, 'line', 'payline_' + options.line +'.png');
                        options.line++;
                        break;
                    case 10:
                        this.txtCountLine.x = 400;
                        this.txtCountLine.setText(options.line);
                        this.line10 = this.add.sprite(config.width / 2, config.height / 2, 'line', 'payline_' + options.line +'.png');
                        //remove lines
                        // setTimeout(() => {
                        //     this.line1.destroy(true, true);
                        //     this.line2.destroy(true, true);
                        //     this.line3.destroy(true, true);
                        //     this.line4.destroy(true, true);
                        //     this.line5.destroy(true, true);
                        //     this.line6.destroy(true, true);
                        //     this.line7.destroy(true, true);
                        //     this.line8.destroy(true, true);
                        //     this.line9.destroy(true, true);
                        //     this.line10.destroy(true, true);
                        // }, 100);
                        options.line = 1;
                        break;
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