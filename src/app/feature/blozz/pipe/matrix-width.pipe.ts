import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'matrixWidth',
})
export class MatrixWidthPipe implements PipeTransform {
  public transform(value: number[][]): number[] {
    return value.reduce((acc, curr) => (curr.length > acc.length ? curr : acc), []);
  }
}
