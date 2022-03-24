import { createContext, useEffect, useState } from "react";
import jwtDecode from 'jwt-decode';

const AuthContext = createContext({});

let userID
try {
  const decode = jwtDecode(localStorage.getItem('refreshToken'))
  userID = decode.id
} catch (error) {
  userID = null
}

export const AuthProvider = ({ children }) => {

  const [auth, setAuth] = useState({
    user: userID
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
