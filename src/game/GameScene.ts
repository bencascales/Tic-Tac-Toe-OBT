import 'phaser';
import logicGame from './logicGame';

export default class GameScene extends Phaser.Scene {
  private gamelogic: logicGame;

  constructor(firstSymbol: 'X' | 'O') {
    super('GameScene');
    this.gamelogic = new logicGame(firstSymbol);
  }
  preload() {
    this.load.image('Board', 'assets/Board.png');
    this.load.image('O', 'assets/O.png');
    this.load.image('X', 'assets/X.png');
  }
  create() {
    const Board = this.add.image(400, 250, 'Board');
  }
}
