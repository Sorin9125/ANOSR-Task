const BACKEND_URL = import.meta.env.VITE_API;
import axios from "axios";

const universityApi = {
    getAllUniversities: async () => {
        const response = await axios.get(`${BACKEND_URL}/university`, {
            withCredentials: true,
        });
        return response;
    }
};

export default universityApi;