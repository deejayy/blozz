import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToArray',
})
export class NumberToArrayPipe implements PipeTransform {
  public transform(value: number): number[] {
    return Array.from({ length: value }, (_, i) => i);
  }
}
