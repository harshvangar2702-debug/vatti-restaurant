import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import Bruschetta from '../assets/Bruschetta.png';
import CaesarSalad from '../assets/Caesar Salad.png';
import Espresso from '../assets/Espresso.png';
import Family from '../assets/family.jpeg';
import Hotel from '../assets/hotel.jpeg';
import MargheritaPizza from '../assets/Margherita Pizza.png';
import SpaghettiCarbonara from '../assets/Spaghetti Carbonara.png';
import Tiramisu from '../assets/Tiramisu.png';


interface IGalleryItem {
  _id: string;
  imageUrl: string;
  title?: string;
}

const Gallery = () => {
  const [images, setImages] = useState<IGalleryItem[]>([]);

  useEffect(() => {
    const mockImages: IGalleryItem[] = [
      { _id: "1", imageUrl: Bruschetta, title: "Bruschetta" },
      { _id: "2", imageUrl: CaesarSalad, title: "Caesar Salad" },
      { _id: "3", imageUrl: Espresso, title: "Espresso" },
      { _id: "4", imageUrl: Family, title: "Family Dining" },
      { _id: "5", imageUrl: Hotel, title: "Hotel Interior" },
      { _id: "6", imageUrl: MargheritaPizza, title: "Margherita Pizza" },
      { _id: "7", imageUrl: SpaghettiCarbonara, title: "Spaghetti Carbonara" },
      { _id: "8", imageUrl: Tiramisu, title: "Tiramisu" },
    ];
    setImages(mockImages);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 5000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: 'linear',
    centerMode: true,
    centerPadding: '0',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <section id="gallery" className="py-24 bg-gradient-to-br from-[#FAF9F6] to-[#F5F5DC]">
      <div className="container mx-auto text-center">
        <h2 className="text-7xl font-bold mb-6 text-gray-800 font-modern-serif ">Gallery</h2>
        <p className="mb-12 text-2xl text-gray-600 font-modern-serif">A glimpse into our world.</p>
        <div className="px-8">
          <Slider {...settings}>
            {images.map((image) => (
              <div key={image._id} className="px-2">
                <div className="overflow-hidden rounded-lg shadow-lg">
                  <img src={image.imageUrl} alt={image.title} className="w-full h-96 object-cover" />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
