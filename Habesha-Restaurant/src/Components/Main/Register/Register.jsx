import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import './Register.css'
import { useAuthStore } from '../../../store/useAuthStore'
import { registerSchema } from '../../../validation/schemas'

function Register() {
  const navigate = useNavigate()
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullName: '', email: '', password: '' },
  })

  const onSubmit = (formData) => {
    const fullName = formData.fullName.trim()
    const email = formData.email.trim()

    const users = JSON.parse(localStorage.getItem('habesha-users') || '[]')
    const emailExists = users.some(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    )

    if (emailExists) {
      setError('root', { message: 'This email is already registered.' })
      return
    }

    const newUser = {
      fullName,
      email,
      password: formData.password,
    }

    users.push(newUser)
    localStorage.setItem('habesha-users', JSON.stringify(users))
    setCurrentUser({
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

        <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <label>
            <span>Full name</span>
            <input
              type="text"
              placeholder="Your full name"
              {...register('fullName')}
            />
            {errors.fullName && <span className="error-text">{errors.fullName.message}</span>}
          </label>

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
              placeholder="Create a password"
              {...register('password')}
            />
            {errors.password && <span className="error-text">{errors.password.message}</span>}
          </label>

          <button type="submit">Create account</button>
        </form>

        {errors.root && <p className="auth-message">{errors.root.message}</p>}
      </div>
    </main>
  )
}

export default Register
