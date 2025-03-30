import { useState, useEffect } from "react";
import { Link } from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";
import { useDestino } from "~/services/destinationService";
import { cityClient } from "~/services/cityService";
import { City } from "~/services/Interfaces";

// Add keyframe animation that Tailwind doesn't provide
export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: "/styles/animations.css",
  },
];

export default function Destino() {
  const { state } = useDestino();
  const [americaCity, setAmericaCity] = useState<City | null>(null);
  const [europeCity, setEuropeCity] = useState<City | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch city data when component mounts
  useEffect(() => {
    const fetchCities = async () => {
      if (!state.destinoA || !state.destinoE) {
        console.warn("Missing destinations in state:", state);
        setError("No se han seleccionado destinos.");
        setLoading(false);
        return;
      }

      console.log("Fetching cities for:", state.destinoA, state.destinoE);
      
      setLoading(true);
      try {
        // Fetch both cities in parallel
        const [americaData, europeData] = await Promise.all([
          cityClient.getCityByName(state.destinoA),
          cityClient.getCityByName(state.destinoE)
        ]);
        
        console.log("Fetched city data successfully:", 
                    americaData.description, europeData.description);
        
        setAmericaCity(americaData);
        setEuropeCity(europeData);
      } catch (err: any) {
        console.error("Error fetching city data:", err);
        setError(`Error al cargar datos de destinos: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, [state.destinoA, state.destinoE]);

  if (loading) {
    return (
      <main className="min-h-screen w-full bg-gradient-to-b from-deep-blue to-deep-blue/90 py-12 px-4 font-sans">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-8">Cargando destinos...</h1>
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-accent-blue mx-auto"></div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen w-full bg-gradient-to-b from-deep-blue to-deep-blue/90 py-12 px-4 font-sans">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-8">Error</h1>
          <p className="text-red-300 text-xl">{error}</p>
          <Link to="/cards" className="mt-8 inline-block px-6 py-3 rounded-full bg-accent-blue text-white font-medium hover:bg-deep-blue transition-colors duration-300">
            Volver a intentar
          </Link>
        </div>
      </main>
    );
  }

  // If we have image paths from the service, use those instead 
  // This ensures we use the correct images even if the fetch didn't work
  const americaImage = state.srcA || (americaCity?.imagePath || "/img/tiera.png");
  const europeImage = state.srcE || (europeCity?.imagePath || "/img/tiera.png");

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-deep-blue to-deep-blue/90 py-12 px-4 font-sans">
      <div className="container mx-auto text-center mb-12">
      <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
          Tus Destinos
          <span className="block h-1 bg-accent-blue mt-2 w-full transition-all duration-300 animate-[grow_1s_ease-out_forwards]"></span>
        </h1>

        <h3 className="text-lg text-white text-center mt-4 max-w-3xl mx-auto">
          Tus gustos son bastante exóticos, te sugerimos los siguientes lugares:
        </h3>
      </div>

      {/* Responsive destinations container */}
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 md:gap-10 px-4">
        {/* America Destination Card */}
        {americaCity && (
          <DestinationCard
            title="Aventura en América"
            destination={americaCity.description}
            imageSrc={americaImage}
            data={[
              americaCity.country,
              americaCity.language,
              americaCity.attraction,
              americaCity.food
            ]}
          />
        )}

        {/* Europe Destination Card */}
        {europeCity && (
          <DestinationCard
            title="Aventura en Europa"
            destination={europeCity.description}
            imageSrc={europeImage}
            data={[
              europeCity.country,
              europeCity.language,
              europeCity.attraction,
              europeCity.food
            ]}
          />
        )}
      </div>
    </main>
  );
}

// Reusable destination card component for better structure
function DestinationCard({ title, destination, imageSrc, data }: {
  title: string;
  destination: string;
  imageSrc: string;
  data: string[];
}) {
  return (
    <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-md group hover:shadow-accent-blue/30 transition-all duration-500">
      {/* Card Header with destination name */}
      <div className="p-4 text-center border-b border-white/20">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <p className="text-accent-blue text-lg">{destination}</p>
      </div>

      {/* Main destination image with hover effect */}
      <div className="relative h-80 overflow-hidden">
        <img
          src={imageSrc || "/img/tiera.png"}
          alt={`Destino en ${title}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay with destination info */}
        <div className="absolute inset-x-0 bottom-0 h-0 bg-gradient-to-t from-deep-blue to-deep-blue/80 backdrop-blur-sm transition-all duration-500 ease-in-out group-hover:h-full overflow-y-auto">
          <div className="h-full flex flex-col justify-center p-6">
            <div className="grid grid-cols-[1fr_2fr] gap-3 text-white">
              <p className="font-semibold text-light-blue">País:</p>
              <p className="text-white">{data[0]}</p>
              
              <p className="font-semibold text-light-blue">Idioma:</p>
              <p className="text-white">{data[1]}</p>
              
              <p className="font-semibold text-light-blue">Atracción:</p>
              <p className="text-white">{data[2]}</p>
              
              <p className="font-semibold text-light-blue">Comida:</p>
              <p className="text-white">{data[3]}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Card footer with action button - Updated to pass destination */}
      <div className="p-4 flex justify-center">
        <Link to={`/plans?destination=${encodeURIComponent(destination)}`} className="px-6 py-2 rounded-full bg-accent-blue text-white font-medium hover:bg-blue-600 transition-colors">
          Ver planes disponibles
        </Link>
      </div>
    </div>
  );
}