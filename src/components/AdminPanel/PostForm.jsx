
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { criarPost } from "../../services/postService";

const PostForm = () => {
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagem, setImagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await criarPost({ titulo, conteudo, categoria, imagem, status: "publicado", dataPublicacao: new Date() });
    setTitulo("");
    setConteudo("");
    setCategoria("");
    setImagem("");
    window.dispatchEvent(new Event("post-criado"));
    alert("Post criado com sucesso!");
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Novo Post</h2>
      <div>
        <label className="block font-semibold mb-1">Título</label>
        <input type="text" className="w-full border rounded px-2 py-1" value={titulo} onChange={e => setTitulo(e.target.value)} required />
      </div>
      <div>
        <label className="block font-semibold mb-1">Conteúdo</label>
        <ReactQuill theme="snow" value={conteudo} onChange={setConteudo} />
      </div>
      <div>
        <label className="block font-semibold mb-1">Categoria</label>
        <input type="text" className="w-full border rounded px-2 py-1" value={categoria} onChange={e => setCategoria(e.target.value)} required />
      </div>
      <div>
        <label className="block font-semibold mb-1">Imagem (URL)</label>
        <input type="url" className="w-full border rounded px-2 py-1" value={imagem} onChange={e => setImagem(e.target.value)} />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Salvar</button>
    </form>
  );
};

export default PostForm;
