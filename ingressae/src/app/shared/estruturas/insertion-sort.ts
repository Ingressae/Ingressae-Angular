export function insertionSort<T>(array: T[], comparar: (a: T, b: T) => number): T[] {
    const lista = [...array]; // não modifica o array original

    for (let i = 1; i < lista.length; i++) {
        const atual = lista[i];
        let j = i - 1;

        // Enquanto o elemento anterior for maior, empurra ele para frente
        while (j >= 0 && comparar(lista[j], atual) > 0) {
            lista[j + 1] = lista[j];
            j--;
        }

        // Encaixa o elemento na posição correta
        lista[j + 1] = atual;
    }

    return lista;
}