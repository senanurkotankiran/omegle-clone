"use client"
import { useState } from 'react';

const CommentForm = () => {
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      alert(`Yorum gönderildi: ${comment}`);
      setComment('');
    }
  };

  return (
    <div className='mt-12' >
      <h1 className="font-bold text-2xl text-center text-gray-800 mb-4 relative">
        Yorum Gönder
      </h1> 
        <form onSubmit={handleSubmit} className="w-full mx-auto my-4">

      <textarea
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Yorumunuzu buraya yazın..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={4}
      />
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-gray-600"
      >
        Yorum Yap
      </button>
    </form>
    </div>
   
  );
};

export default CommentForm;
