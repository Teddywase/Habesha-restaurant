import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import './Login.css'
import { useAuthStore } from '../../../store/useAuthStore'
import { loginSchema } from '../../../validation/schemas'

function Login() {
  const navigate = useNavigate()
  const currentUser = useAuthStore((state) => state.currentUser)
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = (formData) => {
    const email = formData.email.trim()
    const users = JSON.parse(localStorage.getItem('habesha-users') || '[]')
    const matchedUser = users.find(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase() &&
        user.password === formData.password
    )

    if (!matchedUser) {
      setError('root', { message: 'Invalid email or password.' })
      return
    }

    const userInfo = {
      fullName: matchedUser.fullName,
      email: matchedUser.email,
    }

    setCurrentUser(userInfo)
    navigate('/')
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <p className="auth-kicker">Welcome back</p>
        <h1>Sign In</h1>

        {currentUser && (
          <div className="user-summary">
            <strong>{currentUser.fullName}</strong>
            <span>{currentUser.email}</span>
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <label>
            <span>Email</span>
            <input
              type="email"
              placeholder="you@example.com"
              {...register('email')}
            />
            {errors.email && <span className="error-text">{errors.email.message}</span>}
          </label>

          <label>
            <span>Password</span>
            <input
              type="password"
              placeholder="Enter your password"
              {...register('password')}
            />
            {errors.password && <span className="error-text">{errors.password.message}</span>}
          </label>

          <button type="submit">Sign In</button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Create one</Link>
        </p>

        {(currentUser || errors.root) && (
          <p className="auth-message">
            {errors.root?.message || `Signed in as ${currentUser.fullName}`}
          </p>
        )}
      </div>
    </main>
  )
}

export default Login
