import Config from '../../Config/config';
import Options from '../../Constants/options';
import Style from '../../Css/style';
import Key from '../../Key/keyScene';
import Sprite from '../Sprite';
import Spin from './Spin';

export default class BaseSpin {
    constructor(scene, keyBaseSpin = Key.baseSpin) {
        this.scene = scene;
        this.addSpin();
    }

    addSpin() {
        this.bgSpin = new Sprite(this.scene, Config.width - 275, Config.height - 50, 'bgButtons', 'btn-spin.png');
        //text spin
        this.txtSpin = this.scene.add.dynamicBitmapText(Config.width - 315, Config.height - 70, 'txt_bitmap', Options.txtSpin, Style.fontSize);
        this.txtSpin.setDisplayCallback(this.scene.textCallback);
        this.bgSpin.on('pointerdown', () => {
            if (Options.lineArray.length > 0) {
                for (let i = 0; i < Options.lineArray.length; i++) {
                    Options.lineArray[i].destroy();
                }
                Options.lineArray = [];
            }
            if (!Options.checkClick && this.scene.valueMoney >=
                (Options.coin * Options.line)) {
                //setTint
                this.setColor();
                Options.checkClick = true;
                this.bgSpin.setScale(0.9);
                //audio play
                if(this.scene.audioSoundName === 'btn_sound.png') {
                    this.scene.audioObject.audioButton.play();
                }
                if(this.scene.audioMusicName === 'btn_music.png') {
                    //stop audio win
                    this.scene.audioObject.audioWin.stop();
                    this.scene.audioObject.audioReels.play();
                }
                //set money
                this.scene.valueMoney -= (Options.coin * Options.line);
                this.scene.txtMoney.setText(this.scene.valueMoney + '$');
                //remove text txtwin
                if (this.scene.txtWin) {
                    this.scene.txtWin.destroy();
                }
                //save localStorage
                this.saveLocalStorage();
                //column tweens 1
                this.columnTween1 = this.scene.tweens.add({
                    targets: this.scene.container,
                    props: { y: { value: "+=" + Options.symbolHeight, 
                    duration: Options.duration }},
                    repeat: Options.repeat[0],
                    onRepeat: this.onRepeat,
                    onComplete: this.onComplete
                }, this);
                //column tweens 2
                this.columnTween2 = this.scene.tweens.add({
                    targets: this.scene.container2,
                    props: { y: { value: "+=" + Options.symbolHeight, 
                    duration: Options.duration } },
                    repeat: Options.repeat[1],
                    onRepeat: this.onRepeat,
                    onComplete: this.onComplete
                }, this);
                //column tweens 3
                this.columnTween3 = this.scene.tweens.add({
                    targets: this.scene.container3,
                    props: { y: { value: "+=" + Options.symbolHeight, 
                    duration: Options.duration } },
                    repeat: Options.repeat[2],
                    onRepeat: this.onRepeat,
                    onComplete: this.onComplete
                }, this);
                //column tweens 4
                this.columnTween4 = this.scene.tweens.add({
                    targets: this.scene.container4,
                    props: { y: { value: "+=" + Options.symbolHeight, 
                    duration: Options.duration } },
                    repeat: Options.repeat[3],
                    onRepeat: this.onRepeat,
                    onComplete: this.onComplete
                }, this);
                //column tweens 5
                this.columnTween5 = this.scene.tweens.add({
                    targets: this.scene.container5,
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
                                if(this.targets[0].scene.audioMusicName === 'btn_music.png') {
                                    //play audio
                                    this.targets[0].scene.audioObject.audioReelStop.play();
                                    //stop audio
                                    this.targets[0].scene.audioObject.audioReels.stop();
                                }
                                //add class Spin
                                const spin = new Spin(this.targets[0].scene, Key.spin);
                                //reset check click
                                Options.checkClick = false;     
                            }
                        });
                    },
                }, this);
            }
        });
        this.bgSpin.on('pointerup', () => this.bgSpin.setScale(1));
    }

    setColor() {
        this.bgSpin.setTint(0xa09d9d);
        this.scene.maxBet.maxBet.setTint(0xa09d9d);
        this.scene.coin.coin.setTint(0xa09d9d);
        this.scene.btnLine.btnLine.setTint(0xa09d9d);
        this.scene.info.info.setTint(0xa09d9d);
        this.scene.credits.credits.setTint(0xa09d9d);
        this.scene.btnMusic.setTint(0xa09d9d);
        this.scene.btnSound.setTint(0xa09d9d);
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
                if(this.targets[0].scene.audioMusicName === 'btn_music.png') {
                    this.targets[0].scene.audioObject.audioReelStop.play();
                }     
            }
        });  
    }

    saveLocalStorage() {
        if (localStorage.getItem('money')) {
            localStorage.removeItem('money');
            localStorage.setItem('money', this.scene.valueMoney);
        }
        localStorage.setItem('money', this.scene.valueMoney);
        this.scene.setTextX(this.scene.valueMoney);
        this.scene.txtMoney.setText(this.scene.valueMoney + '$');
    }
}