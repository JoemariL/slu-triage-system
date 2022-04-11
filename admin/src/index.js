import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Routes, } from 'react-router-dom';
import { AuthProvider } from "./context/AuthProvider";

ReactDOM.render(

//     <React.StrictMode>
//     <BrowserRouter>
//       <AuthProvider>
//         <Routes>
//         <Routes path="/*" element={<App />} />
//         </Routes>
//     </AuthProvider>
//   </BrowserRouter>
// </React.StrictMode>,
//   document.getElementById('root')

  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById('root')
);