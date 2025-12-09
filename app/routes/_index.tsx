import { useState, useEffect, useCallback } from "react";
import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";

import Footer from "~/components/Footer";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: "/styles/animations.css",
  },
];

export const meta: MetaFunction = () => {
  return [
    { title: "Flux Team" },
    { name: "description", content: "Encuentra tu próximo destino de viaje" },
  ];
};

export default function Index() {
  // Carousel state and functionality
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselImages = [
    "/img/1-paris.jpg",
    "/img/cartagena.jpg",
    "/img/interlaken.jpg",
    "/img/3-NewYork.jpg",
    "/img/Machu-Picchu.jpg",
    "/img/ibiza.jpg",
    "/img/Tulum.jpg",
    "/img/Londres.jpg",
    "/img/roma.jpg",
    "/img/innsbruck.jpg"
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

  // Dropdown state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <main className="flex flex-col h-screen bg-deep-blue overflow-hidden">
      {/* Carousel Section - Con más espacio abajo */}
      <div className="w-full px-4 md:px-16 py-4 pb-8 bg-deep-blue">
        <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden rounded-lg shadow-2xl">
          {/* Carousel images with transition */}
          {carouselImages.map((img, index) => (
            <div
              key={index}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                }`}
            >
              <img
                src={img}
                alt={`Destination ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50"></div>
            </div>
          ))}

          {/* Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-accent-blue transition-all z-10 focus:outline-none focus:ring-2 focus:ring-accent-blue"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-accent-blue transition-all z-10 focus:outline-none focus:ring-2 focus:ring-accent-blue"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Indicator dots */}
          <div className="absolute bottom-2 w-full flex justify-center gap-2">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/70'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>

      {/* Botón flotante - Con espacios arriba y abajo */}
      <div className="relative my-6 z-20 flex justify-center">
        <Link
          to="/profile"
          className="inline-flex items-center gap-3 bg-gradient-to-r from-accent-blue to-light-blue hover:from-blue-600 hover:to-blue-400 text-white font-bold py-3 px-6 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-base animate-pulse hover:animate-none"
        >
          <span>¡Haz click y prepárate para viajar!</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>

      {/* Content Section - Con espacio arriba */}
      <section className="flex-1 w-full px-4 md:px-16 pt-6 pb-4 flex justify-center items-center">
        <div className="w-full max-w-4xl relative rounded-xl overflow-hidden h-full">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(/img/tiera.png)" }}></div>
          <div className="absolute inset-0 bg-gradient-to-r from-deep-blue/90 to-deep-blue/70 backdrop-blur-xs"></div>

          <div className="relative z-10 p-6 md:p-8 flex flex-col h-full justify-center items-center">
            <div className="max-w-2xl text-center">
              <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-white drop-shadow-lg">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-light-blue to-accent-blue">
                  Descubre tu destino ideal
                </span>
              </h1>

              <p className="text-white/90 text-base md:text-lg leading-relaxed">
                ¿Estás cansado de pasar horas buscando el destino perfecto para tu próximo viaje?
                ¿Te gustaría crear un viaje de acuerdo a tus preferencias y sin complicaciones?
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}