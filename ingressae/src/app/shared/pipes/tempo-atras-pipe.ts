import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tempoAtras'
})
export class TempoAtrasPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
