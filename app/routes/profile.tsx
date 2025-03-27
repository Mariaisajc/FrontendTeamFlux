import { useState, useEffect, useRef } from "react";
import { useNavigate } from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";
import { useDestino } from "~/services/destinationService";

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

export default function Profile() {
  const navigate = useNavigate();
  const { updateUserInfo, updateAvatar } = useDestino();
  
  const [slideIndex, setSlideIndex] = useState(1);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [estadoCorreo, setEstadoCorreo] = useState("");
  const [controlBoton, setControlBoton] = useState(true);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isNameFocused, setIsNameFocused] = useState(false);

  const slidesRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  
  const avatars = [
    "/img/img-avatar/ava11.png",
    "/img/img-avatar/ava12.png",
    "/img/img-avatar/ava13.png",
    "/img/img-avatar/ava14.png"
  ];

  useEffect(() => {
    showSlides();
  }, [slideIndex]);

  const plusSlides = (n: number) => {
    let newIndex = slideIndex + n;
    if (newIndex > avatars.length) newIndex = 1;
    if (newIndex < 1) newIndex = avatars.length;
    setSlideIndex(newIndex);
  };

  const currentSlide = (n: number) => {
    setSlideIndex(n);
  };

  const showSlides = () => {
    if (!slidesRef.current || !dotsRef.current) return;

    const slides = slidesRef.current.children;
    const dots = dotsRef.current.children;

    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
      (slides[i] as HTMLElement).style.display = "none";
    }

    // Remove active class from all dots
    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }

    // Show current slide and activate dot
    (slides[slideIndex - 1] as HTMLElement).style.display = "block";
    dots[slideIndex - 1].className += " active";
  };

  const verificarNomb = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nomUsuario = event.target.value;
    setNombre(nomUsuario);

    if (nomUsuario === "") {
      setEstadoCorreo("Escribe su nombre");
    } else {
      // If we have both a name and valid email, enable the button
      if (correo !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
        setControlBoton(false);
      }
    }
  };

  const verificarCorreo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const correoUsuario = event.target.value;
    setCorreo(correoUsuario);

    if (correoUsuario === "") {
      setEstadoCorreo("Escribe un correo electrónico");
      setControlBoton(true);
    } else {
      const regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (regEmail.test(correoUsuario)) {
        setEstadoCorreo("");
        // Only enable button if we also have a name
        setControlBoton(nombre === "");
      } else {
        setEstadoCorreo("Escribe un correo válido");
        setControlBoton(true);
      }
    }
  };

  const datosUsuario = () => {
    // Update the service with form data
    updateUserInfo(nombre, correo);

    // Set avatar based on slide index
    updateAvatar(avatars[slideIndex - 1]);

    // Navigate to cards page
    navigate("/cards");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-deep-blue to-deep-blue/90 py-8 px-4 md:px-8 font-sans flex items-center justify-center">
      <div className="w-full max-w-4xl">
        {/* Main container */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 shadow-xl">
          <h2 className="bg-gradient-to-r from-accent-blue to-accent-blue/70 text-white text-center text-2xl py-4 font-bold">
            Crea tu perfil de viajero
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Avatar section - Left side */}
            <div className="p-6 flex flex-col">
              <h3 className="text-white text-xl font-medium text-center mb-6">
                Selecciona un avatar
              </h3>
              
              {/* Avatar carousel container */}
              <div className="relative flex-grow">
                <div 
                  ref={slidesRef}
                  className="h-full flex items-center justify-center"
                >
                  {avatars.map((avatar, index) => (
                    <div key={index} className="fade w-full h-full text-center hidden">
                      <div className="avatar-container bg-white/10 backdrop-blur-sm p-4 rounded-full mx-auto aspect-square w-3/4 max-w-xs overflow-hidden">
                        <img
                          src={avatar}
                          alt={`Avatar option ${index + 1}`}
                          className="w-full h-full object-cover rounded-full transition-transform hover:scale-105 duration-300"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Prev/Next buttons with improved styling */}
                <button 
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-accent-blue/50 hover:bg-accent-blue text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                  onClick={() => plusSlides(-1)}
                  aria-label="Previous avatar"
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                
                <button 
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-accent-blue/50 hover:bg-accent-blue text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                  onClick={() => plusSlides(1)}
                  aria-label="Next avatar"
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
              
              {/* Dots navigation */}
              <div 
                ref={dotsRef}
                className="flex justify-center gap-3 mt-6"
              >
                {avatars.map((_, index) => (
                  <button 
                    key={index}
                    onClick={() => currentSlide(index + 1)} 
                    className="w-4 h-4 rounded-full bg-white/50 hover:bg-white/80 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-blue"
                    aria-label={`Select avatar ${index + 1}`}
                  ></button>
                ))}
              </div>
            </div>
            
            {/* Form section - Right side */}
            <div className="p-6 flex flex-col bg-deep-blue/30">
              <h3 className="text-white text-xl font-medium mb-6 text-center">
                Tus datos
              </h3>
              
              {/* Form with modern styling */}
              <div className="flex flex-col gap-6 flex-grow">
                <div className="relative">
                  <input
                    className={`w-full bg-white/10 border ${!nombre && isNameFocused ? 'border-red-400' : 'border-accent-blue/50'} rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent-blue transition-all duration-300`}
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={verificarNomb}
                    onFocus={() => setIsNameFocused(true)}
                    onBlur={() => setIsNameFocused(false)}
                  />
                  {!nombre && isNameFocused && (
                    <p className="text-red-400 mt-1 text-sm">Por favor, escribe tu nombre</p>
                  )}
                </div>
                
                <div className="relative">
                  <input
                    className={`w-full bg-white/10 border ${estadoCorreo && isEmailFocused ? 'border-red-400' : 'border-accent-blue/50'} rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent-blue transition-all duration-300`}
                    type="email"
                    placeholder="Correo electrónico"
                    value={correo}
                    onChange={verificarCorreo}
                    onFocus={() => setIsEmailFocused(true)}
                    onBlur={() => setIsEmailFocused(false)}
                  />
                  {estadoCorreo && isEmailFocused && (
                    <p className="text-red-400 mt-1 text-sm">{estadoCorreo}</p>
                  )}
                </div>
                
                <div className="flex-grow flex items-end mt-4">
                  <button
                    className={`w-full bg-accent-blue text-white py-4 px-6 rounded-lg font-bold text-lg shadow-lg transition-all duration-300 
                      ${controlBoton ? 'opacity-60 cursor-not-allowed' : 'hover:bg-light-blue hover:text-deep-blue transform hover:scale-[1.02]'}`}
                    type="button"
                    onClick={datosUsuario}
                    disabled={controlBoton}
                  >
                    <i className="fas fa-paper-plane mr-2"></i>
                    ¡Próxima aventura!
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer section */}
          <div className="bg-deep-blue/50 p-4 text-center text-light-blue text-sm">
            <p>Comienza tu viaje personalizado seleccionando un avatar y completando tus datos</p>
          </div>
        </div>
        
        {/* Travel decorations */}
        <div className="mt-6 flex justify-between opacity-50">
          <i className="fas fa-plane text-accent-blue text-3xl transform -rotate-45"></i>
          <i className="fas fa-map-marker-alt text-accent-blue text-3xl animate-bounce"></i>
          <i className="fas fa-suitcase-rolling text-accent-blue text-3xl"></i>
        </div>
      </div>
    </div>
  );
}