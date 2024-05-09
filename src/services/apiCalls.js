
import axios from "axios";

const API_URL = "http://localhost:3000/api/"

export function bringAllCharacters() {
    // Código para obtener todos los personajes
}

export const registerNewUserCall = async (credentials) => {
    return await axios.post(`${API_URL}users/create`, credentials)
}

export const loginCall = async (credentials) => {
    console.log(credentials)
    const res= await axios.post(`${API_URL}auth/login`, credentials);
    console.log(res)
    return res
}

export const bringProfile = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}` 
        }
    }
    
    const res = await axios.get(`${API_URL}/users`, config )
    return res
}


export const updateProfile = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.put(`${API_URL}users/profile/edit`, data, config)
    console.log(res, "yo soy updateProfile")
    return res

}


export const bringCharacterById = async (id) => {
    const res = await axios.get(`${API_URL}/tatuadores`);//prepara la informacion para enviar al servidot 

    return res.data.results;
};

export const bringAllUsersCall = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    return axios.get(`${API_URL}users`, config)
}

export const deleteUserById = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    return axios.delete(`${API_URL}users/delete/${id}`, config)
}
