import { Pipe, PipeTransform } from '@angular/core';
import { pieceWidth } from '@feature/blozz/module/deck/helper/deck.helper';

@Pipe({
  name: 'matrixWidth',
})
export class MatrixWidthPipe implements PipeTransform {
  public transform(value: number[][]): number[] {
    return pieceWidth(value);
  }
}
