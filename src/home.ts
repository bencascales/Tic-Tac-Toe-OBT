import 'phaser';
import config from './config/config';
import init from './preLoad/init';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add('init', init);
    this.scene.start('init');
  }
}

window.onload = function () {
  var game = new Game();
};
