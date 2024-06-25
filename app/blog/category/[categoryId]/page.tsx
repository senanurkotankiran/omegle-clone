"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/app/components/navbar/Navbar';
import Navbar2 from '@/app/components/navbar2/Navbar2';
import Breadcrumb from '@/app/components/breadcrumb/Breadcrumb';
import Footer from '@/app/components/footer/page';

const Blog = () => {
    interface ICategoryItem {
        _id: string;
        name: string;
    }

    interface IBlogItem {
        _id: string;
        image: string;
        title: string;
        content: string;
        createdAt: string;
        categoryId: {
            _id: string;
        }
    }

    const [categories, setCategories] = useState<ICategoryItem[]>([]);
    const [blogs, setBlogs] = useState<IBlogItem[]>([]);
    const [filteredBlogs, setFilteredBlogs] = useState<IBlogItem[]>([]);

    const [selectedCategory, setSelectedCategory] = useState<ICategoryItem | null>(null);
    const router = useRouter();
    const params = useParams();
    const categoryId = params?.categoryId;

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('/api/categories');
                const data = await res.json();
                setCategories(data);
                console.log("Fetched categories:", data);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch('/api/blogs');
                const data = await res.json();
                const sortedBlogs = data.sort(
                    (a: IBlogItem, b: IBlogItem) =>
                        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
                setBlogs(sortedBlogs);
            } catch (error) {
                console.error("Failed to fetch blogs:", error);
            }
        };

        fetchBlogs();
    }, []);

    useEffect(() => {
        if (categoryId) {
            const category = categories.find((cat) => cat._id === categoryId) || null;
            setSelectedCategory(category);
            console.log("Selected category:", category);

            const filtered = blogs.filter((blog) => blog.categoryId?._id === categoryId);
            setFilteredBlogs(filtered);
            console.log("Filtered blogs:", filtered);
        }
    }, [categoryId, blogs, categories]);

    const truncateContent = (content: string, length: number) => {
        return content.length > length ? content.slice(0, length) + '...' : content;
    };
  
    return (
        <div className="min-h-screen">
            <div className="pt-4">
                <div className="fixed top-0 w-full z-10">
                    <Navbar />
                </div>
                <div className="mt-32 md:mt-16">
                    <Navbar2 />
                </div>
            </div>
            <div>
                <Image src="/blog6.webp" alt="foto" width={1800} height={900} className="mb-4 w-full h-200 opacity-65" />
            </div>

            <div className="ml-8 mt-4">
                <Breadcrumb title={selectedCategory?.name}/>
            </div>

            <main className="max-w-4xl mx-auto mb-4">
                <div className="text-left">
                    <h1 className="text-4xl md:text-5xl font-bold mb-12 mt-8 text-white text-center">Omegle Online Video Chat </h1>

                    <div className='uppercase flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 mb-8 px-3 md:px-10'>
                        {categories.map((item) => (
                            <div
                                key={item._id}
                                className='text-center text-lg text-white font-bold hover:text-gray-600 cursor-pointer'
                                onClick={() => {
                                    router.push(`/blog/category/${item._id}`);
                                }}
                            >
                                {item.name}
                            </div>

                        ))}

                        <div className='text-center text-lg text-white font-bold  hover:text-gray-600' onClick={() => {
                            router.push(`/blog/`);
                        }}> ALL BLOGS</div>

                    </div>

                    {selectedCategory ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {filteredBlogs.map((item) => (
                                <div
                                    key={item._id}
                                    onClick={() => router.push(`/blog/${item._id}`)}
                                    className="bg-white rounded-lg shadow-lg p-6 transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gray-200 duration-300 cursor-pointer"
                                >
                                    <Image
                                        src={item.image}
                                        alt='foto'
                                        width={250}
                                        height={250}
                                        className="mb-4 rounded border mx-auto"
                                    />
                                    <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">{item.title}</h2>
                                    <p className="text-gray-600 text-justify">
                                    {truncateContent(item.content, 50)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {blogs.map((item) => (
                                <div
                                    key={item._id}
                                    onClick={() => router.push(`/blog/category/${item._id}`)}
                                    className="bg-white rounded-lg shadow-lg p-6 transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gray-200 duration-300 cursor-pointer"
                                >
                                    <Image
                                        src={item.image}
                                        alt='foto'
                                        width={250}
                                        height={250}
                                        className="mb-4 rounded border mx-auto"
                                    />
                                    <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">{item.title}</h2>
                                    <p className="text-gray-600 text-justify">
                                    {truncateContent(item.content, 50)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Blog;
