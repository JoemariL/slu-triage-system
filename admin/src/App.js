import {BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom'
import NavyBase from './pages/generateQR';
import Users from './pages/Users';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './Layout';


import RequireAuth from './context/RequireAuth';
import NoAuth from './context/NoAuth';

function App() {
  return (
    <div className='container'> 
    {/* div classname='container' */}
      <BrowserRouter>
        <Routes>
           {/*Public Routes */}

            {/* <Route path='/' element={<Layout />}/> */}
            
            <Route path='/' element={<Login />}/>
              {/*Protected routes */}
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
