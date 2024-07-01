"use client"
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';  // react-slick kütüphanesini içe aktarıyoruz

// Yorumların tipini belirten arayüz
type Testimonial = {
  _id: string;
  text: string;
  author: string;
};



const TestimonialsCarousel: React.FC = () => {


  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch('/api/testimonials');
      const data = await res.json();
      setTestimonials(data);

    };

    fetchCategories();
  }, []);
  // Slider ayarları
  const settings = {
    dots: true, // Altta noktalar gösterilsin mi?
    infinite: true, // Sonsuz döngü modunda mı?
    speed: 500, // Geçiş hızı (ms)
    slidesToShow: 3, // Gösterilecek slide sayısı
    slidesToScroll: 1, // Kaydırıldığında kaç slide ilerlesin?
    autoplay: true, // Otomatik kaydırma açık mı?
    autoplaySpeed: 3000, // Otomatik kaydırma hızı (ms)
    responsive: [ // Farklı ekran boyutları için ayarlar
      {
        breakpoint: 1024, // 1024px genişlik ve altı için
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600, // 600px genişlik ve altı için
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto py-4 px-8 pb-12"> 
      <Slider {...settings}>
        {testimonials.map((testimonial) => (
          <div key={testimonial._id} className="p-4">
            <div className="bg-gray-800 bg-opacity-75 text-white p-6 rounded-lg shadow-lg">
              <p className="text-lg italic font-bold">{testimonial.text}</p>
              <p className="text-right mt-4">- {testimonial.author}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TestimonialsCarousel;
