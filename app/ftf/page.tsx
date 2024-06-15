"use client"
import { useEffect } from "react";
/* 
export default function FTF() {
  useEffect(() => {
    const iframe = document.createElement('iframe');
    iframe.setAttribute('allow', 'camera; microphone');
    iframe.setAttribute('allowusermedia', '');
    iframe.setAttribute('src', 'https://ftf.live/app');
    iframe.className = `
      fixed inset-0 flex flex-row w-full h-full overflow-hidden z-50
    `; 
    document.body.appendChild(iframe);

    return () => {
      document.body.removeChild(iframe);
    };
  }, []);

  return null; 
}
 */



const frame = () => {
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

export default frame;