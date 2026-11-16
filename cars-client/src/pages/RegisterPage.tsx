import { useState, type ChangeEvent, type SyntheticEvent } from 'react'
import { Link } from 'react-router'
import type { RegisterData } from '../models/Auth'
import { register } from '../services/authService'

const emptyForm: RegisterData & { confirmPassword: string } = {
  userName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

export default function RegisterPage() {
  const [form, setForm] = useState(emptyForm)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()

    if (form.password !== form.confirmPassword) {
      setError('Hasła nie są identyczne.')
      return
    }

    try {
      setIsSubmitting(true)
      setError(null)
      const result = await register({
        userName: form.userName,
        email: form.email,
        password: form.password,
      })
      setMessage(result)
      setForm(emptyForm)
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Nie udało się utworzyć konta.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (message) {
    return (
      <section className="card stack auth-card">
        <h1>Rejestracja</h1>
        <p className="notice">{message}</p>
        <Link to="/login">Przejdź do logowania</Link>
      </section>
    )
  }

  return (
    <section className="card stack auth-card">
      <h1>Rejestracja</h1>
      {error && <p className="form-error" role="alert">{error}</p>}
      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label>
            Nazwa użytkownika
            <input name="userName" autoComplete="username" value={form.userName} onChange={handleChange} required />
          </label>
        </div>
        <div className="field">
          <label>
            E-mail
            <input name="email" type="email" autoComplete="email" value={form.email} onChange={handleChange} required />
          </label>
        </div>
        <div className="field">
          <label>
            Hasło
            <input name="password" type="password" autoComplete="new-password" minLength={8} value={form.password} onChange={handleChange} required />
          </label>
        </div>
        <div className="field">
          <label>
            Powtórz hasło
            <input name="confirmPassword" type="password" autoComplete="new-password" minLength={8} value={form.confirmPassword} onChange={handleChange} required />
          </label>
        </div>
        <p className="hint">Hasło musi mieć co najmniej 8 znaków, w tym wielką i małą literę oraz cyfrę.</p>
        <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Rejestrowanie...' : 'Zarejestruj'}</button>
      </form>
      <p>Masz już konto? <Link to="/login">Zaloguj się</Link></p>
    </section>
  )
}
