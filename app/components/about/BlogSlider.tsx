"use client"
import { useState, useEffect } from 'react';

const Slider: React.FC = () => {
    const [slides, setSlides] = useState<string[]>([]);

    useEffect(() => {
        const fetchRandomImages = async () => {
            try {
                const response = await fetch('https://picsum.photos/v2/list?page=1&limit=3');
                if (response.ok) {
                    const data = await response.json();
                    const imageUrls = data.map((image: any) => image.download_url);
                    setSlides(imageUrls);
                } else {
                    console.error('Failed to fetch images');
                }
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchRandomImages();
    }, []);

    return (
        <div className="w-full h-64 relative overflow-hidden">
            {slides.map((slide, index) => (
                <img
                    key={index}
                    src={slide}
                    alt={`Slide ${index + 1}`}
                    className="absolute top-0 left-0 w-full h-full transition-opacity duration-500 opacity-100"
                />
            ))}
        </div>
    );
};

export default Slider;
