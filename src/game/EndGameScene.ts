import 'phaser';
import init from '../preLoad/init';
export default class EndGameScene extends Phaser.Scene {
  private gameEnd: string;

  constructor(gameState: string) {
    super('EndGameScene');
    this.gameEnd = gameState;
  }
  preload() {
    this.load.image('Reload', 'assets/Reload.png');
    this.load.image('Particle', 'assets/Particle.png');
  }
  create() {
    let message = '';
    if (this.gameEnd === 'E') {
      message = '¡Draw!';
    } else {
      message = `¡Winner: ${this.gameEnd}!`;
    }
    this.add
      .text(this.cameras.main.centerX, this.cameras.main.centerY - 200, message, {
        fontSize: '120px',
        color: '#000000',
        align: 'center',
      })
      .setOrigin(0.5);
    const reload = this.add
      .image(this.cameras.main.centerX, this.cameras.main.centerY, 'Reload')
      .setDisplaySize(200, 200)
      .setInteractive();
    reload.on('pointerdown', () => {
      reload.destroy();
      this.onPresReload();
    });
  }
  onPresReload() {
    this.scene.add('init', new init());
    this.scene.start('init');
    this.scene.remove();
  }
}
