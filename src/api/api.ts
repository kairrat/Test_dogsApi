import axios, { AxiosInstance } from 'axios';

export interface Breed {
    id: number;
    name: string;
    life_span: string;
    temperament: string;
    image: {
        url: string;
    };
}

const baseURL = 'https://api.thedogapi.com/v1/breeds';

const api: AxiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'live_j1OL2UCjF12qMealkshnQ0HApCyig8WkRJ3EJDvS9YYkTB6xKT1oAiVQebPtoWSu',
    },
});

export default api;
