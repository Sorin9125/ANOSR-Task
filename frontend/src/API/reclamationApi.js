import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_API;

const reclamationApi = {
    createReclamation: async (formData) => {
        const response = await axios.post(`${BACKEND_URL}/reclamation`, formData, {
            withCredentials: true,
        });
        return response;
    },

    getAllReclamations: async () => {
        const response = await axios.get(`${BACKEND_URL}/reclamation`, {
            withCredentials: true,
        });
        return response;
    },

    getReclamationById: async (id) => {
        const response = await axios.get(`${BACKEND_URL}/reclamation/${id}`, {
            withCredentials: true,
        });
        return response;
    },

    updateReclamation: async (formData, id) => {
        const response = await axios.put(`${BACKEND_URL}/reclamation/${id}`, formData, {
            withCredentials: true,
        });
        return response;
    },

    deleteReclamation: async (id) => {
        const response = await axios.delete(`${BACKEND_URL}/reclamation/${id}`, {
            withCredentials: true,
        });
        return response;
    }
}

export default reclamationApi;