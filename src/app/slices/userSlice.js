import { createSlice } from "@reduxjs/toolkit";

// creamos nuestro pasillo para el usuario (slice de user)
export const userSlice = createSlice({
    name: "user", 
    initialState: { 
        token: "",
        decodificado: {
            role: "",
            firstName: "",
            email: "",
            id: "",
        },
        vecesLogeado: 10
    },

    // distintas acciones que puedo realizar en este pasillo (todas reciben un state y un action y devuelven un nuevo estado)
    reducers: {
        userLogin: (state, action) => {

            return {
                ...state,
                ...action.payload,
                vecesLogeado: state.vecesLogeado + 1
            }
        },

        userLogout: (state, action) => {

            return {
                token: "",
                decodificado: {
                    name: "",
                    email: "",
                    id: ""
                },
                vecesLogeado: state.vecesLogeado
            }
        },

        resetCount: (state, action) => {
        
            return {
                ...state,
                vecesLogeado: 0
            }
        }
    }
})

// exportamos las acciones a las que accederemos a través del useDispatch para escribir en el almacén
export const {userLogin, userLogout, resetCount} = userSlice.actions

// definimos y exportamos los métodos que nos permitirán venir al almacén a leer información
export const userData = (state) => state.user
export const loggedAmount = (state) => state.user.vecesLogeado

export default userSlice.reducer