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
  <a href="/dashboard-main-campus">Main Campus</a>
  <a href="/dashboard-bakakeng">Mary Heights Campus</a>
  <a href="/dashboard-navy-base">Navy Base Campus</a>
</div>

    </>
  )
}

export default Header