import gameOptions from '../../Constants/gameOptions';
import Config from '../../Config/config';

export default class FreeSpin extends Phaser.Scene {
    constructor(scene) {
        super(scene);
        this.game = scene;
        scene.add.existing(this);
        this.click = false;
        this.addSpin();
    }

    addSpin() {
        //destroy sprite
        this.game.bgSpin.destroy();
        this.game.maxBet.destroy();
        this.game.coin.destroy();
        this.game.btnLine.destroy();
        this.game.info.destroy();
        this.game.credits.destroy();
        this.game.btnMusic.destroy();
        this.game.btnSound.destroy();
        //stop audio win
        this.game.audioWin.stop();
        this.game.audioBigWin.stop();
        this.game.add.sprite(Config.width / 2, Config.height / 2, 'bgPreload', 'bg_menu.png').setDepth(1);
        this.wheel = this.game.add.sprite(Config.width / 2, Config.height / 2, 'freepin', 'wheel.png').setDepth(1);
        this.pin = this.game.add.sprite(Config.width / 2, Config.height / 2, 'freepin', 'pin.png').setInteractive().setDepth(1);
        this.back = this.game.add.sprite(Config.width - 1200, Config.height - 680,
            'freepin', 'btn_back.png').setInteractive().setDepth(1).setScale(1.5);
        //back game
        this.back.on('pointerdown', () => {
            if(this.game.audioSoundName === 'btn_sound.png') {
                this.game.audioButton.play();
            }
            //stop play
            if(this.game.audioMusicName === 'btn_music.png') {
                this.game.audioWin.stop();
            }
            this.game.scene.start('GameScene');
        });
        this.prizeText = this.game.add.text(Config.width / 2, Config.height - 40, "FREE ONE SPIN", {
            font: "bold 32px PT Serif",
            align: "center",
            color: "white"
        }).setDepth(1);
        this.prizeText.setOrigin(0.5);
        this.pin.on("pointerdown", this.spinWheel, this);
        this.pin.on('pointerup', () => this.pin.setScale(1));
    }

    spinWheel() {
        if(!this.click) {
            if(this.game.audioSoundName === 'btn_sound.png') {
                this.game.audioButton.play();
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
                        this.prizeText.setText(gameOptions.slicePrizes[prize]).setDepth(1);
                    } else {
                        this.prizeText.setText('WIN : ' + gameOptions.slicePrizes[prize] + '$').setDepth(1);
                        //audio play
                        if(this.game.audioMusicName === 'btn_music.png') {
                            this.game.audioWin.play();
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
                    //set countFree
                    gameOptions.countFree = 0;
                }
            });
        }
    }
}