import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'number', standalone: true })
export class NumberPipe implements PipeTransform {
  transform(value: number): string {
    return value.toString();
  }
}
