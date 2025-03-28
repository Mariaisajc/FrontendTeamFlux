import type User from './Interfaces';

const API_BASE_URL = 'http://localhost:5222';

export const apiClient = {
  // User endpoints
  async createUser(userData: { full_name: string, email: string }): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/api/User`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create user: ${response.statusText}`);
    }
    const responseData = await response.json(); // Extraer el cuerpo JSON
  return responseData;
  },
  
  async getUserById(id: number): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/api/User/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to get user: ${response.statusText}`);
    }
    
    return response.json();
  }
}