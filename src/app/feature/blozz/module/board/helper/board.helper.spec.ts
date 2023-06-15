/* eslint-disable max-lines-per-function */
/* eslint-disable no-magic-numbers */
import {
  checkBlocks,
  checkColumns,
  checkRows,
  convertBoard,
  convertPiece,
  hasOverlap,
  pieceValue,
  placePiece,
  removeBlock,
  removeColumn,
  removeRow,
} from '@feature/blozz/module/board/helper/board.helper';
import { Board, Piece } from '@feature/blozz/module/board/model/board.model';

describe('convertBoard', () => {
  it('basic generation tests', () => {
    expect(convertBoard('', 0, 0)).toEqual([]);
    expect(convertBoard('', 1, 1)).toEqual([[0]]);
    expect(convertBoard('', 2, 2)).toEqual([
      [0, 0],
      [0, 0],
    ]);
    expect(convertBoard('...', 2, 2)).toEqual([
      [1, 1],
      [0, 0],
    ]);
    expect(convertBoard('...\n...', 2, 2)).toEqual([
      [1, 1],
      [1, 1],
    ]);
    expect(convertBoard('  .\n  .\n   .', 2, 2)).toEqual([
      [0, 0],
      [0, 0],
    ]);
    expect(convertBoard(' .\n .\n.', 2, 2)).toEqual([
      [0, 1],
      [0, 1],
    ]);
  });

  it('should convert a board definition string to a 2D array of numbers', () => {
    const boardDefinition = '.......\n.......';
    const width = 7;
    const height = 2;

    const expectedBoard = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];

    const result = convertBoard(boardDefinition, width, height);

    expect(result).toEqual(expectedBoard);
  });

  it('should handle board definition strings with extra lines and characters', () => {
    const boardDefinition = '.......\n...X..X\n.......';
    const width = 7;
    const height = 2;

    const expectedBoard = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 0, 1, 1, 0],
    ];

    const result = convertBoard(boardDefinition, width, height);

    expect(result).toEqual(expectedBoard);
  });

  it('should handle a board definition string with too few characters', () => {
    const boardDefinition = '.......\n...X\n.......';
    const width = 7;
    const height = 2;

    const expectedBoard = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 0, 0, 0, 0],
    ];

    const result = convertBoard(boardDefinition, width, height);

    expect(result).toEqual(expectedBoard);
  });

  it('should handle a board definition string with too few lines', () => {
    const boardDefinition = '.......\n.......';
    const width = 7;
    const height = 3;

    const expectedBoard = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0],
    ];

    const result = convertBoard(boardDefinition, width, height);

    expect(result).toEqual(expectedBoard);
  });
});

describe('placePiece', () => {
  it('places the piece on the board', () => {
    const board = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    const piece = [
      [1, 1],
      [1, 1],
    ];

    const newBoard = placePiece(board, piece, 0, 0);

    expect(newBoard).toEqual([
      [1, 1, 0, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
  });

  it('places the piece on the board when the piece is partially off the board', () => {
    const board = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    const piece = [
      [1, 1],
      [1, 1],
    ];

    const newBoard = placePiece(board, piece, 2, 2);

    expect(newBoard).toEqual([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 1, 1],
      [0, 0, 1, 1],
    ]);
  });

  it('places the piece on the board when the board is smaller than the piece', () => {
    const board = [
      [0, 0],
      [0, 0],
    ];

    const piece = [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ];

    const newBoard = placePiece(board, piece, 0, 0);

    expect(newBoard).toEqual([
      [1, 1],
      [1, 1],
    ]);
  });

  it('does not place the piece on the board if the piece is undefined', () => {
    const board = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    const newBoard = placePiece(board, undefined, 0, 0);

    expect(newBoard).toEqual([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
  });

  it('does not place the piece on the board if the piece is empty', () => {
    const board = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    const piece: Piece = [];

    const newBoard = placePiece(board, piece, 0, 0);

    expect(newBoard).toEqual([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
  });

  it('does not place the piece on the board if the board is empty', () => {
    const board: Board = [];

    const piece = [
      [1, 1],
      [1, 1],
    ];

    const newBoard = placePiece(board, piece, 0, 0);

    expect(newBoard).toEqual([]);
  });
});

describe('removeRow', () => {
  it('should remove the specified row from the board', () => {
    const board: number[][] = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];

    expect(removeRow(board, 1)).toEqual([
      [1, 2, 3],
      [0, 0, 0],
      [7, 8, 9],
    ]);
  });

  it('should return the same board if the specified row is out of range', () => {
    const board: number[][] = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];

    expect(removeRow(board, 3)).toEqual([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);
  });

  it('should return the same board if the specified row is an empty array', () => {
    const board: number[][] = [[1, 2, 3], [], [7, 8, 9]];

    expect(removeRow(board, 1)).toEqual([[1, 2, 3], [], [7, 8, 9]]);
  });
});

describe('removeColumn', () => {
  it('should remove the specified column from the board', () => {
    const board: number[][] = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];

    expect(removeColumn(board, 1)).toEqual([
      [1, 0, 3],
      [4, 0, 6],
      [7, 0, 9],
    ]);
  });

  it('should return the same board if the specified column is out of range', () => {
    const board: number[][] = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];

    expect(removeColumn(board, 3)).toEqual([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);
  });

  it('should return the same board if the specified column is an empty array', () => {
    const board: number[][] = [[1, 2, 3], [], [7, 8, 9]];

    expect(removeColumn(board, 1)).toEqual([[1, 0, 3], [], [7, 0, 9]]);
  });
});

describe('removeBlock', () => {
  it('should remove a block from the board', () => {
    const board = [
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1],
    ];
    const start = { x: 1, y: 1 };
    const end = { x: 2, y: 2 };
    const expectedBoard = [
      [1, 1, 1, 1],
      [1, 0, 0, 1],
      [1, 0, 0, 1],
      [1, 1, 1, 1],
    ];

    expect(removeBlock(board, start, end)).toEqual(expectedBoard);
  });

  it('should handle blocks outside the board', () => {
    const board = [
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1],
    ];
    const start = { x: -1, y: -1 };
    const end = { x: 5, y: 5 };
    const expectedBoard = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    expect(removeBlock(board, start, end)).toEqual(expectedBoard);
  });

  it('should handle blocks overlapping the edge of the board', () => {
    const board = [
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1],
    ];
    const start = { x: -1, y: -1 };
    const end = { x: 2, y: 2 };
    const expectedBoard = [
      [0, 0, 0, 1],
      [0, 0, 0, 1],
      [0, 0, 0, 1],
      [1, 1, 1, 1],
    ];

    expect(removeBlock(board, start, end)).toEqual(expectedBoard);
  });
});

describe('hasOverlap', () => {
  it('should return false when there is no overlap', () => {
    const board: Board = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    const piece: Piece = [
      [1, 1],
      [0, 1],
    ];
    const rowPos = 0;
    const colPos = 0;

    const result = hasOverlap(board, piece, rowPos, colPos);

    expect(result).toBe(false);
  });

  it('should return true when there is overlap', () => {
    const board: Board = [
      [0, 0, 0],
      [0, 1, 1],
      [0, 0, 1],
    ];
    const piece: Piece = [
      [1, 1],
      [0, 1],
    ];
    const rowPos = 0;
    const colPos = 0;

    const result = hasOverlap(board, piece, rowPos, colPos);

    expect(result).toBe(true);
  });

  it('should return true when the piece is partially off the board', () => {
    const board: Board = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    const piece: Piece = [
      [1, 1],
      [0, 1],
    ];
    const rowPos = 2;
    const colPos = 2;

    const result = hasOverlap(board, piece, rowPos, colPos);

    expect(result).toBe(true);
  });

  it('should return true when the piece overlaps with a filled square on the board', () => {
    const board: Board = [
      [0, 0, 0],
      [0, 1, 0],
      [0, 1, 0],
    ];
    const piece: Piece = [
      [1, 1],
      [0, 1],
    ];
    const rowPos = 0;
    const colPos = 0;

    const result = hasOverlap(board, piece, rowPos, colPos);

    expect(result).toBe(true);
  });
});

describe('convertPiece', () => {
  it('should convert a string representation of a chess piece into a 2D array of integers', () => {
    const pieceString = '.#.\n#.#\n.#.';
    const expectedPiece: Piece = [
      [1, 0, 1],
      [0, 1, 0],
      [1, 0, 1],
    ];
    const result = convertPiece(pieceString);
    expect(result).toEqual(expectedPiece);
  });

  it('should handle a string representation of a chess piece with all black squares', () => {
    const pieceString = '###\n###\n###';
    const expectedPiece: Piece = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    const result = convertPiece(pieceString);
    expect(result).toEqual(expectedPiece);
  });

  it('should handle a string representation of a chess piece with all white squares', () => {
    const pieceString = '...\n...\n...';
    const expectedPiece: Piece = [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ];
    const result = convertPiece(pieceString);
    expect(result).toEqual(expectedPiece);
  });

  it('should handle a string representation of a chess piece with a single square', () => {
    const pieceString = '.';
    const expectedPiece: Piece = [[1]];
    const result = convertPiece(pieceString);
    expect(result).toEqual(expectedPiece);
  });
});

describe('pieceValue', () => {
  it('returns 0 when given an undefined piece', () => {
    expect(pieceValue(undefined)).toBe(0);
  });

  it('returns the correct value for a given piece', () => {
    const piece: Piece = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
    ];
    expect(pieceValue(piece)).toBe(36);
  });

  it('returns the correct value for a piece with all squares valued at 0', () => {
    const piece: Piece = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    expect(pieceValue(piece)).toBe(0);
  });
});

describe('checkRows', () => {
  it('checkRows clears rows filled with 1', () => {
    const board: Board = [
      [1, 1, 1],
      [0, 0, 0],
      [1, 1, 1],
    ];
    const clearMethod = jest.fn();
    checkRows(board, clearMethod);
    expect(clearMethod).toHaveBeenCalledTimes(2);
    expect(clearMethod).toHaveBeenCalledWith(0);
    expect(clearMethod).toHaveBeenCalledWith(2);
  });

  it("checkRows doesn't clear rows not filled with 1", () => {
    const board: Board = [
      [1, 1, 0],
      [0, 0, 0],
      [1, 0, 1],
    ];
    const clearMethod = jest.fn();
    checkRows(board, clearMethod);
    expect(clearMethod).toHaveBeenCalledTimes(0);
  });
});

describe('checkColumns', () => {
  it('should not clear any columns if board is empty', () => {
    const board = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    const clearMethod = jest.fn();
    checkColumns(board, clearMethod);
    expect(clearMethod).not.toHaveBeenCalled();
  });

  it('should not clear any columns if none are full', () => {
    const board = [
      [0, 1, 1],
      [0, 1, 1],
      [0, 1, 1],
    ];
    const clearMethod = jest.fn();
    checkColumns(board, clearMethod);
    expect(clearMethod).toHaveBeenCalledTimes(2);
    expect(clearMethod).toHaveBeenCalledWith(1);
    expect(clearMethod).toHaveBeenCalledWith(2);
  });

  it('should clear a full column', () => {
    const board = [
      [0, 1, 0],
      [1, 0, 1],
      [0, 1, 0],
    ];
    const clearMethod = jest.fn();
    checkColumns(board, clearMethod);
    expect(clearMethod).not.toHaveBeenCalled();
  });
});

describe('checkBlocks', () => {
  test('it should call clearMethod when a 3x3 block is found', () => {
    const board: Board = [
      [1, 1, 1, 0, 0, 0],
      [1, 1, 1, 0, 0, 0],
      [1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ];
    const clearMethod = jest.fn();
    checkBlocks(board, clearMethod);
    expect(clearMethod).toHaveBeenCalledTimes(1);
    expect(clearMethod).toHaveBeenCalledWith(0, 0);
  });

  test('it should call clearMethod when a 3x3 block is found 2', () => {
    const board: Board = [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1],
      [0, 0, 0, 1, 1, 1],
      [0, 0, 0, 1, 1, 1],
    ];
    const clearMethod = jest.fn();
    checkBlocks(board, clearMethod);
    expect(clearMethod).toHaveBeenCalledTimes(1);
    expect(clearMethod).toHaveBeenCalledWith(3, 3);
  });

  test('it should not call clearMethod when a 3x3 block is not found', () => {
    const board: Board = [
      [1, 1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [0, 0, 1, 1, 0, 0],
      [0, 0, 1, 1, 0, 0],
      [0, 0, 0, 0, 1, 1],
      [0, 0, 0, 0, 1, 1],
    ];
    const clearMethod = jest.fn();
    checkBlocks(board, clearMethod);
    expect(clearMethod).not.toHaveBeenCalled();
  });

  test('it should handle boards with less than 3 columns', () => {
    const board: Board = [[1]];
    const clearMethod = jest.fn();
    checkBlocks(board, clearMethod);
    expect(clearMethod).not.toHaveBeenCalled();
  });

  test('it should handle boards with less than 3 rows', () => {
    const board: Board = [
      [1, 0],
      [0, 0],
    ];
    const clearMethod = jest.fn();
    checkBlocks(board, clearMethod);
    expect(clearMethod).not.toHaveBeenCalled();
  });
});
