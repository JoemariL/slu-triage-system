import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth';

const NoAuth = () => {
    const { auth } = useAuth()
    const location = useLocation();

    return (
        !auth?.user
            ? <Outlet /> 
            : <Navigate to='/home' state={{ from: location }} replace />
            
    )
}

export default NoAuth;