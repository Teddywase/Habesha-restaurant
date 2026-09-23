import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Register.css'

function Register({ onUserAuthenticated }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  })
  const [message, setMessage] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const fullName = formData.fullName.trim()
    const email = formData.email.trim()

    if (!fullName || !email || !formData.password.trim()) {
      setMessage('Please fill in all fields.')
      return
    }

    const users = JSON.parse(localStorage.getItem('habesha-users') || '[]')
    const emailExists = users.some(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    )

    if (emailExists) {
      setMessage('This email is already registered.')
      return
    }

    const newUser = {
      fullName,
      email,
      password: formData.password,
    }

    users.push(newUser)
    localStorage.setItem('habesha-users', JSON.stringify(users))
    localStorage.setItem('habesha-current-user', JSON.stringify(newUser))
    onUserAuthenticated({
      fullName: newUser.fullName,
      email: newUser.email,
    })

    navigate('/')
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <p className="auth-kicker">Create account</p>
        <h1>Register</h1>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            <span>Full name</span>
            <input
              type="text"
              name="fullName"
              placeholder="Your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </label>

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
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit">Create account</button>
        </form>

        {message && <p className="auth-message">{message}</p>}
      </div>
    </main>
  )
}

export default Register
