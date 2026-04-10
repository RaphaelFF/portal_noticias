// Modelo de dados para Manchete Principal
export default class Headline {
  constructor({ postId, ordem }) {
    this.postId = postId;
    this.ordem = ordem; // ordem de exibição na home
  }
}
