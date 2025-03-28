import { City } from "./Interfaces";

const API_BASE_URL = 'http://localhost:5222';

export const cityClient = {
    async getCityByName(name: string): Promise<City> {
        try {
            const response = await fetch(`${API_BASE_URL}/api/cities/name/${encodeURIComponent(name)}`);

            if (!response.ok) {
                throw new Error(`Error al obtener la ciudad "${name}": ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`Error fetching city ${name}:`, error);
            throw error;
        }
    }
};