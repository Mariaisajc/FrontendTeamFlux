import { Link } from "@remix-run/react";
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

export default function Plans() {
  // Use the destination service
  const { state } = useDestino();
  const destino = state.destinoA;
  const srcA = state.srcA;

  return (
    <main className="min-h-screen bg-gradient-to-b from-deep-blue to-deep-blue/90 font-sans">
      {/* Hero section with destination image and overlay */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        {/* Background image with parallax effect */}
        <div 
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{ 
            backgroundImage: `url(${srcA || "/img/PlayaDelCarmen.jpg"})`,
            transform: "translateZ(0)",
          }}
        ></div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-deep-blue/60 to-deep-blue"></div>
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-between p-6">
          {/* Back navigation */}
          <div className="self-start">
            <Link 
              to="/destination" 
              className="flex items-center gap-2 text-white bg-accent-blue/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg hover:bg-accent-blue transition-all duration-300"
            >
              <i className="fa-solid fa-arrow-left"></i>
              <span className="hidden sm:inline">Volver a destinos</span>
            </Link>
          </div>
          
          {/* Destination info */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
              {destino || "Playa del Carmen"}
            </h1>
            <p className="text-xl text-light-blue font-medium max-w-2xl mx-auto">
              Planes personalizados para tu aventura ideal
            </p>
          </div>
        </div>
      </div>

      {/* Options Tabs - Mobile Scrolling, Desktop Fixed */}
      <div className="sticky top-16 z-30 bg-light-blue shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto no-scrollbar space-x-2 py-3">
            <a href="#accommodation" className="flex-shrink-0 px-5 py-2 rounded-full bg-accent-blue text-white font-medium hover:bg-deep-blue transition-colors duration-300">
              Hospedaje
            </a>
            <a href="#flights" className="flex-shrink-0 px-5 py-2 rounded-full bg-accent-blue text-white font-medium hover:bg-deep-blue transition-colors duration-300">
              Vuelos
            </a>
            <a href="#activities" className="flex-shrink-0 px-5 py-2 rounded-full bg-accent-blue text-white font-medium hover:bg-deep-blue transition-colors duration-300">
              Actividades
            </a>
          </div>
        </div>
      </div>

      {/* Accommodation section */}
      <section id="accommodation" className="py-16 container mx-auto px-4 md:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-white mb-2 inline-block relative">
            Opciones de Hospedaje
            <span className="block h-1 bg-accent-blue mt-2 animate-[grow_1s_ease-out_forwards]"></span>
          </h2>
          <p className="text-light-blue/90 max-w-2xl mx-auto mt-4">
            Estas son las opciones de hospedaje que te recomendamos según tus preferencias. 
            Cada una ofrece una experiencia única adaptada a tu estilo de viaje.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Hotel Option 1 - Card Design */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-accent-blue/30 hover:-translate-y-1 transition-all duration-300">
            <div className="relative h-60 overflow-hidden">
              <img
                src="/img/trs-cancun.jpg"
                alt="TRS Coral Hotel"
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-110"
              />
              <div className="absolute top-4 right-4 bg-accent-blue text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                Premium
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-3">TRS Coral Hotel</h3>
              
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 mr-2">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <span className="text-light-blue text-sm">(468 reseñas)</span>
              </div>
              
              <p className="text-light-blue/90 mb-6">
                Se sitúa en Cancún, playa del carmen, cuenta con zona privada de
                playa, piscina al aire libre, wifi gratis en todo el hotel y 13
                restaurantes con diferentes menús.
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-deep-blue/40 text-light-blue px-3 py-1 rounded-full text-xs">Piscina</span>
                <span className="bg-deep-blue/40 text-light-blue px-3 py-1 rounded-full text-xs">Wi-Fi</span>
                <span className="bg-deep-blue/40 text-light-blue px-3 py-1 rounded-full text-xs">Playa privada</span>
                <span className="bg-deep-blue/40 text-light-blue px-3 py-1 rounded-full text-xs">13 restaurantes</span>
              </div>
              
              <a
                href="https://www.palladiumhotelgroup.com/es/hoteles/mexico/costamujerescancun/trs-coral-hotel"
                target="_blank"
                rel="noreferrer"
                className="block w-full bg-accent-blue hover:bg-light-blue hover:text-deep-blue text-white text-center py-3 rounded-lg transition-colors duration-300 font-semibold"
              >
                Ver detalles
              </a>
            </div>
          </div>

          {/* Hotel Option 2 - Card Design */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-accent-blue/30 hover:-translate-y-1 transition-all duration-300">
            <div className="relative h-60 overflow-hidden">
              <img
                src="/img/Riu-palace.jpg"
                alt="Riu Palace Hotel"
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-110"
              />
              <div className="absolute top-4 right-4 bg-accent-blue text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                Recomendado
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-3">Riu Palace Hotel</h3>
              
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 mr-2">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star-half-alt"></i>
                </div>
                <span className="text-light-blue text-sm">(324 reseñas)</span>
              </div>
              
              <p className="text-light-blue/90 mb-6">
                Se sitúa en Cancún, playa del carmen, cuenta con zona privada de
                playa, piscina al aire libre, wifi gratis en todo el hotel y 13
                restaurantes con diferentes menús.
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-deep-blue/40 text-light-blue px-3 py-1 rounded-full text-xs">Piscina</span>
                <span className="bg-deep-blue/40 text-light-blue px-3 py-1 rounded-full text-xs">Wi-Fi</span>
                <span className="bg-deep-blue/40 text-light-blue px-3 py-1 rounded-full text-xs">Todo incluido</span>
                <span className="bg-deep-blue/40 text-light-blue px-3 py-1 rounded-full text-xs">Spa</span>
              </div>
              
              <a
                href="https://www.riu.com/es/ofertas/unete-riu-class-LATAM.jsp"
                target="_blank"
                rel="noreferrer"
                className="block w-full bg-accent-blue hover:bg-light-blue hover:text-deep-blue text-white text-center py-3 rounded-lg transition-colors duration-300 font-semibold"
              >
                Ver detalles
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Flight section with decorative elements */}
      <section id="flights" className="py-16 relative">
        {/* Decorative airplane path */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
          <svg viewBox="0 0 1440 400" className="absolute w-full">
            <path d="M0,192L60,202.7C120,213,240,235,360,224C480,213,600,171,720,170.7C840,171,960,213,1080,213.3C1200,213,1320,171,1380,149.3L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" fill="rgba(255,255,255,0.1)"></path>
          </svg>
        </div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-white mb-2 inline-block relative">
              Opciones de Vuelo
              <span className="block h-1 bg-accent-blue mt-2 animate-[grow_1s_ease-out_forwards]"></span>
            </h2>
            <p className="text-light-blue/90 max-w-2xl mx-auto mt-4">
              Hemos seleccionado las mejores aerolíneas para tu viaje a {destino || "Playa del Carmen"}.
              Cada opción ofrece una combinación de comodidad, conveniencia y valor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Flight Option 1 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-accent-blue/30 hover:-translate-y-1 transition-all duration-300">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <img
                    src="/img/avion-avianca.jpg"
                    alt="Avianca"
                    className="h-16 w-auto object-contain rounded-lg"
                  />
                  <div className="text-right">
                    <span className="text-light-blue text-sm">Desde</span>
                    <p className="text-white text-2xl font-bold">$1,250 USD</p>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">Avianca</h3>
                
                <div className="flex justify-between items-center mb-6 bg-deep-blue/30 p-3 rounded-lg">
                  <div className="text-center">
                    <p className="text-accent-blue font-bold text-lg">08:45</p>
                    <p className="text-light-blue text-sm">Ciudad Origen</p>
                  </div>
                  
                  <div className="flex-1 mx-4 flex flex-col items-center">
                    <p className="text-light-blue text-xs">5h 30m</p>
                    <div className="relative w-full h-0.5 bg-light-blue/30 my-2">
                      <div className="absolute -top-1.5 left-0 right-0 flex justify-between">
                        <i className="fa-solid fa-circle text-accent-blue text-xs"></i>
                        <i className="fa-solid fa-plane text-accent-blue text-xs"></i>
                        <i className="fa-solid fa-circle text-accent-blue text-xs"></i>
                      </div>
                    </div>
                    <p className="text-light-blue text-xs">Directo</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-accent-blue font-bold text-lg">14:15</p>
                    <p className="text-light-blue text-sm">{destino || "Playa del Carmen"}</p>
                  </div>
                </div>
                
                <p className="text-light-blue/90 mb-6">
                  Avianca, una aerolínea Colombiana de categoría premium, con más
                  de 104 años de trayectoria, volando a más de 104 destinos, con
                  &quot;Avianca el cielo es de todos&quot;.
                </p>
                
                <div className="flex flex-wrap gap-3 mb-6">
                  <div className="flex items-center gap-1 text-light-blue text-sm">
                    <i className="fa-solid fa-suitcase"></i> Equipaje incluido
                  </div>
                  <div className="flex items-center gap-1 text-light-blue text-sm">
                    <i className="fa-solid fa-wifi"></i> Wi-Fi a bordo
                  </div>
                  <div className="flex items-center gap-1 text-light-blue text-sm">
                    <i className="fa-solid fa-utensils"></i> Comidas
                  </div>
                </div>
                
                <a
                  href="https://www.avianca.com"
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full bg-accent-blue hover:bg-light-blue hover:text-deep-blue text-white text-center py-3 rounded-lg transition-colors duration-300 font-semibold"
                >
                  Reservar vuelo
                </a>
              </div>
            </div>

            {/* Flight Option 2 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-accent-blue/30 hover:-translate-y-1 transition-all duration-300">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <img
                    src="/img/Aeromexico-avion.jpg"
                    alt="Aeromexico"
                    className="h-16 w-auto object-contain rounded-lg"
                  />
                  <div className="text-right">
                    <span className="text-light-blue text-sm">Desde</span>
                    <p className="text-white text-2xl font-bold">$1,150 USD</p>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">Aeromexico</h3>
                
                <div className="flex justify-between items-center mb-6 bg-deep-blue/30 p-3 rounded-lg">
                  <div className="text-center">
                    <p className="text-accent-blue font-bold text-lg">10:30</p>
                    <p className="text-light-blue text-sm">Ciudad Origen</p>
                  </div>
                  
                  <div className="flex-1 mx-4 flex flex-col items-center">
                    <p className="text-light-blue text-xs">4h 45m</p>
                    <div className="relative w-full h-0.5 bg-light-blue/30 my-2">
                      <div className="absolute -top-1.5 left-0 right-0 flex justify-between">
                        <i className="fa-solid fa-circle text-accent-blue text-xs"></i>
                        <i className="fa-solid fa-plane text-accent-blue text-xs"></i>
                        <i className="fa-solid fa-circle text-accent-blue text-xs"></i>
                      </div>
                    </div>
                    <p className="text-light-blue text-xs">Directo</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-accent-blue font-bold text-lg">15:15</p>
                    <p className="text-light-blue text-sm">{destino || "Playa del Carmen"}</p>
                  </div>
                </div>
                
                <p className="text-light-blue/90 mb-6">
                  Aeromexico, una aerolínea Mexicana de categoría premium, con más
                  de 90 años de trayectoria, volando a más de 104 destinos, con
                  Aeromexico "estar cerca, llegar lejos".
                </p>
                
                <div className="flex flex-wrap gap-3 mb-6">
                  <div className="flex items-center gap-1 text-light-blue text-sm">
                    <i className="fa-solid fa-suitcase"></i> Equipaje incluido
                  </div>
                  <div className="flex items-center gap-1 text-light-blue text-sm">
                    <i className="fa-solid fa-wifi"></i> Wi-Fi a bordo
                  </div>
                  <div className="flex items-center gap-1 text-light-blue text-sm">
                    <i className="fa-solid fa-tv"></i> Entretenimiento
                  </div>
                </div>
                
                <a
                  href="https://aeromexico.com"
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full bg-accent-blue hover:bg-light-blue hover:text-deep-blue text-white text-center py-3 rounded-lg transition-colors duration-300 font-semibold"
                >
                  Reservar vuelo
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Activities section (new) */}
      <section id="activities" className="py-16 container mx-auto px-4 md:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-white mb-2 inline-block relative">
            Actividades Recomendadas
            <span className="block h-1 bg-accent-blue mt-2 animate-[grow_1s_ease-out_forwards]"></span>
          </h2>
          <p className="text-light-blue/90 max-w-2xl mx-auto mt-4">
            Completa tu experiencia de viaje con estas actividades especialmente seleccionadas para ti.
          </p>
        </div>

        {/* Activities grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Activity 1 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden group hover:shadow-accent-blue/20 hover:scale-105 transition-all duration-300">
            <div className="h-48 overflow-hidden relative">
              <img 
                src="/img/tulum.jpg" 
                alt="Visita a ruinas" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-blue/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white font-medium">A partir de $45 USD</span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-white font-bold mb-2">Visita a Ruinas Mayas</h3>
              <p className="text-light-blue text-sm mb-2">Duración: 5 horas</p>
              <div className="flex items-center text-yellow-400 text-sm">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
                <span className="text-light-blue ml-2">(132)</span>
              </div>
            </div>
          </div>

          {/* Activity 2 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden group hover:shadow-accent-blue/20 hover:scale-105 transition-all duration-300">
            <div className="h-48 overflow-hidden relative">
              <img 
                src="/img/PlayaDelCarmen.jpg" 
                alt="Tour de playa" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-blue/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white font-medium">A partir de $30 USD</span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-white font-bold mb-2">Tour de Playas</h3>
              <p className="text-light-blue text-sm mb-2">Duración: 6 horas</p>
              <div className="flex items-center text-yellow-400 text-sm">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <span className="text-light-blue ml-2">(87)</span>
              </div>
            </div>
          </div>

          {/* Activity 3 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden group hover:shadow-accent-blue/20 hover:scale-105 transition-all duration-300">
            <div className="h-48 overflow-hidden relative">
              <img 
                src="/img/cenote.jpg" 
                alt="Cenotes" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-blue/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white font-medium">A partir de $55 USD</span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-white font-bold mb-2">Exploración de Cenotes</h3>
              <p className="text-light-blue text-sm mb-2">Duración: 4 horas</p>
              <div className="flex items-center text-yellow-400 text-sm">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="far fa-star"></i>
                <span className="text-light-blue ml-2">(64)</span>
              </div>
            </div>
          </div>

          {/* Activity 4 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden group hover:shadow-accent-blue/20 hover:scale-105 transition-all duration-300">
            <div className="h-48 overflow-hidden relative">
              <img 
                src="/img/gastronomia.jpg" 
                alt="Tour gastronómico" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-blue/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white font-medium">A partir de $65 USD</span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-white font-bold mb-2">Tour Gastronómico</h3>
              <p className="text-light-blue text-sm mb-2">Duración: 3 horas</p>
              <div className="flex items-center text-yellow-400 text-sm">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
                <span className="text-light-blue ml-2">(98)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-12 bg-accent-blue/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">¿Listo para reservar tu aventura?</h2>
          <p className="text-light-blue max-w-2xl mx-auto mb-8">
            Reserva hoy mismo y asegura las mejores tarifas para tu viaje a {destino || "Playa del Carmen"}.
            Nuestra garantía de precio te asegura la mejor experiencia al mejor costo.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/profile" 
              className="px-8 py-3 bg-white text-deep-blue font-semibold rounded-lg hover:bg-light-blue transition-colors duration-300"
            >
              Modificar preferencias
            </Link>
            
            <a 
              href="#accommodation" 
              className="px-8 py-3 bg-accent-blue text-white font-semibold rounded-lg hover:bg-light-blue hover:text-deep-blue transition-colors duration-300"
            >
              Reservar ahora
            </a>
          </div>
        </div>
      </section>

      {/* Back to top button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a 
          href="#" 
          className="w-12 h-12 bg-accent-blue text-white rounded-full flex items-center justify-center shadow-lg hover:bg-light-blue hover:text-deep-blue transition-all duration-300"
          aria-label="Volver arriba"
        >
          <i className="fa-solid fa-arrow-up"></i>
        </a>
      </div>
    </main>
  );
}