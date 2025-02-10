import 'phaser';
export default class Example extends Phaser.Scene {
  constructor() {
    super('Example');
  }
  preload() {
    this.load.image('Fondo', 'assets/Fondo.png');
  }
  create() {
    var Fondo = this.add.image(400, 250, 'Fondo');
  }
}
