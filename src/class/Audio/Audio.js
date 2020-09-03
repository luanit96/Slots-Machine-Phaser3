import Key from '../../Key/keyScene';

export default class Audio {
    constructor(scene, keyAudio = Key.audio) {
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
        this.audioBigWin = this.scene.sound.add('bigwin', { loop : true, volume : 2.5 });
        this.freeSpin = this.scene.sound.add('freeSpin', { volume: 2.5 });
        this.musicDefault = this.scene.sound.add('musicDefault', {
            loop: true,
            volume: 2
        });
    }
    /*end function*/
}