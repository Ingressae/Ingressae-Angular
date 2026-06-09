export class QuickSort {
  static sort<T>(array: T[], compare: (a: T, b: T) => number): T[] {
    const copia = [...array];

    this.quickSort(copia, 0, copia.length - 1, compare);

    return copia;
  }

  private static quickSort<T>(
    array: T[],
    inicio: number,
    fim: number,
    compare: (a: T, b: T) => number,
  ): void {
    if (inicio < fim) {
      const indicePivo = this.particionar(array, inicio, fim, compare);

      this.quickSort(array, inicio, indicePivo - 1, compare);
      this.quickSort(array, indicePivo + 1, fim, compare);
    }
  }

  private static particionar<T>(
    array: T[],
    inicio: number,
    fim: number,
    compare: (a: T, b: T) => number,
  ): number {
    const pivo = array[fim];

    let i = inicio - 1;

    for (let j = inicio; j < fim; j++) {
      if (compare(array[j], pivo) <= 0) {
        i++;

        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    [array[i + 1], array[fim]] = [array[fim], array[i + 1]];

    return i + 1;
  }
}
