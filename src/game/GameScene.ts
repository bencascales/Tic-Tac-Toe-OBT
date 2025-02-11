import 'phaser';
import logicGame from './logicGame';
import EndGameScene from './EndGameScene';

export default class GameScene extends Phaser.Scene {
  private gamelogic: logicGame; // Logica del Tic Tac Toe
  private cellSize: number; // Tamaño las celdas
  private images: Phaser.GameObjects.Image[]; // Almacen de las imagenes

  constructor(firstSymbol: 'X' | 'O') {
    super('GameScene');
    this.gamelogic = new logicGame(firstSymbol);
    this.cellSize = 150;
    this.images = [];
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
    this.images.push(Board);
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
        cell.on('pointerdown', () => {
          this.onPressCell(row, col);
          cell.destroy();
        });
      }
    }
  }

  onPressCell(cellRow: number, cellCol: number) {
    //Realizo la juagada y obtengo que jugador fue. Para esto calcula la posicion de la celda
    const currentPlayer = this.gamelogic.PlayTurn(3 * cellRow + cellCol);
    this.sound.add('Tap').play();
    //Crea la imagen de la marca del jugador (X o O)
    const symbol = this.add
      .image(cellRow * this.cellSize + 10, cellCol * this.cellSize + 10, currentPlayer)
      .setDisplaySize(this.cellSize, this.cellSize);
    //Agrego la marca o simbolo al arreglo con las imagenes
    this.images.push(symbol);
    //La hago invisible de entrada
    symbol.setAlpha(0);
    //Agrego el efecto de aparecer de las X y O
    this.tweens.add({
      targets: symbol,
      alpha: 1,
      duration: 500,
      ease: 'Power2',
    });
    // Miro el estado del juego por si se acaba o no
    this.GameState();
  }
  GameState() {
    const gameState = this.gamelogic.Winner();
    // Pregunto si el juego puede seguir ya que si no hay ganador y no hay empate entonces devuelve ''
    if (gameState === '') {
      return;
    }
    // Pregunto si fue un empate
    if (gameState !== 'E') {
      //Si no es un empate entonces es una victoria
      this.sound.add('Win').play();
    }
    this.DestroyImages();
    this.scene.add('EndGameScene', new EndGameScene(gameState));
    this.scene.start('EndGameScene');
    this.scene.remove();
  }
  DestroyImages() {
    this.images.forEach((image) => image.destroy());
  }
}
