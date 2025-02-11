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
    const playButton = this.add
      .image(this.cameras.main.centerX, this.cameras.main.centerY, 'Play')
      .setDisplaySize(400, 400)
      .setInteractive();
    playButton.on('pointerdown', () => {
      this.sound.add('Tap').play();
      playButton.destroy();
      this.chooseSymbol();
    });
  }

  chooseSymbol() {
    this.add
      .text(
        this.cameras.main.centerX,
        this.cameras.main.centerY - 250,
        'Choose one symbol to start',
        {
          fontSize: '100px',
          color: '#000000',
          align: 'center',
        },
      )
      .setOrigin(0.5);
    const oButton = this.add
      .image(this.cameras.main.centerX + 300, this.cameras.main.centerY, 'O')
      .setInteractive();
    const xButton = this.add
      .image(this.cameras.main.centerX - 300, this.cameras.main.centerY, 'X')
      .setInteractive();
    oButton.on('pointerdown', () => {
      oButton.destroy();
      xButton.destroy();
      this.onPressSymbol('O');
    });
    xButton.on('pointerdown', () => {
      oButton.destroy();
      xButton.destroy();
      this.onPressSymbol('X');
    });
  }

  onPressSymbol(symbol: 'X' | 'O') {
    this.sound.add('Tap').play();
    this.scene.add('GameScene', new GameScene(symbol));
    this.scene.start('GameScene');
    this.scene.remove();
  }
}
