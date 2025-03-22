import { useState, useEffect, useCallback } from "react";
import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: "/styles/animations.css",
  },
];

export const meta: MetaFunction = () => {
  return [
    { title: "Aztro Travel" },
    { name: "description", content: "Encuentra tu próximo destino de viaje" },
  ];
};

export default function Index() {
  // Carousel state and functionality
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselImages = [
    "/img/Imagenes/1-paris.jpg",
    "/img/Imagenes/cartagena.jpg",
    "/img/Imagenes/interlaken.jpg",
    "/img/Imagenes/3-NewYork.jpg",
    "/img/Imagenes/Machu-Picchu.jpg",
    "/img/Imagenes/ibiza.jpg",
    "/img/Imagenes/Tulum.jpg",
    "/img/Imagenes/Londres.jpg",
    "/img/Imagenes/roma.jpg",
    "/img/Imagenes/innsbruck.jpg"
  ];

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
    );
  }, [carouselImages.length]);

  // Auto-advancement for carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <main className="flex flex-col min-h-screen bg-deep-blue">
      {/* Carousel Section */}
      <div className="w-full px-4 md:px-16 py-8 bg-[#000835]">
        <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-lg shadow-2xl">
          {/* Carousel images with transition */}
          {carouselImages.map((img, index) => (
            <div 
              key={index}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img 
                src={img} 
                alt={`Destination ${index + 1}`} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            </div>
          ))}
          
          {/* Controls */}
          <button 
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all z-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all z-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Indicator dots */}
          <div className="absolute bottom-4 w-full flex justify-center gap-2">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? 'bg-white scale-110' : 'bg-white bg-opacity-50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>

      {/* Main content section */}
      <section className="flex flex-col md:flex-row justify-center items-center p-[5px] w-full h-[70vh] bg-deep-blue">
        <div className="flex flex-col md:flex-row justify-center items-center m-[5px] p-[5px] w-full bg-[#000835]">
          <div 
            className="flex flex-col justify-end items-center m-[5px] p-[5px] w-full h-[35vh] md:h-[50vh] bg-light-blue bg-cover bg-center bg-no-repeat hover:opacity-90 cursor-pointer"
            style={{ backgroundImage: "url(/img/tiera.png)" }}
          >
            {/* Link wrapper for navigation */}
            <Link to="/profile" className="w-full h-full"></Link>
          </div>
          <div className="flex flex-col justify-center items-center text-center gap-[10%] m-[5%] p-[15px] w-full h-[50vh] bg-deep-blue text-white border-2 border-accent-blue rounded-lg shadow-lg">
  <h1 className="text-3xl font-bold text-accent-blue">Información</h1>
  <div className="max-w-2xl">
    <p className="text-justify text-lg">
      ¿Estás cansado de pasar horas buscando el destino perfecto para tu próximo viaje?
      ¿Te gustaría crear un viaje de acuerdo a tus preferencias y sin complicaciones?
    </p>
    <p className="mt-6 text-center">
      <span className="bg-accent-blue px-4 py-2 rounded-md inline-block font-bold animate-pulse">
        ¡Dale click a la imagen y prepárate para viajar!
      </span>
    </p>
  </div>
</div>
        </div>
      </section>
    </main>
  );
}