import Config from '../../Config/config';
import Key from '../../Key/keyScene';
import Options from '../../Constants/options';
import Style from '../../Css/style';
//import Class
import Sprite from '../Sprite';
import Tween from '../Tween/Tween';
//Class Auto Spin
export default class AutoSpin {
    constructor(scene, keyAutoSpin = Key.autoSpin) {
        this.scene = scene;
        this.autoSpin();
    }

    autoSpin() {
        this.buttonAuto = new Sprite(this.scene, Config.width - 110, Config.height - 50, 'bgButtons', 'btn-info.png');
        this.txtAutoSpin = this.scene.add.dynamicBitmapText(Config.width - 155, Config.height - 70, 'txt_bitmap', Options.txtAutoSpin, Style.fontSize);
        this.txtAutoSpin.setDisplayCallback(this.scene.textCallback);
        this.buttonAuto.on('pointerdown', () => {
            if (!Options.checkClick) {
                this.buttonAuto.setScale(0.9);
                //fuction play speed auto
                this.playSpeedAuto();
            }
        });
        this.buttonAuto.on('pointerup', () => this.buttonAuto.setScale(1));
    }

    /*end function auto spin*/

    playSpeedAuto() {
        //set text auto
        if(Options.txtAutoSpin === 'STOP') {
            Options.txtAutoSpin = 'AUTO';
            this.txtAutoSpin.setText(Options.txtAutoSpin);
            //remove timer event
            if(this.txtSpeed && this.timer) {
                this.txtSpeed.destroy();
                this.timer.remove();
            }   
        } else {
            Options.txtAutoSpin = 'STOP';
            this.txtAutoSpin.setText(Options.txtAutoSpin);
            //play audio button
            this.scene.audioPlayButton();
        
            this.bgAuto = new Sprite(this.scene, Config.width / 2, Config.height / 2,
                'autoSpin', 'bg_auto.png');
            this.auto = new Sprite(this.scene, Config.width / 2, Config.height / 2 - 100,
                'bgButtons', 'btn-spin.png');
            
            this.txtAuto = this.scene.add.text(Config.width / 2 - 5, Config.height / 2 - 115,
                Options.txtAuto, Style.styleButton);
            
            //function set text x auto
            this.setXAuto();
            
            //function plus
            this.plus();
            
            //function minus
            this.minus();

            //function play
            this.play();

            //function exit
            this.exit();
        }
    }

    /*end function play speed auto*/

    plus() {
        this.btnPlus = new Sprite(this.scene, Config.width / 2 - 100, Config.height / 2 - 100,
            'autoSpin', 'btn_plus_bet.png');
        this.btnPlus.on('pointerdown', () => {
            //play audio button
            this.scene.audioPlayButton();
            if(Options.txtAuto === 100) {
                this.btnPlus.setTint(0xa09d9d);
            }
            if(Options.txtAuto < 100) {
                this.btnMinus.clearTint();
                this.btnPlus.setScale(0.9);
                Options.txtAuto += 5;
                //set text x auto
                Options.txtAuto < 100 ? this.txtAuto.x = 620 :
                    this.txtAuto.x = 610;
                this.txtAuto.setText(Options.txtAuto);
            }
        });
        this.btnPlus.on('pointerup', () => this.btnPlus.setScale(1));
    }

    /*end function plus*/

    minus() {
        this.btnMinus = new Sprite(this.scene, Config.width / 2 + 100, Config.height / 2 - 100,
            'autoSpin', 'btn_minus_bet.png');
        this.btnMinus.on('pointerdown', () => {
            //play audio button
            this.scene.audioPlayButton();
            if(Options.txtAuto === 5) {
                this.btnMinus.setTint(0xa09d9d);
            }  
            if(Options.txtAuto > 5) {
                this.btnPlus.clearTint();
                this.btnMinus.setScale(0.9);
                Options.txtAuto -= 5;
                //function set text x auto
                this.setXAuto();
                this.txtAuto.setText(Options.txtAuto);  
            } 
        });
        this.btnMinus.on('pointerup', () => this.btnMinus.setScale(1));
    }

    /*end function minus*/

    play() {
        this.btnPlay = new Sprite(this.scene, Config.width / 2, Config.height / 2 + 100,
            'bgButtons', 'btn_play.png').setScale(0.9);
        this.btnPlay.on('pointerdown', () => {
            //play audio button
            this.scene.audioPlayButton();
            //function remove image auto
            this.removeImgAuto();
            if(this.scene.valueMoney >= Options.coin * Options.line) 
                this.speedPlay(Options.txtAuto);
            else
                this.setTextAuto();
        });
    }

    /*end function play*/
    
    exit() {
        this.btnExit = new Sprite(this.scene, Config.width - 30 , 
            Config.height - 635,
            'bgButtons', 'btn_exit.png').setScale(0.9);
        this.btnExit.on('pointerdown', () => {
            //play audio button
            this.scene.audioPlayButton();
            //function remove image auto
            this.removeImgAuto();
            //set text auto
            this.setTextAuto();
        });
    }

    /*end function exit*/

    speedPlay(speed) {
        //set text speed
        let width;
        speed > 5 ? width = Config.width - 150 :  width = Config.width - 130;

        this.txtSpeed = this.scene.add.dynamicBitmapText(width, Config.height / 2 - 350, 'txt_bitmap', speed, Style.fontSizeSpeed);
        this.txtSpeed.setDisplayCallback(this.scene.textCallback);
        this.timer = this.scene.time.addEvent({
            delay: 500,
            callback: function() {
                //set delay 
                this.timer.delay = 4500;
                if(speed > 0 && this.scene.valueMoney >= 
                    Options.coin * Options.line) {
                    //set color
                    this.scene.baseSpin.setColor();
                    //set check click = true
                    Options.checkClick = true;
                    //detroys line array
                    this.scene.baseSpin.destroyLineArr();
                    //funtion remove text win
                    this.scene.baseSpin.removeTextWin();
                    //save localStorage
                    this.scene.baseSpin.saveLocalStorage();
                    this.tweens = new Tween(this.scene, Key.tween);
                    speed --;
                    this.txtSpeed.setText(speed);
                } else {
                    Options.checkClick = false;
                    this.timer.remove(false);
                    this.txtSpeed.destroy();
                    //set text auto
                    this.setTextAuto();
                }
            },
            callbackScope: this,
            loop: true
        });
    }

    /*end function speed play*/

    setTextAuto() {
        Options.txtAutoSpin = 'AUTO';
        this.txtAutoSpin.setText(Options.txtAutoSpin);
    }

    /*end function set text auto*/

    setXAuto() {
        if(Options.txtAuto >= 100) 
            this.txtAuto.x = 610;
        else if(Options.txtAuto >= 10)
            this.txtAuto.x = 620;
        else 
            this.txtAuto.x = 635;
    }

    /*end function set text X auto*/
    
    removeImgAuto() {
        this.bgAuto.destroy();
        this.btnPlus.destroy();
        this.btnMinus.destroy();
        this.auto.destroy();
        this.txtAuto.destroy();
        this.btnPlay.destroy();
        this.btnExit.destroy();
    }

    /*end function remove image auto*/
}