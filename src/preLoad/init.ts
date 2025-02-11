import 'phaser';
import GameScene from '../game/GameScene';
export default class init extends Phaser.Scene {
  constructor() {
    super('init');
  }
  preload() {
    this.load.image('Play', 'assets/Play.png');
    this.load.image('O', 'assets/O.png');
    this.load.image('X', 'assets/X.png');
    this.load.audio('Tap', 'assets/Tap.mp3');
  }
  create() {
    const playButton = this.add.image(400, 250, 'Play').setInteractive();
    playButton.on('pointerdown', () => {
      this.sound.add('Tap').play();
      playButton.destroy();
      this.chooseSymbol();
    });
  }

  chooseSymbol() {
    const oButton = this.add.image(600, 250, 'O').setInteractive();
    const xButton = this.add.image(200, 250, 'X').setInteractive();
    oButton.on('pointerdown', () => {
      this.sound.add('Tap').play();
      oButton.destroy();
      xButton.destroy();
      this.scene.add('GameScene', new GameScene('O'));
      this.scene.start('GameScene');
    });
    xButton.on('pointerdown', () => {
      this.sound.add('Tap').play();
      oButton.destroy();
      xButton.destroy();
      this.scene.add('GameScene', new GameScene('X'));
      this.scene.start('GameScene');
    });
  }
}
