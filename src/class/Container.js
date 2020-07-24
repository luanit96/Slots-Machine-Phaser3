import { options } from '../constants/options';

export default class Container extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);
        scene.add.existing(this);
        //random symbols
        var arrSymbols = [];
        for(let i = 1; i < 6; i++) {
            arrSymbols.push(Phaser.Math.Between(0, 5) + i - 1);
        }
        //symbols column
        const symbolsImage = scene.add.sprite(0, 0, 'symbols', 'symbols_' + arrSymbols[0] + '.png');
        const symbolsImage1 = scene.add.sprite(0, - options.symbolHeight, 'symbols', 'symbols_' + arrSymbols[1] + '.png');
        const symbolsImage2 = scene.add.sprite(0, - options.symbolHeight * 2, 'symbols', 'symbols_' + arrSymbols[2] + '.png');
        const symbolsImage3 = scene.add.sprite(0, - options.symbolHeight * 3, 'symbols', 'symbols_' + arrSymbols[3] + '.png');
        const symbolsImage4 = scene.add.sprite(0, - options.symbolHeight * 4, 'symbols', 'symbols_' + arrSymbols[4] + '.png');
        this.add([symbolsImage, symbolsImage1, symbolsImage2, symbolsImage3, symbolsImage4]);
    }
}