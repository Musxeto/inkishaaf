import React, { useState } from 'react';
import { db } from '../../firebase'; // Adjust the import path as necessary
import { collection, addDoc } from 'firebase/firestore';
import { storage } from '../../firebase'; // Adjust the import path for storage
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ToastContainer } from 'react-toastify';

const NewArticle = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState([]);
  const [date, setDate] = useState('');
  const [postedBy, setPostedBy] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddContent = () => {
    setContent([...content, { type: 'heading', text: '' }]);
  };

  const handleRemoveContent = (index) => {
    setContent(content.filter((_, i) => i !== index));
  };

  const handleContentChange = (index, field, value) => {
    const newContent = content.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setContent(newContent);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newArticle = {
      title,
      content,
      date,
      postedBy,
    };

    try {
      await addDoc(collection(db, 'articles'), newArticle);
      console.log('Article added successfully!');

      // Reset form
      setTitle('');
      setContent([]);
      setDate('');
      setPostedBy('');
    } catch (error) {
      console.error('Error adding article: ', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (index, file) => {
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    handleContentChange(index, 'text', url); // Store the image URL in content
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 text-white p-6 rounded shadow-md">
      <h2 className="text-lg font-bold mb-4">New Article</h2>
      <div className="mb-4">
        <label className="block mb-1">Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-600 p-2 w-full bg-gray-700 text-white"
          required
        />
      </div>

      {content.map((item, index) => (
        <div key={index} className="flex items-center mb-4">
          <select
            value={item.type}
            onChange={(e) => handleContentChange(index, 'type', e.target.value)}
            className="border border-gray-600 p-2 mr-2 bg-gray-700 text-white"
          >
            <option value="heading">Heading</option>
            <option value="subheading">Subheading</option>
            <option value="paragraph">Paragraph</option>
            <option value="image">Image</option>
            <option value="list">List</option>
          </select>
          {item.type === 'image' ? (
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(index, e.target.files[0])}
              className="border border-gray-600 p-2 w-full bg-gray-700 text-white"
              required
            />
          ) : (
            <input
              type="text"
              value={item.text}
              onChange={(e) => handleContentChange(index, 'text', e.target.value)}
              className="border border-gray-600 p-2 w-full bg-gray-700 text-white"
              required
            />
          )}
          <button
            type="button"
            onClick={() => handleRemoveContent(index)}
            className="ml-2 bg-red-600 text-white p-2 rounded"
          >
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddContent} className="bg-green-500 text-white p-2 mb-4 rounded">
        Add Content
      </button>
      
      <div className="mb-4">
        <label className="block mb-1">Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border border-gray-600 p-2 w-full bg-gray-700 text-white"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Posted By:</label>
        <input
          type="text"
          value={postedBy}
          onChange={(e) => setPostedBy(e.target.value)}
          className="border border-gray-600 p-2 w-full bg-gray-700 text-white"
          required
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white p-2 rounded">
        {loading ? 'Submitting...' : 'Submit Article'}
      </button>
      <ToastContainer />
    </form>
  );
};

export default NewArticle;
