import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth';
import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';



const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    useEffect(() => {
        if(localStorage.getItem('refreshToken') && localStorage.getItem('accessToken')) {
            const decoded = jwtDecode(localStorage.getItem('refreshToken'))
            if(decoded.exp * 1000 < Date.now()){
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
            }
        }
    }, [auth])
    
    return (
        auth?.user 
            ? <Outlet /> 
            : <Navigate to='/login' state={{ from: location }} replace />
            
    )
};

export default RequireAuth;