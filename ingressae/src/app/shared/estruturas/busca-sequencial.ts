/**
 * Classe de Busca Sequencial
 * Implementa o algoritmo de busca sequencial para filtrar elementos
 * mantendo a ordem original de relevância
 */
export class BuscaSequencial {
  /**
   * Filtra um array de elementos por um termo de busca
   * @param lista Array de elementos a filtrar
   * @param termo Termo de busca
   * @param campo Campo do objeto a comparar
   * @returns Array filtrado mantendo a ordem original
   */
  static filtrar<T>(lista: T[], termo: string, campo: keyof T): T[] {
    if (!termo || termo.trim() === '') {
      return lista;
    }

    const termoLower = termo.toLowerCase();
    const resultado: T[] = [];

    // Busca sequencial: percorre a lista mantendo a ordem
    for (let i = 0; i < lista.length; i++) {
      const valor = String(lista[i][campo]).toLowerCase();
      
      // Verifica se o valor contém o termo
      if (valor.includes(termoLower)) {
        resultado.push(lista[i]);
      }
    }

    return resultado;
  }

  /**
   * Filtra um array de elementos por um termo que deve estar no início
   * @param lista Array de elementos a filtrar
   * @param termo Termo de busca
   * @param campo Campo do objeto a comparar
   * @returns Array filtrado mantendo a ordem original
   */
  static filtrarPorPrefixo<T>(lista: T[], termo: string, campo: keyof T): T[] {
    if (!termo || termo.trim() === '') {
      return lista;
    }

    const termoLower = termo.toLowerCase();
    const resultado: T[] = [];

    // Busca sequencial: percorre a lista mantendo a ordem
    for (let i = 0; i < lista.length; i++) {
      const valor = String(lista[i][campo]).toLowerCase();
      
      // Verifica se o valor começa com o termo
      if (valor.startsWith(termoLower)) {
        resultado.push(lista[i]);
      }
    }

    return resultado;
  }
}
