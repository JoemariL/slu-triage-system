import {FaSignInAlt,FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link} from 'react-router-dom'


function Header() {
  return (
    <header className='header'>
        <div className='logo'>
            <Link to='/Dashboard'>Admin Dashboard</Link>
        </div>


    </header>
  )
}

export default Header