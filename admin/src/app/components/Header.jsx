import {FaSignInAlt,FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link} from 'react-router-dom'


function Header() {
  return (<>
    {/* <header className='header'>
        <div className='logo'>
           <Link to='/Dashboard'>Admin Dashboard</Link>
      </div>


    </header> */}

<div class="sidenav">
  <h1><a href="">Admin Dashboard</a></h1>
  <a href="/dashboard">Main Campus</a>
  <a href="/dashboard">Mary Heights Campus</a>
  <a href="/dashboard">Navy Base Campus</a>
  <a href="/" class="logout">Logout</a>
</div>

    </>
  )
}

export default Header