export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key : 'PreloadScene' });
    }

    preload() {
        //load image
        this.load.path = '../../assets/jsons/';
        this.load.spritesheet('effect', 'images/graphics/win.png', { frameWidth: 1200, frameHeight: 700, endFrame: 5 });
        this.load.atlas('title', 'images/title/title.png', 'images/title/title.json');
        this.load.atlas('btn', 'images/btn/btn.png', 'images/btn/btn.json');
        this.load.atlas('about', 'images/about/about.png', 'images/about/about.json');
        this.load.atlas('background', 'images/bg/bg.png', 'images/bg/bg.json');
        this.load.atlas('bgPreload', 'images/bg/bgmenu.png', 'images/bg/bgmenu.json');
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
        this.load.audio('lose', 'audio/lose.mp3');
        
        this.progressBar = this.add.graphics();
        this.progressBox = this.add.graphics();
        this.progressBox.fillStyle(0x222222, 0.8);
        this.progressBox.fillRect(240, 270, 900, 50);
        this.load.on('progress', (value) => {
            this.progressBar.clear();
            this.progressBar.fillStyle(0xffffff, 1);
            this.progressBar.fillRect(250, 280, 880 * value, 30);
        });
        this.load.on('complete', this.onComplete, this);
        for(let i = 0; i < 100; i++) {
            this.load.atlas('background' + i, 'images/bg/bg.png', 'images/bg/bg.json');
        }
    }

    onComplete() {
        this.progressBar.destroy();
        this.progressBox.destroy();
    }

    create() {
        this.scene.start('BootScene');
    }
}