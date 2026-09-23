import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

function Login({ onUserAuthenticated }) {
  const navigate = useNavigate()
  const savedUser = JSON.parse(localStorage.getItem('habesha-current-user') || 'null')

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [message, setMessage] = useState(
    savedUser ? `Signed in as ${savedUser.fullName}` : ''
  )
  const [loggedUser] = useState(savedUser)

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const email = formData.email.trim()

    if (!email || !formData.password.trim()) {
      setMessage('Please fill in all fields.')
      return
    }

    const users = JSON.parse(localStorage.getItem('habesha-users') || '[]')
    const matchedUser = users.find(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase() &&
        user.password === formData.password
    )

    if (!matchedUser) {
      setMessage('Invalid email or password.')
      return
    }

    const userInfo = {
      fullName: matchedUser.fullName,
      email: matchedUser.email,
    }

    localStorage.setItem('habesha-current-user', JSON.stringify(userInfo))
    onUserAuthenticated(userInfo)
    navigate('/')
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <p className="auth-kicker">Welcome back</p>
        <h1>Sign In</h1>

        {loggedUser && (
          <div className="user-summary">
            <strong>{loggedUser.fullName}</strong>
            <span>{loggedUser.email}</span>
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            <span>Email</span>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            <span>Password</span>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit">Sign In</button>
        </form>

        {message && <p className="auth-message">{message}</p>}
      </div>
    </main>
  )
}

export default Login
