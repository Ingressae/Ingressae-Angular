import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'markdown',
})
export class MarkdownPipe implements PipeTransform {
  transform(texto: string): string {
    if (!texto) {
      return '';
    }

    texto = this.processar(texto, '*', 'strong');
    texto = this.processar(texto, '_', 'em');
    texto = this.processar(texto, '~~', 'del');
    texto = this.processar(texto, '`', 'code');

    return texto.replace(/\n/g, '<br>');
  }

  private processar(texto: string, marcador: string, tag: string): string {
    const partes = texto.split(marcador);

    if (partes.length <= 1) {
      return texto;
    }

    let resultado = partes[0];

    for (let i = 1; i < partes.length; i++) {
      const ultimo = i === partes.length - 1;
      const aberto = i % 2 !== 0;

      if (aberto) {
        if (ultimo) {
          resultado += `<${tag}>${partes[i]}</${tag}>`;
        } else {
          resultado += `<${tag}>${partes[i]}</${tag}>`;
        }
      } else {
        resultado += partes[i];
      }
    }

    return resultado;
  }
}
