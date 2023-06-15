import { convertPiece } from '@feature/blozz/module/board/helper/board.helper';
import { BOX_SIZE, Coord, Piece, TOUCH_DISTANCE } from '@feature/blozz/module/board/model/board.model';
import { PIECE_SET } from '@feature/blozz/module/deck/model/piece-set';

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

export const generatePiece = (): Piece => {
  return convertPiece(PIECE_SET[Math.floor(Math.random() * PIECE_SET.length)]!);
};
