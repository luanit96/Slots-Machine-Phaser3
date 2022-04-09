import Options from '../options';
import Spin from './Spin';
//Class Tween
export default class Tween {   
    constructor(scene) {
        this.scene = scene;
        this.renderTweens();
    }

    renderTweens() {
        //column tweens 1
        this.columnTween1 = this.scene.tweens.add({
            targets: this.scene.container,
            props: { y: { value: "+=" + Options.symbolHeight, 
            duration: Options.duration }},
            repeat: Options.repeat[0],
            onRepeat: function(){
                const randomNumber = Phaser.Math.RND.between(0, 9);
                this.updateTo('y', this.targets[0].y + Options.symbolHeight, true);
                this.targets[0].first.y = this.targets[0].last.y - Options.symbolHeight;
                const symbol = this.targets[0].first;
                symbol.setVisible(true).setTexture('symbols_blur', 'symbols_' + randomNumber + '.png');
                this.targets[0].moveTo(symbol, 4);
            },
            onComplete: function() {
                this.targets[0].scene.tweens.add({
                    targets : this.targets[0],
                    props: { y: { value: "-=" + Options.symbolHeight, 
                            duration: Options.duration * 2 } },
                    repeat : 1,
                    onRepeat : function() {
                        this.updateTo('y', this.targets[0].y - Options.symbolHeight, true);
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
        }, this);


        //column tweens 2
        this.columnTween2 = this.scene.tweens.add({
            targets: this.scene.container2,
            props: { y: { value: "+=" + Options.symbolHeight, 
            duration: Options.duration } },
            repeat: Options.repeat[1],
            onRepeat: function(){
                const randomNumber = Phaser.Math.RND.between(0, 9);
                this.updateTo('y', this.targets[0].y + Options.symbolHeight, true);
                this.targets[0].first.y = this.targets[0].last.y - Options.symbolHeight;
                const symbol = this.targets[0].first;
                symbol.setVisible(true).setTexture('symbols_blur', 'symbols_' + randomNumber + '.png');
                this.targets[0].moveTo(symbol, 4);
            },
            onComplete: function() {
                this.targets[0].scene.tweens.add({
                    targets : this.targets[0],
                    props: { y: { value: "-=" + Options.symbolHeight, 
                            duration: Options.duration * 2 } },
                    repeat : 1,
                    onRepeat : function() {
                        this.updateTo('y', this.targets[0].y - Options.symbolHeight, true);
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
        }, this);


        //column tweens 3
        this.columnTween3 = this.scene.tweens.add({
            targets: this.scene.container3,
            props: { y: { value: "+=" + Options.symbolHeight, 
            duration: Options.duration } },
            repeat: Options.repeat[2],
            onRepeat: function(){
                const randomNumber = Phaser.Math.RND.between(0, 9);
                this.updateTo('y', this.targets[0].y + Options.symbolHeight, true);
                this.targets[0].first.y = this.targets[0].last.y - Options.symbolHeight;
                const symbol = this.targets[0].first;
                symbol.setVisible(true).setTexture('symbols_blur', 'symbols_' + randomNumber + '.png');
                this.targets[0].moveTo(symbol, 4);
            },
            onComplete: function() {
                this.targets[0].scene.tweens.add({
                    targets : this.targets[0],
                    props: { y: { value: "-=" + Options.symbolHeight, 
                            duration: Options.duration * 2 } },
                    repeat : 1,
                    onRepeat : function() {
                        this.updateTo('y', this.targets[0].y - Options.symbolHeight, true);
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
        }, this);


        //column tweens 4
        this.columnTween4 = this.scene.tweens.add({
            targets: this.scene.container4,
            props: { y: { value: "+=" + Options.symbolHeight, 
            duration: Options.duration } },
            repeat: Options.repeat[3],
            onRepeat: function(){
                const randomNumber = Phaser.Math.RND.between(0, 9);
                this.updateTo('y', this.targets[0].y + Options.symbolHeight, true);
                this.targets[0].first.y = this.targets[0].last.y - Options.symbolHeight;
                const symbol = this.targets[0].first;
                symbol.setVisible(true).setTexture('symbols_blur', 'symbols_' + randomNumber + '.png');
                this.targets[0].moveTo(symbol, 4);
            },
            onComplete: function() {
                this.targets[0].scene.tweens.add({
                    targets : this.targets[0],
                    props: { y: { value: "-=" + Options.symbolHeight, 
                            duration: Options.duration * 2 } },
                    repeat : 1,
                    onRepeat : function() {
                        this.updateTo('y', this.targets[0].y - Options.symbolHeight, true);
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
        }, this);


        //column tweens 5
        this.columnTween5 = this.scene.tweens.add({
            targets: this.scene.container5,
            props: { y: { value: "+=" + Options.symbolHeight, 
            duration: Options.duration } },
            repeat: Options.repeat[4],
            onRepeat: function(){
                const randomNumber = Phaser.Math.RND.between(0, 9);
                this.updateTo('y', this.targets[0].y + Options.symbolHeight, true);
                this.targets[0].first.y = this.targets[0].last.y - Options.symbolHeight;
                const symbol = this.targets[0].first;
                symbol.setVisible(true).setTexture('symbols_blur', 'symbols_' + randomNumber + '.png');
                this.targets[0].moveTo(symbol, 4);
            },
            onComplete: function () {
                this.targets[0].scene.tweens.add({
                    targets : this.targets[0],
                    props: { y: { value: "-=" + Options.symbolHeight, 
                            duration: Options.duration * 2 } },
                    repeat : 1,
                    onRepeat : function() {
                        this.updateTo('y', this.targets[0].y - Options.symbolHeight, true);
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
                        const spin = new Spin(this.targets[0].scene);
                        //reset check click
                        Options.checkClick = false;     
                    }
                });
            },
        }, this);
    }
}