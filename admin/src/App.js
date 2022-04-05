import {BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom'
// import Header from './app/components/Header';
import NavyBase from './pages/generateQR';
import Users from './pages/Users';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
// import generateQR from './pages/generateQR'


import RequireAuth from './context/RequireAuth';
import NoAuth from './context/NoAuth';

function App() {
  return (
    <div className='container'>
      <BrowserRouter>
        <Routes>
            {/* <Route element={<NoAuth />}> */}
              <Route path='/' element={<Login />}/>
            {/* </Route> */}
            <Route path='/dashboard' element={<Dashboard />}/>
            <Route path='/generateQR' element={<NavyBase />}/>
            <Route path='/users' element={<Users />}/>
            <Route path='/register' element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
