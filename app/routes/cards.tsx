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

  const getBackgroundOpacity = () => {
    // Valores de opacidad mucho más bajos para mostrar más la imagen
    if (!opcSelect) return { start: 0.5, end: 0.6 }; // Opacidad por defecto reducida

    if (opcSelect === opcion1) return { start: 0.3, end: 0.4 }; // Mucho menos opaco para opción 1
    if (opcSelect === opcion2) return { start: 0.35, end: 0.45 }; // Menos opaco para opción 2
    if (opcSelect === opcion3) return { start: 0.4, end: 0.5 }; // Menos opaco para opción 3

    return { start: 0.5, end: 0.6 }; // Valor por defecto reducido
  };

  const opacity = getBackgroundOpacity();

  return (
    <main
      className="relative w-full min-h-screen p-4 md:p-6 font-sans overflow-x-hidden"
      style={{
        // Uso de un overlay menos azulado y más neutro/transparente
        backgroundImage: backgroundImage
          ? `linear-gradient(rgba(0, 0, 0, ${opacity.start}), rgba(0, 0, 0, ${opacity.end})), url(${backgroundImage})`
          : 'linear-gradient(rgba(0, 8, 53, 0.9), rgba(0, 8, 53, 0.95))',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundBlendMode: 'normal', // Cambiado de 'overlay' a 'normal' para más claridad
        transition: 'all 0.5s ease-in-out'
      }}
    >
      {/* User profile header with avatar */}
      <div className="flex items-center gap-4 mb-6 bg-black/30 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-white/20">
        <div className="h-12 w-12 rounded-full overflow-hidden shadow-md border-2 border-light-blue">
          <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
        </div>
        <h2 className="text-xl font-bold text-white">¡Hola, {nombre}!</h2>
      </div>

      {/* Question title with animation */}
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl text-white font-bold scale-in-ver-center bg-black/40 backdrop-blur-sm p-5 rounded-lg shadow-lg border border-white/20">
          {pregunta}
        </h1>
      </div>

      {/* Progress indicators */}
      <div className="mb-10">
        <div className="flex flex-col gap-4 items-center">
          <button
            onClick={regresarPerfil}
            className="bg-accent-blue text-white px-5 py-2 rounded-lg hover:bg-light-blue hover:text-deep-blue transition-all duration-300 shadow-lg font-medium flex items-center gap-2"
          >
            <i className="fa-solid fa-user"></i>Cambiar Perfil
          </button>

          <div className="w-full max-w-3xl mx-auto flex justify-center gap-2 mt-4 px-1 flex-wrap">
            {[t0, t1, t2, t3, t4, t5].map((t, i) => (
              <div
                key={i}
                className={`w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center rounded-full text-deep-blue font-bold text-lg border-3 ${t === "contadorOn"
                  ? "bg-accent-blue text-white shadow-lg scale-110"
                  : "bg-light-blue/70 opacity-70"
                  } transition-all duration-300`}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cards grid - responsive with proper gap */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-28">

        {/* Card 1 - Fix with explicit heights */}
        <div className="h-[400px] card-wrapper">
          <input
            id="opc1"
            type="radio"
            value={opcion1}
            name="opciones"
            checked={opcSelect === opcion1}
            onChange={handleRadioChange}
            className="hidden"
          />
          <label
            htmlFor="opc1"
            className="block h-full w-full cursor-pointer relative"
          >
            <div className={`h-full w-full rounded-xl overflow-hidden shadow-lg ${opcSelect === opcion1 ? 'ring-4 ring-accent-blue scale-105' : ''} transition-all duration-300 hover:shadow-accent-blue/30 hover:-translate-y-1`}>
              {/* Card with front/back sides */}
              <div className="relative h-full w-full">
                {/* Front side (always visible) */}
                <div className="absolute inset-0 flex flex-col bg-white/10 backdrop-blur-sm">
                  {/* Image container */}
                  <div className="relative h-4/5 overflow-hidden">
                    <img
                      src={img1}
                      alt={opcion1}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-blue to-transparent opacity-40"></div>
                  </div>

                  {/* Title area */}
                  <div className="p-4 h-1/5 flex-grow bg-gradient-to-b from-deep-blue/80 to-deep-blue flex flex-col justify-between">
                    <h3 className="text-xl font-bold text-white text-center">{opcion1}</h3>

                    {/* Info text (hidden by default, shown on hover) */}
                    <div className="text-light-blue/90 text-sm overflow-y-auto flex-grow opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2">
                      <p>{dato1}</p>
                    </div>
                  </div>
                </div>

                {/* Hover info overlay */}
                <div className="absolute inset-0 bg-accent-blue/90 flex items-center justify-center p-6 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-4">{opcion1}</h3>
                    <p className="text-white">{dato1}</p>
                  </div>
                </div>
              </div>
            </div>
          </label>
        </div>

        {/* Card 2 - Fix with explicit heights */}
        <div className="h-[400px] card-wrapper">
          <input
            id="opc2"
            type="radio"
            value={opcion2}
            name="opciones"
            checked={opcSelect === opcion2}
            onChange={handleRadioChange}
            className="hidden"
          />
          <label
            htmlFor="opc2"
            className="block h-full w-full cursor-pointer relative"
          >
            <div className={`h-full w-full rounded-xl overflow-hidden shadow-lg ${opcSelect === opcion2 ? 'ring-4 ring-accent-blue scale-105' : ''} transition-all duration-300 hover:shadow-accent-blue/30 hover:-translate-y-1`}>
              {/* Card with front/back sides */}
              <div className="relative h-full w-full">
                {/* Front side (always visible) */}
                <div className="absolute inset-0 flex flex-col bg-white/10 backdrop-blur-sm">
                  {/* Image container */}
                  <div className="relative h-4/5 overflow-hidden">
                    <img
                      src={img2}
                      alt={opcion2}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-blue to-transparent opacity-40"></div>
                  </div>

                  {/* Title area */}
                  <div className="p-4 h-1/5 flex-grow bg-gradient-to-b from-deep-blue/80 to-deep-blue flex flex-col justify-between">
                    <h3 className="text-xl font-bold text-white text-center">{opcion2}</h3>

                    {/* Info text (hidden by default, shown on hover) */}
                    <div className="text-light-blue/90 text-sm overflow-y-auto flex-grow opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2">
                      <p>{dato2}</p>
                    </div>
                  </div>
                </div>

                {/* Hover info overlay */}
                <div className="absolute inset-0 bg-accent-blue/90 flex items-center justify-center p-6 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-4">{opcion2}</h3>
                    <p className="text-white">{dato2}</p>
                  </div>
                </div>
              </div>
            </div>
          </label>
        </div>

        {/* Card 3 - Fix with explicit heights */}
        <div className="h-[400px] card-wrapper">
          <input
            id="opc3"
            type="radio"
            value={opcion3}
            name="opciones"
            checked={opcSelect === opcion3}
            onChange={handleRadioChange}
            className="hidden"
          />
          <label
            htmlFor="opc3"
            className="block h-full w-full cursor-pointer relative"
          >
            <div className={`h-full w-full rounded-xl overflow-hidden shadow-lg ${opcSelect === opcion3 ? 'ring-4 ring-accent-blue scale-105' : ''} transition-all duration-300 hover:shadow-accent-blue/30 hover:-translate-y-1`}>
              {/* Card with front/back sides */}
              <div className="relative h-full w-full">
                {/* Front side (always visible) */}
                <div className="absolute inset-0 flex flex-col bg-white/10 backdrop-blur-sm">
                  {/* Image container */}
                  <div className="relative h-4/5 overflow-hidden">
                    <img
                      src={img3}
                      alt={opcion3}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-blue to-transparent opacity-40"></div>
                  </div>

                  {/* Title area */}
                  <div className="p-4 h-1/5 flex-grow bg-gradient-to-b from-deep-blue/80 to-deep-blue flex flex-col justify-between">
                    <h3 className="text-xl font-bold text-white text-center">{opcion3}</h3>

                    {/* Info text (hidden by default, shown on hover) */}
                    <div className="text-light-blue/90 text-sm overflow-y-auto flex-grow opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2">
                      <p>{dato3}</p>
                    </div>
                  </div>
                </div>

                {/* Hover info overlay */}
                <div className="absolute inset-0 bg-accent-blue/90 flex items-center justify-center p-6 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-4">{opcion3}</h3>
                    <p className="text-white">{dato3}</p>
                  </div>
                </div>
              </div>
            </div>
          </label>
        </div>
      </div>

      {/* Navigation buttons - fixed bottom position */}
      <div className="fixed bottom-0 left-0 right-0 bg-deep-blue/95 backdrop-blur-md py-4 border-t border-accent-blue/30 shadow-[0_-5px_15px_rgba(0,0,0,0.3)] z-50">
        <div className="container mx-auto flex justify-center items-center gap-4 px-4">
          <button
            type="button"
            onClick={atras}
            disabled={disAtras}
            className="bg-light-blue text-deep-blue px-6 py-3 rounded-lg font-bold shadow-lg hover:bg-accent-blue hover:text-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <i className="fa-solid fa-arrow-left"></i>Atrás
          </button>

          {!hidSig && (
            <button
              type="button"
              onClick={siguiente}
              disabled={disSig}
              className="bg-accent-blue text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:bg-light-blue hover:text-deep-blue transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
            >
              Siguiente<i className="fa-solid fa-arrow-right"></i>
            </button>
          )}

          {!calcular && (
            <Link
              to="/results"
              className="bg-accent-blue text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:bg-light-blue hover:text-deep-blue transition-all duration-300 flex items-center gap-2 animate-pulse"
            >
              <i className="fa-solid fa-calculator"></i>Calcular
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}