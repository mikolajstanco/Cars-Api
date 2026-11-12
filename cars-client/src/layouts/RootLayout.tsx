import { NavLink, Outlet } from 'react-router'
import { useCarUiStore } from '../store/useCarUiStore'

export default function RootLayout() {
  const favoriteCount = useCarUiStore((state) => state.favoriteCarIds.length)

  return (
    <>
      <header className="site-header">
        <nav className="nav" aria-label="Główna nawigacja">
          <NavLink className="brand" to="/">Cars Client</NavLink>
          <NavLink to="/">Strona główna</NavLink>
          <NavLink to="/cars">Samochody</NavLink>
          <NavLink to="/cars/new">Dodaj samochód</NavLink>
          <span className="favorite-counter">Ulubione: {favoriteCount}</span>
        </nav>
      </header>
      <main className="container"><Outlet /></main>
    </>
  )
}
