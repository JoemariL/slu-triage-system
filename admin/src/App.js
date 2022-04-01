import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './app/components/Header';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import "./index.css";
import "./body.css"


function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header/>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/Dashboard' element={<Dashboard />}/>
      </Routes>
    </div>
    </Router>
    </>
  );
}

export default App;
