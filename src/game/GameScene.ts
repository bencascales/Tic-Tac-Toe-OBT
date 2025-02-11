import 'phaser';
import logicGame from './logicGame';

export default class GameScene extends Phaser.Scene {
  private gamelogic: logicGame; // Logica del Tic Tac Toe
  private cellSize: number; // Tamaño las celdas

  constructor(firstSymbol: 'X' | 'O') {
    super('GameScene');
    this.gamelogic = new logicGame(firstSymbol);
    this.cellSize = 150;
  }
  preload() {
    this.load.image('Board', 'assets/Board.png');
    this.load.image('O', 'assets/O.png');
    this.load.image('X', 'assets/X.png');
    this.load.audio('Win', 'assets/Win.mp3');
    this.load.audio('Tap', 'assets/Tap.mp3');
  }
  create() {
    const Board = this.add.image(400, 400, 'Board').setDisplaySize(450, 450); // setDisplaySize(cellSize X 9,cellSize X 9)
    this.DrawGrill();
  }

  DrawGrill() {
    const gridSize = 3; // dimension de la grilla 3x3,

    // Defino grilla
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const xAxis = row * this.cellSize + 200; // Posicion en el eje de las X
        const yAxis = col * this.cellSize + 200; // Posicion en el eje de las Y

        // Crear una celda en la posicion x, y

        const cell = this.add.zone(
          xAxis + this.cellSize / 2,
          yAxis + this.cellSize / 2,
          this.cellSize,
          this.cellSize,
        );
        cell.setInteractive();

        // Al presionar la celda llama al metodo presionar celda y le pasa su fila y columna
        cell.on('pointerdown', () => this.onPressCell(row, col));
      }
    }
  }

  onPressCell(cellRow: number, cellCol: number) {
    //Realizo la juagada y obtengo que jugador fue. Para esto calcula la posicion de la celda
    const currentPlayer = this.gamelogic.PlayTurn(3 * cellRow + cellCol);
    this.sound.add('Tap').play();
    //Pregunto que jugador fue quien jugo y dibujo su respectiva marca o simbolo
    if (currentPlayer === 'X') {
      const X = this.add
        .image(cellRow * this.cellSize + 10, cellCol * this.cellSize + 10, 'X')
        .setDisplaySize(this.cellSize, this.cellSize);
    } else {
      const O = this.add
        .image(cellRow * this.cellSize + 10, cellCol * this.cellSize + 10, 'O')
        .setDisplaySize(this.cellSize, this.cellSize);
    }
    // Miro el estado del juego por si se acaba o no
    this.GameState();
  }
  GameState() {
    const gameState = this.gamelogic.Winner();
    // Pregunto si fue un empate
    if (gameState === 'E') {
      return;
    }
    // Pregunto si el juego puede seguir ya que si no hay ganador y no hay empate entonces devuelve ''
    if (gameState === '') {
      return;
    }
    this.sound.add('Win').play();
    //Si llega aqui es que hubo un ganador
  }
}
