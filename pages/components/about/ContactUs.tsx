"use client"
import React, { useEffect, useState } from 'react'

const ContactUs = () => {
    const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form gönderme işlemini burada gerçekleştirin
    setShowToast(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000); 
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div className="relative flex flex-col items-center justify-center bg-gray-800 opacity-75 p-8">
      <div className="flex flex-col md:flex-row items-center justify-center">
        <h2 className="text-3xl font-bold text-white mb-6 md:mr-12">Contact Us</h2>
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-96 h-12 px-4 mb-4 rounded-full outline-none"
            required
          />
          <input
            type="email"
            placeholder="Your E-mail Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-96 h-12 px-4 mb-4 rounded-full outline-none"
            required
          />
          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-96 h-32 px-4 mb-4 rounded-lg outline-none"
            required
          ></textarea>
          <button
            type="submit"
            className="w-72 h-12 bg-gradient-to-r from-indigo-500 via-blue-600 to-pink-500 text-lg text-white font-semibold rounded-full transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300"
          >
            Send
          </button>
        </form>
      </div>
      {showToast && (
        <div className="absolute top-4 left-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg">
          Message sent succesfully!
          <div className="relative mt-2 h-1 bg-white">
            <div className="absolute top-0 left-0 h-1 bg-gray-700 animate-progress "></div>
          </div>
        </div>
      )}
      <style jsx>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
        .animate-progress {
          animation: progress 3s linear forwards;
        }
      `}</style>
    </div>
  )
}

export default ContactUs