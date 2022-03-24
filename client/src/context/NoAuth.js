import { useLocation, Navigate, Outlet } from 'react-router-dom'

const NoAuth = () => {
    const token = localStorage.getItem('refreshToken')
    const location = useLocation();

    return (
        !token 
            ? <Outlet /> 
            : <Navigate to='/home' state={{ from: location }} replace />
            
    )
}

export default NoAuth;