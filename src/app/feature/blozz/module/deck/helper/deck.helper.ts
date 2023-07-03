import { convertPiece } from '@feature/blozz/module/board/helper/board.helper';
import { BOX_SIZE, Coord, Piece, TOUCH_DISTANCE } from '@feature/blozz/module/board/model/board.model';
import { PieceSetVariant, RotateDirection, pieceSetVariants, pieceSets, rotateDirection } from '@feature/blozz/module/deck/model/piece-set';

export const getTargetTouch = (event: TouchEvent): { targetX: number; targetY: number } => {
  const touch = event.targetTouches[0] ?? event.changedTouches[0];
  return {
    targetX: touch?.clientX ?? 0,
    targetY: touch?.clientY ?? 0,
  };
};

export const getTouchCoordsInPixel = (event: TouchEvent, startCoords: Coord) => {
  const touch = event.targetTouches[0] ?? event.changedTouches[0];
  const targetX = touch?.clientX ?? 0;
  const targetY = touch?.clientY ?? 0;

  return {
    x: targetX - startCoords.x,
    y: targetY - startCoords.y - TOUCH_DISTANCE,
  };
};

export const getTouchCoords = (event: TouchEvent, relativeTo: Coord = { x: 0, y: 0 }, startCoords: Coord = { x: 0, y: 0 }) => {
  const { x, y } = getTouchCoordsInPixel(event, startCoords);
  return {
    col: Math.round((x - relativeTo.x) / BOX_SIZE),
    row: Math.round((y - relativeTo.y) / BOX_SIZE),
  };
};

export const pieceWidth = (value: number[][]) => value.reduce((acc, curr) => (curr.length > acc.length ? curr : acc), []);

export const generatePiece = (pieceSet: PieceSetVariant = pieceSetVariants.STANDARD): Piece => {
  const selectedPieceSet = pieceSets[pieceSet];
  if (pieceSet === pieceSetVariants.EXTREME) {
    return Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => Math.round(Math.random())));
  }

  return convertPiece(selectedPieceSet[Math.floor(Math.random() * selectedPieceSet.length)]!);
};

export const rotatePiece = (piece: Piece, direction: RotateDirection = rotateDirection.RIGHT): Piece => {
  const transpose = (m: Piece): Piece => m[0]!.map((_, i) => m.map((x) => x[i]!).reverse());

  if (direction === rotateDirection.RIGHT) {
    return transpose(piece);
  }

  console.error('Not implemented');
  return piece;
};
