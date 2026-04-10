// src/services/postService.js
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

const POSTS_COLLECTION = "posts";

export async function criarPost(post) {
  const docRef = await addDoc(collection(db, POSTS_COLLECTION), post);
  return docRef.id;
}

export async function listarPosts() {
  const querySnapshot = await getDocs(collection(db, POSTS_COLLECTION));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function atualizarPost(id, dados) {
  const postRef = doc(db, POSTS_COLLECTION, id);
  await updateDoc(postRef, dados);
}

export async function excluirPost(id) {
  const postRef = doc(db, POSTS_COLLECTION, id);
  await deleteDoc(postRef);
}
