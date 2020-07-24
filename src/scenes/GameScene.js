import { config } from '../config/config';
import { options, audioMusic } from '../constants/options';
import { style } from '../css/style';
import Sprite from '../class/Sprite';
import Info from '../class/Info';
import Container from '../class/Container';

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
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
        var bg = new Sprite(this,config.width / 2, config.height / 2, 'background', 'bg.jpg');
        //container
        var container = new Container(this, config.width - 940, config.height - 90);
        var container2 = new Container(this, config.width - 790, config.height - 90);
        var container3 = new Container(this, config.width - 640, config.height - 90);
        var container4 = new Container(this, config.width - 490, config.height - 90);
        var container5 = new Container(this, config.width - 340, config.height - 90);
        //add image machine
        var machine = new Sprite(this,config.width / 2, config.height / 2, 'background', 'machine.png');
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
                this.bgSpin.setTint(0xa09d9d);
                this.maxBet.setTint(0xa09d9d);
                this.coin.setTint(0xa09d9d);
                this.btnLine.setTint(0xa09d9d);
                this.info.setTint(0xa09d9d);
                this.credits.setTint(0xa09d9d);
                this.btnMusic.setTint(0xa09d9d);
                this.btnSound.setTint(0xa09d9d);

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
                                let randomNumber = Phaser.Math.RND.between(0, 9);
                                this.updateTo('y', this.targets[0].y - options.symbolHeight * 2, true);
                                this.targets[0].last.y = this.targets[0].first.y + options.symbolHeight;
                                let symbol = this.targets[0].last;
                                symbol.setVisible(true).setTexture('symbols', 'symbols_' + randomNumber + '.png');
                                this.targets[0].moveTo(symbol, 0);
                            },
                            onComplete : function() {
                                this.targets[0].last.y = this.targets[0].first.y + 
                                options.symbolHeight;
                                let symbol = this.targets[0].last;
                                this.targets[0].moveTo(symbol, 0);
                                //set texture symbols
                                for (let i = 0; i < 5; i++) {
                                    let symbolsName = this.targets[0].list[i].frame.name;
                                    this.targets[0].list[i].setTexture('symbols', symbolsName);
                                }
                                if(options.musicName == 'btn_music.png') {
                                    //play audio
                                    audioMusic.reelStop.play();
                                }
                                //stop audio
                                audioMusic.reels.stop();
                                this.targets[0].scene.printResult();
                                this.targets[0].scene.setTintColor();
                                //reset check click
                                options.checkClick = false;     
                            }
                        });
                    },
                }, this);
            }
        });
    }

    onRepeat() {
        let randomNumber = Phaser.Math.RND.between(0, 9);
        this.updateTo('y', this.targets[0].y + options.symbolHeight, true);
        this.targets[0].first.y = this.targets[0].last.y - options.symbolHeight;
        let symbol = this.targets[0].first;
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
                let randomNumber = Phaser.Math.RND.between(0, 9);
                this.updateTo('y', this.targets[0].y - options.symbolHeight * 2, true);
                this.targets[0].last.y = this.targets[0].first.y + options.symbolHeight;
                let symbol = this.targets[0].last;
                symbol.setVisible(true).setTexture('symbols', 'symbols_' + randomNumber + '.png');
                this.targets[0].moveTo(symbol, 0);
            },
            onComplete : function() {
                this.targets[0].last.y = this.targets[0].first.y + 
                options.symbolHeight;
                let symbol = this.targets[0].last;
                this.targets[0].moveTo(symbol, 0);
                //set texture symbols
                for (let i = 0; i < 5; i++) {
                    let symbolsName = this.targets[0].list[i].frame.name;
                    this.targets[0].list[i].setTexture('symbols', symbolsName);
                }
                //play audio
                if(options.musicName == 'btn_music.png') {
                    audioMusic.reelStop.play();
                }     
            }
        });  
    }

    setTintColor() {
        this.bgSpin.setTint(0xffffff);
        this.maxBet.setTint(0xffffff);
        this.coin.setTint(0xffffff);
        this.btnLine.setTint(0xffffff);
        this.info.setTint(0xffffff);
        this.credits.setTint(0xffffff);
        this.btnMusic.setTint(0xffffff);
        this.btnSound.setTint(0xffffff);
    }

    printResult() {
        const s1 = this.columnTween1.targets[0];
        const s2 = this.columnTween2.targets[0];
        const s3 = this.columnTween3.targets[0];
        const s4 = this.columnTween4.targets[0];
        const s5 = this.columnTween5.targets[0];
        options.result.push([s1.list[3].frame.name, s2.list[3].frame.name, s3.list[3].
            frame.name, s4.list[3].frame.name, s5.list[3].frame.name], [s1.list[2].frame.name, s2.list[2].frame.name,
            s3.list[2].frame.name, s4.list[2].frame.name, s5.list[2].frame.name], [s1.list[1].frame.name, s2.list[1].frame.name,
            s3.list[1].frame.name, s4.list[1].frame.name, s5.list[1].frame.name]);
        this.getvalues();
    }

    resetOptions() {
        //reset win && result 
        options.win = 0;
        options.moneyWin = 0;
        options.result = [];
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
        if (options.result[1][0] == options.result[1][1] &&
            options.result[1][1] == options.result[1][2] && 
            options.result[1][2] == options.result[1][3] && 
            options.result[1][3] == options.result[1][4]) {
            if(options.musicName == 'btn_music.png') {
                //play audio win
                audioMusic.win.play();
            }
            //get money
            options.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
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
            options.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_1.png'));
            this.twoMoney(options.result[1][0]);
        } else if (options.result[1][0] == options.result[1][1] && options.result[1][1]
            == options.result[1][2]) {
            if(options.musicName == 'btn_music.png') {
                //play audio win
                audioMusic.win.play();
            }
            //get money 
            options.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
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
            options.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
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
            options.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_2.png'));
            this.twoMoney(options.result[0][0]);
        } else if (options.result[0][0] == options.result[0][1] && options.result[0][1]
            == options.result[0][2]) {
            if(options.musicName == 'btn_music.png') {
                //play audio win
                audioMusic.win.play();
            }
            // get money
            options.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
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
            options.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
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
            options.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_3.png'));
            this.twoMoney(options.result[2][0]);
        } else if (options.result[2][0] == options.result[2][1] && options.result[2][1]
            == options.result[2][2]) {
            if(options.musicName == 'btn_music.png') {
                //play audio win
                audioMusic.win.play();
            }
            //get money
            options.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
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
            options.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
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
            options.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_4.png'));
            this.twoMoney(options.result[0][0]);
        } else if (options.result[0][0] == options.result[1][1] &&
            options.result[1][1] == options.result[2][2]) {
            if(options.musicName == 'btn_music.png') {
                //play audio win
                audioMusic.win.play();
            }
            // get money
            options.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
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
            options.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
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
            options.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_5.png'));
            this.twoMoney(options.result[2][0]);
        } else if (options.result[2][0] == options.result[1][1] &&
            options.result[1][1] == options.result[0][2]) {
            if(options.musicName == 'btn_music.png') {
                //play audio win
                audioMusic.win.play();
            }
            // get money
            options.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
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
            options.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
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
            options.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_6.png'));
            this.twoMoney(options.result[1][0]);
        } else if (options.result[1][0] == options.result[0][1] &&
            options.result[0][1] == options.result[0][2]) {
            if(options.musicName == 'btn_music.png') {
                //play audio win
                audioMusic.win.play();
            }
            // get money
            options.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
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
            options.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
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
            options.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_7.png'));
            this.twoMoney(options.result[1][0]);
        } else if (options.result[1][0] == options.result[2][1] &&
            options.result[2][1] == options.result[2][2]) {
            if(options.musicName == 'btn_music.png') {
                //play audio win
                audioMusic.win.play();
            }
            // get money
            options.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
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
            options.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
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
            options.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_8.png'));
            this.twoMoney(options.result[0][0]);
        } else if(options.result[0][0] == options.result[0][1] &&
            options.result[0][1] == options.result[1][2]) {
            if(options.musicName == 'btn_music.png') {
                //play audio win
                audioMusic.win.play();
            }
            // get money
            options.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
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
            options.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
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
            options.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_9.png'));
            this.twoMoney(options.result[2][0]);
        } else if(options.result[2][0] == options.result[2][1] &&
            options.result[2][1] == options.result[1][2]) {
            if(options.musicName == 'btn_music.png') {
                //play audio win
                audioMusic.win.play();
            }
            // get money
            options.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
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
            options.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
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
            options.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
                'line', 'payline_10.png'));
            this.twoMoney(options.result[1][0]);
        } else if(options.result[1][0] == options.result[2][1] &&
            options.result[2][1] == options.result[1][2]) {
            if(options.musicName == 'btn_music.png') {
                //play audio win
                audioMusic.win.play();
            }
            // get money
            options.lineArray.push(this.add.sprite(config.width / 2, config.height / 2,
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
        this.valueMoney += options.moneyWin;
        if (!this.txtWin) {
            this.txtWin = this.add.text(config.width - 340, config.height - 130, 'WIN: ' + options.moneyWin + ' $ ', style.styleWin);
        } else {
            this.txtWin.destroy();
            this.txtWin = this.add.text(config.width - 340, config.height - 130, 'WIN: ' + options.moneyWin + ' $ ', style.styleWin);
        }
        //save localStorage
        this.saveLocalStorage();
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

export default GameScene;