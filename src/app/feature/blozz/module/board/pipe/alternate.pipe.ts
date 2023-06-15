import { Pipe, PipeTransform } from '@angular/core';

const MINI_GRID_SIZE = 3;
const ODD = 2;

@Pipe({ name: 'alternate' })
export class AlternatePipe implements PipeTransform {
  public transform(value: [number, number]): string {
    return (Math.floor(value[0] / MINI_GRID_SIZE) % ODD === 0) !== (Math.floor(value[1] / MINI_GRID_SIZE) % ODD === 0) ? 'alternate' : '';
  }
}
