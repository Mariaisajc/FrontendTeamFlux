import { useState, useEffect, useRef } from "react";
import { useNavigate } from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";
import { useDestino } from "~/services/destinationService";

// Add fade animation that Tailwind doesn't provide
export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: "/styles/animations.css",
  },
];

export default function Profile() {
  const navigate = useNavigate();
  const { state, updateUserInfo, updateAvatar } = useDestino();
  
  const [slideIndex, setSlideIndex] = useState(1);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [estadoCorreo, setEstadoCorreo] = useState("");
  const [controlBoton, setControlBoton] = useState(true);

  const slidesRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    showSlides(slideIndex);
  }, [slideIndex]);

  const plusSlides = (n: number) => {
    let newIndex = slideIndex + n;
    if (newIndex > 4) newIndex = 1;
    if (newIndex < 1) newIndex = 4;
    setSlideIndex(newIndex);
  };

  const currentSlide = (n: number) => {
    setSlideIndex(n);
  };

  const showSlides = (n: number) => {
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
    }
  };

  const verificarCorreo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const correoUsuario = event.target.value;
    setCorreo(correoUsuario);

    if (correoUsuario === "") {
      setEstadoCorreo("Escribe un correo electrónico");
    } else {
      const regEmail =
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;

      if (regEmail.test(correoUsuario)) {
        setEstadoCorreo("");
        setControlBoton(false);
      } else {
        setEstadoCorreo("Escriba un Correo Valido");
        setControlBoton(true);
      }
    }
  };

  const datosUsuario = () => {
    // Update the service with form data
    updateUserInfo(nombre, correo);

    // Set avatar based on slide index
    switch (slideIndex) {
      case 1:
        updateAvatar("/img/img-avatar/ava11.png");
        break;
      case 2:
        updateAvatar("/img/img-avatar/ava12.png");
        break;
      case 3:
        updateAvatar("/img/img-avatar/ava13.png");
        break;
      case 4:
        updateAvatar("/img/img-avatar/ava14.png");
        break;
    }

    // Navigate to cards page
    navigate("/cards");
  };

  // CSS Grid style classes
  const gridStyles = `
    .grid-areas-avatar { grid-area: gridAvatar; }
    .grid-areas-select { grid-area: gridSelect; }
    .grid-areas-data { grid-area: gridData; }
    
    .grid-template-desktop {
      display: grid;
      grid-template-columns: 400px 400px;
      grid-template-rows: 400px 48px;
      grid-template-areas:
        'gridAvatar gridData'
        'gridSelect gridData';
    }
    
    @media (max-width: 801px) {
      .grid-template-desktop {
        grid-template-columns: 400px;
        grid-template-rows: 400px 48px auto;
        grid-template-areas:
          'gridAvatar'
          'gridSelect'
          'gridData';
      }
    }
  `;

  return (
    <div className="h-[90vh] w-full select-none font-sans m-0 p-0 box-border">
      {/* Add the CSS Grid styles */}
      <style>{gridStyles}</style>

      <div className="block h-[90vh] w-full bg-deep-blue align-middle">
        
        {/* Main container using the original grid structure */}
        <div className="grid-template-desktop bg-deep-blue h-fit w-fit mx-auto">
          
          {/* Avatar section */}
          <div className="grid-areas-avatar inline-block h-full w-full">
            <div 
              ref={slidesRef}
              className="h-full w-full object-contain p-4">
              <div className="fade">
                <img
                  src="/img/img-avatar/ava11.png"
                  className="h-full w-full object-contain rounded-full overflow-hidden"
                  alt="Avatar 1"
                />
              </div>
              <div className="fade hidden">
                <img
                  src="/img/img-avatar/ava12.png"
                  className="h-full w-full object-contain rounded-full overflow-hidden"
                  alt="Avatar 2"
                />
              </div>
              <div className="fade hidden">
                <img
                  src="/img/img-avatar/ava13.png"
                  className="h-full w-full object-contain rounded-full overflow-hidden"
                  alt="Avatar 3"
                />
              </div>
              <div className="fade hidden">
                <img
                  src="/img/img-avatar/ava14.png"
                  className="h-full w-full object-contain rounded-full overflow-hidden"
                  alt="Avatar 4"
                />
              </div>
            </div>
          </div>
          
          {/* Selection section (dots and navigation) */}
          <div className="grid-areas-select flex flex-row h-full w-full text-center">
            {/* Previous button */}
            <button
              type="button"
              onClick={() => plusSlides(-1)}
              className="inline-block h-full w-[20%] text-white text-[2rem] font-bold cursor-pointer hover:bg-[#1a2357] active:bg-[#0d123d]"
            >
              &#10094;
            </button>
            
            {/* Dots for navigation */}
            <div
              ref={dotsRef}
              className="inline-block h-full w-[60%] align-middle m-auto"
            >
              <span
                onClick={() => currentSlide(1)}
                className="inline-block bg-white h-[1.25rem] w-[1.25rem] rounded-full cursor-pointer m-[0_0.75rem] hover:bg-[#1a2357] hover:border-2 hover:border-white active:bg-[#0d123d] active:border-2 active:border-white"
              ></span>
              <span
                onClick={() => currentSlide(2)}
                className="inline-block bg-white h-[1.25rem] w-[1.25rem] rounded-full cursor-pointer m-[0_0.75rem] hover:bg-[#1a2357] hover:border-2 hover:border-white active:bg-[#0d123d] active:border-2 active:border-white"
              ></span>
              <span
                onClick={() => currentSlide(3)}
                className="inline-block bg-white h-[1.25rem] w-[1.25rem] rounded-full cursor-pointer m-[0_0.75rem] hover:bg-[#1a2357] hover:border-2 hover:border-white active:bg-[#0d123d] active:border-2 active:border-white"
              ></span>
              <span
                onClick={() => currentSlide(4)}
                className="inline-block bg-white h-[1.25rem] w-[1.25rem] rounded-full cursor-pointer m-[0_0.75rem] hover:bg-[#1a2357] hover:border-2 hover:border-white active:bg-[#0d123d] active:border-2 active:border-white"
              ></span>
            </div>
            
            {/* Next button */}
            <button
              type="button"
              onClick={() => plusSlides(1)}
              className="inline-block h-full w-[20%] text-white text-[2rem] font-bold cursor-pointer hover:bg-[#1a2357] active:bg-[#0d123d]"
            >
              &#10095;
            </button>
          </div>
          
          {/* Data section */}
          <div className="grid-areas-data flex flex-col h-full gap-[1.5rem] p-4 justify-center">
            <input
              className="bg-white border-none text-[1.5rem] text-gray-700 h-[2rem] w-full py-[0.5rem] px-[0.5rem] text-center"
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={verificarNomb}
            />
            
            <input
              className="bg-white border-none text-[1.5rem] text-gray-700 h-[2rem] w-full py-[0.5rem] px-[0.5rem] text-center"
              type="email"
              placeholder="Correo electrónico"
              value={correo}
              onChange={verificarCorreo}
            />
            
            {estadoCorreo && (
              <div className="text-white">{estadoCorreo}</div>
            )}
            
            <button
              className="bg-accent-blue border-none text-[2rem] text-white h-[3rem] w-full px-[0.5rem] text-center hover:bg-[#1a2357] active:bg-[#0d123d] disabled:opacity-50 disabled:cursor-not-allowed"
              type="button"
              onClick={datosUsuario}
              disabled={controlBoton}
            >
              ¡Próxima aventura!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}