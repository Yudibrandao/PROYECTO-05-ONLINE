
import axios from "axios";

//ruta que nos lleva a nuestro Backend
const API_URL = "http://localhost:3000/api/"

//Esta funcion recibe las credenciales del usuario (data) y se maneja el inicio de sesion como exitoso o no
export const loginUsers = (data) => {
  return axios
    .post(`${API_URL}users/login`, data)
    .then((res) => {
      return res.data.message;
    })
    .catch((error) => {
      return error;
    });
}

//En esta funcion el usuario ingresa los datos para poder registarse, tambien maneja una respuesta exitosa o no
export const registerUsers = (data) => {
  return axios
    .post(`${API_URL}users/create`, data)
    .then((res) => {
      return res.data.message;
    })
    .catch((error) => {
      return error;
    });
}

//Esta funcion maneja el token del usuario para su atenticacion, tambien maneja una respuesta exitosa o no
export const getDataUser = (token) => {
  const config = {
    headers: {
      Authorization: (`Bearer ${token}`)
    }
  }
  return axios
    .get(`${API_URL}users/profile`, config)
    .then((res) => {
      return res.data.message;
    })
    .catch((error) => {
      return error;
    })

}

//Esta funcion utiliza un token de Autorizacion para actualizar informacion del perfil(borrar)
export const deleteUsers = (token, data) => {
  const config = {
    headers: {
      Authorization: (`Bearer ${token}`)
    }
  }
  return axios
    .put(`${API_URL}users/profile/update`, data, config)
    .then((res) => {
      return res.data.message;
    })
    .catch((error) => {
      return error;
    })

}