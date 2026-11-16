import { useState, type ChangeEvent, type SyntheticEvent } from 'react'
import { Link } from 'react-router'
import { forgotPassword } from '../services/authService'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value)
  }

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      setIsSubmitting(true)
      setError(null)
      setMessage(await forgotPassword(email))
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Nie udało się wysłać wiadomości.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="card stack auth-card">
      <h1>Nie pamiętasz hasła?</h1>
      <p>Podaj adres e-mail powiązany z kontem. Wyślemy na niego link do ustawienia nowego hasła.</p>
      {message && <p className="notice">{message}</p>}
      {error && <p className="form-error" role="alert">{error}</p>}
      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label>
            E-mail
            <input type="email" autoComplete="email" value={email} onChange={handleEmailChange} required />
          </label>
        </div>
        <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Wysyłanie...' : 'Wyślij link'}</button>
      </form>
      <Link to="/login">Wróć do logowania</Link>
    </section>
  )
}
