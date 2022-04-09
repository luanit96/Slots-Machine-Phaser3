import Phaser from 'phaser';
import Config from './config';

export default class Game {
  constructor() {
    new Phaser.Game(Config);
  }

  resize() {
    let canvas = document.querySelector('canvas');
  
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let windowRatio = windowWidth / windowHeight;
    let gameRatio = Config.width / Config.height;
    if (windowRatio < gameRatio) {
      canvas.style.width = windowWidth + 'px';
      canvas.style.height = (windowWidth / gameRatio) + 'px';
    } else {
      canvas.style.width = (windowHeight * gameRatio) + 'px';
      canvas.style.height = windowHeight + 'px';
    }
  }
}

//event windows on load
window.onload = () => {
    const game = new Game();
    game.resize();
    window.addEventListener('resize', game.resize, false);
}