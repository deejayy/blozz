import { Board, BOX_SIZE, Coord, HOVER_STATE, MINI_GRID_SIZE, Piece, PLACE_STATE } from '@feature/blozz/module/board/model/board.model';
import { produce } from 'immer';

/**
 * Converts a string representation of a game board to a 2D array of numbers.
 *
 * @param boardDefinition - The string representation of the game board.
 * @param width - The width of the game board.
 * @param height - The height of the game board.
 *
 * @returns A 2D array of numbers, where 1 represents a valid position and 0 represents an empty position.
 */
export const convertBoard = (boardDefinition: string, width: number, height: number): Board => {
  return (boardDefinition + '\n'.repeat(height))
    .split('\n')
    .slice(0, height)
    .map((v) =>
      (v + ' '.repeat(width))
        .split('')
        .slice(0, width)
        .map((p) => {
          return p === '.' ? 1 : 0;
        }),
    );
};

/**
 * Place a piece on the board at the specified location.
 *
 * @param board - The game board
 * @param piece - The piece to be placed
 * @param rowPos - The row position of the top-left corner of the piece
 * @param colPos - The column position of the top-left corner of the piece
 */
export const placePiece = (board: Board, piece: Piece | undefined, rowPos: number, colPos: number): Board => {
  return produce(board, (newBoard) => {
    piece?.forEach((row, i) => {
      row.forEach((_, j) => {
        if (piece[i]![j]) {
          if (newBoard[i + rowPos] !== undefined) {
            if (newBoard[i + rowPos]![j + colPos] !== undefined) {
              newBoard[i + rowPos]![j + colPos] = PLACE_STATE;
            }
          }
        }
      });
    });
  });
};

export const hoverPiece = (board: Board, piece: Piece | undefined, rowPos: number, colPos: number) => {
  return produce(board, (newBoard) => {
    piece?.forEach((row, i) => {
      row.forEach((_, j) => {
        if (piece[i]![j]) {
          if (newBoard[i + rowPos] !== undefined) {
            if (newBoard[i + rowPos]![j + colPos] !== undefined) {
              newBoard[i + rowPos]![j + colPos] = HOVER_STATE;
            }
          }
        }
      });
    });
  });
};

/**
 * Removes a row from the board.
 *
 * @param board - The current board.
 * @param row - The index of the row to be removed.
 *
 * @returns A new board with the specified row removed.
 */
export const removeRow = (board: Board, row: number): Board => {
  if (board[row] !== undefined) {
    board[row] = board[row]?.map(() => 0) ?? [];
  }
  return board;
};

/**
 * Removes a column from a board.
 *
 * @param board - The board to remove a column from.
 * @param column - The index of the column to remove.
 *
 * @returns The modified board with the column removed.
 */
export const removeColumn = (board: Board, column: number): Board => {
  const newBoard = board.map((row) => {
    if (row[column]) {
      row[column] = 0;
    }
    return row;
  });
  return newBoard;
};

/**
 * Remove a block from the board.
 *
 * @param board - The game board.
 * @param start - The starting coordinate of the block.
 * @param end - The ending coordinate of the block.
 *
 * @returns The modified board.
 */
export const removeBlock = (board: Board, start: Coord, end: Coord): Board => {
  const reX = [Math.max(0, Math.min(start.x, board.length - 1)), Math.max(0, Math.min(end.x, board.length - 1))].sort();
  const reY = [Math.max(0, Math.min(start.y, board[0]!.length - 1)), Math.max(0, Math.min(end.y, board[0]!.length - 1))].sort();

  for (let i = reX[0]!; i <= reX[1]!; i++) {
    for (let j = reY[0]!; j <= reY[1]!; j++) {
      board[j]![i] = 0;
    }
  }

  return board;
};

/**
 * Determines if a piece has overlap with the board at the given position.
 *
 * @param board The board to check for overlap.
 * @param piece The piece to check for overlap.
 * @param rowPos The row position to check for overlap.
 * @param colPos The column position to check for overlap.
 *
 * @returns True if the piece overlaps with the board at the given position, false otherwise.
 */
export const hasOverlap = (board: Board, piece: Piece | undefined, rowPos: number, colPos: number): boolean => {
  let result: boolean = false;

  piece?.forEach((row, i) => {
    row.forEach((_, j) => {
      if (piece[i]![j]) {
        if (board[i + rowPos] !== undefined) {
          if (board[i + rowPos]![j + colPos] === undefined || board[i + rowPos]![j + colPos] === 1) {
            result = true;
          }
        } else {
          result = true;
        }
      }
    });
  });

  return result;
};

/**
 * Converts a string representation of a tetris-like block piece into a 2D array of integers.
 *
 * @param pieceString - The string representation of the piece.
 *
 * @returns A 2D array of integers representing the piece.
 */
export const convertPiece = (pieceString: string): Piece => {
  const maxLength = Math.max(...pieceString.split('\n').map((v) => v.length));

  return pieceString.split('\n').map((v) =>
    v
      .padEnd(maxLength, ' ')
      .split('')
      .map((p) => {
        return p === '.' ? 1 : 0;
      }),
  );
};

/**
 * Calculates the total point value of a piece, based on the number of black squares it covers.
 *
 * @param piece - The 2D array of integers representing the piece.
 *
 * @returns The total point value of the piece.
 */
export const pieceValue = (piece: Piece | undefined): number => {
  return (
    piece?.reduce((acc, curr) => {
      return acc + curr.reduce((acc2, curr2) => acc2 + curr2, 0);
    }, 0) ?? 0
  );
};

/**
 * Checks the rows of a board and clears them if they are filled with `1` value.
 *
 * @param board - The board to check.
 * @param clearMethod - A function to clear the row.
 */
export const checkRows = (board: Board, clearMethod: (rowIndex: number) => void): void => {
  board.forEach((row, i) => {
    if (row.every((val) => val === PLACE_STATE)) {
      clearMethod(i);
    }
  });
};

/**
 * Checks if columns are full and clears them if they are.
 *
 * @param board - The game board to check.
 * @param clearMethod - The function to clear the column.
 */
export const checkColumns = (board: Board, clearMethod: (columnIndex: number) => void): void => {
  const columnSize = board[0]!.length;
  for (let i = 0; i < columnSize; i++) {
    let isColumnFull = true;
    for (let j = 0; j < board.length; j++) {
      if (board[j]![i] !== PLACE_STATE) {
        isColumnFull = false;
      }
    }
    if (isColumnFull) {
      clearMethod(i);
    }
  }
};

/**
 * Checks if there is a 3x3 block in every 3rd position
 *
 * @param board - 2D array representing the game board
 * @param clearMethod - a callback function to clear columns with a 3x3 block
 */
export const checkBlocks = (board: Board, clearMethod: (rowIndex: number, columnIndex: number) => void): void => {
  const blockExists = (i: number, j: number) =>
    board.slice(i, i + MINI_GRID_SIZE).every((row) => row.slice(j, j + MINI_GRID_SIZE).every((cell) => !!cell));

  for (let i = 0; i < board.length && board.length > MINI_GRID_SIZE; i += MINI_GRID_SIZE) {
    for (let j = 0; j < board[0]!.length; j += MINI_GRID_SIZE) {
      if (blockExists(i, j)) {
        clearMethod(i, j);
      }
    }
  }
};

export const pieceCanBePlaced = (board: Board, piece: Piece): boolean => {
  let result: boolean = false;

  board.forEach((row, i) => {
    row.forEach((_, j) => {
      if (!hasOverlap(board, piece, i, j)) {
        result = true;
      }
    });
  });

  return result;
};

export const getDragCoordsInPixel = (event: DragEvent) => {
  return {
    x: event.x - (event.target as HTMLElement).offsetLeft,
    y: event.y - (event.target as HTMLElement).offsetTop,
  };
};

export const getDragCoords = (event: DragEvent, relativeTo: { x: number; y: number } = { x: 0, y: 0 }) => {
  const { x: col, y: row } = getDragCoordsInPixel(event);
  return {
    col: Math.round((col - relativeTo.x) / BOX_SIZE),
    row: Math.round((row - relativeTo.y) / BOX_SIZE),
  };
};
