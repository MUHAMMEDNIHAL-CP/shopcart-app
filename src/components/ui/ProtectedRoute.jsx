import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import api from '../../api'
import Spinner from './Spinner'
import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRoute = ({children}) => {

    const [isAuthorised, setAuthorised] = useState(null)
    const location = useLocation()

    useEffect(function(){
        auth().catch(() => setAuthorised(false))
    }, [])

    async function refreshToken() {

        const refreshToken = localStorage.getItem("refresh")

        try{

            const res = await api.post("/token/refresh/", {
                refresh: refreshToken,
            });
            if (res.status === 200) {
                localStorage.setItem("access", res.data.access)
                setAuthorised(true)
            } else {
                setAuthorised(false)
            }
        }

        catch(error) {
            console.log(error)
            setAuthorised(false)
        }
        
    }

    async function auth() {
        
        const token = localStorage.getItem("access")
        if(!token){
            setAuthorised(false)
            return;
        }

        const decoded = jwtDecode(token)
        const expiry_date = decoded.exp
        const current_time = Date.now() / 1000

        if(current_time > expiry_date){
            await refreshToken()
        }

        else{
            setAuthorised(true)
        }

    }

    if(isAuthorised === null) {
        return <Spinner />
    }

  return (
    isAuthorised ? children : <Navigate to="/login" state={{from: location}} replace />
  )
}

export default ProtectedRoute