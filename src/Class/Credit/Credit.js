import Key from '../../Key/keyScene';
import Options from '../../Constants/options';
import Sprite from '../Sprite';
import Config from '../../Config/config';
//Class Credit
export default class Credit {
    constructor(scene, keyCredit = Key.credit) {
        this.scene = scene;
        this.addCredit();
    }

    addCredit() {
        this.credits = new Sprite(this.scene, Config.width - 235, Config.height - 680,
            'about', 'btn-credits.png').setScale(0.7);
        this.credits.on('pointerdown', () => {
            //play audio button
            this.scene.audioPlayButton();

            this.credits.setScale(0.6);
            this.paylines = new Sprite(this.scene,Config.width / 2, Config.height / 2,
                'about', 'palines.png').setDepth(1).setInteractive();
            this.paylines.on('pointerdown', () => {
                //play audio button
                this.scene.audioPlayButton();
            
                this.paylines.destroy();
                this.credits.setScale(0.7);
            });
        });
    }
    /*end function credit*/
}