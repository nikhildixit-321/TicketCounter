import { createContext, useEffect, useState } from "react";
import { doctors as initialDoctors } from "../assets/assets_frontend/assets";
import axios from 'axios'
import { toast } from 'react-toastify'

axios.defaults.withCredentials = true;

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const currencySymbol = '₹'
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000"
    const [token, setToken] = useState(localStorage.getItem('token') || false)
    const [doctors, setDoctors] = useState([])
    const [user, setUser] = useState(null)

    const fetchDoctors = async () => {
        try {
            // Get location if available
            let query = '';
            if (navigator.geolocation && localStorage.getItem('role') === 'user') {
                 // Might be slow to wait, but good for first load
            }
            const { data } = await axios.get(`${backendUrl}/user/all-doctors`)
            setDoctors(data)
        } catch (error) {
            console.error("Failed to fetch doctors", error)
        }
    }

    const loadUserData = async () => {
        if (token) {
           // Fetch user profile if needed
        }
    }

    useEffect(() => {
        fetchDoctors()
    }, [token])

    const value = {
        doctors, setDoctors,
        currencySymbol,
        backendUrl,
        token, setToken,
        user, setUser,
        fetchDoctors
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
