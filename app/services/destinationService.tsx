import { createContext, useContext, useState, ReactNode, useCallback, useMemo } from "react";

// Define the interface for our destination service state
interface DestinoServiceState {
  indice: number;
  destinoA: string;
  destinoE: string;
  respuestasSer: string[];
  nombreS: string;
  correoS: string;
  avatar: string;
  srcA: string;
  srcE: string;
  userId: number | null; // Nuevo campo para almacenar el ID del usuario
}

// Define the interface for our context
interface DestinoContextType {
  state: DestinoServiceState;
  updateIndice: (indice: number) => void;
  updateDestinos: (destinoA: string, destinoE: string) => void;
  addRespuesta: (respuesta: string) => void;
  removeLastRespuesta: () => void;
  clearRespuestas: () => void;
  updateUserInfo: (nombre: string, correo: string) => void;
  updateAvatar: (avatar: string) => void;
  updateSrcImages: (srcA: string, srcE: string) => void;
  resetService: () => void;
  updateUserId: (userId: number) => void; // Nuevo método para actualizar el userId
}

// Create the context with a default value
const DestinoContext = createContext<DestinoContextType | undefined>(undefined);

// Initial state that matches the Angular service's default values
const initialState: DestinoServiceState = {
  indice: 0,
  destinoA: "",
  destinoE: "",
  respuestasSer: [],
  nombreS: "",
  correoS: "",
  avatar: "",
  srcA: "",
  srcE: "",
  userId: null, // Inicializado como null
};

// Create the provider component
export function DestinoProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DestinoServiceState>(initialState);

  // Memoize update functions to prevent recreation on every render
  const updateIndice = useCallback((indice: number) => {
    setState((prev) => ({ ...prev, indice }));
  }, []);

  const updateDestinos = (destinoA: string, destinoE: string) => {
    console.log("Updating destinations:", destinoA, destinoE);
    setState((prev) => {
      console.log("Previous state:", prev);
      return { ...prev, destinoA, destinoE };
    });
  };

  

  const addRespuesta = (respuesta: string) => {
    setState((prev) => ({
      ...prev,
      respuestasSer: [...prev.respuestasSer, respuesta],
    }));
  };

  const removeLastRespuesta = () => {
    setState((prev) => ({
      ...prev,
      respuestasSer: prev.respuestasSer.slice(0, -1),
    }));
  };

  const clearRespuestas = () => {
    setState((prev) => ({ ...prev, respuestasSer: [] }));
  };

  const updateUserInfo = (nombreS: string, correoS: string) => {
    setState((prev) => ({ ...prev, nombreS, correoS }));
  };

  const updateAvatar = (avatar: string) => {
    setState((prev) => ({ ...prev, avatar }));
  };

  const updateSrcImages = (srcA: string, srcE: string) => {
    console.log("Updating image sources:", srcA.substring(0, 50), srcE.substring(0, 50));
    setState((prev) => ({ ...prev, srcA, srcE }));
  };

  const resetService = () => {
    setState(initialState);
  };

  // Nuevo método para actualizar el userId
  const updateUserId = (id: number) => {
    console.log("Actualizando userId en el contexto:", id);
    setState((prevState) => ({ ...prevState, userId: id }));
  };

  // Memoize the context value to prevent unnecessary re-renders of consumers
  const value = useMemo(() => ({
    state,
    updateIndice,
    updateDestinos,
    addRespuesta,
    removeLastRespuesta,
    clearRespuestas,
    updateUserInfo,
    updateAvatar,
    updateSrcImages,
    resetService,
    updateUserId,
  }), [state, updateIndice, updateDestinos, /* other dependencies */]);

  return (
    <DestinoContext.Provider value={value}>{children}</DestinoContext.Provider>
  );
}

// Add this function or update if it exists
export function useDestino() {
  const context = useContext(DestinoContext);
  if (!context) {
    throw new Error("useDestino debe ser usado dentro de un DestinoProvider");
  }
  return context;
}

// El resto del código se mantiene igual...
export const destinoService = {
  indice: initialState.indice,
  destinoA: initialState.destinoA,
  destinoE: initialState.destinoE,
  respuestasSer: initialState.respuestasSer,
  nombreS: initialState.nombreS,
  correoS: initialState.correoS,
  avatar: initialState.avatar,
  srcA: initialState.srcA,
  srcE: initialState.srcE,
  userId: initialState.userId,
  
  // These methods will be used by components that haven't been migrated yet
  updateIndice: (indice: number) => {
    destinoService.indice = indice;
  },
  updateDestinos: (destinoA: string, destinoE: string) => {
    destinoService.destinoA = destinoA;
    destinoService.destinoE = destinoE;
  },
  addRespuesta: (respuesta: string) => {
    destinoService.respuestasSer.push(respuesta);
  },
  removeLastRespuesta: () => {
    destinoService.respuestasSer.pop();
  },
  clearRespuestas: () => {
    destinoService.respuestasSer = [];
  },
};