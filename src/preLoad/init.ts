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
  }
  create() {
    const playButton = this.add.image(400, 250, 'Play');
    playButton.setInteractive();
    playButton.on('pointerdown', () => {
      playButton.destroy();
      this.chooseSymbol();
    });
  }

  chooseSymbol() {
    const oButton = this.add.image(600, 250, 'O');
    const xButton = this.add.image(200, 250, 'X');
    oButton.setInteractive();
    xButton.setInteractive();
    oButton.on('pointerdown', () => {
      oButton.destroy();
      xButton.destroy();
      this.scene.add('GameScene', new GameScene('O'));
      this.scene.start('GameScene');
    });
    xButton.on('pointerdown', () => {
      oButton.destroy();
      xButton.destroy();
      this.scene.add('GameScene', new GameScene('X'));
      this.scene.start('GameScene');
    });
  }
}
