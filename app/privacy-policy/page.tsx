"use client"
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '../components/navbar/Navbar';
import Navbar2 from '../components/navbar2/Navbar2';
import Footer from '../components/footer/page';
import 'react-quill/dist/quill.snow.css'; // Quill editor styles

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const PrivacyPolicy = () => {
    interface IPrivacyPolicy {
        _id: string;
        description: string;
        text: string;
        author: string;
    }

    const [privacyPolicies, setPrivacyPolicies] = useState<IPrivacyPolicy[]>([]);

    useEffect(() => {
        const fetchPrivacyPolicies = async () => {
            const res = await fetch('/api/privacypolicy');
            const data = await res.json();
            setPrivacyPolicies(data);
        };

        fetchPrivacyPolicies();
    }, []);




    const jsonLdWebSite = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Omegle",
        "url": "https://omegle-mu.vercel.app/privacy-policy",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://omegle-mu.vercel.app/search?q={search_term_string}",
            "query-input": "required name=search_term_string",
        },
    };

    const jsonLdOrganization = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Omegle",
        "url": "https://omegle-mu.vercel.app/privacy-policy",
        "logo": "https://omegle-mu.vercel.app/static/logo.png",
        "sameAs": [
            "https://www.facebook.com/Omegle",
            "https://twitter.com/Omegle",
            "https://www.instagram.com/Omegle",
        ],
    };

    const jsonLdWebPage = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Omegle: Talk to Strangers",
        "description": "Omegle is just a great way to Video Chat with Girls, meet new people and have a fun time omegle people.",
        "url": "https://omegle-mu.vercel.app/privacy-policy",
    };

    const jsonLdBreadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://omegle-mu.vercel.app",
            }, {
                "@type": "ListItem",
                "position": 2,
                "name": "Privacy Policy",
                "item": "https://omegle-mu.vercel.app/privacy-policy",
            },
        ],
    };


    const canonicalUrl = 'https://omegle-mu.vercel.app/privacy-policy';


    return (
        <div>
            <head>
                <title>Privacy Policy - Omegle</title>
                <meta name="description" content="This Privacy Policy describes how [www-omegle] collects, uses, and shares your personal information when you visit our website [https://www-omegle.com]." />
                <link rel="canonical" href={canonicalUrl} />


                <script
                    id="jsonLdWebSiteId"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
                />
                <script
                    id="jsonLdOrganizationId"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
                />
                <script
                    id="jsonLdWebPageId"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebPage) }}
                />
                {jsonLdBreadcrumb && (
                    <script
                        id="jsonLdBreadcrumbId"
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
                    />
                )}
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
                            <h1 className="text-5xl font-bold mb-8">PRIVACY POLICY</h1>
                            <p className="text-xl text-black mb-12 text-left">This Privacy Policy describes how [www-omegle] collects, uses, and shares your personal information when you visit our website [https://www-omegle.com].</p>
                            {privacyPolicies.map(item => (
                                <div key={item._id} className="bg-white rounded-lg shadow-lg p-12 mb-16 flex flex-col items-center w-full">
                                    <ReactQuill
                                        value={item.text}
                                        readOnly={true}
                                        theme="snow"
                                        modules={{
                                            toolbar: false,
                                        }}
                                    />
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

export default PrivacyPolicy;
