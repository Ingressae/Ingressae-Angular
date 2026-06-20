export class Pilha<T> {

  private itens: T[] = [];

  empilhar(item: T): void {
    this.itens.push(item);
  }

  desempilhar(): T | undefined {
    return this.itens.pop();
  }

  topo(): T | undefined {
    return this.itens[this.itens.length - 1];
  }

  vazia(): boolean {
    return this.itens.length === 0;
  }

  tamanho(): number {
    return this.itens.length;
  }

  limpar(): void {
    this.itens = [];
  }

  listar(): T[] {
    return [...this.itens];
  }

}