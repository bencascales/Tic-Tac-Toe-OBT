import 'phaser';
import init from '../preLoad/init';
export default class EndGameScene extends Phaser.Scene {
  constructor(gameState: string) {
    super('EndGameScene');
  }
  preload() {
    this.load.image('Reload', 'assets/Reload.png');
    this.load.image('Particle', 'assets/Particle.png');
  }
  create() {
    const reload = this.add
      .image(this.cameras.main.centerX, this.cameras.main.centerY, 'Reload')
      .setDisplaySize(400, 400)
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
