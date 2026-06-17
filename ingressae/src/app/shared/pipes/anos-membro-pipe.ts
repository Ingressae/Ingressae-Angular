import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'anosMembro'
})
export class AnosMembroPipe implements PipeTransform {

  transform(anos: number): string {
    return `Membro há ${anos} ano${anos !== 1 ? 's' : ''}`;
  }

}
