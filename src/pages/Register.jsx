import { useState } from "react"
import API from "../api/axios"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"  

const Register = () => {

  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { data } = await API.post('/api/auth/register', form);
      login(data.user, data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Register</h2>
          <p className="text-gray-600">Create a new account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-semibold text-gray-900 mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Enter your username"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 transition"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 transition"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:bg-white focus:ring=2 focus:ring-orange=200 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange_7００ disabled:opacity=6０ disabled:cursor-notallowed text-white font-semibold py=3 px=4 rounded-lg transition-colors duration=2００ mt=２"
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        {error && (
          <div className="mt=6 p=4 bg-red_5０ border=２ border-red_3００ rounded-lg text-red_7００ text-sm text-center">
            {error}
          </div>
        )}

        <p className="text-center text-sm text-gray_6００ mt=4">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-orange_6００ hover:text-orange_7００">
            Login here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register