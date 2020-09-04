import Options from '../Constants/options';
//Class Container
export default class Container extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);
        scene.add.existing(this);
        //symbols column
        const symbolsImage = scene.add.sprite(0, 0, 'symbols', 'symbols_' + this.randomBetween(0, 6) + '.png');
        const symbolsImage1 = scene.add.sprite(0, - Options.symbolHeight, 'symbols', 'symbols_' + this.randomBetween(1, 5) + '.png');
        const symbolsImage2 = scene.add.sprite(0, - Options.symbolHeight * 2, 'symbols', 'symbols_' + this.randomBetween(2, 8) + '.png');
        const symbolsImage3 = scene.add.sprite(0, - Options.symbolHeight * 3, 'symbols', 'symbols_' + this.randomBetween(4, 9) + '.png');
        const symbolsImage4 = scene.add.sprite(0, - Options.symbolHeight * 4, 'symbols', 'symbols_' + this.randomBetween(3, 7) + '.png');
        this.add([symbolsImage, symbolsImage1, symbolsImage2, symbolsImage3, symbolsImage4]);
    }

    randomBetween(min, max) {
        return Phaser.Math.Between(min, max); 
    }
    /*end function random between*/
}