import gameOptions from '../../Constants/gameOptions';
import Config from '../../Config/config';
import Style from '../../Css/style';
import Key from '../../Key/keyScene';
import Sprite from '../Sprite';

export default class FreeSpin {
    constructor(scene, keyFreeSpin = Key.freeSpin) {
        this.game = scene;
        this.click = false;
        this.pause();
        this.addSpin();
    }

    pause() {
        //pause class autospin
        this.game.scene.pause(Key.autoSpin);
    }

    addSpin() {
        //destroy sprite
        // this.game.baseSpin.bgSpin.destroy();
        // this.game.maxBet.maxBet.destroy();
        // this.game.coin.coin.destroy();
        // this.game.btnLine.btnLine.destroy();
        // this.game.info.info.destroy();
        // this.game.credits.credits.destroy();
        // this.game.btnMusic.destroy();
        // this.game.btnSound.destroy();
        //stop audio win
        if(this.game.audioMusicName === 'btn_music.png') {
            this.game.audioObject.musicDefault.stop();
            this.game.audioObject.audioWin.stop();
            this.game.audioObject.audioBigWin.stop();
        }
        //play audio free spin
        if(this.game.audioMusicName === 'btn_music.png') {
            this.game.audioObject.freeSpin.play();
        }
        const bgMenu = new Sprite(this.game, Config.width / 2, Config.height / 2, 'bgPreload', 'bg_menu.png').setDepth(1);
        this.wheel = new Sprite(this.game, Config.width / 2, Config.height / 2, 'freepin', 'wheel.png').setDepth(1);
        this.pin = new Sprite(this.game, Config.width / 2, Config.height / 2, 'freepin', 'pin.png').setDepth(1);
        this.prizeText = this.game.add.text(Config.width / 2, Config.height - 40, "FREE ONE SPIN", Style.prizeText).setDepth(1);
        this.prizeText.setOrigin(0.5);
        this.pin.on("pointerdown", this.spinWheel, this);
        this.pin.on('pointerup', () => this.pin.setScale(1));
    }

    /*end function*/

    spinWheel() {
        if(!this.click) {
            //play audio button
            //this.scene.audioPlayButton();
            
            if(this.game.audioMusicName === 'btn_music.png') {
                this.game.audioObject.audioReels.play();
            }
            this.click = true;
            this.pin.setScale(0.9);
            this.prizeText.setText("");
            var rounds = Phaser.Math.Between(2, 4);
            var degrees = Phaser.Math.Between(0, 360);
            var prize = gameOptions.slices - 1 - Math.floor(degrees / (360 / gameOptions.slices));

            this.game.tweens.add({
                targets: [this.wheel],
                angle: 360 * rounds + degrees,
                duration: gameOptions.rotationTime,
                ease: "Cubic.easeOut",
                callbackScope: this,
                onComplete: function(tween) {
                    if(gameOptions.slicePrizes[prize] === 'Better Luck Next Time'
                    || gameOptions.slicePrizes[prize] === 'NONE') {
                        if(this.game.audioMusicName === 'btn_music.png') {
                            this.game.audioObject.audioReels.stop();
                            this.game.audioObject.audioLose.play();
                        }
                        this.prizeText.setText(gameOptions.slicePrizes[prize]).setDepth(1);
                    } else {
                        this.prizeText.setText('WIN : ' + gameOptions.slicePrizes[prize] + '$').setDepth(1);
                        //audio play
                        if(this.game.audioMusicName === 'btn_music.png') {
                            this.game.audioObject.audioReels.stop();
                            this.game.audioObject.audioWin.play();
                        }
                        //save money from localStorage
                        this.game.valueMoney += gameOptions.slicePrizes[prize];
                        if (localStorage.getItem('money')) {
                            localStorage.removeItem('money');
                            localStorage.setItem('money', this.game.valueMoney);
                        }
                        localStorage.setItem('money', this.game.valueMoney);
                        this.game.txtMoney.setText(this.game.valueMoney + '$');
                    }
                    //set countFree = 0 
                    gameOptions.countFree = 0;
                    //timer start game
                    this.timerStart = this.game.time.addEvent({
                        delay: 3000, 
                        callback: function() {
                            this.timerStart.remove();
                            //stop audio
                            if(this.game.audioMusicName === 'btn_music.png') {
                                this.game.audioObject.audioWin.stop();
                            }
                            //run class autoSpin
                            this.game.scene.start(Key.game);
                        },
                        callbackScope: this,
                        loop: true
                    });
                }
            });
        }
    }

    /*end function*/
}