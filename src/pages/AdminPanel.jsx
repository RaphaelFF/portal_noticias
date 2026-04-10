import React from "react";
import PostList from "../components/AdminPanel/PostList";
import PostForm from "../components/AdminPanel/PostForm";
import HeadlineSelector from "../components/AdminPanel/HeadlineSelector";

const AdminPanel = () => {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Painel Administrativo</h1>
      <div className="mb-8">
        <PostForm />
      </div>
      <div className="mb-8">
        <PostList />
      </div>
      <div className="mb-8">
        <HeadlineSelector />
      </div>
    </div>
  );
};

export default AdminPanel;
