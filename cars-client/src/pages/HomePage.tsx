import { Link } from 'react-router'
import { useAuthStore } from '../store/useAuthStore'

export default function HomePage() {
  const user = useAuthStore((state) => state.user)

  return (
    <section className="card stack">
      <h1>Cars Client</h1>
      <p>Prosta aplikacja do przeglądania i zarządzania samochodami.</p>
      {user ? (
        <div className="actions"><Link className="button primary" to="/cars">Zobacz samochody</Link><Link className="button secondary" to="/cars/new">Dodaj samochód</Link></div>
      ) : (
        <div className="actions"><Link className="button primary" to="/login">Zaloguj się</Link><Link className="button secondary" to="/register">Załóż konto</Link></div>
      )}
    </section>
  )
}
