import { convertPiece } from '@feature/blozz/module/board/helper/board.helper';
import { BOX_SIZE, Coord, Piece, TOUCH_DISTANCE } from '@feature/blozz/module/board/model/board.model';
import { RotateDirection, pieceSets, rotateDirection } from '@feature/blozz/module/deck/model/piece-set';
import { GameMode, gameModes } from '@feature/blozz/module/settings/model/settings.model';

const ROTATION_AMOUNT = 3;

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

export const rotatePiece = (piece: Piece, direction: RotateDirection = rotateDirection.RIGHT): Piece => {
  const transpose = (m: Piece): Piece => m[0]!.map((_, i) => m.map((x) => x[i]!).reverse());

  if (direction === rotateDirection.RIGHT) {
    return transpose(piece);
  }

  console.error('Not implemented');
  return piece;
};

export const pieceWidth = (value: number[][]) => value.reduce((acc, curr) => (curr.length > acc.length ? curr : acc), []);

export const randomizedPiece = () => {
  return Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => Math.round(Math.random())));
};

export const generatePieces = (amount: number, gameMode: GameMode) => {
  const selectedPieceSet = [...pieceSets[gameMode]];
  return Array.from({ length: amount }, () => {
    if (gameMode === gameModes.EXTREME) {
      return randomizedPiece();
    }

    const pieceIndex = Math.floor(Math.random() * selectedPieceSet.length);
    const pickedPiece = selectedPieceSet.splice(pieceIndex, 1)[0] ?? '.';

    return convertPiece(pickedPiece);
  }).map((piece: Piece) => {
    let newPiece = piece;
    Array.from({ length: Math.round(Math.random() * ROTATION_AMOUNT) }, () => (newPiece = rotatePiece(newPiece)));
    return newPiece;
  });
};
