export const rotateDirection = {
  RIGHT: 'right',
  LEFT: 'left',
} as const;

export type RotateDirection = (typeof rotateDirection)[keyof typeof rotateDirection];

export const PIECE_SET: string[] = [
  '.\n.\n..',
  '..\n.\n.',
  '..\n .\n .',
  ' .\n .\n..',
  '.',
  '.\n.',
  '.\n.\n.',
  '.\n.\n.\n.',
  '..',
  '...',
  '....',
  '..\n.',
  '..\n .',
  '.\n..',
  ' .\n..',
  '.\n..\n.',
  ' .\n..\n .',
  '...\n .',
  ' .\n...',
  '.\n..\n .',
  ' .\n..\n.',
  '..\n ..',
  ' ..\n..',
  '...\n.\n.',
  '...\n  .\n  .',
  '.\n.\n...',
  '  .\n  .\n...',
  '..\n..',
  '.\n...',
  '  .\n...',
  '...\n.',
  '...\n  .',
  '.\n .',
  '.\n .\n  .',
  '.\n .\n  .\n   .',
  ' .\n.',
  '  .\n .\n.',
  '   .\n  .\n .\n.',
  '. .\n...',
  '...\n. .',
  '..\n.\n..',
  '..\n .\n..',
  ' .\n...\n .',
];

export const TETRAMINOS_SET: string[] = ['....', '.\n...', '  .\n...', '..\n..', ' ..\n..', ' . \n...', '..\n ..'];

export const NULL_SET: string[] = [];

export const pieceSetVariants = {
  STANDARD: 'standard',
  TETRIS: 'tetris',
  EXTREME: 'extreme',
} as const;

export type PieceSetVariant = (typeof pieceSetVariants)[keyof typeof pieceSetVariants];

export const pieceSets: Record<PieceSetVariant, string[]> = {
  [pieceSetVariants.STANDARD]: PIECE_SET,
  [pieceSetVariants.TETRIS]: TETRAMINOS_SET,
  [pieceSetVariants.EXTREME]: NULL_SET,
};
