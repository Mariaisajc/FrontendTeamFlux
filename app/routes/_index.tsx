import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Aztro Travel" },
    { name: "description", content: "Encuentra tu próximo destino de viaje" },
  ];
};

export default function Index() {
  return (
    <section className="flex flex-col md:flex-row justify-center items-center p-[5px] w-full h-[90vh] bg-deep-blue">
      <div className="flex flex-col md:flex-row justify-center items-center m-[5px] p-[5px] w-full bg-[#000835]">
        <div 
          className="flex flex-col justify-end items-center m-[5px] p-[5px] w-full h-[35vh] md:h-[50vh] bg-light-blue bg-cover bg-center bg-no-repeat hover:opacity-90 cursor-pointer"
          style={{ backgroundImage: "url(/img/PlayaDelCarmen.jpg)" }} // Update with actual image path
        >
          {/* Link wrapper for navigation */}
          <Link to="/profile" className="w-full h-full"></Link>
        </div>
        
        <div className="flex flex-col justify-center items-center text-center gap-[10%] m-[5%] p-[15px] w-full h-[50vh] bg-light-blue text-white">
          <h1>Información</h1>
          <p className="text-justify">
            ¿Estás cansado de pasar horas buscando el destino perfecto para tu proximo viaje?
            ¿Te gustaría crear un viaje de acuerdo a tus preferencias y sin complicaciones? <br /><br />
            <strong>¡Dale click a la imagen y preparate para viajar!</strong>
          </p>
        </div>
      </div>
    </section>
  );
}