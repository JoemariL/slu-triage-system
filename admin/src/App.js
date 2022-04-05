import {BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom'
// import Header from './app/components/Header';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
// import NavyBase from './pages/NavyBase';
// import MainCampus from './pages/MainCampus';

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

            <Route path='/register' element={<Register/>}/>
            {/* <Route path='/dashboard-bakakeng' element={<Dashboard />}/>
            <Route path='/dashboard-navy-base' element={<NavyBase />}/> */}
            <Route path='/dashboard' element={<Dashboard />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
