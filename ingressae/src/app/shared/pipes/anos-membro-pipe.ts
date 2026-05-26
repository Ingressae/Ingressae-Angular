import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'anosMembro'
})
export class AnosMembroPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
