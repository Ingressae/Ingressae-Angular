import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipoFila'
})
export class TipoFilaPipe implements PipeTransform {

  transform(tipo: string): string {
    return tipo.toUpperCase() === 'PREFERENCIAL' ? 'Preferencial' : 'Normal';
  }
} 
