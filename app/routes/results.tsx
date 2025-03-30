import { LinksFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { useDestino } from "~/services/destinationService";
import { cityClient } from "~/services/cityService";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
  },
  {
    rel: "stylesheet",
    href: "/styles/animations.css",
  },
];

export default function Results() {
  const navigate = useNavigate();
  const { state, updateIndice, updateDestinos, updateSrcImages } = useDestino();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Get responses from the service
  const pDestino = state.respuestasSer[0] || "";
  const pClimatica = state.respuestasSer[1] || "";
  const pActividad = state.respuestasSer[2] || "";
  const pAlojamiento = state.respuestasSer[3] || "";
  const dViaje = state.respuestasSer[4] || "";
  const edad = state.respuestasSer[5] || "";

  const volverAtras = () => {
    updateIndice(5);
    navigate("/cards");
  };

  // Call the filtering function when component mounts
  useEffect(() => {
    // Check if we have all required responses
    if (pDestino && pClimatica && pActividad && pAlojamiento && dViaje && edad) {
      enviarDestino();
    } else {
      console.warn("Missing some responses, redirecting back to cards");
      volverAtras();
    }
  }, []);

  // Function to determine destinations based on user preferences
  const enviarDestino = async () => {
    setIsLoading(true);
    setError(null);
    
    let destinoA = "";
    let destinoE = "";

    console.log("Raw preference values:", {
      pDestino: `'${pDestino}'`,
      pClimatica: `'${pClimatica}'`,
      pActividad: `'${pActividad}'`,
      pAlojamiento: `'${pAlojamiento}'`,
      dViaje: `'${dViaje}'`,
      edad: `'${edad}'`
    });

    // Using only available cities from your database
    switch(pDestino.trim()) {
      case "Playa":
        switch(pClimatica.trim()) {
          case "Caluroso":
            if (pActividad.trim() === "Deportes y Aventuras") {
              destinoA = pAlojamiento.trim() === "Hotel" ? "Bora Bora" : "Tulum";
              destinoE = pAlojamiento.trim() === "Hotel" ? "Santorini" : "Ibiza";
            } else if (pActividad.trim() === "Cultura y Museos") {
              destinoA = pAlojamiento.trim() === "Hotel" ? "Cartagena" : "Playa del Carmen";
              destinoE = pAlojamiento.trim() === "Hotel" ? "Barcelona" : "Malta";
            } else { // Relax y Bienestar or other activities
              destinoA = pAlojamiento.trim() === "Hotel" ? "Honolulu" : "Tulum";
              destinoE = pAlojamiento.trim() === "Hotel" ? "Santorini" : "Barcelona";
            }
            break;
            
          case "Templado":
            destinoA = pAlojamiento.trim() === "Hotel" ? "Río de Janeiro" : "Playa del Carmen";
            destinoE = pAlojamiento.trim() === "Hotel" ? "Lisboa" : "Barcelona";
            break;
            
          // For "Frío" or other climates, default to available cities
          default:
            destinoA = "Cartagena";
            destinoE = "Barcelona";
            break;
        }
        break;
        
      case "Montaña": 
        // Since we don't have true mountain cities, use cultural cities that might be near mountains
        switch(pClimatica.trim()) {
          case "Caluroso":
          case "Templado":
            destinoA = "Cartagena";  // Best approximation for a warmer destination
            destinoE = "Barcelona";   // Has mountains nearby (Montserrat)
            break;
            
          case "Frío":
          default:
            destinoA = "Nueva York"; // Cold climate in winter
            destinoE = "París";      // Colder option with nearby mountains (Alps accessible)
            break;
        }
        break;
        
      case "Ciudad":
        switch(pClimatica.trim()) {
          case "Caluroso":
            destinoA = pActividad.trim() === "Cultura y Museos" ? "Nueva York" : "Río de Janeiro";
            destinoE = pActividad.trim() === "Cultura y Museos" ? "París" : "Barcelona"; 
            break;
            
          case "Templado":
            destinoA = pActividad.trim() === "Cultura y Museos" ? "Nueva York" : "Río de Janeiro";
            destinoE = pActividad.trim() === "Cultura y Museos" ? "París" : "Lisboa";
            break;
            
          case "Frío":
          default:
            destinoA = "Nueva York"; // Colder in winter
            destinoE = "París";      // Colder in winter
            break;
        }
        break;
        
      case "América":
        // Map directly to American cities
        if (pClimatica.trim() === "Caluroso") {
          if (pActividad.trim() === "Playa") {
            destinoA = pAlojamiento.trim() === "Hotel" ? "Honolulu" : "Tulum";
          } else {
            destinoA = pAlojamiento.trim() === "Hotel" ? "Bora Bora" : "Río de Janeiro";
          }
        } else {
          destinoA = pActividad.trim() === "Cultura y Museos" ? "Nueva York" : "Cartagena";
        }
        
        // Still need a European destination
        destinoE = "Barcelona"; // Default European city
        break;
        
      case "Europa":
        // Map directly to European cities
        if (pClimatica.trim() === "Caluroso") {
          if (pActividad.trim() === "Playa") {
            destinoE = pAlojamiento.trim() === "Hotel" ? "Barcelona" : "Santorini";
          } else {
            destinoE = pAlojamiento.trim() === "Hotel" ? "París" : "Ibiza";
          }
        } else {
          destinoE = pActividad.trim() === "Cultura y Museos" ? "París" : "Lisboa";
        }
        
        // Still need an American destination
        destinoA = "Tulum"; // Default American city
        break;
        
      default:
        // Default destinations if no match or unrecognized preference
        destinoA = "Tulum";
        destinoE = "Santorini";
        break;
    }

    console.log("Selected destinations based on preferences:", destinoA, destinoE);
    
    try {
      // Fetch actual city data from backend
      const [americaCity, europeCity] = await Promise.all([
        cityClient.getCityByName(destinoA),
        cityClient.getCityByName(destinoE)
      ]);
      
      console.log("Fetched city data:", americaCity, europeCity);
      
      // Update destinations in service with data from API
      updateDestinos(americaCity.description, europeCity.description);
      
      // Update image paths with the actual images from API
      updateSrcImages(americaCity.imagePath, europeCity.imagePath);
      
      // Add a delay to make sure state updates complete before navigation
      setTimeout(() => {
        // Navigate to destination page to see results
        navigate("/destination");
      }, 6000);
    } catch (err: any) {
      console.error("Error fetching city data:", err);
      setError(`Error al obtener información de destinos: ${err.message}`);
      
      // Use default destinations if API call failed
      setTimeout(() => {
        updateDestinos("Tulum", "Santorini");
        navigate("/destination");
      }, 6000);
    } finally {
      setIsLoading(false);
    }
  };

  // Array of preferences for easier rendering
  const preferences = [
    { label: "Preferencia Destino", value: pDestino, icon: "fa-map-location-dot" },
    { label: "Preferencia Climática", value: pClimatica, icon: "fa-sun" },
    { label: "Preferencia Actividad", value: pActividad, icon: "fa-person-hiking" },
    { label: "Preferencia Alojamiento", value: pAlojamiento, icon: "fa-hotel" },
    { label: "Duración viaje", value: dViaje, icon: "fa-calendar-days" },
    { label: "Edad", value: edad, icon: "fa-user-group" }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-deep-blue to-deep-blue/90 py-8 px-4 md:px-8 font-sans">
      {/* Show loading state */}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-deep-blue/80">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-accent-blue mx-auto mb-4"></div>
            <p className="text-white text-xl">Buscando tus destinos perfectos...</p>
          </div>
        </div>
      )}

      {/* Show error message if any */}
      {error && (
        <div className="fixed top-4 right-4 bg-red-600/90 text-white p-4 rounded-lg shadow-lg z-50">
          {error}
        </div>
      )}

      {/* Hero section with animated heading */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 relative inline-block">
          Tus Preferencias de Viaje
          <span className="block h-1 bg-accent-blue mt-2 w-0 group-hover:w-full transition-all duration-300 animate-[grow_1s_ease-out_forwards]"></span>
        </h1>
        
        <p className="text-light-blue/90 max-w-2xl mx-auto">
          Estas son las preferencias que seleccionaste para tu viaje. Estamos determinando
          los mejores destinos para ti basándonos en esta información.
        </p>
      </div>

      {/* Main content container with right flying plane */}
      <div className="max-w-4xl mx-auto relative mb-16">
        {/* Flying plane animation on the right */}
        <div className="absolute -top-12 -right-8 md:right-0 z-10 hidden md:block">
          <div className="relative w-24 h-24">
            <i className="fas fa-paper-plane text-accent-blue text-4xl absolute animate-custom-plane-flight"></i>
            <svg className="absolute top-12 right-0 w-20 h-20 text-accent-blue/20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,50 Q25,40 50,50 T100,50" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" fill="none" />
            </svg>
          </div>
        </div>

        {/* Content box with glassmorphism effect */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-white/10">
          {/* Preferences grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
            {preferences.map((pref, index) => (
              <div 
                key={index}
                className="bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10 hover:border-accent-blue/50 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent-blue/20 flex items-center justify-center">
                    <i className={`fas ${pref.icon} text-accent-blue`}></i>
                  </div>
                  <div>
                    <p className="text-light-blue/70 text-sm">{pref.label}</p>
                    <p className="text-white font-medium">{pref.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Action buttons */}
          <div className="border-t border-white/10 p-6 flex justify-center">
            <button 
              onClick={volverAtras}
              className="bg-light-blue/20 hover:bg-light-blue/30 text-white px-6 py-3 rounded-lg font-medium transition-colors mr-4"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Volver a responder
            </button>
          </div>
        </div>
      </div>

      {/* Bottom decoration with globe and pins */}
      <div className="text-center">
        <div className="inline-block relative">
          <i className="fas fa-globe-americas text-light-blue/40 text-6xl"></i>
          <i className="fas fa-map-pin text-red-500/80 text-lg absolute top-2 left-6 animate-bounce"></i>
          <i className="fas fa-map-pin text-yellow-500/80 text-lg absolute bottom-3 right-5 animate-bounce" style={{ animationDelay: '0.5s' }}></i>
        </div>
        <p className="text-white/50 mt-4">
          Encontrando los mejores destinos para ti...
        </p>
      </div>
    </main>
  );
}