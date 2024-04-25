import axios from "axios";
import { Characters } from "../pages/Characters/Characters";

const API_URL = "http://localhost:3000/api/"


export const resgisterNewUserCall = () => {

}

export const loginCall = async (credentials) => {

    return await axios.post(`${API_URL}auth/login`, credentials)

}

export const bringAllCharacters = async () => {
    const res = await axios.get(`${API_URL}/character`, )

    return res.data.results
}


export const bringCharacterById = async (id) => {
    const res = await axios.get(`${API_URL}/character/${id}`)

    return res.data
}
