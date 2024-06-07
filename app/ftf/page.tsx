"use client"
import { useEffect } from "react";

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
