export class BuscaSequencial {

  static filtrar<T>(
    lista: T[],
    termo: string,
    campos: (keyof T)[]
  ): T[] {
    if (!termo || termo.trim() === '') {
      return lista;
    }

    const termoLower = termo.toLowerCase();
    const resultado: T[] = [];

    // Busca sequencial
    for (let i = 0; i < lista.length; i++) {
      for (const campo of campos) {
        const valor = String(lista[i][campo]).toLowerCase();

        if (valor.includes(termoLower)) {
          resultado.push(lista[i]);
          break;
        }
      }
    }

    return resultado;
  }
}