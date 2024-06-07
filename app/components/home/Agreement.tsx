import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Agreement = () => {
  return (
    <div className=" flex-auto justify-center items-center  m-24">
    <div className="bg-white rounded shadow-custom-inset p-6 pt-8 max-w-xl h-96 overflow-y-auto relative ">
      <p className="text-black text-left text-xs">You dont need an app to use Omegle on your phone or tablet! The web site works great on mobile.</p>
      <h2 className=" font-bold text-gray-800 mb-4 pt-8 text-center">Omegle: Talk to strangers!</h2>
      <p className="text-black text-left text-xs">
        Omegle (oh`meg`ull) is a great way to meet new friends. When you use Omegle, you are paired randomly with another person to talk one-on-one. If you prefer, you can add your interests and you’ll be randomly paired with someone who selected some of the same interests. To help you stay safe, chats are anonymous unless you tell someone who you are (not recommended!), and you can stop a chat at any time.

      </p>
      <div className="text-left mt-4 ">
        <p className="text-xs">
          <span className="font-bold text-sm ">YOU MUST BE 18 OR OLDER TO USE OMEGLE.</span> See Omegle’s Terms of Service for more info. Omegle Ban removal Parental control protections that may assist parents are commercially available and you can find more info at <a href="https://www.connectsafely.org/controls/" className="underline hover:text-gray-400">https://www.connectsafely.org/controls/</a> as well as other sites.
        </p>
      </div>

      <div className="mt-4 border-none bg-blue-200 p-2 flex items-center justify-center shadow-2xl w-full">
        <span className="font-extrabold text-base">Video is monitored. Keep it clean </span>
        <Image src={"/warning.png"} alt="Warning" width={25} height={25} />
      </div>
      <div className="text-xs mt-4">
        Leave Omegle and visit an adult site instead if that’s what you are looking for, and you are 18 or older.
      </div>
      <div className="sticky bottom-0 p-2 flex items-center justify-center bg-white w-full">
       
        <a 
                  href="https://ftf.live/app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <button className="flex items-center justify-center border-none bg-custom-gradient-1 text-l text-white h-10 w-72 rounded">
                    Start Chat
                  </button>
              </a>
      </div>
    </div>

  </div>
  )
}

export default Agreement