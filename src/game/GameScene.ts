import 'phaser';
import logicGame from './logicGame';
import EndGameScene from './EndGameScene';

export default class GameScene extends Phaser.Scene {
  private gamelogic: logicGame; // Logica del Tic Tac Toe
  private cellSize: number; // Tamaño las celdas
  private images: Phaser.GameObjects.Image[]; // Almacen de las imagenes
  private countdownTime: number; // Tiempo en segundos

  constructor(firstSymbol: 'X' | 'O') {
    super('GameScene');
    this.gamelogic = new logicGame(firstSymbol);
    this.cellSize = 150;
    this.images = [];
    this.countdownTime = 0;
  }
  preload() {
    this.load.image('Board', 'assets/Board.png');
    this.load.image('O', 'assets/O.png');
    this.load.image('X', 'assets/X.png');
    this.load.audio('Win', 'assets/Win.mp3');
    this.load.audio('Tap', 'assets/Tap.mp3');
  }
  create() {
    const Board = this.add
      .image(this.cameras.main.centerX, this.cameras.main.centerY, 'Board')
      .setDisplaySize(this.cellSize * 3, this.cellSize * 3);
    this.images.push(Board);
    const countdownText = this.add.text(
      this.cameras.main.centerX,
      50,
      `Tiempo: ${this.countdownTime}`,
      {
        font: '32px Arial',
        color: '#000000',
      },
    );
    countdownText.setOrigin(0.5);

    // Comienza el temporizador de la cuenta atrás
    this.startCountdown(countdownText);
    this.DrawGrill();
  }

  startCountdown(countdownText: Phaser.GameObjects.Text) {
    this.countdownTime = 30; // Tiempo
    countdownText.setText(`Tiempo: ${this.countdownTime}`);

    const countdownEvent = this.time.addEvent({
      delay: 1000, // Despues de 1 segundo ejecuta callback (esta en ms por eso 1000)
      callback: () => this.updateCountdown(countdownText, countdownEvent),
      callbackScope: this,
      loop: true, // Bucle asi ejecute callback cada segundo y no solo una vez
    });
  }

  updateCountdown(countdownText: Phaser.GameObjects.Text, countdownEvent: Phaser.Time.TimerEvent) {
    this.countdownTime--;
    countdownText.setText(`Tiempo: ${this.countdownTime}`);

    if (this.countdownTime <= 0) {
      countdownEvent.remove();
      this.startCountdown(countdownText);
      this.gamelogic.SkipTurn();
    }
  }

  DrawGrill() {
    const gridSize = 3; // dimension de la grilla 3x3,
    const boardX = this.cameras.main.centerX - this.cellSize * 1.5; // La posición X del tablero (centrado)
    const boardY = this.cameras.main.centerY - this.cellSize * 1.5; // La posición Y del tablero (centrado)

    // Defino grilla
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const xAxis = boardX + row * this.cellSize + this.cellSize / 2; // Posición X de la celda
        const yAxis = boardY + col * this.cellSize + this.cellSize / 2; // Posición Y de la celda

        // Crear una celda en la posicion x, y

        const cell = this.add.zone(xAxis, yAxis, this.cellSize, this.cellSize);
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
      .image(
        this.cameras.main.centerX -
          this.cellSize * 1.5 +
          cellRow * this.cellSize +
          this.cellSize / 2,
        this.cameras.main.centerY -
          this.cellSize * 1.5 +
          cellCol * this.cellSize +
          this.cellSize / 2,
        currentPlayer,
      )
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
    //Reseteo timer
    this.countdownTime = 30;
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
