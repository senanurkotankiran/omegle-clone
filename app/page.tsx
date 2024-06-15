"use client"
import React from "react";
import Breadcrumb from "./components/breadcrumb/Breadcrumb";
import TestimonialsCarousel from "./components/home/TestimonialCarousel";
import Last4Blog from "./components/home/Last4Blog";
import Faqs from "./components/home/Faqs";
import Agreement from "./components/home/Agreement";
import Image from "next/image";
import CookieConsent from "./components/home/CookieConsent";
import Navbar from "./components/navbar/Navbar";
import Navbar2 from "./components/navbar2/Navbar2";
import Footer from "./components/footer/page";
import { useRouter } from "next/navigation";

export default function Home() {
  
  const router = useRouter();
  const handleClick = () => {
    router.push('/ftf')
  }
  return (
    <div>
      <div className="pt-4">
        <div className="fixed top-0 w-full z-10">
          <Navbar/>
        </div>
        <div className="mt-32 md:mt-16">
          <Navbar2/>
        </div>
      </div>
      <div className='ml-8 mt-4'>
        <Breadcrumb />
      </div>

      <div className="flex flex-col items-center justify-center">
        <Agreement />
        <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-8 text-white text-center">Omegle Online Video Chat</h1>
        <div className="w-full mx-auto mb-8 md:mb-16">
          <div className="bg-gray-800 bg-opacity-50 rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row justify-center items-center mx-auto max-w-3/4 p-4 md:p-8">
              <p className="text-white text-justify md:w-3/4 mb-4 md:mb-0 text-sm md:text-base">
              Omegle is a global platform where users can anonymously communicate with random individuals via video or text chat. This platform offers the opportunity to encounter people from different cultures and establish new friendships. Users can practice languages, enhance their social skills, and engage in exchanges of views from diverse perspectives worldwide. Omegle's anonymity allows users to communicate more freely and openly, while the platform prioritizes security and privacy. It safeguards users' personal information and provides a mechanism to report inappropriate behavior. In conclusion, Omegle is an ideal communication platform for those looking to have fun and gain a global perspective.
              </p>
              <div className="hidden md:block w-1/4 md:w-1/3 p-4 md:p-8">
                <Image src="/home2.webp" alt="blog" width={1000} height={100} />
              </div>
              <div className="md:hidden w-full p-4 md:p-8">
                <Image src="/home2.webp" alt="blog" width={1000} height={100} />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-screen-lg w-full mx-auto mb-8 md:mb-16">
          <Last4Blog />
        </div>

        <div className="max-w-screen-lg w-full mx-auto mb-8 md:mb-16">
          <Faqs />
        </div>

        <div className="max-w-screen-lg w-full mx-auto mb-8 md:mb-16">
          <p className="mt-16 flex justify-center text-3xl font-bold text-white">Referanslar</p>
          <TestimonialsCarousel />
        </div>

        <div className="w-full">
          <div className="bg-white bg-opacity-50 rounded-lg shadow-lg p-8">
            <h2 className="text-xl md:text-2xl font-extrabold mb-4 text-center">Connect Globally, Talk to Strangers Right Now!</h2>
            <div className="p-2 flex items-center justify-center">
            
                  <button onClick={handleClick} className="animate-bounce transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 flex items-center justify-center border-none bg-gradient-to-r from-indigo-500 via-blue-600 to-pink-500 text-l text-white h-14 md:h-16 w-72 md:w-72 rounded-full">
                    Start Chat
                  </button>
             
            </div>
            <p className="text-gray-800 text-center">Make New Friends Make New Friends Make New FriendsMake New FriendsMake New Friends</p>
          </div>
        </div>
      </div>

      {/* <div className="cookie-banner">
        <CookieConsent/>
      </div> */}
      <Footer/>
    </div>
  );
}
