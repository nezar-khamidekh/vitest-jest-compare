import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'string', standalone: true })
export class StringPipe implements PipeTransform {
  transform(value: string): string {
    return value.toUpperCase();
  }
}
