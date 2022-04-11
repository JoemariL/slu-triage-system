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
  return (<>
    <div>
     <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}/>
        </Routes>
      </BrowserRouter>
    </div>

    <div className='container'> 
      <BrowserRouter>
        <Routes>
            <Route path='/dashboard' element={<Dashboard />}/>
            <Route path='/generateQR' element={<NavyBase />}/>
            <Route path='/users' element={<Users />}/>
            <Route path='/register' element={<Register/>}/>
        </Routes>
      </BrowserRouter>
      </div>
      </>);
}

export default App;
