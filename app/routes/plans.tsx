import { Link } from "@remix-run/react";
import { useDestino } from "~/services/destinationService";

export default function Plans() {
  // Use the destination service
  const { state } = useDestino();
  const destino = state.destinoA;
  const srcA = state.srcA;

  return (
    <div className="min-h-screen font-['Poppins'] box-border">
      {/* Header section */}
      <div className="flex flex-col items-center justify-center gap-5 py-5 bg-deep-blue text-white">
        {/* Back link with tooltip */}
        <div className="self-start relative group ml-4">
          <Link to="/destination" className="text-white w-8">
            <i className="fa-solid fa-arrow-left"></i>
          </Link>
          <span className="invisible group-hover:visible absolute w-[100px] bg-deep-blue text-white text-center rounded-lg text-xs z-10">
            Volver a tus destino
          </span>
        </div>

        <h1 className="text-2xl font-bold">Destino seleccionado:</h1>

        <div className="w-[200px]">
          <img
            src={srcA || "/img/PlayaDelCarmen.jpg"}
            alt={destino}
            className="max-w-full max-h-full object-cover"
          />
        </div>

        <h2 className="text-xl font-semibold">
          {destino || "Playa del Carmen"}
        </h2>
      </div>

      {/* Accommodation section */}
      <div className="flex flex-col items-center justify-center gap-5 bg-white py-5">
        <h2 className="text-xl font-bold mt-2.5">Tus opciones de hospedaje:</h2>

        <div>
          <p className="text-center">
            Estas son las opciones de hospedaje que te recomendamos según tus
            preferencias:
          </p>
        </div>

        <div className="flex flex-row justify-evenly items-center self-center py-5 w-full">
          {/* Hotel Option 1 */}
          <div className="flex flex-row w-[40%] text-justify gap-8">
            <div className="w-1/2">
              <a
                href="https://www.palladiumhotelgroup.com/es/hoteles/mexico/costamujerescancun/trs-coral-hotel?gad_source=1&gclid=Cj0KCQjwzva1BhD3ARIsADQuPnUidFzwbGH4_ZKXIZK_Y24hcrmgBWK5yB9mTOcVSgpR1VBvCz4uFFwaAhvDEALw_wcB&gclsrc=aw.ds"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="/img/trs-cancun.jpg"
                  alt="TRS Coral Hotel"
                  className="max-w-full max-h-full object-cover"
                />
              </a>
            </div>

            <div className="flex flex-col gap-5 w-1/2">
              <h3 className="text-center font-semibold">TRS Coral Hotel</h3>
              <p>
                Se sitúa en Cancún, playa del carmen, cuenta con zona privada de
                playa, piscina al aire libre, wifi gratis en todo el hotel y 13
                restaurantes con diferentes menús.
              </p>
            </div>
          </div>

          {/* Hotel Option 2 */}
          <div className="flex flex-row w-[40%] text-justify gap-8">
            <div className="w-1/2">
              <a
                href="https://www.riu.com/es/ofertas/unete-riu-class-LATAM.jsp?gad_source=1&gclid=Cj0KCQjwzva1BhD3ARIsADQuPnWnrDydr_vZS-uMKyFU8-40uzIbr8jLAtl4bm0wfBBc6RA8qa-zuUsaAmwUEALw_wcB&gclsrc=aw.ds"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="/img/Riu-palace.jpg"
                  alt="Riu Palace Hotel"
                  className="max-w-full max-h-full object-cover"
                />
              </a>
            </div>

            <div className="flex flex-col gap-5 w-1/2">
              <h3 className="text-center font-semibold">Riu Palace Hotel</h3>
              <p>
                Se sitúa en Cancún, playa del carmen, cuenta con zona privada de
                playa, piscina al aire libre, wifi gratis en todo el hotel y 13
                restaurantes con diferentes menús.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Flights section */}
      <div className="flex flex-col items-center justify-center gap-5 bg-deep-blue text-white py-5">
        <h2 className="text-xl font-bold mt-2.5">Tus opciones de vuelos:</h2>

        <div>
          <p>
            Estos son las dos opciones de vuelos que te recomedamos según tus
            preferencias:
          </p>
        </div>

        <div className="flex flex-row justify-evenly items-center self-center py-5 w-full">
          {/* Flight Option 1 */}
          <div className="flex flex-row w-[40%] text-justify gap-8">
            <div className="w-1/2">
              <a
                href="https://www.avianca.com/es/?poscode=CO&utm_source=gads&utm_medium=pros&utm_campaign=gs:es-co_br\core/geo@mde|col_co_cpc&utm_content=gs:es-co_br\core:av/ex+ph@avianca&gad_source=1&gclid=Cj0KCQjwzva1BhD3ARIsADQuPnVfF3NpddUFXW5Z2OCBSLe0icSmeRxNXumE0QkI5Yk5-hpOxnCObesaAuXMEALw_wcB"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="/img/avion-avianca.jpg"
                  alt="Avianca"
                  className="max-w-full max-h-full object-cover"
                />
              </a>
            </div>

            <div className="flex flex-col gap-5 w-1/2">
              <h3 className="text-center font-semibold">Avianca</h3>
              <p>
                Avianca, una aerolínea Colombiana de categoria premiun, con más
                de 104 años de trayectoria, volando a más de 104 destinos, con
                "Avianca el cielo es de todos".
              </p>
            </div>
          </div>

          {/* Flight Option 2 */}
          <div className="flex flex-row w-[40%] text-justify gap-8">
            <div className="w-1/2">
              <a
                href="https://aeromexico.com/es-co/?gad_source=1&gclid=Cj0KCQjwzva1BhD3ARIsADQuPnVYHI_iukx21hbj-_3pOY_1J1hBakiHKE1tXN_GHM-wBCjZ2FzwP_IaAgkFEALw_wcB&gclsrc=aw.ds"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="/img/Aeromexico-avion.jpg"
                  alt="Aeromexico"
                  className="max-w-full max-h-full object-cover"
                />
              </a>
            </div>

            <div className="flex flex-col gap-5 w-1/2">
              <h3 className="text-center font-semibold">Aeromexico</h3>
              <p>
                Aeromexico, una aerolínea Mexicana de categoria premiun, con más
                de 90 años de trayectoria, volando a más de 104 destinos, con
                Aeromexico "estar cerca, llegar lejos".
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
