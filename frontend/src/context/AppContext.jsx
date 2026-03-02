import { createContext, useEffect, useState } from "react";
import { doctors } from "../assets/assets_frontend/assets";
import axios from 'axios'
import { toast } from 'react-toastify'

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currencySymbol = '₹'
    const backendUrl = "http://localhost:8000"
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)

    const value = {
        doctors,
        currencySymbol,
        backendUrl,
        token, setToken
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
