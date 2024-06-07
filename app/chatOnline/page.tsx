import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Breadcrumb from '../components/breadcrumb/Breadcrumb'

const ChatOnline = () => {
  return (

    <div className="min-h-screen ">
 <div className='ml-8 mt-4'>
      <Breadcrumb/>

      </div>





      <main className="max-w-4xl mx-auto py-8">
        <h1 className='font-semibold text-center pb-12 text-4xl '>Online</h1>



        <div className="bg-white rounded-lg shadow-2xl p-12 mb-16 flex flex-col items-center">
          <div className="flex justify-center w-full mb-4">
            <Image src='/omegleFun.png' alt='Fun' width={700} height={700} className="rounded-lg" />
          </div>
          <div className="text-left w-full ">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Omegle: Talk to strangers!</h2>
            <p className="text-gray-600 mb-12 p-2">Connect with new friends online – its an exciting opportunity, its a fresh connection every time. Dive into Omegle now!</p>
            
            <div className=" flex items-center justify-center bg-white w-full">
                  <Link href={"/"} className="w-full animate-bounce transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 flex items-center justify-center border-none bg-gradient-to-r from-indigo-400 via-blue-400 to-red-400 text-l text-white h-16 rounded-full">
                    Start Chat
                  </Link>
                </div>
            
            <ul className="list-disc list-inside rounded-lg shadow-inner m-8">
              <li className="mb-2">
                <a href="https://www.omegle.fun/" className="text-blue-500 underline hover:text-blue-700">Go to https://www.omegle.fun/</a>
              </li>
              <li className="mb-2">Choose your age and gender.</li>
              <li className="mb-2">Click Text or Video.</li>
              <li className="mb-2">Enjoy instant, fun chats!</li>
            </ul>

          
          </div>
        </div>








      </main>
    </div>
  )
}

export default ChatOnline