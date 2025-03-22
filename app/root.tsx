// app/root.tsx
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { DestinoProvider } from "./services/destinationService";

import "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
  },
];

// Menú de navegación integrado en el mismo archivo
function MenuNavigation() {
  return (
    <header className="sticky top-0 z-50">
      <nav className="flex flex-row justify-between bg-white w-full h-[10vh] md:flex-row max-md:flex-col shadow-md border-b border-gray-200">
        <img 
          className="flex justify-center items-center self-center ml-5 mt-[5px] h-[4vh] max-md:mx-auto max-md:m-[5px]" 
          src="/img/amadeus-logo-dark-sky.png" 
          alt="logo"
        />
        <ul className="flex flex-row justify-center items-center m-[5px] max-md:flex-col">
          <li className="list-none">
            <a 
              href="/" 
              className="no-underline text-accent-blue text-[1.25em] mx-[5px] px-[5px] hover:bg-light-blue hover:p-[2px] rounded-md transition-all"
            >
              Inicio
            </a>
          </li>
          <li className="list-none">
            <a 
              href="https://amadeus.com/es/contacto" 
              target="_blank"
              rel="noreferrer"
              className="no-underline text-accent-blue text-[1.25em] mx-[5px] px-[5px] hover:bg-light-blue hover:p-[2px] rounded-md transition-all"
            >
              Contacto
            </a>
          </li>
          <li className="list-none">
            <a 
              href="https://amadeus.com/en" 
              target="_blank"
              rel="noreferrer"
              className="no-underline text-accent-blue text-[1.25em] mx-[5px] px-[5px] hover:bg-light-blue hover:p-[2px] rounded-md transition-all"
            >
              Amadeus
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <DestinoProvider>
      <MenuNavigation />
      <Outlet />
    </DestinoProvider>
  );
}