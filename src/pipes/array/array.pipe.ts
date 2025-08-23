import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'array', standalone: true })
export class ArrayPipe implements PipeTransform {
  transform(value: any[], field: string): any[] {
    return value?.sort((a, b) => a[field] - b[field]) ?? value;
  }
}
