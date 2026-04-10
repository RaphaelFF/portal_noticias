
import React, { useEffect, useState } from "react";
import { listarPosts, excluirPost } from "../../services/postService";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const lista = await listarPosts();
    setPosts(lista);
  };

  useEffect(() => {
    fetchPosts();
    window.addEventListener("post-criado", fetchPosts);
    return () => window.removeEventListener("post-criado", fetchPosts);
  }, []);

  const handleExcluir = async (id) => {
    await excluirPost(id);
    setPosts(posts.filter(post => post.id !== id));
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Lista de Posts</h2>
      {posts.length === 0 ? (
        <div className="border rounded p-4 text-gray-500">Nenhum post cadastrado ainda.</div>
      ) : (
        <ul>
          {posts.map(post => (
            <li key={post.id} className="border-b py-2 flex justify-between items-center">
              <span>{post.titulo}</span>
              <button onClick={() => handleExcluir(post.id)} className="text-red-600">Excluir</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostList;
