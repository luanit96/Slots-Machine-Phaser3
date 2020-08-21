import Config from '../Config/config';
import Key from '../Key/keyScene';

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key : Key.preload });
    }

    preload() {
        //load image
        this.load.path = '../../assets/jsons/';
        this.load.atlas('youwin', 'images/graphics/youwin.png', 'images/graphics/youwin.json');
        this.load.atlas('title', 'images/title/title.png', 'images/title/title.json');
        this.load.atlas('btn', 'images/btn/btn.png', 'images/btn/btn.json');
        this.load.atlas('about', 'images/about/about.png', 'images/about/about.json');
        this.load.atlas('background', 'images/bg/bg.png', 'images/bg/bg.json');
        this.load.atlas('bgPreload', 'images/bg/bgmenu.png', 'images/bg/bgmenu.json');
        this.load.atlas('bgButtons', 'images/buttons/button.png', 'images/buttons/button.json');
        this.load.atlas('symbols', 'images/symbols/symbols.png', 'images/symbols/symbols.json');
        this.load.atlas('symbols_blur', 'images/symbols/symbols_blur.png', 'images/symbols/symbols_blur.json');
        this.load.atlas('line', 'images/lines/line.png', 'images/lines/line.json');
        this.load.atlas('sound', 'images/sound/sound.png','images/sound/sound.json');
        this.load.atlas('freepin', 'images/freeSpin/freePin.png','images/freeSpin/freePin.json');

        //load audio
        this.load.audio('backgroundDefault', 'audio/background-default.mp3');
        this.load.audio('reels', 'audio/reels.mp3');
        this.load.audio('reelStop', 'audio/reel_stop.mp3');
        this.load.audio('win', 'audio/win.mp3');
        this.load.audio('button', 'audio/button.mp3');
        this.load.audio('lose', 'audio/lose.mp3');
        this.load.audio('bigwin', 'audio/big_win.mp3');
        this.load.audio('freeSpin', 'audio/freespin.mp3');
        this.load.audio('musicDefault', 'audio/music_default.mp3');

        this.progressBar = this.add.graphics();
        this.progressBox = this.add.graphics();
        this.progressBox.fillStyle(0x222222, 0.8);
        this.progressBox.fillRect(Config.width / 2 - 460, Config.height / 2 - 90, 900, 50);
        //load text
        this.loadingText = this.make.text({
            x: Config.width / 2,
            y: Config.height / 2 - 5,
            text: '0%',
            style: {
                font: '30px PT Serif',
                fill: '#ffffff'
            }
        });
        this.loadingText.setOrigin(0.5, 0.5);
        this.load.on('progress', (value) => {
            this.progressBar.clear();
            this.progressBar.fillStyle(0xffffff, 1);
            this.progressBar.fillRect(Config.width / 2 - 450, Config.height / 2 - 80, 880 * value, 30);
            this.loadingText.setText(parseInt(value * 100) + '%');
        });
        this.load.on('complete', this.onComplete, this);
        for(let i = 0; i < 100; i++) {
            this.load.atlas('background' + i, 'images/bg/bg.png', 'images/bg/bg.json');
        }
    }

    onComplete() {
        this.progressBar.destroy();
        this.progressBox.destroy();
        this.loadingText.destroy();
    }

    create() {
        this.scene.start(Key.boot);
    }
}