import { useState, type ChangeEvent, type SyntheticEvent } from 'react'
import { Link, useSearchParams } from 'react-router'
import { resetPassword } from '../services/authService'

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email')
  const token = searchParams.get('token')
  const [newPassword, setNewPassword] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    setNewPassword(event.target.value)
  }

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!email || !token) return

    try {
      setIsSubmitting(true)
      setError(null)
      setMessage(await resetPassword(email, token, newPassword))
      setNewPassword('')
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Nie udało się zmienić hasła.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!email || !token) {
    return (
      <section className="card stack auth-card">
        <h1>Nieprawidłowy link</h1>
        <Link to="/login">Wróć do logowania</Link>
      </section>
    )
  }

  return (
    <section className="card stack auth-card">
      <h1>Ustaw nowe hasło</h1>
      {message && (
        <p className="notice">
          {message} <Link to="/login">Zaloguj się</Link>
        </p>
      )}
      {error && <p className="form-error" role="alert">{error}</p>}
      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label>
            Nowe hasło
            <input type="password" autoComplete="new-password" minLength={8} value={newPassword} onChange={handlePasswordChange} required />
          </label>
        </div>
        <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Zapisywanie...' : 'Zmień hasło'}</button>
      </form>
    </section>
  )
}
