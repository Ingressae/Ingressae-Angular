import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipoFila'
})
export class TipoFilaPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
