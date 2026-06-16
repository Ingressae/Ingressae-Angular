import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagemClubeService {
  // Mapa de IDs dos clubes para imagens
  private mapeamentoImagens: { [key: string]: string } = {
    '1': 'assets/images/fa-clubes/the-weeknd.jpg',
    '2': 'assets/images/fa-clubes/coldplay.jpg',
    '3': 'assets/images/fa-clubes/taylor-swift.jpg',
    '4': 'assets/images/fa-clubes/bts.jpg',
    '5': 'assets/images/fa-clubes/iron-maiden.jpg',
    '6': 'assets/images/fa-clubes/linkin-park.jpg',
    '7': 'assets/images/fa-clubes/twicee.jpg',
    '8': 'assets/images/fa-clubes/billie-eilish.jpg',
    '9': 'assets/images/fa-clubes/falcao.jpg',
  };

  /**
   * Obtém a URL da imagem de um clube
   * @param clubeId ID do clube
   * @returns URL da imagem ou undefined se não encontrada
   */
  obterImagemClube(clubeId: string): string | undefined {
    return this.mapeamentoImagens[clubeId];
  }

  /**
   * Registra uma nova imagem para um clube
   * @param clubeId ID do clube
   * @param caminhoImagem Caminho da imagem (ex: 'assets/images/fa-clubes/nome.jpg')
   */
  registrarImagem(clubeId: string, caminhoImagem: string): void {
    this.mapeamentoImagens[clubeId] = caminhoImagem;
  }

  /**
   * Retorna todos os mapeamentos (útil para debug)
   */
  obterTodosMapeamentos(): { [key: string]: string } {
    return { ...this.mapeamentoImagens };
  }
}
