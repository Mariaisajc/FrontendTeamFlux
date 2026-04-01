import type User from './Interfaces';

// Función para crear un usuario usando fetch con ruta relativa
export const createUser = async (userData: { full_name: string; email: string; password?: string }): Promise<User> => {
  
  // Creamos el objeto que espera el backend (RegisterRequest)
  const requestBody = {
    // SOLUCIÓN: Enviamos 'Name' para que coincida con el backend.
    Name: userData.full_name,
    Email: userData.email,
    // Enviamos una contraseña por defecto si no se proporciona.
    // A LARGO PLAZO: Deberías añadir un campo de contraseña en tu formulario.
    Password: userData.password || "Password123!" 
  };

  const response = await fetch('/api/User', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error al crear usuario: ${response.status} - ${errorText}`);
  }

  return response.json();
};

export const apiClient = {
  createUser: async (userData: any) => {
    // Aquí va tu lógica para llamar a la API, por ejemplo:
    const response = await fetch("/api/User", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error("Error al crear usuario");
    return await response.json();
  }
};