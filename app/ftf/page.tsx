"use client"
import { useEffect } from 'react';

const Frame = () => {
  useEffect(() => {
    // Her render işlemi sırasında iframe içeriği yüklenir
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <iframe
        src="https://ftf.live/tr/app"
        title="Video Chat"
        className="w-full h-full"
        allow="camera; microphone"
      />
    </div>
  );
};

export default Frame;