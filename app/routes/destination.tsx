import { useState, useEffect } from "react";
import { Link } from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";
import { useDestino } from "~/services/destinationService";

// Add keyframe animation that Tailwind doesn't provide
export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: "/styles/animations.css",
  },
];

export default function Destino() {
  const { state, updateSrcImages } = useDestino();
  const [america, setAmerica] = useState<string>("");
  const [europa, setEuropa] = useState<string>("");
  const [srcA, setSrcA] = useState<string>("");
  const [srcE, setSrcE] = useState<string>("");
  const [datosA, setDatosA] = useState<string[]>([]);
  const [datosE, setDatosE] = useState<string[]>([]);
  const [control, setControl] = useState<boolean>(true);

  // Initialize from service
  useEffect(() => {
    actualizarDestino();
  }, []);

  const actualizarDestino = () => {
    switch (state.destinoA) {
      case "Playa del Carmen":
        setAmerica(state.destinoA);
        setEuropa(state.destinoE);
        setSrcA("/img/PlayaDelCarmen.jpg");
        setSrcE("/img/Santorini.jpg");
        setDatosA(["México", "Español", "Chichén-Itzá", "Salbutes"]);
        setDatosE(["Grecia", "Griego", "Oia", "Hummus de Fava"]);
        break;
      case "Tulum":
        setAmerica(state.destinoA);
        setEuropa(state.destinoE);
        setSrcA("/img/Tulum.jpg");
        setSrcE("/img/ibiza.jpg");
        setDatosA(["México", "Español", "Cenote Calavera", "Ceviche de Pescado"]);
        setDatosE(["España", "Castellano/Catalán", "Islote Es Vedrá", "Sofrit pagès"]);
        break;
      case "Honolulu":
        setAmerica(state.destinoA);
        setEuropa(state.destinoE);
        setSrcA("/img/Honolulu.jpg");
        setSrcE("/img/Malta.jpg");
        setDatosA(["Hawái", "Ingles/Hawaiano", "Playa Hapuna", "Saimin"]);
        setDatosE(["Malta", "Ingles/Maltés", "La Valeta", "Aljotta"]);
        break;
      case "Cartagena":
        setAmerica(state.destinoA);
        setEuropa(state.destinoE);
        setSrcA("/img/cartagena.jpg");
        setSrcE("/img/Barcelona.jpg");
        setDatosA(["Colombia", "Español", "Castillo San Felipe", "Cazuela de Mariscos"]);
        setDatosE(["España", "Castellano/Catalán", "Sagrada Familia", "Pa amb tomàquet"]);
        break;
      case "Bora Bora":
        setControl(false);
        setAmerica(state.destinoA);
        setEuropa(state.destinoE);
        setSrcA("/img/BoraBora.jpg");
        setSrcE("/img/dubai.jpg");
        setDatosA(["Polinesia Francesa", "Francés", "Otemanu", "Roulottes"]);
        setDatosE(["Emiratos Árabes", "Árabe", "Burj Al Arab", "El Mezze"]);
        break;
      case "Río de Janeiro":
        setAmerica(state.destinoA);
        setEuropa(state.destinoE);
        setSrcA("/img/RioDeJaneiro.jpg");
        setSrcE("/img/lisboa.jpg");
        setDatosA(["Brasil", "Portugués", "Cristo Redentor", "Feijoada"]);
        setDatosE(["Portugal", "Portugués", "Tranvía 28", "Pasteles de Belem"]);
        break;
      case "Nueva York":
        setAmerica(state.destinoA);
        setEuropa(state.destinoE);
        setSrcA("/img/NuevaYork.jpg");
        setSrcE("/img/paris.jpg");
        setDatosA(["EE.UU", "Inglés", "Central Park", "Pizza"]);
        setDatosE(["Francia", "Frances", "Torre Eiffel", "Foie gra"]);
        break;
      default:
        setSrcA("/img/tiera.png"); // Default image
        setSrcE("/img/tiera.png"); // Default image
        break;
    }

    // Update the service with image paths
    updateSrcImages(srcA, srcE);
  };

  return (
    <main className="min-h-screen w-full bg-deep-blue font-sans px-4 py-8 md:py-12">
      {/* Header with animated underline */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center relative inline-block left-1/2 transform -translate-x-1/2">
          Tus Destinos
          <span className="block h-1 bg-accent-blue mt-2 w-0 group-hover:w-full transition-all duration-300 animate-[grow_1s_ease-out_forwards]"></span>
        </h1>
        
        {!control && (
          <h3 className="text-lg text-white text-center mt-4 max-w-3xl mx-auto">
            Tus gustos son bastante exóticos, te sugerimos los siguientes lugares:
          </h3>
        )}
      </div>

      {/* Responsive destinations container */}
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 md:gap-10 px-4">
        {/* America Destination Card */}
        <DestinationCard
          title="Aventura en América"
          destination={america}
          imageSrc={srcA}
          data={datosA}
        />

        {/* Europe Destination Card */}
        <DestinationCard
          title="Aventura en Europa"
          destination={europa}
          imageSrc={srcE}
          data={datosE}
        />
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
    <section className="w-full lg:w-1/2 bg-white rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02] group">
      {/* Card header with gradient background */}
      <div className="bg-gradient-to-r from-deep-blue to-accent-blue p-4 text-center">
        <h2 className="font-bold text-xl text-white">{title}</h2>
      </div>
      
      {/* Destination name with animated reveal */}
      <div className="bg-light-blue p-3 text-center">
        <h3 className="text-2xl font-bold text-deep-blue focus-in-expand">
          {destination}
        </h3>
      </div>
      
      {/* Image container with hover effect */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* Main image */}
        <img
          src={imageSrc}
          alt={`Destino en ${title}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Info overlay that slides up on hover */}
        <div className="absolute inset-x-0 bottom-0 h-0 bg-gradient-to-t from-deep-blue to-deep-blue/80 backdrop-blur-sm transition-all duration-500 ease-in-out group-hover:h-full overflow-y-auto">
          <div className="h-full flex flex-col justify-center p-6">
            <div className="grid grid-cols-[1fr_2fr] gap-3 text-white">
              <p className="font-semibold text-light-blue">País:</p>
              <p className="text-white">{data[0]}</p>
              
              <p className="font-semibold text-light-blue">Idioma:</p>
              <p className="text-white">{data[1]}</p>
              
              <p className="font-semibold text-light-blue">Lugar Imperdible:</p>
              <p className="text-white">{data[2]}</p>
              
              <p className="font-semibold text-light-blue">Comida típica:</p>
              <p className="text-white">{data[3]}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Action footer */}
      <div className="bg-light-blue p-4 flex justify-center items-center">
        <Link 
          to="/plans" 
          className="flex items-center gap-2 bg-accent-blue hover:bg-deep-blue text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-105"
        >
          <img src="/img/paquete.png" alt="Paquete de viajes" className="w-6 h-6" />
          <span>Ver Opciones de Viaje</span>
        </Link>
      </div>
    </section>
  );
}