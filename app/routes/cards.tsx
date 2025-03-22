import { useState, useEffect } from "react";
import { Link, useNavigate } from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";
import { useDestino } from "~/services/destinationService";

// Add keyframe animations that Tailwind doesn't provide
export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: "/styles/animations.css",
  },
  {
    rel: "stylesheet",
    href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
  },
];

export default function Cards() {
  const navigate = useNavigate();
  const { state, updateIndice, addRespuesta, removeLastRespuesta, clearRespuestas } = useDestino();
  
  const [indice, setIndice] = useState(state.indice);
  const [opcSelect, setOpcSelect] = useState("");
  const [disSig, setDisSig] = useState(true);
  const [disAtras, setDisAtras] = useState(true);
  const [hidSig, setHidSig] = useState(false);
  const [calcular, setCalcular] = useState(true);
  const [backgroundImage, setBackgroundImage] = useState("");

  // Navigation indicators
  const [t0, setT0] = useState("contador");
  const [t1, setT1] = useState("contador");
  const [t2, setT2] = useState("contador");
  const [t3, setT3] = useState("contador");
  const [t4, setT4] = useState("contador");
  const [t5, setT5] = useState("contador");

  // User info from service
  const nombre = state.nombreS || "Usuario";
  const avatar = state.avatar || "/img/img-avatar/ava11.png";

  // Questions and options data
  const preguntaA = [
    "¿Que tipo de entorno prefieres para tus vacaciones?",
    "¿Qué clima prefieres durante tus vacaciones?",
    "¿Qué tipo de actividades prefieres hacer durante tus vacaciones?",
    "¿Qué tipo de alojamiento prefieres?",
    "¿Cuánto tiemplo planeas quedarte de vacaciones?",
    "¿Cuál es tu rango de edad?",
  ];

  const opcionesA = [
    ["Playa", "Montaña", "Ciudad"],
    ["Caluroso", "Templado", "Frío"],
    ["Deportes y Aventuras", "Cultura y Museos", "Relax y Bienestar"],
    ["Hotel de Lujo", "Hostal o Albergue", "Airbnb"],
    ["Menos de una semana", "1-2 semanas", "Más de dos semanas"],
    ["Menos de 30 años", "30-50 años", "Más de 50 años"],
  ];

  // Updated image paths to ensure they're pointing to the right location
  const imgUrl = [
    ["/img/imagen1.jpg", "/img/imagen2.jpg", "/img/imagen3.jpg"],
    ["/img/Tulum.jpg", "/img/Templado.jpg", "/img/Frio.jpg"],
    ["/img/Aventura.jpg", "/img/cultura.jpg", "/img/relax.jpg"],
    ["/img/hotelujo.jpg", "/img/hostal.jpg", "/img/airbnb.jpg"],
    ["/img/findesemana.jpg", "/img/dosemanas.jpg", "/img/calendario.jpg"],
    ["/img/veinte.jpg", "/img/treinta.jpg", "/img/cincuenta.jpg"],
  ];

  const dato = [
    [
      "Las playas no siempre son doradas?. Hay playas con arena negra volcánica, rosa coralina y hasta verde olivo. ¡Cada grano de arena cuenta una historia!",
      "Las montañas tienen su propio clima?. Al subir una montaña, puedes experimentar diferentes climas en pocos kilómetros. ¡Es como viajar por el mundo sin salir de una misma montaña!",
      "Muchas ciudades tienen secretos subterráneos?. Bajo las calles de muchas ciudades se encuentran redes de túneles, ríos subterráneos y hasta antiguas ruinas. París, por ejemplo, tiene más de 200 kilómetros de túneles subterráneos.",
    ],
    [
      "En muchos lugares con clima cálido se celebran festivales y eventos al aire libre, aprovechando las altas temperaturas.",
      "Muchas de las rutas turísticas más famosas del mundo se encuentran en regiones con clima templado, como la Ruta de la Costa Amalfitana en Italia o la Ruta 66 en Estados Unidos.",
      "En lugares con clima frío, el turismo se concentra principalmente en los meses de invierno, cuando la nieve cubre el paisaje y se pueden practicar deportes como el esquí, el snowboard y el patinaje sobre hielo.",
    ],
    [
      "Desde las montañas de Nepal hasta los ríos de Costa Rica, existen numerosos destinos que ofrecen experiencias únicas para los amantes de la adrenalina.",
      "Al visitar los museos, los viajeros pueden imaginar cómo era la vida en la corte real y apreciar la arquitectura y el diseño de una época pasada.",
      "Al visitar un baño termal, los viajeros pueden conectar con las tradiciones de culturas antiguas y experimentar una forma de relajación que ha sido practicada durante siglos.",
    ],
    [
      "Algunos de los hoteles más lujosos del mundo ofrecen experiencias tan exclusivas que incluyen la posibilidad de tener un mayordomo que se encargue de todos tus caprichos, desde preparar un baño relajante hasta hacer reservas en el restaurante más exclusivo.",
      "Muchos de los hostales y albergues más populares del mundo se encuentran ubicados en edificios históricos o con una arquitectura única.",
      "Airbnb o apartamento: Airbnb nació de una necesidad de alojamiento económico durante un evento en San Francisco.",
    ],
    [
      "Estudios han demostrado que incluso viajes cortos pueden tener un impacto significativo en la reducción del estrés y la mejora del estado de ánimo.",
      "Estudios han demostrado que este rango de tiempo permite sumergirte en la cultura local, conocer a fondo un lugar y crear recuerdos duraderos sin sentirte apresurado o abrumado.",
      "Viajes prolongados te permiten desconectar completamente de tu rutina diaria y volver a casa sintiéndote renovado y con una nueva perspectiva de la vida.",
    ],
    [
      "Viajar en la veintena te ayuda a desarrollar habilidades como la independencia, la adaptabilidad y la tolerancia a la incertidumbre, lo cual es fundamental para tu crecimiento personal.",
      "A menudo, se busca ir más allá de los destinos turísticos más populares y descubrir lugares menos conocidos, con una mayor conexión con la cultura local.",
      "Muchos viajeros mayores se unen a grupos organizados para conocer a personas con intereses similares y compartir experiencias.",
    ],
  ];

  // Current question data
  const [pregunta, setPregunta] = useState(preguntaA[indice]);
  const [opcion1, setOpcion1] = useState(opcionesA[indice][0]);
  const [opcion2, setOpcion2] = useState(opcionesA[indice][1]);
  const [opcion3, setOpcion3] = useState(opcionesA[indice][2]);
  const [img1, setImg1] = useState(imgUrl[indice][0]);
  const [img2, setImg2] = useState(imgUrl[indice][1]);
  const [img3, setImg3] = useState(imgUrl[indice][2]);
  const [dato1, setDato1] = useState(dato[indice][0]);
  const [dato2, setDato2] = useState(dato[indice][1]);
  const [dato3, setDato3] = useState(dato[indice][2]);

  // Initialize from context state
  useEffect(() => {
    setIndice(state.indice);
    
    if (state.indice > 0) {
      setDisAtras(false);
    }
  }, [state.indice]);

  // Update indicator states when index changes
  useEffect(() => {
    verificarSeleccion();
    
    // Update current question data when index changes
    setPregunta(preguntaA[indice]);
    setOpcion1(opcionesA[indice][0]);
    setOpcion2(opcionesA[indice][1]);
    setOpcion3(opcionesA[indice][2]);
    setImg1(imgUrl[indice][0]);
    setImg2(imgUrl[indice][1]);
    setImg3(imgUrl[indice][2]);
    setDato1(dato[indice][0]);
    setDato2(dato[indice][1]);
    setDato3(dato[indice][2]);
  }, [indice, preguntaA, opcionesA, imgUrl, dato]);

  useEffect(() => {
    // Set background image when an option is selected
    if (opcSelect === opcion1 && img1) {
      setBackgroundImage(img1);
    } else if (opcSelect === opcion2 && img2) {
      setBackgroundImage(img2);
    } else if (opcSelect === opcion3 && img3) {
      setBackgroundImage(img3);
    }
  }, [opcSelect, img1, img2, img3, opcion1, opcion2, opcion3]);

  const verificarSeleccion = () => {
    if (opcSelect !== "") {
      setDisSig(false);
    }
    
    if (indice === 0) {
      setDisAtras(true);
    }

    // Update navigation indicators
    if (indice >= 0) {
      setT0("contadorOn");
    }
    if (indice >= 1) {
      setT1("contadorOn");
    }
    if (indice >= 2) {
      setT2("contadorOn");
    }
    if (indice >= 3) {
      setT3("contadorOn");
    }
    if (indice >= 4) {
      setT4("contadorOn");
    }
    if (indice >= 5) {
      setT5("contadorOn");
    }
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpcSelect(event.target.value);
    setDisSig(false);
  };

  const siguiente = () => {
    if (indice === 5) {
      addRespuesta(opcSelect);
      console.log(state.respuestasSer);
      setHidSig(true);
      setCalcular(false);
      setDisAtras(false);
      return;
    } else {
      setHidSig(false);
    }

    addRespuesta(opcSelect);
    console.log(state.respuestasSer);

    const newIndice = indice + 1;
    setIndice(newIndice);
    updateIndice(newIndice);

    setOpcSelect("");
    setDisSig(true);
    setDisAtras(false);
    setBackgroundImage("");
  };

  const atras = () => {
    if (indice === 0) {
      removeLastRespuesta();
      setDisAtras(true);
      return;
    }

    if (indice === 5) {
      removeLastRespuesta();
    }

    removeLastRespuesta();
    console.log(state.respuestasSer);

    const newIndice = indice - 1;
    setIndice(newIndice);
    updateIndice(newIndice);

    setOpcSelect("");
    setHidSig(false);
    setCalcular(true);
    setBackgroundImage("");

    // Reset navigation indicators
    resetIndicators(newIndice);
  };

  const resetIndicators = (index: number) => {
    if (index < 5) setT5("contador");
    if (index < 4) setT4("contador");
    if (index < 3) setT3("contador");
    if (index < 2) setT2("contador");
    if (index < 1) setT1("contador");
    if (index < 0) setT0("contador");
  };

  const regresarPerfil = () => {
    const confirmar = window.confirm(
      "¿Desea crear un nuevo perfir y restablecer las opciones seleccionadas?"
    );
    
    if (confirmar) {
      updateIndice(0);
      clearRespuestas();
      navigate("/profile");
    }
  };

  return (
    <main 
      className="relative w-full min-h-screen bg-deep-blue p-4 font-sans"
      style={{
        backgroundImage: backgroundImage ? `linear-gradient(rgba(0, 8, 53, 0.85), rgba(0, 8, 53, 0.9)), url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundBlendMode: 'overlay',
      }}
    >
      {/* User data section */}
      <div className="flex items-center gap-4 mb-6 bg-light-blue p-2 rounded-md shadow-md">
        <div className="h-12 w-12">
          <img src={avatar} alt="Avatar del usuario" className="w-full h-full object-cover rounded-full" />
        </div>
        <h1 className="text-xl font-bold">{nombre}</h1>
      </div>

      {/* Question title */}
      <div className="text-center mb-8">
        <h1 className="text-2xl text-white font-bold scale-in-ver-center bg-accent-blue bg-opacity-50 p-4 rounded-lg shadow-lg">
          {pregunta}
        </h1>
      </div>

      {/* Navigation indicators - Larger and more visible */}
      <div className="mb-12">
        <div className="flex flex-col gap-4 items-center">
          <button
            onClick={regresarPerfil}
            className="bg-accent-blue text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-light-blue hover:text-deep-blue transition-colors shadow-lg mb-4 text-lg font-semibold w-40"
          >
            <i className="fa-solid fa-user mr-2"></i>Perfil
          </button>
          
          <div className="flex flex-wrap justify-center gap-3 w-full max-w-3xl mx-auto px-2">
            <div className={`${t0} w-16 h-16 flex items-center justify-center rounded-full text-deep-blue font-bold text-xl border-4 ${t0 === "contadorOn" ? "border-accent-blue shadow-xl scale-110" : "border-light-blue opacity-70"} transition-all duration-300`}>1</div>
            <div className={`${t1} w-16 h-16 flex items-center justify-center rounded-full text-deep-blue font-bold text-xl border-4 ${t1 === "contadorOn" ? "border-accent-blue shadow-xl scale-110" : "border-light-blue opacity-70"} transition-all duration-300`}>2</div>
            <div className={`${t2} w-16 h-16 flex items-center justify-center rounded-full text-deep-blue font-bold text-xl border-4 ${t2 === "contadorOn" ? "border-accent-blue shadow-xl scale-110" : "border-light-blue opacity-70"} transition-all duration-300`}>3</div>
            <div className={`${t3} w-16 h-16 flex items-center justify-center rounded-full text-deep-blue font-bold text-xl border-4 ${t3 === "contadorOn" ? "border-accent-blue shadow-xl scale-110" : "border-light-blue opacity-70"} transition-all duration-300`}>4</div>
            <div className={`${t4} w-16 h-16 flex items-center justify-center rounded-full text-deep-blue font-bold text-xl border-4 ${t4 === "contadorOn" ? "border-accent-blue shadow-xl scale-110" : "border-light-blue opacity-70"} transition-all duration-300`}>5</div>
            <div className={`${t5} w-16 h-16 flex items-center justify-center rounded-full text-deep-blue font-bold text-xl border-4 ${t5 === "contadorOn" ? "border-accent-blue shadow-xl scale-110" : "border-light-blue opacity-70"} transition-all duration-300`}>6</div>
          </div>
        </div>
      </div>

      {/* Cards container - Fixed structure with proper styling */}
      <div className="flex flex-wrap justify-center gap-8 mb-8">
        {/* Card 1 */}
        <label htmlFor="opc1" className="card-container">
          <div className="relative w-[300px] h-[380px] cursor-pointer shadow-lg transform transition-transform hover:scale-105">
            <div className="w-full h-full rounded-lg overflow-hidden border-2 border-light-blue bg-white">
              <div className="w-full h-[85%] relative">
                <img src={img1} alt="imagen_playa" className="w-full h-full object-cover" />
              </div>
              <div className="h-[15%] bg-black bg-opacity-60 text-white flex items-center justify-center">
                <h3 className="text-lg font-medium">{opcion1}</h3>
              </div>
            </div>
            
            {/* Info on hover - simplified approach */}
            <div className="absolute inset-0 w-full h-full bg-light-blue text-accent-blue p-4 flex flex-col justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg border-2 border-accent-blue">
              <h3 className="text-xl font-bold mb-4">¿Sabias qué...</h3>
              <p className="text-base text-center">{dato1}</p>
            </div>
          </div>
        </label>

        {/* Card 2 */}
        <label htmlFor="opc2" className="card-container">
          <div className="relative w-[300px] h-[380px] cursor-pointer shadow-lg transform transition-transform hover:scale-105">
            <div className="w-full h-full rounded-lg overflow-hidden border-2 border-light-blue bg-white">
              <div className="w-full h-[85%] relative">
                <img src={img2} alt="imagen_montaña" className="w-full h-full object-cover" />
              </div>
              <div className="h-[15%] bg-black bg-opacity-60 text-white flex items-center justify-center">
                <h3 className="text-lg font-medium">{opcion2}</h3>
              </div>
            </div>
            
            {/* Info on hover - simplified approach */}
            <div className="absolute inset-0 w-full h-full bg-light-blue text-accent-blue p-4 flex flex-col justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg border-2 border-accent-blue">
              <h3 className="text-xl font-bold mb-4">¿Sabias qué...</h3>
              <p className="text-base text-center">{dato2}</p>
            </div>
          </div>
        </label>

        {/* Card 3 */}
        <label htmlFor="opc3" className="card-container">
          <div className="relative w-[300px] h-[380px] cursor-pointer shadow-lg transform transition-transform hover:scale-105">
            <div className="w-full h-full rounded-lg overflow-hidden border-2 border-light-blue bg-white">
              <div className="w-full h-[85%] relative">
                <img src={img3} alt="imagen_ciudad" className="w-full h-full object-cover" />
              </div>
              <div className="h-[15%] bg-black bg-opacity-60 text-white flex items-center justify-center">
                <h3 className="text-lg font-medium">{opcion3}</h3>
              </div>
            </div>
            
            {/* Info on hover - simplified approach */}
            <div className="absolute inset-0 w-full h-full bg-light-blue text-accent-blue p-4 flex flex-col justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg border-2 border-accent-blue">
              <h3 className="text-xl font-bold mb-4">¿Sabias qué...</h3>
              <p className="text-base text-center">{dato3}</p>
            </div>
          </div>
        </label>
      </div>

      {/* Radio buttons */}
      <form className="flex justify-center gap-16 mb-10">
        <div className="radio-container">
          <label className="flex items-center">
            <input
              id="opc1"
              type="radio"
              value={opcion1}
              name="opciones"
              checked={opcSelect === opcion1}
              onChange={handleRadioChange}
              className="form-radio h-6 w-6 text-accent-blue"
            />
          </label>
        </div>
        <div className="radio-container">
          <label className="flex items-center">
            <input
              id="opc2"
              type="radio"
              value={opcion2}
              name="opciones"
              checked={opcSelect === opcion2}
              onChange={handleRadioChange}
              className="form-radio h-6 w-6 text-accent-blue"
            />
          </label>
        </div>
        <div className="radio-container">
          <label className="flex items-center">
            <input
              id="opc3"
              type="radio"
              value={opcion3}
              name="opciones"
              checked={opcSelect === opcion3}
              onChange={handleRadioChange}
              className="form-radio h-6 w-6 text-accent-blue"
            />
          </label>
        </div>
      </form>

      {/* Action buttons - Fixed at bottom with better styling */}
      <div className="fixed bottom-0 left-0 right-0 bg-deep-blue bg-opacity-95 py-6 shadow-[0_-4px_20px_rgba(0,0,0,0.3)] z-50 backdrop-blur-sm border-t-2 border-accent-blue">
        <div className="flex justify-center items-center gap-8 px-4 max-w-4xl mx-auto">
          <button
            type="button"
            onClick={atras}
            disabled={disAtras}
            className="bg-light-blue text-deep-blue px-8 py-4 rounded-xl text-xl font-bold shadow-xl hover:bg-accent-blue hover:text-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed min-w-32 transform hover:scale-105 active:scale-95"
          >
            <i className="fa-solid fa-arrow-left mr-3"></i>Atrás
          </button>
          
          {!hidSig && (
            <button
              type="button"
              onClick={siguiente}
              disabled={disSig}
              className="bg-light-blue text-deep-blue px-8 py-4 rounded-xl text-xl font-bold shadow-xl hover:bg-accent-blue hover:text-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed min-w-32 transform hover:scale-105 active:scale-95"
            >
              Siguiente<i className="fa-solid fa-arrow-right ml-3"></i>
            </button>
          )}
          
          {!calcular && (
            <Link
              to="/results"
              className="bg-accent-blue text-white px-8 py-4 rounded-xl text-xl font-bold shadow-xl hover:bg-light-blue hover:text-deep-blue transition-all duration-300 inline-flex items-center min-w-36 justify-center transform hover:scale-105 active:scale-95 animate-pulse"
            >
              <i className="fa-solid fa-calculator mr-3"></i>Calcular Destino
            </Link>
          )}
        </div>
      </div>

      {/* Add extra padding at the bottom to compensate for fixed buttons */}
      <div className="h-28"></div>
    </main>
  );
}