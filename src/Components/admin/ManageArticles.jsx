import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import EditArticleModal from './EditArticleModal';

const ManageArticles = () => {
  const [articles, setArticles] = useState([]);
  const [date, setDate] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      const articlesCollection = collection(db, 'articles');
      const articleDocs = await getDocs(articlesCollection);
      setArticles(articleDocs.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    
    fetchArticles();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'articles', id));
    setArticles(articles.filter(article => article.id !== id));
    toast.error('Article deleted successfully!');
  };

  const handleEdit = (article) => {
    setSelectedArticle(article);
    setIsEditing(true);
  };

  const closeEditModal = () => {
    setIsEditing(false);
    setSelectedArticle(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Manage Articles</h2>
      <div className="mb-2">
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2"
        />
      </div>
      <ul>
        {articles.filter(article => article.date === date).map(article => (
          <li key={article.id} className="flex justify-between items-center mb-2">
            <span>{article.title} ({article.date}) - Posted by: {article.postedBy}</span>
            <div>
              <button onClick={() => handleDelete(article.id)} className="bg-red-500 text-white p-1 mr-2">Delete</button>
              <button onClick={() => handleEdit(article)} className="bg-yellow-500 text-white p-1">Edit</button>
            </div>
          </li>
        ))}
      </ul>
     
      <EditArticleModal
        isOpen={isEditing} 
        onClose={closeEditModal} 
        article={selectedArticle} 
      />
      <ToastContainer />
    </div>
  );
};

export default ManageArticles;
