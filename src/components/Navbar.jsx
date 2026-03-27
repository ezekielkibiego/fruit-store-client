import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
      <h1 className='text-red-500'>Fruit Store</h1>
      <ul>
        <li>
          <Link to='/'>Fruits</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar