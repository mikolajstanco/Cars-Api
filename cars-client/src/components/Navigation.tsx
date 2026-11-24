import { NavLink, useNavigate } from 'react-router'
import { useAuthStore } from '../store/useAuthStore'
import { useCarUiStore } from '../store/useCarUiStore'

export default function Navigation() {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const favoriteCount = useCarUiStore((state) =>
    user ? (state.favoriteCarIdsByUser[user.id] ?? []).length : 0,
  )

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <nav className="nav" aria-label="Główna nawigacja">
      <NavLink className="brand" to="/">Cars Client</NavLink>
      <NavLink to="/" end>Strona główna</NavLink>
      {user && (
        <>
          <NavLink to="/cars" end>Samochody</NavLink>
          <NavLink to="/cars/new">Dodaj samochód</NavLink>
        </>
      )}
      <NavLink to="/about">O aplikacji</NavLink>
      {user ? (
        <>
          <span className="favorite-counter">Ulubione: {favoriteCount}</span>
          <span className="user-info">{user.userName} ({user.roles.join(', ')})</span>
          <button type="button" className="nav-button" onClick={handleLogout}>Wyloguj</button>
        </>
      ) : (
        <>
          <NavLink className="nav-push" to="/login">Logowanie</NavLink>
          <NavLink to="/register">Rejestracja</NavLink>
        </>
      )}
    </nav>
  )
}
