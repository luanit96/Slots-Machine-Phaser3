import Config from '../Config/config';
import Options from '../Constants/options';
import Style from '../Css/style';
import Sprite from '../Class/Sprite';
import Info from '../Class/Info';
import Container from '../Class/Container';
import Spin from '../Class/Spin';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    create() {
        //add audio
        Options.audioReels = this.sound.add('reels');
        Options.audioReelStop = this.sound.add('reelStop');
        Options.audioWin = this.sound.add('win');
        Options.audioButton = this.sound.add('button');
        Options.audioLose = this.sound.add('lose', { volume: 2.5 });
        //add bg image
        const bg = new Sprite(this,Config.width / 2, Config.height / 2, 'background', 'bg.jpg');
        //container
        const container = new Container(this, Config.width - 940, Config.height - 90);
        const container2 = new Container(this, Config.width - 790, Config.height - 90);
        const container3 = new Container(this, Config.width - 640, Config.height - 90);
        const container4 = new Container(this, Config.width - 490, Config.height - 90);
        const container5 = new Container(this, Config.width - 340, Config.height - 90);
        //add image machine
        const machine = new Sprite(this,Config.width / 2, Config.height / 2, 'background', 'machine.png');
        this.valueMoney = localStorage.getItem('money') ? localStorage.getItem('money') :
            Options.money;
        this.txtMoney = this.add.text(Config.width - 1050, Config.height - 695, this.valueMoney + '$', Style.styleTextPoint);
        this.credits = new Sprite(this, Config.width - 235, Config.height - 680,
            'about', 'btn-credits.png').setScale(0.7);
        this.credits.on('pointerover', () => {
            if (!Options.checkClick) {
                this.paylines = new Sprite(this,Config.width / 2, Config.height / 2,
                    'about', 'palines.png');
            }
        });
        this.credits.on('pointerout', () => {
            if (this.paylines) {
                this.paylines.destroy();
            }
        });
        //add sound image
        this.btnMusic = new Sprite(this, Config.width - 310, Config.height - 675, 'sound', 'btn_music_off.png').setScale(0.6);
        this.btnSound = new Sprite(this, Config.width - 390, Config.height - 675, 'sound', 'btn_sound_off.png').setScale(0.6);
        this.btnMusic.on('pointerdown', () => {
            if(!Options.checkClick) {
                Options.audioMusicName = this.btnMusic.frame.name;
                Options.audioSoundName = this.btnSound.frame.name;
                if(Options.audioMusicName == 'btn_music.png') {
                    Options.audioMusicName = 'btn_music_off.png';
                } else {
                    Options.audioMusicName = 'btn_music.png';
                    if(Options.audioSoundName == 'btn_sound.png') {
                        Options.audioButton.play();
                    }
                } 
                this.btnMusic.setTexture('sound', Options.audioMusicName);
            }
        });
        this.btnSound.on('pointerdown', () => {
            if(!Options.checkClick) {
                if(Options.audioSoundName == 'btn_sound.png') {
                    Options.audioSoundName = 'btn_sound_off.png';
                } else {
                    Options.audioSoundName = 'btn_sound.png';
                    Options.audioButton.play();
                } 
                this.btnSound.setTexture('sound', Options.audioSoundName);
            }
        });
        //add image buttons
        this.bgMaxBet();
        this.bgCoin();
        this.bgLine();
        //class info
        this.info = new Info(this, Config.width - 1020, Config.height - 50, 'bgButtons', 'btn-info.png');
        this.spin();
        this.bgSpin.on('pointerup', () => this.bgSpin.setScale(1));
        this.bgSpin.on('pointerdown', () => {
            if (Options.lineArray.length > 0) {
                for (let i = 0; i < Options.lineArray.length; i++) {
                    Options.lineArray[i].destroy();
                }
                Options.lineArray = [];
            }
            if (!Options.checkClick && this.valueMoney >=
                (Options.coin * Options.line)) {
                //setTint
                this.setColor();
                Options.checkClick = true;
                this.bgSpin.setScale(0.9);
                //audio play
                if(Options.audioSoundName == 'btn_sound.png') {
                    Options.audioButton.play();
                }
                if(Options.audioMusicName == 'btn_music.png') {
                    Options.audioReels.play();
                }
                //set money
                this.valueMoney -= (Options.coin * Options.line);
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
                    props: { y: { value: "+=" + Options.symbolHeight, 
                    duration: Options.duration }},
                    repeat: Options.repeat[0],
                    onRepeat: this.onRepeat,
                    onComplete: this.onComplete
                }, this);
                //column tweens 2
                this.columnTween2 = this.tweens.add({
                    targets: container2,
                    props: { y: { value: "+=" + Options.symbolHeight, 
                    duration: Options.duration } },
                    repeat: Options.repeat[1],
                    onRepeat: this.onRepeat,
                    onComplete: this.onComplete
                }, this);
                //column tweens 3
                this.columnTween3 = this.tweens.add({
                    targets: container3,
                    props: { y: { value: "+=" + Options.symbolHeight, 
                    duration: Options.duration } },
                    repeat: Options.repeat[2],
                    onRepeat: this.onRepeat,
                    onComplete: this.onComplete
                }, this);
                //column tweens 4
                this.columnTween4 = this.tweens.add({
                    targets: container4,
                    props: { y: { value: "+=" + Options.symbolHeight, 
                    duration: Options.duration } },
                    repeat: Options.repeat[3],
                    onRepeat: this.onRepeat,
                    onComplete: this.onComplete
                }, this);
                //column tweens 5
                this.columnTween5 = this.tweens.add({
                    targets: container5,
                    props: { y: { value: "+=" + Options.symbolHeight, 
                    duration: Options.duration } },
                    repeat: Options.repeat[4],
                    onRepeat: this.onRepeat,
                    onComplete: function () {
                        this.targets[0].scene.tweens.add({
                            targets : this.targets[0],
                            props: { y: { value: "-=" + Options.symbolHeight, 
                                    duration: Options.duration * 2 } },
                            repeat : 1,
                            onRepeat : function() {
                                const randomNumber = Phaser.Math.RND.between(0, 9);
                                this.updateTo('y', this.targets[0].y - Options.symbolHeight * 2, true);
                                this.targets[0].last.y = this.targets[0].first.y + Options.symbolHeight;
                                const symbol = this.targets[0].last;
                                symbol.setVisible(true).setTexture('symbols', 'symbols_' + randomNumber + '.png');
                                this.targets[0].moveTo(symbol, 0);
                            },
                            onComplete : function() {
                                this.targets[0].last.y = this.targets[0].first.y + 
                                Options.symbolHeight;
                                const symbol = this.targets[0].last;
                                this.targets[0].moveTo(symbol, 0);
                                //set texture symbols
                                for (let i = 0; i < 5; i++) {
                                    const symbolsName = this.targets[0].list[i].frame.name;
                                    this.targets[0].list[i].setTexture('symbols', symbolsName);
                                }
                                if(Options.audioMusicName == 'btn_music.png') {
                                    //play audio
                                    Options.audioReelStop.play();
                                }
                                //stop audio
                                Options.audioReels.stop();
                                //add class Spin
                                const spin = new Spin(this.targets[0].scene);
                                //reset check click
                                Options.checkClick = false;     
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
        this.updateTo('y', this.targets[0].y + Options.symbolHeight, true);
        this.targets[0].first.y = this.targets[0].last.y - Options.symbolHeight;
        const symbol = this.targets[0].first;
        symbol.setVisible(true).setTexture('symbols_blur', 'symbols_' + randomNumber + '.png');
        this.targets[0].moveTo(symbol, 4);
    }

    onComplete() {
        this.targets[0].scene.tweens.add({
            targets : this.targets[0],
            props: { y: { value: "-=" + Options.symbolHeight, 
                    duration: Options.duration * 2 } },
            repeat : 1,
            onRepeat : function() {
                const randomNumber = Phaser.Math.RND.between(0, 9);
                this.updateTo('y', this.targets[0].y - Options.symbolHeight * 2, true);
                this.targets[0].last.y = this.targets[0].first.y + Options.symbolHeight;
                const symbol = this.targets[0].last;
                symbol.setVisible(true).setTexture('symbols', 'symbols_' + randomNumber + '.png');
                this.targets[0].moveTo(symbol, 0);
            },
            onComplete : function() {
                this.targets[0].last.y = this.targets[0].first.y + 
                Options.symbolHeight;
                const symbol = this.targets[0].last;
                this.targets[0].moveTo(symbol, 0);
                //set texture symbols
                for (let i = 0; i < 5; i++) {
                    const symbolsName = this.targets[0].list[i].frame.name;
                    this.targets[0].list[i].setTexture('symbols', symbolsName);
                }
                //play audio
                if(Options.audioMusicName == 'btn_music.png') {
                    Options.audioReelStop.play();
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
        this.bgSpin = new Sprite(this, Config.width - 275, Config.height - 50, 'bgButtons', 'btn-spin.png');
        //text spin
        this.txtSpin = this.add.text(Config.width - 310, Config.height - 70, Options.txtSpin, Style.styleButton);
    }

    bgMaxBet() {
        this.maxBet = new Sprite(this, Config.width - 475, Config.height - 50, 'bgButtons', 'btn-maxbet.png');
        this.txtMaxBet = this.add.text(Config.width - 550, Config.height - 70, Options.txtMaxBet, Style.styleButton);
        this.txtCountMaxBet = this.add.text(Config.width - 550, Config.height - 140, 'BET: ' + Options.bet, Style.styleButton);
        //pointer down
        this.maxBet.on('pointerdown', () => {
            if (!Options.checkClick) {
                this.maxBet.setScale(0.9);
                if(Options.audioSoundName == 'btn_sound.png') {
                    //audio play
                    Options.audioButton.play();
                }
                Options.line = 10;
                this.txtCountLine.setText(Options.line);
                Options.coin = 50;
                this.txtCountCoin.setText(Options.coin);
                this.txtCountMaxBet.setText('BET: ' + Options.line * Options.coin);
            }
        });
        //pointer up
        this.maxBet.on('pointerup', () => this.maxBet.setScale(1));
    }

    bgCoin() {
        this.coin = new Sprite(this, Config.width - 678, Config.height - 50, 'bgButtons', 'btn-coin.png');
        this.txtCoin = this.add.text(Config.width - 720, Config.height - 70, Options.txtCoin, Style.styleButton);
        this.txtCountCoin = this.add.text(Config.width - 700, Config.height - 140, Options.coin, Style.styleButton);
        //pointer down
        this.coin.on('pointerdown', () => {
            if (!Options.checkClick) {
                this.coin.setScale(0.9);
                if(Options.audioSoundName == 'btn_sound.png') {
                    //audio play
                    Options.audioButton.play();
                }
                if (Options.coin < 50) {
                    Options.coin += 10;
                    this.txtCountCoin.setText(Options.coin);
                    this.txtCountMaxBet.setText('BET: ' + Options.coin * Options.line);
                } else {
                    Options.coin = 10;
                    this.txtCountCoin.setText(Options.coin);
                    this.txtCountMaxBet.setText('BET: ' + Options.coin * Options.line);
                }
            }
        });
        //pointer up
        this.coin.on('pointerup', () => this.coin.setScale(1));
    }

    bgLine() {
        this.btnLine = new Sprite(this, Config.width - 865, Config.height - 50, 'bgButtons', 'btn-line.png');
        this.txtLine = this.add.text(Config.width - 915, Config.height - 70, Options.txtLine, Style.styleButton);
        this.txtCountLine = this.add.text(Config.width - 880, Config.height - 140, Options.line, Style.styleButton);
        //pointer down
        this.btnLine.on('pointerdown', () => {
            if (!Options.checkClick) {
                this.btnLine.setScale(0.9);
                if(Options.audioSoundName == 'btn_sound.png') {
                    //audio play
                    Options.audioButton.play();
                }
                if (Options.line < 10) {
                    Options.line++;
                    this.txtCountLine.setText(Options.line);
                    this.txtCountMaxBet.setText('BET: ' + Options.line * Options.coin);
                } else {
                    Options.line = 1;
                    this.txtCountLine.setText(Options.line);
                    this.txtCountMaxBet.setText('BET: ' + Options.line * Options.coin);
                }
            }
        });
        //pointer up
        this.btnLine.on('pointerup', () => this.btnLine.setScale(1));
    }

    update() { }
}