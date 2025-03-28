import { Answer, Question, QuestionOption } from './Interfaces';

const API_BASE_URL = 'http://localhost:5222';

export const questionClient = {
  // Obtener todas las preguntas
  async getQuestions(): Promise<Question[]> {
    const response = await fetch(`${API_BASE_URL}/api/Question`);
    
    if (!response.ok) {
      throw new Error(`Error al obtener preguntas: ${response.statusText}`);
    }
    
    return response.json();
  },
  
  async getQuestionById(id: number): Promise<Question> {
    const response = await fetch(`${API_BASE_URL}/api/Question/${id}`);
    
    if (!response.ok) {
      throw new Error(`Error al obtener pregunta con ID ${id}: ${response.statusText}`);
    }
    
    return response.json();
  },
  
  async getQuestionByText(text: string): Promise<Question> {
    const response = await fetch(`${API_BASE_URL}/api/Question/questiontext/${encodeURIComponent(text)}`);
    
    if (!response.ok) {
      throw new Error(`Error al obtener pregunta con texto "${text}": ${response.statusText}`);
    }
    
    return response.json();
  },
  
  async createQuestion(question: { question_text: string }): Promise<Question> {
    const response = await fetch(`${API_BASE_URL}/api/Question`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(question),
    });
    
    if (!response.ok) {
      throw new Error(`Error al crear pregunta: ${response.statusText}`);
    }
    
    return response.json();
  },
  
  async updateQuestion(id: number, question: { question_text: string }): Promise<Question> {
    const response = await fetch(`${API_BASE_URL}/api/Question/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(question),
    });
    
    if (!response.ok) {
      throw new Error(`Error al actualizar pregunta con ID ${id}: ${response.statusText}`);
    }
    
    return response.json();
  },
  
  async deleteQuestion(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/Question/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Error al eliminar pregunta con ID ${id}: ${response.statusText}`);
    }
  },
  
  // Obtener todas las opciones de una pregunta específica
  async getQuestionOptions(questionId: number): Promise<QuestionOption[]> {
    const response = await fetch(`${API_BASE_URL}/api/QuestionOption/question/${questionId}`);
    
    if (!response.ok) {
      throw new Error(`Error al obtener opciones: ${response.statusText}`);
    }
    
    return response.json();
  },
  
  // Obtener todas las opciones (para cargarlas de una vez)
  async getAllOptions(): Promise<QuestionOption[]> {
    const response = await fetch(`${API_BASE_URL}/api/QuestionOption`);
    
    if (!response.ok) {
      throw new Error(`Error al obtener todas las opciones: ${response.statusText}`);
    }
    
    return response.json();
  },
  
  async getOptionById(id: number): Promise<QuestionOption> {
    const response = await fetch(`${API_BASE_URL}/api/QuestionOption/${id}`);
    
    if (!response.ok) {
      throw new Error(`Error al obtener opción con ID ${id}: ${response.statusText}`);
    }
    
    return response.json();
  },
  
  async getOptionsByQuestionId(questionId: number): Promise<QuestionOption[]> {
    // Este endpoint no está explícitamente mencionado, pero podemos filtrar después de obtener todas
    const allOptions = await this.getAllOptions();
    return allOptions.filter(option => option.question_id === questionId);
  },
  
  async createOption(option: {
    question_id: number,
    description: string,
    image: string,
    additional_info?: string
  }): Promise<QuestionOption> {
    const response = await fetch(`${API_BASE_URL}/api/QuestionOption`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(option),
    });
    
    if (!response.ok) {
      throw new Error(`Error al crear opción: ${response.statusText}`);
    }
    
    return response.json();
  },
  
  async updateOption(id: number, option: {
    question_id: number,
    description: string,
    image: string,
    additional_info?: string
  }): Promise<QuestionOption> {
    const response = await fetch(`${API_BASE_URL}/api/QuestionOption/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(option),
    });
    
    if (!response.ok) {
      throw new Error(`Error al actualizar opción con ID ${id}: ${response.statusText}`);
    }
    
    return response.json();
  },
  
  async deleteOption(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/QuestionOption/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Error al eliminar opción con ID ${id}: ${response.statusText}`);
    }
  },
  
  // Guardar una respuesta de usuario
  async saveAnswer(answerData: { 
    user_id: number, 
    question_id: number, 
    question_option_id: number 
  }): Promise<Answer> {
    const response = await fetch(`${API_BASE_URL}/api/Answer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(answerData),
    });
    
    if (!response.ok) {
      throw new Error(`Error al guardar respuesta: ${response.statusText}`);
    }
    
    return response.json();
  }
};