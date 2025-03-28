// Interfaces para la aplicación

export interface Answer {
    id: number;
    user_id: number;
    question_id: number;
    question_option_id: number;
    date: string;
}

export interface City {
    id: number;
    description: string;
    country: string;
    language: string;
    attraction: string;
    food: string;
    imagePath: string;
  }

export interface Destination {
    id: number;
    combination: string;
    firstCityId: string;
    secondCityId: string;
}

export interface QuestionOption {
    id: number;
    questionId: number;
    description: string;
    image: string;
    additional_info?: string;
    title: string;
}

export interface Question {
    id: number;
    question_text: string;
}

export interface User {
    id: number;
    full_name: string;
    email: string;
}

// Para compatibilidad con importaciones existentes
export default interface DefaultExport {
    // Este es un tipo vacío para mantener compatibilidad
}