import { NavLink, Outlet } from 'react-router'

export default function RootLayout() {
  return (
    <>
      <header className="site-header">
        <nav className="nav" aria-label="Główna nawigacja">
          <NavLink className="brand" to="/">Cars Client</NavLink>
          <NavLink to="/">Strona główna</NavLink>
          <NavLink to="/cars">Samochody</NavLink>
          <NavLink to="/cars/new">Dodaj samochód</NavLink>
        </nav>
      </header>
      <main className="container"><Outlet /></main>
    </>
  )
}
