export default class logicGame {
  private currentPlayer: 'X' | 'O';
  private board: string[];

  constructor(FirstSymbol: 'X' | 'O') {
    this.currentPlayer = FirstSymbol;
    // Los 3 primeros valores son la primera fila, del 4 al 6 la segunda y del 7 al 9 la tercera fila
    // ademas las posiciones en filas se lee de izquierda a derecha
    this.board = ['', '', '', '', '', '', '', '', ''];
  }

  // Otra opcion que pense hera hacer un metodo cambiar jugador y que se llame despues de jugar como se hace con winner
  PlayTurn(position: number) {
    //Marco en el tablero logico en laposicion correspondente
    this.board[position] = this.currentPlayer;
    //Cambio la marca o simbolo para el siguiente jugador
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    //Devuelvo la marca que se acaba de colocar
    return this.currentPlayer === 'X' ? 'O' : 'X';
  }

  SkipTurn() {
    //Cambio la marca o simbolo para el siguiente jugador
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    //Devuelvo la marca del jugador que corresponde jugar
    return this.currentPlayer;
  }

  Winner() {
    const posisibleWinningCombinations = [
      [0, 1, 2], // Fila 1
      [3, 4, 5], // Fila 2
      [6, 7, 8], // Fila 3
      [0, 3, 6], // Columna 1
      [1, 4, 7], // Columna 2
      [2, 5, 8], // Columna 3
      [0, 4, 8], // Diagonal 1
      [2, 4, 6], // Diagonal 2
    ];

    // Recorro las distintas posibilidades ganadoras
    for (let combination of posisibleWinningCombinations) {
      let [position1, position2, position3] = combination;
      // Chequeo que el valor en las tres posiciones sean iguales y distintos de ''
      if (
        this.board[position1] != '' &&
        this.board[position1] === this.board[position2] &&
        this.board[position1] === this.board[position3]
      ) {
        // En caso de cumplir la pregunta devuelvo la marca o simbolo ganador
        return this.board[position1];
      }
    }

    // Si no hay mas huecos libres y no hay ganador entonces es un empate
    if (!this.board.includes('')) {
      // La E la uso de indicador de empate
      return 'E';
    }
    // La cadena vacia la uso de indicador de que sigue el juego
    return '';
  }
}
