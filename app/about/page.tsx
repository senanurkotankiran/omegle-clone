"use client"
import Image from 'next/image'
import React from 'react'
import Breadcrumb from '../components/breadcrumb/Breadcrumb'
import Link from 'next/link'

const About = () => {

  return (

    <div className="min-h-screen">
      <div className='ml-8 mt-4'>
        <Breadcrumb />
      </div>
      <main>
        <div className="flex flex-col lg:flex-row justify-center items-center w-full mb-4 mt-8 p-4">
          <div className="lg:w-1/2 flex justify-center mb-8 lg:mb-0">
            <Image src='/about1.png' alt='Fun' width={700} height={700} className="rounded-lg" />
          </div>
          <div className="text-left max-w-2xl lg:pl-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Connecting the World</h1>
            <p className="text-white text-lg md:text-xl text-justify mb-6">
              With the power of technology, we bring people together from all corners of the globe. By providing the ability to have face-to-face conversations with your loved ones at any moment, we eliminate distances.
            </p>
            <div className="p-2">
              

              <a 
                  href="https://ftf.live/app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <button  className="transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 flex items-center justify-center border-none bg-gradient-to-r from-indigo-500 via-blue-600 to-pink-500 text-l text-white h-14 w-72 rounded-full">
                    Start Chat
                  </button>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center w-full space-y-4 sm:space-y-0 sm:space-x-8 p-4 pr-8 pl-8 lg:pr-16 lg:pl-16">
          <div className="flex items-center bg-gray-800 bg-opacity-65 p-8 rounded-lg w-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 mr-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 11V6c0-3 2-5 5-5s5 2 5 5v5m-5 12a7 7 0 100-14 7 7 0 000 14zm0-8v4m0-3a1 1 0 100-2 1 1 0 000 2z"></path>
            </svg>
            <div>
              <h2 className="text-lg font-bold text-white mb-2">Güvenli</h2>
              <p className="text-white">
                Tüm bilgileriniz tarafımızca korunur ve şifrelenir.
              </p>
            </div>
          </div>
          <div className="flex items-center bg-gray-800 bg-opacity-65 p-8 rounded-lg w-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 752 752" className="w-8 h-8 mr-4 text-white" fill="currentColor">
              <defs><clipPath id="a"><path d="M139.21 139.21h473.58v473.58H139.21z"></path></clipPath></defs>
              <g clipPath="url(#a)">
                <path fillRule="evenodd" d="M549.27 297.07h63.523v39.465h-473.58V297.07h63.523l39.465-157.86h267.61zM273.01 178.68l-29.598 118.39h265.18L478.99 178.68zm65.453 266c11.332-6.133 24.172-9.48 37.535-9.48 13.367 0 26.207 3.347 37.539 9.48 19.402-29.484 52.789-48.945 90.723-48.945 59.941 0 108.53 48.59 108.53 108.53 0 59.941-48.59 108.53-108.53 108.53-59.938 0-108.53-48.59-108.53-108.53 0-7.824.828-15.461 2.402-22.816-6.425-4.363-14.074-6.781-22.137-6.781s-15.71 2.418-22.133 6.781a108.955 108.955 0 012.403 22.816c0 59.941-48.59 108.53-108.53 108.53-59.938 0-108.53-48.59-108.53-108.53 0-59.938 48.59-108.53 108.53-108.53 37.938 0 71.324 19.461 90.727 48.945zm165.8 128.65c38.145 0 69.066-30.922 69.066-69.066 0-38.141-30.922-69.062-69.066-69.062-38.141 0-69.062 30.922-69.062 69.062 0 38.145 30.922 69.066 69.062 69.066zm-256.52 0c38.145 0 69.066-30.922 69.066-69.066 0-38.141-30.922-69.062-69.066-69.062-38.141 0-69.062 30.922-69.062 69.062 0 38.145 30.922 69.066 69.062 69.066z"></path>
              </g>
            </svg>
            <div>
              <h2 className="text-lg font-bold text-white mb-2">Gizli</h2>
              <p className="text-white">
                Sistem içerisinde tamamen gizli kalırsınız ve eşleşme içeriği asla kaydedilmez.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center w-full space-y-4 sm:space-y-0 sm:space-x-8 mt-4 p-4 pr-8 pl-8 lg:pr-16 lg:pl-16">
          <div className="flex items-center bg-gray-800 bg-opacity-65 p-8 rounded-lg w-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 mr-4 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.29 10.29l-2.78 2.78A2.09 2.09 0 0012 13a2 2 0 00-2 2 2.09 2.09 0 00.07.51l-.78.78a1 1 0 000 1.42 1 1 0 001.42 0l.78-.78A2.09 2.09 0 0012 17a2 2 0 002-2 2.09 2.09 0 00-.07-.51l2.78-2.78a1 1 0 00-1.42-1.42zM12 4A10 10 0 002 14a9.91 9.91 0 001.69 5.56 1 1 0 001.66-1.12 8 8 0 1113.3 0 1 1 0 00.27 1.39 1 1 0 00.56.17 1 1 0 00.83-.44A9.91 9.91 0 0022 14 10 10 0 0012 4z"></path>
            </svg>
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Hızlı</h2>
              <p className="text-white">Eşleştirme sistemi çok hızlıdır ve en son teknolojiler ile geliştirilmiştir.</p>
            </div>
          </div>
          <div className="flex items-center bg-gray-800 bg-opacity-65 p-8 rounded-lg w-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-8 h-8 mr-4 text-white" fill="currentColor">
              <g data-name="Layer 2" id="Layer_2">
                <path d="M27,4H22.34a4,4,0,0,0-7.68,0H10.6l-4,8H3A1,1,0,0,0,2,13V26a4,4,0,0,0,4,4H26a4,4,0,0,0,4-4V13A1,1,0,0,0,29,12H26ZM16,4a2,2,0,1,1-2,2A2,2,0,0,1,16,4ZM4,14H8V17H4Zm24,0v3H24V14Zm-9.11,9.86a3.93,3.93,0,0,1-2.83,1.17A4,4,0,1,1,20,21.69,4,4,0,0,1,18.89,23.86ZM10.6,6h2.06A3.94,3.94,0,0,0,16,8a4,4,0,0,0,3.34-2H21.4l3,6H7.6ZM10,21.6a4,4,0,0,1,5.6-3.6A3.89,3.89,0,0,1,16,18a3.89,3.89,0,0,1,.4,0A4,4,0,0,1,22,23.6,4,4,0,0,1,10,21.6ZM4,20H8v4H6A2,2,0,0,1,4,22Zm22,6H10.78a5.87,5.87,0,0,0,3.61-2H26A2,2,0,0,1,24,26Z"></path>
              </g>
            </svg>
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Eşleşme</h2>
              <p className="text-white">
                5 saniye içerisinde eşleşme garantisi. Saniyeler içinde sohbet etmeye başlayabilirsiniz.
              </p>
            </div>
          </div>
        </div>


        <div className="flex flex-col lg:flex-row justify-center items-center w-full mb-4 mt-8 p-4">
          <div className="lg:w-1/2 flex justify-center mb-8 lg:mb-0 lg:order-2">
            <Image src='/about2.png' alt='Fun' width={700} height={700} className="rounded-lg" />
          </div>
          <div className="text-left max-w-2xl lg:w-1/2 lg:pl-8 lg:order-1">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Connecting the World</h1>
            <p className="text-white text-lg md:text-xl text-justify mb-6">
              With the power of technology, we bring people together from all corners of the globe. By providing the ability to have face-to-face conversations with your loved ones at any moment, we eliminate distances.
            </p>
            <div className="p-2">
            <a 
                  href="https://ftf.live/app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <button  className="transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 flex items-center justify-center border-none bg-gradient-to-r from-indigo-500 via-blue-600 to-pink-500 text-l text-white h-14 w-72 rounded-full">
                    Start Chat
                  </button>
              </a>
            </div>
          </div>
        </div>



      </main>
      
      <div className="flex flex-col items-center justify-center mt-12 bg-gray-800 opacity-75 p-8">
        <div className="flex flex-col md:flex-row items-center justify-center">
          <h2 className="text-3xl font-bold text-white mb-6 md:mr-12">Contact Us</h2>
          <div className="flex flex-col items-center justify-center">
            <input
              type="text"
              placeholder="Your Name"
              className="w-96 h-12 px-4 mb-4 rounded-full outline-none"
            />
            <input
              type="email"
              placeholder="Your E-mail Address"
              className="w-96 h-12 px-4 mb-4 rounded-full outline-none"
            />
            <textarea
              placeholder="Your Message"
              className="w-96 h-32 px-4 mb-4 rounded-lg outline-none"
            ></textarea>
            <button className="w-72 h-12 bg-gradient-to-r from-indigo-500 via-blue-600 to-pink-500 text-lg text-white font-semibold rounded-full transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300">
              Send
            </button>
          </div>
        </div>


      </div>

    </div>
  )
}



export default About