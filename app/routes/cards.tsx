import { useState, useEffect } from "react";
import { Link, useNavigate } from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";
import { useDestino } from "~/services/destinationService";
import { questionClient } from "~/services/questionService";

// Importación de interfaces
import { Question, QuestionOption } from "~/services/Interfaces";

// Links para estilos
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

// Imagen por defecto cuando no hay imagen disponible o hay error al cargar
const DEFAULT_IMAGE = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB4PSIyIiB5PSIyIiB3aWR0aD0iMjk2IiBoZWlnaHQ9IjI5NiIgc3R5bGU9ImZpbGw6IzFhMWE1MDtzdHJva2U6IzRjOGRmZjtzdHJva2Utd2lkdGg6NDsiIC8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMThweCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJBcmlhbCxzYW5zLXNlcmlmIj5JbWFnZW4gbm8gZGlzcG9uaWJsZTwvdGV4dD48L3N2Zz4=";

export default function Cards() {
  const navigate = useNavigate();
  const { state, updateIndice, addRespuesta, removeLastRespuesta, clearRespuestas } = useDestino();

  // Estados base
  const [indice, setIndice] = useState(state.indice);
  const [uiState, setUiState] = useState({
    pregunta: "",
    opcSelect: "",
    disSig: true,
    disAtras: true,
    hidSig: false,
    calcular: true,
    backgroundImage: ""
  });

  const [cardContent, setCardContent] = useState({
    title1: "", title2: "", title3: "",
    opcion1: "", opcion2: "", opcion3: "",
    img1: "", img2: "", img3: "",
    dato1: "", dato2: "", dato3: ""
  });

  // Estados para datos de la API
  const [questions, setQuestions] = useState<Question[]>([]);
  const [allOptions, setAllOptions] = useState<QuestionOption[]>([]);
  const [currentOptions, setCurrentOptions] = useState<QuestionOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
  const userId = state.userId;

  // Cargar preguntas y opciones desde la API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Obtener todas las preguntas
        const questionsData = await questionClient.getQuestions();
        if (questionsData?.length > 0) {
          setQuestions(questionsData);

          // Obtener todas las opciones
          const optionsData = await questionClient.getAllOptions();
          setAllOptions(optionsData);
        } else {
          throw new Error("No se encontraron preguntas en la base de datos");
        }

      } catch (err: any) {
        console.error("Error al cargar datos:", err);
        setError(`Error al cargar las preguntas: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Actualizar la pregunta y opciones cuando cambia el índice o cuando se cargan los datos
  useEffect(() => {
    if (!isLoading && questions.length > 0) {
      updateCurrentQuestionAndOptions();
    }
  }, [indice, isLoading, questions, allOptions]);

  // Función para actualizar la pregunta y opciones actuales
  const updateCurrentQuestionAndOptions = () => {
    // Asegurarse de que hay preguntas disponibles y que el índice es válido
    if (questions.length === 0 || indice >= questions.length) {
      return;
    }

    // Obtener la pregunta actual   
    const currentQuestion = questions[indice];

    setUiState(prev => ({ ...prev, pregunta: currentQuestion.question_text }));

    // Filtrar las opciones para esta pregunta - ACTUALIZADO para el nuevo formato
    const options = allOptions.filter(
      option => option.questionId === currentQuestion.id
    );

    setCurrentOptions(options);

    // Si tenemos al menos 3 opciones, actualizar los estados
    if (options.length >= 3) {
      // Títulos (nuevo campo)
      setCardContent(prevState => ({
        ...prevState,
        title1: options[0].title || "",
        title2: options[1].title || "",
        title3: options[2].title || "",
        opcion1: options[0].title || "",
        opcion2: options[1].title || "",
        opcion3: options[2].title || "",
        dato1: options[0].description || "Información no disponible",
        dato2: options[1].description || "Información no disponible",
        dato3: options[2].description || "Información no disponible",
        img1: options[0].image || DEFAULT_IMAGE,
        img2: options[1].image || DEFAULT_IMAGE,
        img3: options[2].image || DEFAULT_IMAGE
      }));
    } else {
      console.warn(`La pregunta con ID ${currentQuestion.id} tiene menos de 3 opciones`);
    }

    verificarSeleccion();
  };

  // Initialize from context state
  useEffect(() => {
    setIndice(state.indice);

    if (state.indice > 0) {
      setUiState(prevState => ({
        ...prevState,
        disAtras: false
      }));
    }
  }, [state.indice]);

  useEffect(() => {
    // Set background image when an option is selected
    if (uiState.opcSelect === cardContent.opcion1 && cardContent.img1) {
      setUiState(prevState => ({
        ...prevState,
        backgroundImage: cardContent.img1
      }));
    } else if (uiState.opcSelect === cardContent.opcion2 && cardContent.img2) {
      setUiState(prevState => ({
        ...prevState,
        backgroundImage: cardContent.img2
      }));
    } else if (uiState.opcSelect === cardContent.opcion3 && cardContent.img3) {
      setUiState(prevState => ({
        ...prevState,
        backgroundImage: cardContent.img3
      }));
    }
  }, [uiState.opcSelect, cardContent]);

  const verificarSeleccion = () => {
    if (uiState.opcSelect !== "") {
      setUiState(prevState => ({
        ...prevState,
        disSig: false
      }));
    } else {
      setUiState(prevState => ({
        ...prevState,
        disSig: true
      }));
    }

    if (indice === 0) {
      setUiState(prevState => ({
        ...prevState,
        disAtras: true
      }));
    } else {
      setUiState(prevState => ({
        ...prevState,
        disAtras: false
      }));
    }

    // Update navigation indicators
    if (indice >= 0) setT0("contadorOn");
    if (indice >= 1) setT1("contadorOn");
    if (indice >= 2) setT2("contadorOn");
    if (indice >= 3) setT3("contadorOn");
    if (indice >= 4) setT4("contadorOn");
    if (indice >= 5) setT5("contadorOn");
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUiState(prevState => ({
      ...prevState,
      opcSelect: event.target.value,
      disSig: false
    }));
  };

  // Función para manejar errores de imágenes
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = DEFAULT_IMAGE;
  };

  // Función para guardar la respuesta en el backend
  const saveAnswerToBackend = async (questionId: number, optionId: number) => {
    console.log("Valor de userId:", state.userId);
    if (!userId) {
      console.warn("No se puede guardar la respuesta: ID de usuario no disponible");
      return;
    }
  
    const body = {
      id: 0, 
      userId: userId,
      questionId: questionId,
      questionOptionId: optionId,
      date: new Date().toISOString(), 
    };
  
    try {
      const response = await fetch("http://localhost:5222/api/Answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
  
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }
  
      console.log(`Respuesta guardada exitosamente: ${JSON.stringify(body)}`);
    } catch (err) {
      console.error("Error al guardar respuesta en el servidor:", err);
      // Continuamos aunque falle el guardado en el backend
    }
  };

  const getSelectedOptionId = (): number | null => {
    // Encontrar la opción seleccionada
    const option = currentOptions.find(opt => opt.title === uiState.opcSelect);
    return option ? option.id : null;
  };

  const siguiente = async () => {
    const currentQuestion = questions[indice];
    const optionId = getSelectedOptionId();

    // Solo guardamos si tenemos tanto el ID de la pregunta como el de la opción
    if (currentQuestion && optionId) {
      await saveAnswerToBackend(currentQuestion.id, optionId);
    }

    // La última pregunta
    const isLastQuestion = indice === questions.length - 1 || indice === 5;

    if (isLastQuestion) {
      addRespuesta(uiState.opcSelect);
      setUiState(prevState => ({
        ...prevState,
        hidSig: true,
        calcular: false,
        disAtras: false
      }));
      return;
    }

    addRespuesta(uiState.opcSelect);

    const newIndice = indice + 1;
    setIndice(newIndice);
    updateIndice(newIndice);

    setUiState(prevState => ({
      ...prevState,
      opcSelect: "",
      disSig: true,
      backgroundImage: ""
    }));
  };



  const atras = () => {
    if (indice === 0) {
      return;
    }

    removeLastRespuesta();

    const newIndice = indice - 1;
    setIndice(newIndice);
    updateIndice(newIndice);

    setUiState(prevState => ({
      ...prevState,
      opcSelect: "",
      hidSig: false,
      calcular: true,
      backgroundImage: ""
    }));

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
      "¿Desea crear un nuevo perfil y restablecer las opciones seleccionadas?"
    );

    if (confirmar) {
      updateIndice(0);
      clearRespuestas();
      navigate("/profile");
    }
  };

  const getBackgroundOpacity = () => {
    if (!uiState.opcSelect) return { start: 0.5, end: 0.6 };

    if (uiState.opcSelect === cardContent.opcion1) return { start: 0.3, end: 0.4 };
    if (uiState.opcSelect === cardContent.opcion2) return { start: 0.35, end: 0.45 };
    if (uiState.opcSelect === cardContent.opcion3) return { start: 0.4, end: 0.5 };

    return { start: 0.5, end: 0.6 };
  };

  const opacity = getBackgroundOpacity();

  // Si está cargando, mostrar un spinner
  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-deep-blue flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-accent-blue border-t-transparent"></div>
          <p className="mt-4 text-white text-lg">Cargando preguntas...</p>
        </div>
      </div>
    );
  }

  // Si hay un error, mostrar un mensaje
  if (error) {
    return (
      <div className="min-h-screen w-full bg-deep-blue flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-lg w-full">
          <div className="text-center">
            <i className="fas fa-exclamation-circle text-red-500 text-4xl mb-4"></i>
            <h2 className="text-white text-xl font-bold mb-2">¡Ups! Algo salió mal</h2>
            <p className="text-light-blue mb-6">{error}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="bg-accent-blue hover:bg-light-blue hover:text-deep-blue text-white py-2 px-4 rounded-lg transition-all"
              >
                <i className="fas fa-sync-alt mr-2"></i> Intentar de nuevo
              </button>
              <button
                onClick={() => navigate("/profile")}
                className="bg-deep-blue border border-accent-blue text-white py-2 px-4 rounded-lg transition-all hover:bg-accent-blue"
              >
                <i className="fas fa-user mr-2"></i> Volver al perfil
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // In your option selection handler, add logging to verify the values
  const handleOptionSelect = (opcion: any) => {
    console.log(`Selected option: ${opcion} for question at index ${indice}`);
    
    // Store your selection
    setUiState(prev => ({ ...prev, opcSelect: opcion, disSig: false }));
    
    // Save the selection in your service
    const respuesta = opcion;
    addRespuesta(respuesta);
    
    // Log all responses to verify
    console.log("Current responses in service:", state.respuestasSer);
  };

  return (
    <main
      className="relative w-full min-h-screen p-4 md:p-6 font-sans overflow-x-hidden"
      style={{
        backgroundImage: uiState.backgroundImage
          ? `linear-gradient(rgba(0, 0, 0, ${opacity.start}), rgba(0, 0, 0, ${opacity.end})), url(${uiState.backgroundImage})`
          : 'linear-gradient(rgba(0, 8, 53, 0.9), rgba(0, 8, 53, 0.95))',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundBlendMode: 'normal',
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
          {uiState.pregunta}
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

        {/* Card 1 */}
        <div className="h-[400px] card-wrapper">
          <input
            id="opc1"
            type="radio"
            value={cardContent.opcion1}
            name="opciones"
            checked={uiState.opcSelect === cardContent.opcion1}
            onChange={handleRadioChange}
            className="hidden"
          />
          <label
            htmlFor="opc1"
            className="block h-full w-full cursor-pointer relative"
          >
            <div className={`h-full w-full rounded-xl overflow-hidden shadow-lg ${uiState.opcSelect === cardContent.opcion1 ? 'ring-4 ring-accent-blue scale-105' : ''} transition-all duration-300 hover:shadow-accent-blue/30 hover:-translate-y-1`}>
              <div className="relative h-full w-full">
                <div className="absolute inset-0 flex flex-col bg-white/10 backdrop-blur-sm">
                  <div className="relative h-4/5 overflow-hidden">
                    <img
                      src={cardContent.img1}
                      alt={cardContent.opcion1}
                      className="w-full h-full object-cover"
                      onError={handleImageError}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-blue to-transparent opacity-40"></div>
                  </div>

                  <div className="p-4 h-1/5 flex-grow bg-gradient-to-b from-deep-blue/80 to-deep-blue flex flex-col justify-between">
                    <h3 className="text-xl font-bold text-white text-center">{cardContent.opcion1}</h3>
                    <div className="text-light-blue/90 text-sm overflow-y-auto flex-grow opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2">
                      <p>{cardContent.dato1}</p>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 bg-accent-blue/90 flex items-center justify-center p-6 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-4">{cardContent.opcion1}</h3>
                    <p className="text-white">{cardContent.dato1}</p>
                  </div>
                </div>
              </div>
            </div>
          </label>
        </div>

        {/* Card 2 */}
        <div className="h-[400px] card-wrapper">
          <input
            id="opc2"
            type="radio"
            value={cardContent.opcion2}
            name="opciones"
            checked={uiState.opcSelect === cardContent.opcion2}
            onChange={handleRadioChange}
            className="hidden"
          />
          <label
            htmlFor="opc2"
            className="block h-full w-full cursor-pointer relative"
          >
            <div className={`h-full w-full rounded-xl overflow-hidden shadow-lg ${uiState.opcSelect === cardContent.opcion2 ? 'ring-4 ring-accent-blue scale-105' : ''} transition-all duration-300 hover:shadow-accent-blue/30 hover:-translate-y-1`}>
              <div className="relative h-full w-full">
                <div className="absolute inset-0 flex flex-col bg-white/10 backdrop-blur-sm">
                  <div className="relative h-4/5 overflow-hidden">
                    <img
                      src={cardContent.img2}
                      alt={cardContent.opcion2}
                      className="w-full h-full object-cover"
                      onError={handleImageError}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-blue to-transparent opacity-40"></div>
                  </div>

                  <div className="p-4 h-1/5 flex-grow bg-gradient-to-b from-deep-blue/80 to-deep-blue flex flex-col justify-between">
                    <h3 className="text-xl font-bold text-white text-center">{cardContent.opcion2}</h3>
                    <div className="text-light-blue/90 text-sm overflow-y-auto flex-grow opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2">
                      <p>{cardContent.dato2}</p>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 bg-accent-blue/90 flex items-center justify-center p-6 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-4">{cardContent.opcion2}</h3>
                    <p className="text-white">{cardContent.dato2}</p>
                  </div>
                </div>
              </div>
            </div>
          </label>
        </div>

        {/* Card 3 */}
        <div className="h-[400px] card-wrapper">
          <input
            id="opc3"
            type="radio"
            value={cardContent.opcion3}
            name="opciones"
            checked={uiState.opcSelect === cardContent.opcion3}
            onChange={handleRadioChange}
            className="hidden"
          />
          <label
            htmlFor="opc3"
            className="block h-full w-full cursor-pointer relative"
          >
            <div className={`h-full w-full rounded-xl overflow-hidden shadow-lg ${uiState.opcSelect === cardContent.opcion3 ? 'ring-4 ring-accent-blue scale-105' : ''} transition-all duration-300 hover:shadow-accent-blue/30 hover:-translate-y-1`}>
              <div className="relative h-full w-full">
                <div className="absolute inset-0 flex flex-col bg-white/10 backdrop-blur-sm">
                  <div className="relative h-4/5 overflow-hidden">
                    <img
                      src={cardContent.img3}
                      alt={cardContent.opcion3}
                      className="w-full h-full object-cover"
                      onError={handleImageError}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-blue to-transparent opacity-40"></div>
                  </div>

                  <div className="p-4 h-1/5 flex-grow bg-gradient-to-b from-deep-blue/80 to-deep-blue flex flex-col justify-between">
                    <h3 className="text-xl font-bold text-white text-center">{cardContent.opcion3}</h3>
                    <div className="text-light-blue/90 text-sm overflow-y-auto flex-grow opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2">
                      <p>{cardContent.dato3}</p>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 bg-accent-blue/90 flex items-center justify-center p-6 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-4">{cardContent.opcion3}</h3>
                    <p className="text-white">{cardContent.dato3}</p>
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
            disabled={uiState.disAtras}
            className="bg-light-blue text-deep-blue px-6 py-3 rounded-lg font-bold shadow-lg hover:bg-accent-blue hover:text-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <i className="fa-solid fa-arrow-left"></i>Atrás
          </button>

          {!uiState.hidSig && (
            <button
              type="button"
              onClick={siguiente}
              disabled={uiState.disSig}
              className="bg-accent-blue text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:bg-light-blue hover:text-deep-blue transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
            >
              Siguiente<i className="fa-solid fa-arrow-right"></i>
            </button>
          )}

          {!uiState.calcular && (
            <Link
              to="/results"
              className="bg-accent-blue text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:bg-light-blue hover:text-deep-blue transition-all duration-300 flex items-center gap-2 animate-pulse"
            >
              <i className="fa-solid fa-calculator"></i>Calcular
            </Link>
          )}
        </div>
      </div>
    </main >
  );
}