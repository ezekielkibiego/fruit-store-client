import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='navbar'>
      <div className='navbar-inner'>
        <Link className='brand-link' to='/'>
          <span className='brand-dot'></span>
          <h1>Fruit Store</h1>
        </Link>

        <ul className='nav-links'>
          <li>
            <Link to='/'>Fruits</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar