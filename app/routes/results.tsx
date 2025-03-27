import { useNavigate } from "@remix-run/react";
import { useDestino } from "~/services/destinationService";
import { LinksFunction } from "@remix-run/node";

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
  const { state, updateIndice, updateDestinos } = useDestino();
  
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

  const enviarDestino = () => {
    let destinoA = "";
    let destinoE = "";

    // Logic to determine destination based on preferences
    switch(pDestino) {
      case "Playa":
        switch(pClimatica) {
          case "Caluroso":
            switch(dViaje) {
              case "1-2 semanas":
                if(edad == "Menos de 30 años" && pActividad == "Deportes y Aventuras" && pAlojamiento == "Hostal o Albergue") {
                  destinoA = "Tulum";
                  destinoE = "Ibiza";
                } else if(edad == "Menos de 30 años" && pActividad == "Relax y Bienestar" && pAlojamiento == "Hotel de Lujo") {
                  destinoA = "Playa del Carmen";
                  destinoE = "Santorini";
                } else if(edad == "30-50 años" && pActividad == "Cultura y Museos" && pAlojamiento == "Hotel de Lujo") {
                  destinoA = "Honolulu";
                  destinoE = "Malta";
                }
                break;
              case "Menos de una semana":
                if(edad == "Menos de 30 años" && pActividad == "Cultura y Museos" && pAlojamiento == "Airbnb") {
                  destinoA = "Cartagena";
                  destinoE = "Barcelona";
                }
                break;
            }
            break;
          case "Templado":
            switch(dViaje) {
              case "1-2 semanas":
                if(edad == "Menos de 30 años" && pActividad == "Cultura y Museos" && pAlojamiento == "Hostal o Albergue") {
                  destinoA = "San Juan";
                  destinoE = "Niza";
                } else if (edad == "30-50 años" && pActividad == "Cultura y Museos" && pAlojamiento == "Hotel de Lujo") {
                  destinoA = "Río de Janeiro";
                  destinoE = "Lisboa";
                }
                break;
              case "Más de dos semanas":
                if(edad == "Más de 50 años" && pActividad == "Relax y Bienestar" && pAlojamiento == "Airbnb") {
                  destinoA = "Punta Cana";
                  destinoE = "Algarve";
                }
                break;
            }
            break;
        }
        break;
      case "Montaña":
        switch(pClimatica) {
          case "Frío":
            if(dViaje == "1-2 semanas") {
              if(edad == "Más de 50 años" && pAlojamiento == "Airbnb") {
                if(pActividad == "Cultura y Museos") {
                  destinoA = "Ushuaia";
                  destinoE = "Reykjavik";
                } else if (pActividad == "Relax y Bienestar") {
                  destinoA = "Aspen";
                  destinoE = "Innsbruck";
                }
              } else if(edad == "Menos de 30 años" && pAlojamiento == "Hostal o Albergue" && pActividad == "Deportes y Aventuras") {
                destinoA = "Bariloche";
                destinoE = "Interlaken";
              } else if(edad == "30-50 años" && pAlojamiento == "Hotel de Lujo" && pActividad == "Deportes y Aventuras") {
                destinoA = "Banff";
                destinoE = "Zermatt";
              }
            }
            break;
          case "Templado":
            if(edad == "Más de 50 años" && pAlojamiento == "Airbnb" && pActividad == "Cultura y Museos" && dViaje == "1-2 semanas") {
              destinoA = "Cusco";
              destinoE = "Granada";
            } else if(edad == "Menos de 30 años" && pAlojamiento == "Airbnb" && pActividad == "Deportes y Aventuras" && dViaje == "Más de dos semanas") {
              destinoA = "Machu Picchu";
              destinoE = "Chamonix";
            }
            break;
        }
        break;
      case "Ciudad":
        switch(pClimatica) {
          case "Caluroso":
            if(edad == "Más de 50 años" && pAlojamiento == "Hotel de Lujo" && pActividad == "Cultura y Museos" && dViaje == "1-2 semanas") {
              destinoA = "Los Angeles";
              destinoE = "Roma";
            }
            break;
          case "Frío":
            if(edad == "30-50 años" && pAlojamiento == "Hotel de Lujo" && pActividad == "Cultura y Museos" && dViaje == "1-2 semanas") {
              destinoA = "Toronto";
              destinoE = "Berlín";
            }
            break;
          case "Templado":
            if(dViaje == "1-2 semanas" && pActividad == "Cultura y Museos") {
              if(edad == "30-50 años" && pAlojamiento == "Hostal o Albergue") {
                destinoA = "Ciudad de México";
                destinoE = "Madrid";
              } else if(edad == "Más de 50 años" && pAlojamiento == "Hotel de Lujo") {
                destinoA = "Nueva York";
                destinoE = "París";
              }
            } else if(dViaje == "Menos de una semana") {
              if(edad == "Menos de 30 años" && pAlojamiento == "Airbnb" && pActividad == "Relax y Bienestar") {
                destinoA = "Miami";
                destinoE = "Viena";
              } else if(edad == "30-50 años" && pAlojamiento == "Hotel de Lujo" && pActividad == "Deportes y Aventuras") {
                destinoA = "Chicago";
                destinoE = "Londres";
              }
            }
            break;
        }
        break;
    }

    // Default destination if no match found
    if(destinoA === "") {
      destinoA = "Bora Bora";
      destinoE = "Dubái";
    }
    
    // Update destinations and navigate
    updateDestinos(destinoA, destinoE);
    navigate("/destination");
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
      {/* Hero section with animated heading */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 relative inline-block">
          Tus Preferencias de Viaje
          <span className="block h-1 bg-accent-blue mt-2 animate-[grow_1s_ease-out_forwards]"></span>
        </h1>
        <p className="text-light-blue/90 max-w-2xl mx-auto">
          Revisa tus selecciones antes de generar tus destinos recomendados
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 md:p-8">
            {preferences.map((pref, index) => (
              <div 
                key={index}
                className="bg-deep-blue/50 rounded-xl overflow-hidden transform transition-all hover:scale-[1.02] hover:shadow-accent-blue/20 group"
              >
                <div className="py-3 px-4 bg-gradient-to-r from-accent-blue/80 to-accent-blue/50 flex items-center">
                  <i className={`fas ${pref.icon} text-white mr-2`}></i>
                  <h3 className="text-white font-medium">{pref.label}</h3>
                </div>
                <div className="p-4 flex items-center">
                  <div className="w-10 h-10 bg-accent-blue/20 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-check text-accent-blue"></i>
                  </div>
                  <p className="text-white text-lg">{pref.value}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Decorative elements */}
          <div className="px-6 md:px-8 py-6 border-t border-white/10 flex items-center justify-between">
            <div className="text-light-blue text-sm flex items-center">
              <i className="fas fa-lightbulb mr-2 text-accent-blue"></i>
              <p>Basado en tus preferencias, encontraremos los destinos perfectos para ti</p>
            </div>
            
            <div className="hidden md:block">
              <i className="fas fa-globe-americas text-5xl text-accent-blue/30 animate-spin-slow"></i>
            </div>
          </div>
        </div>
      </div>

      {/* World map background with plane animation overlay - visible on mobile */}
      <div className="relative h-32 mb-12 md:mb-8 md:hidden overflow-hidden">
        <div className="absolute inset-0 flex justify-end items-start">
          <i className="fas fa-paper-plane text-accent-blue text-4xl animate-custom-plane-flight-mobile"></i>
        </div>
        <div className="absolute top-1/2 w-full border-t border-dashed border-accent-blue/20"></div>
      </div>

      {/* Journey visualization - Cloud paths */}
      <div className="max-w-4xl mx-auto relative h-24 mb-8 overflow-hidden">
        <div className="absolute left-0 top-0 w-full h-full">
          <div className="cloud-path"></div>
          <div className="absolute left-1/4 top-1/3 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm animate-float1"></div>
          <div className="absolute left-2/3 top-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm animate-float2"></div>
          <div className="absolute right-1/4 bottom-1/4 w-6 h-6 rounded-full bg-white/10 backdrop-blur-sm animate-float3"></div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-deep-blue/95 backdrop-blur-md py-4 border-t border-accent-blue/30 shadow-[0_-5px_15px_rgba(0,0,0,0.3)] z-50">
        <div className="container mx-auto flex justify-center items-center gap-4 px-4">
          <button
            onClick={volverAtras}
            className="bg-light-blue text-deep-blue px-6 py-3 rounded-lg font-bold shadow-lg hover:bg-accent-blue hover:text-white transition-all duration-300 flex items-center gap-2"
          >
            <i className="fa-solid fa-arrow-left"></i>Atrás
          </button>
          
          <button
            onClick={enviarDestino}
            className="bg-accent-blue text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:bg-light-blue hover:text-deep-blue transition-all duration-300 flex items-center gap-2 animate-pulse"
          >
            <i className="fa-solid fa-paper-plane"></i>Descubrir Destinos
          </button>
        </div>
      </div>
    </main>
  );
}