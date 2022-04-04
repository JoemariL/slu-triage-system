import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
// import Header from './app/components/Header';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import NavyBase from './pages/NavyBase';
import MainCampus from './pages/MainCampus';


function App() {
  return (
    <>
      <Router>
        <div className='container'>
          {/* <Header/> */}
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/dashboard-bakakeng' element={<Dashboard />}/>
        <Route path='/dashboard-navy-base' element={<NavyBase />}/>
        <Route path='/dashboard-main-campus' element={<MainCampus />}/>
      </Routes>
    </div>
    </Router>
    </>
  );
}

export default App;
