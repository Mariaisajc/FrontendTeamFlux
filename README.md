# FrontendTeamFlux

FrontendTeamFlux es una aplicación web diseñada para ayudar a los usuarios a descubrir su destino de viaje ideal. La aplicación utiliza una interfaz moderna y atractiva, con funcionalidades como creación de perfiles, selección de preferencias y recomendaciones personalizadas.
Características principales

•	Creación de perfiles: Los usuarios pueden crear un perfil con su nombre, correo electrónico y avatar.
•	Recomendaciones personalizadas: Basadas en las preferencias del usuario, la aplicación sugiere destinos, hospedajes, atracciones y gastronomía.

•	Interfaz interactiva: Incluye un carrusel de imágenes, animaciones y efectos visuales.
•	Integración con servicios externos: Utiliza APIs para obtener datos de ciudades y destinos.

*Requisitos previos*

Antes de ejecutar la aplicación, asegúrate de tener instalados los siguientes programas:
•	Node.js (versión 16 o superior)
•	npm o yarn (gestor de paquetes)

**Instalación**

1.	Clona este repositorio en tu computadora:
2.	git clone https://github.com/tu-usuario/FrontendTeamFlux.git
3.	Accede al directorio del proyecto:
4.	cd FrontendTeamFlux
5.	Instala las dependencias del proyecto:
o	Si usas npm:
o	npm install

**Ejecución en modo desarrollo**

Para ejecutar la aplicación en modo desarrollo, utiliza el siguiente comando:
•	Si usas npm:
•	npm run dev
•	Esto iniciará un servidor de desarrollo y podrás acceder a la aplicación en tu navegador en la dirección http://localhost:5173.
Construcción para producción

Para construir la aplicación para producción, ejecuta:
•	Si usas npm:
•	npm run build
Los archivos generados estarán en la carpeta dist/.

*Estructura del proyecto*

La estructura principal del proyecto es la siguiente:

.eslintrc.cjs          # Configuración de ESLint
tailwind.config.ts     # Configuración de Tailwind CSS
vite.config.ts         # Configuración de Vite
app/
  components/          # Componentes reutilizables
  routes/              # Rutas de la aplicación
  services/            # Servicios y lógica de negocio
public/                # Archivos estáticos

*Directorio routes*

•	_index.tsx: Página principal con un carrusel de imágenes.
•	profile.tsx: Página para crear y gestionar perfiles de usuario.
•	plans.tsx: Página que muestra recomendaciones de hospedaje, atracciones y gastronomía.
•	results.tsx: Página que presenta los resultados basados en las preferencias del usuario.
•	cards.tsx: Página interactiva para responder preguntas y seleccionar opciones.

*Directorio components*

•	Footer.tsx: Componente del pie de página con enlaces rápidos y suscripción al boletín.
•	MenuNavigation.tsx: Componente para la navegación principal (pendiente de implementación).

*Directorio services*

•	destinationService.tsx: Lógica para manejar destinos.
•	cityService.tsx: Cliente para obtener datos de ciudades.
•	profileService.tsx: Cliente para gestionar perfiles de usuario.
•	Interfaces.tsx: Definiciones de tipos e interfaces.

*Tecnologías utilizadas*

•	React: Biblioteca para construir la interfaz de usuario.
•	Remix: Framework para aplicaciones web modernas.
•	Tailwind CSS: Framework de utilidades para estilos.
•	TypeScript: Lenguaje para un desarrollo más seguro y escalable.
•	Vite: Herramienta de construcción rápida para proyectos modernos.

*Contribuciones*

Si deseas contribuir al proyecto, por favor abre un issue o envía un pull request. Todas las contribuciones son bienvenidas.


