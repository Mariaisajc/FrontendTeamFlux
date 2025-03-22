import { useState, useEffect } from "react";
import { Link } from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";

// Add keyframe animation that Tailwind doesn't provide
export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: "/styles/animations.css",
  },
];

// Note: This would be your actual destination service implementation
interface DestinoService {
  destinoA: string;
  destinoE: string;
  srcA: string;
  srcE: string;
}

// Mock destination service (replace with your actual service)
const destinoService: DestinoService = {
  destinoA: "Playa del Carmen", // Default value for example
  destinoE: "Santorini", // Default value for example
  srcA: "",
  srcE: "",
};

export default function Destino() {
  const [america, setAmerica] = useState<string>("");
  const [europa, setEuropa] = useState<string>("");
  const [srcA, setSrcA] = useState<string>("");
  const [srcE, setSrcE] = useState<string>("");
  const [datosA, setDatosA] = useState<string[]>([]);
  const [datosE, setDatosE] = useState<string[]>([]);
  const [control, setControl] = useState<boolean>(true);

  // Equivalent to ngOnInit
  useEffect(() => {
    actualizarDestino();
  }, []);

  const actualizarDestino = () => {
    switch (destinoService.destinoA) {
      case "Playa del Carmen":
        setAmerica(destinoService.destinoA);
        setEuropa(destinoService.destinoE);
        setSrcA("/img/PlayaDelCarmen.jpg");
        setSrcE("/img/Santorini.jpg");
        setDatosA(["México", "Español", "Chichén-Itzá", "Salbutes"]);
        setDatosE(["Grecia", "Griego", "Oia", "Hummus de Fava"]);
        break;
      case "Tulum":
        setAmerica(destinoService.destinoA);
        setEuropa(destinoService.destinoE);
        setSrcA("/img/Tulum.jpg");
        setSrcE("/img/ibiza.jpg");
        setDatosA([
          "México",
          "Español",
          "Cenote Calavera",
          "Ceviche de Pescado",
        ]);
        setDatosE([
          "España",
          "Castellano/Catalán",
          "Islote Es Vedrá",
          "Sofrit pagès",
        ]);
        break;
      case "Honolulu":
        setAmerica(destinoService.destinoA);
        setEuropa(destinoService.destinoE);
        setSrcA("/img/Honolulu.jpg");
        setSrcE("/img/Malta.jpg");
        setDatosA(["Hawái", "Ingles/Hawaiano", "Playa Hapuna", "Saimin"]);
        setDatosE(["Malta", "Ingles/Maltés", "La Valeta", "Aljotta"]);
        break;
      case "Cartagena":
        setAmerica(destinoService.destinoA);
        setEuropa(destinoService.destinoE);
        setSrcA("/img/Cartagena.jpg");
        setSrcE("/img/Barcelona.jpg");
        setDatosA([
          "Colombia",
          "Español",
          "Castillo San Felipe",
          "Cazuela de Mariscos",
        ]);
        setDatosE([
          "España",
          "Castellano/Catalán",
          "Sagrada Familia",
          "Pa amb tomàquet",
        ]);
        break;
      case "Bora Bora":
        setControl(false);
        setAmerica(destinoService.destinoA);
        setEuropa(destinoService.destinoE);
        setSrcA("/img/BoraBora.jpg");
        setSrcE("/img/dubai.jpg");
        setDatosA(["Polinesia Francesa", "Francés", "Otemanu", "Roulottes"]);
        setDatosE(["Emiratos Árabes", "Árabe", "Burj Al Arab", "El Mezze"]);
        break;
      case "Río de Janeiro":
        setAmerica(destinoService.destinoA);
        setEuropa(destinoService.destinoE);
        setSrcA("/img/RioDeJaneiro.jpg");
        setSrcE("/img/lisboa.jpg");
        setDatosA(["Brasil", "Portugués", "Cristo Redentor", "Feijoada"]);
        setDatosE(["Portugal", "Portugués", "Tranvía 28", "Pasteles de Belem"]);
        break;
      case "Nueva York":
        setAmerica(destinoService.destinoA);
        setEuropa(destinoService.destinoE);
        setSrcA("/img/NuevaYork.jpg");
        setSrcE("/img/paris.jpg");
        setDatosA(["EE.UU", "Inglés", "Central Park", "Pizza"]);
        setDatosE(["Francia", "Frances", "Torre Eiffel", "Foie gra"]);
        break;
      default:
        // Default case if needed
        setSrcA("/img/tiera.png"); // Default image
        setSrcE("/img/tiera.png"); // Default image
        break;
    }

    // Update the service (if needed)
    destinoService.srcA = srcA;
    destinoService.srcE = srcE;
  };

  return (
    <main className="h-[80vh] w-full mt-[5vh] mb-[5vh] bg-[#000835] flex flex-col font-sans gap-[2vh]">
      <h1 className="flex items-center justify-center text-center text-white">
        Tus Destinos:
      </h1>

      {!control && (
        <h3 className="flex items-center justify-center text-center text-white">
          Tus Gustos son bastante exóticos, te sugerimos los siguientes lugares:
        </h3>
      )}

      <div className="flex justify-evenly h-3/4 md:flex-row flex-col md:gap-0 gap-7">
        <section className="flex flex-col items-center md:w-2/5 w-3/4 justify-between bg-[#c5d5f9] shadow-[18px_14px_0px_2px_#3a8bff] md:h-auto h-1/2 self-center group">
          <div className="h-[10%]">
            <h2 className="cursor-pointer" onClick={actualizarDestino}>
              Aventura en América
            </h2>
          </div>

          <div className="h-[10%]">
            <input
              value={america}
              className="text-center border-none bg-[#c5d5f9] text-xl font-bold focus-in-expand"
              type="text"
              readOnly
              id="destinoAmerica"
            />
          </div>

          <div className="relative h-3/5 mx-[10%]">
            <img
              src={srcA}
              alt="Destino en America"
              id="imagenAmerica"
              className="max-w-full max-h-full object-cover w-[900px] h-[900px]"
            />
            <div className="absolute bottom-full left-0 right-0 bg-[#000835] overflow-hidden w-full h-0 transition-all duration-500 group-hover:bottom-0 group-hover:h-full">
              <div className="text-white text-sm font-thin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-left grid grid-cols-[40%_60%] gap-[5px] md:left-1/2 left-[60%]">
                <p>Pais:</p>
                <input
                  className="text-left text-[#c5d5f9] border-none bg-[#000835] text-sm"
                  type="text"
                  value={datosA[0] || ""}
                  readOnly
                />
                <p>Idioma:</p>
                <input
                  className="text-left text-[#c5d5f9] border-none bg-[#000835] text-sm"
                  type="text"
                  value={datosA[1] || ""}
                  readOnly
                />
                <p>Lugar Imperdible:</p>
                <input
                  className="text-left text-[#c5d5f9] border-none bg-[#000835] text-sm"
                  type="text"
                  value={datosA[2] || ""}
                  readOnly
                />
                <p>Comida típica:</p>
                <input
                  className="text-left text-[#c5d5f9] border-none bg-[#000835] text-sm"
                  type="text"
                  value={datosA[3] || ""}
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className="relative group">
            <Link to="/plans">
              <img
                src="/img/paquete.png"
                alt="Paquete de viajes"
                className="w-[30px]"
              />
            </Link>
            <span className="invisible group-hover:visible w-[100px] bg-[#000835] text-white text-center rounded-lg text-xs absolute z-10">
              Explora tus opciones
            </span>
          </div>
        </section>

        <section className="flex flex-col items-center md:w-2/5 w-3/4 justify-between bg-[#c5d5f9] shadow-[18px_14px_0px_2px_#3a8bff] md:h-auto h-1/2 self-center group">
          <div className="h-[10%]">
            <h2 className="cursor-pointer">Aventura en Europa</h2>
          </div>

          <div className="h-[10%]">
            <input
              value={europa}
              className="text-center border-none bg-[#c5d5f9] text-xl font-bold focus-in-expand"
              type="text"
              readOnly
              id="destinoEuropa"
            />
          </div>

          <div className="relative h-3/5 mx-[10%]">
            <img
              src={srcE}
              alt="Destino en Europa"
              id="imagenEuropa"
              className="max-w-full max-h-full object-cover w-[900px] h-[900px]"
            />
            <div className="absolute bottom-full left-0 right-0 bg-[#000835] overflow-hidden w-full h-0 transition-all duration-500 group-hover:bottom-0 group-hover:h-full">
              <div className="text-white text-sm font-thin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-left grid grid-cols-[40%_60%] gap-[5px] md:left-1/2 left-[60%]">
                <p>Pais:</p>
                <input
                  className="text-left text-[#c5d5f9] border-none bg-[#000835] text-sm"
                  type="text"
                  value={datosE[0] || ""}
                  readOnly
                />
                <p>Idioma:</p>
                <input
                  className="text-left text-[#c5d5f9] border-none bg-[#000835] text-sm"
                  type="text"
                  value={datosE[1] || ""}
                  readOnly
                />
                <p>Lugar Imperdible:</p>
                <input
                  className="text-left text-[#c5d5f9] border-none bg-[#000835] text-sm"
                  type="text"
                  value={datosE[2] || ""}
                  readOnly
                />
                <p>Comida típica:</p>
                <input
                  className="text-left text-[#c5d5f9] border-none bg-[#000835] text-sm"
                  type="text"
                  value={datosE[3] || ""}
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className="relative group">
            <Link to="/plans">
              <img
                src="/img/paquete.png"
                alt="Paquete de viajes"
                className="w-[30px]"
              />
            </Link>
            <span className="invisible group-hover:visible w-[100px] bg-[#000835] text-white text-center rounded-lg text-xs absolute z-10">
              Explora tus opciones
            </span>
          </div>
        </section>
      </div>
    </main>
  );
}