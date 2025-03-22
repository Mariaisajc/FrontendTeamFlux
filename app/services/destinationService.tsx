import { createContext, useContext, useState, ReactNode } from "react";

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
};

// Create the provider component
export function DestinoProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DestinoServiceState>(initialState);

  // Methods to update state, similar to what you'd use in Angular service
  const updateIndice = (indice: number) => {
    setState((prev) => ({ ...prev, indice }));
  };

  const updateDestinos = (destinoA: string, destinoE: string) => {
    setState((prev) => ({ ...prev, destinoA, destinoE }));
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
    setState((prev) => ({ ...prev, srcA, srcE }));
  };

  const resetService = () => {
    setState(initialState);
  };

  // Create value object to provide to consumers
  const value = {
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
  };

  return (
    <DestinoContext.Provider value={value}>{children}</DestinoContext.Provider>
  );
}

// Custom hook to use the destino service
export function useDestino() {
  const context = useContext(DestinoContext);
  if (context === undefined) {
    throw new Error("useDestino must be used within a DestinoProvider");
  }
  return context;
}

// Export a singleton instance for components that can't use hooks
// This is similar to how Angular services are globally available
// Note: Using this is not the React way but provides a migration path
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