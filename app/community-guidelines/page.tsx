"use client"
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '../components/navbar/Navbar';
import Navbar2 from '../components/navbar2/Navbar2';
import Footer from '../components/footer/page';
import 'react-quill/dist/quill.snow.css'; // Quill editor styles

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const CommunityGuidelines = () => {
    interface ITermsOfService {
        _id: string;
        description: string;
        text: string;
        author: string;
    }

    const [communityGuidelines, setCommunityGidelines] = useState<ITermsOfService[]>([]);

    useEffect(() => {
        const fetchCommunityGidelines = async () => {
            const res = await fetch('/api/communityguidelines');
            const data = await res.json();
            setCommunityGidelines(data);
        };

        fetchCommunityGidelines();
    }, []);

    return (
        <div>
            <head>
                <title>Terms Of Service - Omegle</title>
                <meta name="description" content="Omegle is a great place to meet new friends. When you use Omegle, we pick another user at random and let you have a one-on-one chat with each other." />
            </head>
            <div className="pt-4">
                <div className="fixed top-0 w-full z-10">
                    <Navbar />
                </div>
                <div className="mt-14 md:mt-16">
                    <Navbar2 />
                </div>
            </div>
            <div className="flex flex-col items-center justify-center mt-8">
                <div className="min-h-screen">
                    <main className="max-w-4xl mx-auto">
                        <div className="text-center">
                            {communityGuidelines.map(item => (
                                <div key={item._id}>
                                    <h1 className="text-5xl font-bold mb-8">Community Guidelines</h1>
                                    <p className="text-xl text-black mb-12 text-left">{item.description}</p>
                                    <div className="bg-white rounded-lg shadow-lg p-12 mb-16 flex flex-col items-center w-full">
                                        <ReactQuill
                                            value={item.text}
                                            readOnly={true}
                                            theme="snow"
                                            modules={{
                                                toolbar: false,
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </main>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default CommunityGuidelines;
