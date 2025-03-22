import { Link, useNavigate } from "@remix-run/react";
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

  return (
    <main className="h-[80vh] w-full mt-[5vh] mb-[5vh] bg-deep-blue flex flex-col justify-around font-sans">
      <h1 className="h-[15vh] flex justify-center items-center text-white">Tus preferencias:</h1>
      
      <div className="h-[70vh] flex justify-evenly text-light-blue max-md:justify-center max-md:ml-[10px]">
        {/* Questions Column */}
        <div className="flex flex-col justify-evenly">
          <div className="py-[10px] px-[10px] font-semibold bg-light-blue text-deep-blue flex items-center">
            Preferencia Destino:
          </div>
          <div className="py-[10px] px-[10px] font-semibold bg-light-blue text-deep-blue flex items-center">
            Preferencia Climática:
          </div>
          <div className="py-[10px] px-[10px] font-semibold bg-light-blue text-deep-blue flex items-center">
            Preferencia Actividad:
          </div>
          <div className="py-[10px] px-[10px] font-semibold bg-light-blue text-deep-blue flex items-center">
            Preferencia Alojamiento:
          </div>
          <div className="py-[10px] px-[10px] font-semibold bg-light-blue text-deep-blue flex items-center">
            Duración viaje:
          </div>
          <div className="py-[10px] px-[10px] font-semibold bg-light-blue text-deep-blue flex items-center">
            Edad:
          </div>
        </div>
        
        {/* Responses Column */}
        <form className="flex flex-col justify-evenly max-md:flex-col">
          <div className="py-[10px] px-[10px] flex items-center max-md:flex-col">
            <input 
              type="text" 
              value={pDestino} 
              readOnly 
              id="entorno"
              className="border-none text-white bg-deep-blue text-lg" 
            />
          </div>
          <div className="py-[10px] px-[10px] flex items-center max-md:flex-col">
            <input 
              type="text" 
              value={pClimatica} 
              readOnly 
              id="clima"
              className="border-none text-white bg-deep-blue text-lg" 
            />
          </div>
          <div className="py-[10px] px-[10px] flex items-center max-md:flex-col">
            <input 
              type="text" 
              value={pActividad} 
              readOnly 
              id="actividades"
              className="border-none text-white bg-deep-blue text-lg" 
            />
          </div>
          <div className="py-[10px] px-[10px] flex items-center max-md:flex-col">
            <input 
              type="text" 
              value={pAlojamiento} 
              readOnly 
              id="alojamiento"
              className="border-none text-white bg-deep-blue text-lg" 
            />
          </div>
          <div className="py-[10px] px-[10px] flex items-center max-md:flex-col">
            <input 
              type="text" 
              value={dViaje} 
              readOnly 
              id="tiempo"
              className="border-none text-white bg-deep-blue text-lg" 
            />
          </div>
          <div className="py-[10px] px-[10px] flex items-center max-md:flex-col">
            <input 
              type="text" 
              value={edad} 
              readOnly 
              id="edad"
              className="border-none text-white bg-deep-blue text-lg" 
            />
          </div>
        </form>
        
        {/* Airplane Icon */}
        <div className="max-md:hidden">
          <i className="fa-solid fa-plane-up text-[100px] slide-in-bottom"></i>
        </div>
      </div>

<div className="sticky bottom-0 left-0 right-0 w-full py-4 bg-deep-blue bg-opacity-90 z-50 mt-8">
  <div className="flex justify-center gap-10 px-4 max-w-4xl mx-auto">
    <button
      onClick={volverAtras}
      className="bg-light-blue text-deep-blue px-8 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-accent-blue hover:text-white transition-colors"
    >
      <i className="fa-solid fa-arrow-left mr-2"></i>Atrás
    </button>
    
    <button
      onClick={enviarDestino}
      className="bg-accent-blue text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-light-blue hover:text-deep-blue transition-colors vibrate-1"
    >
      <i className="fa-solid fa-check-circle mr-2"></i>Confirmar
    </button>
  </div>
</div>
    </main>
  );
} 