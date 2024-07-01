"use client"
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Quill editor styles
import Head from 'next/head';
import Navbar from '@/app/components/navbar/Navbar';
import Navbar2 from '@/app/components/navbar2/Navbar2';
import Footer from '@/app/components/footer/page';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const TermsOfServices = () => {
    interface ITermsOfService {
        _id: string;
        description: string;
        text: string;
        author: string;
    }

    const [termsOfServices, setTermsOfServices] = useState<ITermsOfService[]>([]);

    useEffect(() => {
        const fetchTermsOfServices = async () => {
            const res = await fetch('/api/termsofservice');
            const data = await res.json();
            setTermsOfServices(data);
        };

        fetchTermsOfServices();
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
        "url": "https://omegle-mu.vercel.app/terms-of-service",
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
        "url": "https://omegle-mu.vercel.app/terms-of-service",
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
                "name": "Terms OF Service",
                "item": "https://omegle-mu.vercel.app/terms-of-service",
            },
        ],
    };

    const canonicalUrl = 'https://omegle-mu.vercel.app/terms-of-service';


    return (
        <div>
            <Head>
                <title>Terms Of Service - Omegle</title>
                <meta name="description" content="Terms Of Service" />
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
            </Head>
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
                            {termsOfServices.map(item => (
                                <div key={item._id}>
                                    <h1 className="text-5xl font-bold mb-8">Terms Of Service</h1>
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

export default TermsOfServices;
