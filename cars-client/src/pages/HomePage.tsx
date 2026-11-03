import { Link } from 'react-router'

export default function HomePage() {
  return (
    <section className="card stack">
      <h1>Cars Client</h1>
      <p>Prosta aplikacja do przeglądania i zarządzania samochodami.</p>
      <div className="actions"><Link className="button primary" to="/cars">Zobacz samochody</Link><Link className="button secondary" to="/cars/new">Dodaj samochód</Link></div>
    </section>
  )
}
