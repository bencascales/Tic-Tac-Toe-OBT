import 'phaser';
export default class init extends Phaser.Scene {
  constructor() {
    super('init');
  }
  preload() {
    this.load.image('Play', 'assets/Play.png');
    // this.load.image('Board', '../../static/assets/Board.png');
  }
  create() {
    const playButton = this.add.image(400, 250, 'Play');
    const BoardIntractive = this.add.image(300, 450, '1');
    // playButton.setInteractive();
    // BoardIntractive.setInteractive();
    // playButton.on('pointerdown', () => {
    //   console.log('Click en Play');
    // });
  }
}
