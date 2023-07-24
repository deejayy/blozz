/* eslint-disable no-bitwise */
import { Pipe, PipeTransform } from '@angular/core';
import { HOVER_MATCH_STATE, HOVER_STATE, PLACE_STATE } from '@feature/blozz/module/board/model/board.model';

@Pipe({
  name: 'pieceState',
})
export class PieceStatePipe implements PipeTransform {
  public transform(value: number): unknown {
    const classList: string[] = [];

    if (value & PLACE_STATE) {
      classList.push('placed');
    }

    if (value & HOVER_STATE) {
      classList.push('hover');
    }

    if (value & HOVER_MATCH_STATE) {
      classList.push('hover-match');
    }

    return classList.join(' ');
  }
}
