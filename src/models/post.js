// Modelo de dados para Post
export default class Post {
  constructor({ id, titulo, conteudo, categoria, imagem, status = "rascunho", dataPublicacao = null, autor = null }) {
    this.id = id;
    this.titulo = titulo;
    this.conteudo = conteudo;
    this.categoria = categoria;
    this.imagem = imagem;
    this.status = status;
    this.dataPublicacao = dataPublicacao;
    this.autor = autor;
  }
}
