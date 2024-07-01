"use client"
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Quill editor styles
import Head from 'next/head';
import Navbar from '@/app/components/navbar/Navbar';
import Navbar2 from '@/app/components/navbar2/Navbar2';
import Footer from '@/app/components/footer/page';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const CommunityGuidelines = () => {
    interface ITermsOfService {
        _id: string;
        description: string;
        text: string;
        author: string;
    }

    const [communityGuidelines, setCommunityGuidelines] = useState<ITermsOfService[]>([]);

    useEffect(() => {
        const fetchCommunityGuidelines = async () => {
            const res = await fetch('/api/communityguidelines');
            const data = await res.json();
            setCommunityGuidelines(data);
        };

        fetchCommunityGuidelines();
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
        "url": "https://omegle-mu.vercel.app/community-guidelines",
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
        "url": "https://omegle-mu.vercel.app/community-guidelines",
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
                "name": "Community Guidelines",
                "item": "https://omegle-mu.vercel.app/community-guidelines",
            },
        ],
    };

    const canonicalUrl = 'https://omegle-mu.vercel.app/community-guidelines';

    return (
        <>
        
        <Head>
                <title>Community Guidelines - Omegle</title>
                <meta name="description" content="These guidelines are designed to help you create a website www-omegle.com that is informative, engaging, and easy to use. They cover a variety of topics, including: **Content **Design **SEO **Security" />
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
        <div>
          
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
        </>
        
    );
}

export default CommunityGuidelines;
