import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'; 

const Navbar = () => {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  } 


  return (
    <nav className='sticky top-0 z-50 backdrop-blur-md border-b border-gray-200 bg-white/90'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo */}
          <Link to='/' className='flex items-center space-x-2 group'>
            <div className='w-8 h-8 bg-orange-600 rounded-full group-hover:bg-orange-700 transition-colors'></div>
            <h1 className='text-xl font-bold text-gray-900 hidden sm:inline'>Fruit Store</h1>
          </Link>

          {/* Fruits Link */}
          <Link to='/' className='hidden sm:block text-gray-700 hover:text-orange-600 font-medium transition-colors'>
            Fruits
          </Link>

          {/* Right Side */}
          <div className='flex items-center space-x-4'>
            {user ? (
              <>
                <span className='hidden sm:block text-sm text-gray-600'>
                  Welcome, <span className='font-semibold text-gray-900'>{user.username}</span>!
                </span>
                {isAdmin && (
                  <span className='hidden sm:inline-block bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full'>
                    Admin
                  </span>
                )}
                <button
                  onClick={handleLogout}
                  className='bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors duration-200'
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to='/login'
                className='bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors duration-200'
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar