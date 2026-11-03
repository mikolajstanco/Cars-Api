import { Link } from 'react-router'

export default function NotFoundPage() {
  return <section className="card stack"><h1>Nie znaleziono strony</h1><p>Podany adres nie istnieje.</p><Link to="/">Wróć na stronę główną</Link></section>
}
