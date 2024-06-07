"use client"

type Reply = {
  id: number;
  content: string;
  author: string;
  date: string;
  avatar: string;
};

type Comment = {
  id: number;
  content: string;
  author: string;
  date: string;
  avatar: string;
  replies?: Reply[];
};

const comments: Comment[] = [
  {
    id: 1,
    content: 'Harika bir yazı!',
    author: 'Ali Veli',
    date: '2024-06-01',
    avatar: 'https://i.pravatar.cc/150?img=1',
    replies: [
      {
        id: 1,
        content: 'Teşekkürler!',
        author: 'Ayşe Fatma',
        date: '2024-06-02',
        avatar: 'https://i.pravatar.cc/150?img=2',
      },
    ],
  },
  {
    id: 2,
    content: 'Çok bilgilendirici, teşekkürler!',
    author: 'Ayşe Fatma',
    date: '2024-06-02',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: 3,
    content: 'Daha fazla yazı bekliyoruz.',
    author: 'Mehmet Bey',
    date: '2024-06-03',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
];


import { useState } from 'react';

type ReplyProps = {
  reply: Reply;
};

const ReplyCard = ({ reply }: ReplyProps) => (
  <div className="flex items-start mb-4 ml-8 border-l-2 border-gray-300 pl-4">
    <img
      src={reply.avatar}
      alt={reply.author}
      className="w-8 h-8 rounded-full mr-3"
    />
    <div>
      <h5 className="text-md font-semibold">{reply.author}</h5>
      <p className="text-sm text-gray-500">{reply.date}</p>
      <p className="text-gray-700">{reply.content}</p>
    </div>
  </div>
);

type CommentCardProps = {
  comment: Comment;
  onReply: (commentId: number, replyContent: string) => void;
};

const CommentCard = ({ comment, onReply }: CommentCardProps) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (replyContent.trim()) {
      onReply(comment.id, replyContent);
      setReplyContent('');
      setShowReplyForm(false);
    }
  };

  return (
    <li className="p-4 border border-gray-300 rounded-md shadow-md bg-white hover:bg-gray-50 transition duration-300 ease-in-out transform hover:-translate-y-1">
      <div className="flex items-center mb-3 ">
        <img
          src={comment.avatar}
          alt={comment.author}
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <h4 className="text-lg font-semibold">{comment.author}</h4>
          <p className="text-sm text-gray-500">{comment.date}</p>
        </div>
      </div>
      <p className="text-gray-700 mb-3">{comment.content}</p>
      <button
        className="text-blue-500 hover:underline text-sm"
        onClick={() => setShowReplyForm(!showReplyForm)}
      >
        Yanıtla
      </button>
      {showReplyForm && (
        <form onSubmit={handleReplySubmit} className="mt-2">
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Yanıtınızı buraya yazın..."
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            rows={2}
          />
          <button
            type="submit"
            className="mt-2 mb-4 px-3 py-2 bg-orange-500 text-white rounded-md hover:bg-gray-600"
          >
            Yanıt Gönder
          </button>
        </form>
      )}
      {comment.replies && comment.replies.map((reply) => (
        <ReplyCard key={reply.id} reply={reply} />
      ))}
    </li>
  );
};

const CommentList = () => {
  const [commentList, setCommentList] = useState(comments);

  const handleReply = (commentId: number, replyContent: string) => {
    const newReply: Reply = {
      id: Date.now(),
      content: replyContent,
      author: 'Anonim',
      date: new Date().toISOString().split('T')[0],
      avatar: 'https://i.pravatar.cc/150?img=4',
    };
    const updatedComments = commentList.map((comment) =>
      comment.id === commentId
        ? { ...comment, replies: [...(comment.replies || []), newReply] }
        : comment
    );
    setCommentList(updatedComments);
  };

  return (
    <div className="w-full mx-auto my-4">
      <h3 className="text-xl font-bold mb-6">Yorumlar</h3>
      <ul className="space-y-6">
        {commentList.map((comment) => (
          <CommentCard key={comment.id} comment={comment} onReply={handleReply} />
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
