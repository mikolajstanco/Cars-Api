import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { confirmEmail } from '../services/authService'

export default function ConfirmEmailPage() {
  const [searchParams] = useSearchParams()
  const userId = searchParams.get('userId')
  const token = searchParams.get('token')
  const [message, setMessage] = useState('Potwierdzanie konta...')
  const requestedRef = useRef(false)

  useEffect(() => {
    if (!userId || !token || requestedRef.current) return
    requestedRef.current = true

    async function confirm(id: string, value: string) {
      try {
        setMessage(await confirmEmail(id, value))
      } catch (caughtError) {
        setMessage(caughtError instanceof Error ? caughtError.message : 'Nie udało się potwierdzić konta.')
      }
    }

    void confirm(userId, token)
  }, [userId, token])

  if (!userId || !token) {
    return (
      <section className="card stack auth-card">
        <h1>Nieprawidłowy link</h1>
        <Link to="/login">Przejdź do logowania</Link>
      </section>
    )
  }

  return (
    <section className="card stack auth-card">
      <h1>Potwierdzenie konta</h1>
      <p>{message}</p>
      <Link to="/login">Przejdź do logowania</Link>
    </section>
  )
}
