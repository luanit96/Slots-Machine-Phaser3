//Class Audio
export default class Audio {
    constructor(scene) {
        this.scene = scene;
        this.loadAudio();
    }

    loadAudio() {
        this.musicBackgroundDefault = this.scene.sound.add('backgroundDefault', {
            loop: true,
            volume: 1.5
        });
        this.audioReels = this.scene.sound.add('reels');
        this.audioReelStop = this.scene.sound.add('reelStop');
        this.audioWin = this.scene.sound.add('win', { loop : true });
        this.audioButton = this.scene.sound.add('button');
        this.audioLose = this.scene.sound.add('lose', { volume: 2.5 });
        this.musicDefault = this.scene.sound.add('musicDefault', { 
            loop: true,
            volume: 2
        });
    }
}