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
      this.WinninerParticles();
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

  WinninerParticles() {
    const particles = this.add.particles(0, 0, 'Particle', {
      x: { min: 0, max: this.cameras.main.width },
      speedY: { min: 100, max: 300 }, // Velocidad vertical hacia abajo
      speedX: { min: -50, max: 50 }, // Pequeño movimiento horizontal aleatorio
      angle: 90, // Ángulo fijo hacia abajo
      scale: { start: 0.5, end: 0, random: true }, // Escala aleatoria
      rotate: { start: 0, end: 360, random: true }, // Rotación aleatoria
      alpha: { start: 1, end: 0 }, // Fade out
      gravityY: 50, // Gravedad adicional hacia abajo
      lifespan: 3000, // Duración de vida de las partículas
      blendMode: 'NORMAL', // Modo de mezcla
      quantity: 10, // Cantidad de partículas emitidas por ciclo
      frequency: 100, // Frecuencia de emisión
    });
    particles.flow(1000, 20);
  }
}
