import { LinksFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { useEffect, useState, useRef } from "react";
import { useDestino, findDestinationByAnswers, type Destination } from "~/services/destinationService";
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
 
// Función para mapear respuestas a IDs
const mapearRespuestasAIds = (respuestas: string[]): number[] => {
  const mapeo: { [key: string]: number } = {
    // Entorno/Destino
    'Playa': 1,
    'Montaña': 2,
    'Ciudad': 3,
   
    // Clima
    'Caluroso': 4,
    'Templado': 5,
    'Frío': 6,
   
    // Actividad
    'Deportes y Aventuras': 7,
    'Cultura y Museos': 8,
    'Relax y Bienestar': 9,
   
    // Alojamiento
    'Hotel de Lujo': 10,
    'Hostal o Albergue': 11,
    'Airbnb': 12,
   
    // Duración
    'Menos de una semana': 13,
    '1-2 semanas': 14,
    'Más de dos semanas': 15,
   
    // Edad
    'Menos de 30 años': 16,
    '30-50 años': 17,
    'Más de 50 años': 18
  };
 
  const ids = respuestas.map(respuesta => {
    const id = mapeo[respuesta.trim()];
    console.log(`📝 Mapeando: "${respuesta}" → ${id}`);
    return id;
  }).filter(id => id !== undefined);
 
  console.log('🔄 Mapeo completo:', {
    respuestas: respuestas,
    ids: ids
  });
 
  return ids;
};
 
export default function Results() {
  const navigate = useNavigate();
  const { state, updateIndice, updateDestinos, updateSrcImages } = useDestino();
  const [showingResults, setShowingResults] = useState(true);
  const [countdown, setCountdown] = useState(10);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
 
  // Get responses from the service
  const pDestino = state.respuestasSer[0] || "";
  const pClimatica = state.respuestasSer[1] || "";
  const pActividad = state.respuestasSer[2] || "";
  const pAlojamiento = state.respuestasSer[3] || "";
  const dViaje = state.respuestasSer[4] || "";
  const edad = state.respuestasSer[5] || "";
 
  const volverAtras = () => {
    // Limpiar timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
 
    // Limpiar localStorage
    localStorage.removeItem('userAnswers');
   
    // Reinicia el estado global
    updateIndice(0);
    updateDestinos("", "");
    updateSrcImages("", "");
 
    navigate("/cards");
  };
 
  const irADestinos = async () => {
    try {
      console.log('🚀 === PROCESANDO RESPUESTAS PARA DESTINOS ===');
     
      // Convertir respuestas a IDs
      const respuestas = [pDestino, pClimatica, pActividad, pAlojamiento, dViaje, edad];
      console.log('📋 Respuestas originales:', respuestas);
     
      const userAnswers = mapearRespuestasAIds(respuestas);
     
      if (userAnswers.length !== 6) {
        console.error('❌ Respuestas incompletas');
        await usarDestinosPorDefecto();
        navigate("/destination");
        return;
      }
 
      // Guardar en localStorage
      localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
      console.log('💾 Respuestas guardadas en localStorage:', userAnswers);
     
      try {
        // Intentar buscar destino con hash
        const result = await findDestinationByAnswers(userAnswers);
        console.log('🎯 Destino encontrado con hash:', result);
       
        // Actualizar servicio con datos del resultado
        if (result.firstCity && result.secondCity) {
          updateDestinos(result.firstCity.description, result.secondCity.description);
          updateSrcImages(result.firstCity.imagePath, result.secondCity.imagePath);
        }
       
      } catch (err: any) {
        console.error('❌ Error con hash, usando destinos por defecto:', err);
        console.log('🏝️ Tus gustos son demasiado exóticos, usando destinos recomendados...');
        await usarDestinosPorDefecto();
      }
     
      // Navegar a destinos
      navigate("/destination");
     
    } catch (error) {
      console.error('❌ Error general:', error);
      await usarDestinosPorDefecto();
      navigate("/destination");
    }
  };
 
  const usarDestinosPorDefecto = async () => {
    try {
      console.log('🏝️ === USANDO DESTINOS POR DEFECTO ===');
      console.log('💬 Mensaje: Tus gustos son demasiado exóticos');
     
      // Intentar cargar desde la API
      try {
        const [boraBoraCity, dubaiCity] = await Promise.all([
          cityClient.getCityByName("Bora Bora"),
          cityClient.getCityByName("Dubai"),
        ]);
 
        updateDestinos(boraBoraCity.description, dubaiCity.description);
        updateSrcImages(boraBoraCity.imagePath, dubaiCity.imagePath);
        console.log('✅ Destinos por defecto cargados desde API');
       
      } catch (apiError) {
        console.error('❌ Error cargando desde API, usando fallback final:', apiError);
       
        // Fallback final con datos hardcodeados
        updateDestinos("Bora Bora", "Dubai");
        updateSrcImages("/img/BoraBora.jpg", "/img/dubai.jpg");
        console.log('✅ Destinos por defecto cargados (fallback)');
      }
     
    } catch (err) {
      console.error('❌ Error en destinos por defecto:', err);
      // Fallback absoluto
      updateDestinos("Destino Exótico", "Destino Urbano");
      updateSrcImages("/img/default1.jpg", "/img/default2.jpg");
    }
  };
 
  useEffect(() => {
    // Verificar que tenemos todas las respuestas
    if (!pDestino || !pClimatica || !pActividad || !pAlojamiento || !dViaje || !edad) {
      console.warn("Missing some responses, redirecting back to cards");
      volverAtras();
      return;
    }
 
    console.log('✅ Todas las respuestas presentes, mostrando resultados');
 
    // Configurar countdown
    intervalRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
 
    // Auto-navegación después de 10 segundos
    timeoutRef.current = setTimeout(() => {
      irADestinos();
    }, 10000);
 
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [pDestino, pClimatica, pActividad, pAlojamiento, dViaje, edad]);
 
  // Array of preferences for rendering
  const preferences = [
    { label: "Preferencia Destino", value: pDestino, icon: "fa-map-location-dot", color: "bg-blue-500" },
    { label: "Preferencia Climática", value: pClimatica, icon: "fa-sun", color: "bg-orange-500" },
    { label: "Preferencia Actividad", value: pActividad, icon: "fa-person-hiking", color: "bg-green-500" },
    { label: "Preferencia Alojamiento", value: pAlojamiento, icon: "fa-hotel", color: "bg-purple-500" },
    { label: "Duración viaje", value: dViaje, icon: "fa-calendar-days", color: "bg-red-500" },
    { label: "Edad", value: edad, icon: "fa-user-group", color: "bg-pink-500" }
  ];
 
  return (
    <main className="min-h-screen bg-gradient-to-b from-deep-blue to-deep-blue/90 py-8 px-4 md:px-8 font-sans">
      {/* Hero section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 relative inline-block">
          🎯 Tus Preferencias de Viaje
          <span className="block h-1 bg-accent-blue mt-2 w-0 group-hover:w-full transition-all duration-300 animate-[grow_1s_ease-out_forwards]"></span>
        </h1>
       
        <p className="text-light-blue/90 max-w-2xl mx-auto mb-6">
          Estas son las preferencias que seleccionaste. Estamos analizando tus respuestas para encontrar el destino perfecto.
        </p>
 
        {/* Countdown */}
        <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 inline-block border border-white/20">
          <p className="text-white flex items-center gap-2">
            <i className="fas fa-clock text-accent-blue"></i>
            Procesando en {countdown} segundos...
          </p>
        </div>
      </div>
 
      {/* Main content container */}
      <div className="max-w-6xl mx-auto relative mb-16">
        {/* Flying plane animation */}
        <div className="absolute -top-12 -right-8 md:right-0 z-10 hidden md:block">
          <div className="relative w-24 h-24">
            <i className="fas fa-paper-plane text-accent-blue text-4xl absolute animate-custom-plane-flight"></i>
            <svg className="absolute top-12 right-0 w-20 h-20 text-accent-blue/20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,50 Q25,40 50,50 T100,50" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" fill="none" />
            </svg>
          </div>
        </div>
 
        {/* Content box */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-white/10">
          {/* Preferences grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
            {preferences.map((pref, index) => (
              <div
                key={index}
                className="bg-white/5 p-6 rounded-xl backdrop-blur-sm border border-white/10 hover:border-accent-blue/50 hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-full ${pref.color} flex items-center justify-center shadow-lg`}>
                    <i className={`fas ${pref.icon} text-white text-xl`}></i>
                  </div>
                  <div className="flex-1">
                    <p className="text-light-blue/70 text-sm font-medium">{pref.label}</p>
                    <p className="text-white font-semibold text-lg">{pref.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
         
          {/* Action buttons */}
          <div className="border-t border-white/10 p-6 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={irADestinos}
              className="bg-accent-blue hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <i className="fas fa-plane mr-2"></i>
              Ver destinos ahora
            </button>
           
            <button
              onClick={volverAtras}
              className="bg-light-blue/20 hover:bg-light-blue/30 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Cambiar respuestas
            </button>
          </div>
        </div>
      </div>
 
      {/* Bottom decoration */}
      <div className="text-center">
        <div className="inline-block relative">
          <i className="fas fa-globe-americas text-light-blue/40 text-6xl"></i>
          <i className="fas fa-map-pin text-red-500/80 text-lg absolute top-2 left-6 animate-bounce"></i>
          <i className="fas fa-map-pin text-yellow-500/80 text-lg absolute bottom-3 right-5 animate-bounce" style={{ animationDelay: '0.5s' }}></i>
        </div>
        <p className="text-white/50 mt-4">
          🔍 Analizando tus preferencias para encontrar el destino ideal...
        </p>
      </div>
    </main>
  );
}
 