import { config } from '../Config/config';
import { options, audioMusic } from '../Constants/options';
import { style } from '../Css/style';
import Sprite from '../Class/Sprite';
import Info from '../Class/Info';
import Container from '../Class/Container';
import Spin from '../Class/Spin';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        //load image
        this.load.path = '../../assets/jsons/';
        this.load.atlas('about', 'images/about/about.png', 'images/about/about.json');
        this.load.atlas('background', 'images/bg/bg.png', 'images/bg/bg.json');
        this.load.atlas('bgButtons', 'images/buttons/button.png', 'images/buttons/button.json');
        this.load.atlas('symbols', 'images/symbols/symbols.png', 'images/symbols/symbols.json');
        this.load.atlas('symbols_blur', 'images/symbols/symbols_blur.png', 'images/symbols/symbols_blur.json');
        this.load.atlas('line', 'images/lines/line.png', 'images/lines/line.json');
        this.load.atlas('sound','images/sound/sound.png','images/sound/sound.json');
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
        //add bg image
        const bg = new Sprite(this,config.width / 2, config.height / 2, 'background', 'bg.jpg');
        //container
        const container = new Container(this, config.width - 940, config.height - 90);
        const container2 = new Container(this, config.width - 790, config.height - 90);
        const container3 = new Container(this, config.width - 640, config.height - 90);
        const container4 = new Container(this, config.width - 490, config.height - 90);
        const container5 = new Container(this, config.width - 340, config.height - 90);
        //add image machine
        const machine = new Sprite(this,config.width / 2, config.height / 2, 'background', 'machine.png');
        this.valueMoney = localStorage.getItem('money') ? localStorage.getItem('money') :
            options.money;
        this.txtMoney = this.add.text(config.width - 1050, config.height - 695, this.valueMoney + '$', style.styleTextPoint);
        this.credits = new Sprite(this, config.width - 235, config.height - 680,
            'about', 'btn-credits.png').setScale(0.7);
        this.credits.on('pointerover', () => {
            if (!options.checkClick) {
                this.paylines = new Sprite(this,config.width / 2, config.height / 2,
                    'about', 'palines.png');
            }
        });
        this.credits.on('pointerout', () => {
            if (this.paylines) {
                this.paylines.destroy();
            }
        });
        //add sound image
        this.btnMusic = new Sprite(this,config.width - 310, config.height - 675, 'sound', 'btn_music_off.png').setScale(0.6);
        this.btnSound = new Sprite(this,config.width - 390, config.height - 675, 'sound', 'btn_sound_off.png').setScale(0.6);
        this.btnMusic.on('pointerdown', () => {
            if(!options.checkClick) {
                options.musicName = this.btnMusic.frame.name;
                options.soundName = this.btnSound.frame.name;
                if(options.musicName == 'btn_music.png') {
                    options.musicName = 'btn_music_off.png';
                } else {
                    options.musicName = 'btn_music.png';
                    if(options.soundName == 'btn_sound.png') {
                        audioMusic.button.play();
                    }
                } 
                this.btnMusic.setTexture('sound', options.musicName);
            }
        });
        this.btnSound.on('pointerdown', () => {
            if(!options.checkClick) {
                if(options.soundName == 'btn_sound.png') {
                    options.soundName = 'btn_sound_off.png';
                } else {
                    options.soundName = 'btn_sound.png';
                    audioMusic.button.play();
                } 
                this.btnSound.setTexture('sound', options.soundName);
            }
        });
        //add image buttons
        this.bgMaxBet();
        this.bgCoin();
        this.bgLine();
        //class info
        this.info = new Info(this, config.width - 1020, config.height - 50, 'bgButtons', 'btn-info.png');
        this.spin();
        this.bgSpin.on('pointerup', () => this.bgSpin.setScale(1));
        this.bgSpin.on('pointerdown', () => {
            if (options.lineArray.length > 0) {
                for (let i = 0; i < options.lineArray.length; i++) {
                    options.lineArray[i].destroy();
                }
            }
            //lineArray.destroy();
            if (!options.checkClick && this.valueMoney >=
                (options.coin * options.line)) {
                //setTint
                this.setColor();
                options.checkClick = true;
                this.bgSpin.setScale(0.9);
                //audio play
                if(options.soundName == 'btn_sound.png') {
                    audioMusic.button.play();
                }
                if(options.musicName == 'btn_music.png') {
                    audioMusic.reels.play();
                }
                //set money
                this.valueMoney -= (options.coin * options.line);
                this.txtMoney.setText(this.valueMoney + '$');
                //remove text txtwin
                if (this.txtWin) {
                    this.txtWin.destroy();
                }
                //save localStorage
                this.saveLocalStorage();
                //column tweens 1
                this.columnTween1 = this.tweens.add({
                    targets: container,
                    props: { y: { value: "+=" + options.symbolHeight, 
                    duration: options.duration }},
                    repeat: options.repeat[0],
                    onRepeat: this.onRepeat,
                    onComplete: this.onComplete
                }, this);
                //column tweens 2
                this.columnTween2 = this.tweens.add({
                    targets: container2,
                    props: { y: { value: "+=" + options.symbolHeight, 
                    duration: options.duration } },
                    repeat: options.repeat[1],
                    onRepeat: this.onRepeat,
                    onComplete: this.onComplete
                }, this);
                //column tweens 3
                this.columnTween3 = this.tweens.add({
                    targets: container3,
                    props: { y: { value: "+=" + options.symbolHeight, 
                    duration: options.duration } },
                    repeat: options.repeat[2],
                    onRepeat: this.onRepeat,
                    onComplete: this.onComplete
                }, this);
                //column tweens 4
                this.columnTween4 = this.tweens.add({
                    targets: container4,
                    props: { y: { value: "+=" + options.symbolHeight, 
                    duration: options.duration } },
                    repeat: options.repeat[3],
                    onRepeat: this.onRepeat,
                    onComplete: this.onComplete
                }, this);
                //column tweens 5
                this.columnTween5 = this.tweens.add({
                    targets: container5,
                    props: { y: { value: "+=" + options.symbolHeight, 
                    duration: options.duration } },
                    repeat: options.repeat[4],
                    onRepeat: this.onRepeat,
                    onComplete: function () {
                        this.targets[0].scene.tweens.add({
                            targets : this.targets[0],
                            props: { y: { value: "-=" + options.symbolHeight, 
                                    duration: options.duration * 2 } },
                            repeat : 1,
                            onRepeat : function() {
                                const randomNumber = Phaser.Math.RND.between(0, 9);
                                this.updateTo('y', this.targets[0].y - options.symbolHeight * 2, true);
                                this.targets[0].last.y = this.targets[0].first.y + options.symbolHeight;
                                const symbol = this.targets[0].last;
                                symbol.setVisible(true).setTexture('symbols', 'symbols_' + randomNumber + '.png');
                                this.targets[0].moveTo(symbol, 0);
                            },
                            onComplete : function() {
                                this.targets[0].last.y = this.targets[0].first.y + 
                                options.symbolHeight;
                                const symbol = this.targets[0].last;
                                this.targets[0].moveTo(symbol, 0);
                                //set texture symbols
                                for (let i = 0; i < 5; i++) {
                                    const symbolsName = this.targets[0].list[i].frame.name;
                                    this.targets[0].list[i].setTexture('symbols', symbolsName);
                                }
                                if(options.musicName == 'btn_music.png') {
                                    //play audio
                                    audioMusic.reelStop.play();
                                }
                                //stop audio
                                audioMusic.reels.stop();
                                //add class Spin
                                const spin = new Spin(this.targets[0].scene);
                                //reset check click
                                options.checkClick = false;     
                            }
                        });
                    },
                }, this);
            }
        });
    }

    setColor() {
        this.bgSpin.setTint(0xa09d9d);
        this.maxBet.setTint(0xa09d9d);
        this.coin.setTint(0xa09d9d);
        this.btnLine.setTint(0xa09d9d);
        this.info.setTint(0xa09d9d);
        this.credits.setTint(0xa09d9d);
        this.btnMusic.setTint(0xa09d9d);
        this.btnSound.setTint(0xa09d9d);
    }

    onRepeat() {
        const randomNumber = Phaser.Math.RND.between(0, 9);
        this.updateTo('y', this.targets[0].y + options.symbolHeight, true);
        this.targets[0].first.y = this.targets[0].last.y - options.symbolHeight;
        const symbol = this.targets[0].first;
        symbol.setVisible(true).setTexture('symbols_blur', 'symbols_' + randomNumber + '.png');
        this.targets[0].moveTo(symbol, 4);
    }

    onComplete() {
        this.targets[0].scene.tweens.add({
            targets : this.targets[0],
            props: { y: { value: "-=" + options.symbolHeight, 
                    duration: options.duration * 2 } },
            repeat : 1,
            onRepeat : function() {
                const randomNumber = Phaser.Math.RND.between(0, 9);
                this.updateTo('y', this.targets[0].y - options.symbolHeight * 2, true);
                this.targets[0].last.y = this.targets[0].first.y + options.symbolHeight;
                const symbol = this.targets[0].last;
                symbol.setVisible(true).setTexture('symbols', 'symbols_' + randomNumber + '.png');
                this.targets[0].moveTo(symbol, 0);
            },
            onComplete : function() {
                this.targets[0].last.y = this.targets[0].first.y + 
                options.symbolHeight;
                const symbol = this.targets[0].last;
                this.targets[0].moveTo(symbol, 0);
                //set texture symbols
                for (let i = 0; i < 5; i++) {
                    const symbolsName = this.targets[0].list[i].frame.name;
                    this.targets[0].list[i].setTexture('symbols', symbolsName);
                }
                //play audio
                if(options.musicName == 'btn_music.png') {
                    audioMusic.reelStop.play();
                }     
            }
        });  
    }

    saveLocalStorage() {
        if (localStorage.getItem('money')) {
            localStorage.removeItem('money');
            localStorage.setItem('money', this.valueMoney);
        }
        localStorage.setItem('money', this.valueMoney);
        this.txtMoney.setText(this.valueMoney + '$');
    }

    spin() {
        this.bgSpin = new Sprite(this, config.width - 275, config.height - 50, 'bgButtons', 'btn-spin.png');
        //text spin
        this.txtSpin = this.add.text(config.width - 310, config.height - 70, options.txtSpin, style.styleButton);
    }

    bgMaxBet() {
        this.maxBet = new Sprite(this, config.width - 475, config.height - 50, 'bgButtons', 'btn-maxbet.png');
        this.txtMaxBet = this.add.text(config.width - 550, config.height - 70, options.txtMaxBet, style.styleButton);
        this.txtCountMaxBet = this.add.text(config.width - 550, config.height - 140, 'BET: ' + options.bet, style.styleButton);
        //pointer down
        this.maxBet.on('pointerdown', () => {
            if (!options.checkClick) {
                this.maxBet.setScale(0.9);
                if(options.soundName == 'btn_sound.png') {
                    //audio play
                    audioMusic.button.play();
                }
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
        this.coin = new Sprite(this,config.width - 678, config.height - 50, 'bgButtons', 'btn-coin.png');
        this.txtCoin = this.add.text(config.width - 720, config.height - 70, options.txtCoin, style.styleButton);
        this.txtCountCoin = this.add.text(config.width - 700, config.height - 140, options.coin, style.styleButton);
        //pointer down
        this.coin.on('pointerdown', () => {
            if (!options.checkClick) {
                this.coin.setScale(0.9);
                if(options.soundName == 'btn_sound.png') {
                    //audio play
                    audioMusic.button.play();
                }
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
        this.btnLine = new Sprite(this,config.width - 865, config.height - 50, 'bgButtons', 'btn-line.png');
        this.txtLine = this.add.text(config.width - 915, config.height - 70, options.txtLine, style.styleButton);
        this.txtCountLine = this.add.text(config.width - 880, config.height - 140, options.line, style.styleButton);
        //pointer down
        this.btnLine.on('pointerdown', () => {
            if (!options.checkClick) {
                this.btnLine.setScale(0.9);
                if(options.soundName == 'btn_sound.png') {
                    //audio play
                    audioMusic.button.play();
                }
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

    update() { }
}