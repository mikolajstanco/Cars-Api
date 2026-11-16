import { Link } from 'react-router'
import type { Car } from '../models/Car'
import { useAuthStore } from '../store/useAuthStore'
import { useCarUiStore } from '../store/useCarUiStore'

type Props = {
  car: Car
  onDelete: (car: Car) => void
}

export default function CarCard({ car, onDelete }: Props) {
  const user = useAuthStore((state) => state.user)
  const favoriteCarIdsByUser = useCarUiStore((state) => state.favoriteCarIdsByUser)
  const toggleFavorite = useCarUiStore((state) => state.toggleFavorite)
  const favoriteCarIds = user ? favoriteCarIdsByUser[user.id] ?? [] : []
  const isFavorite = favoriteCarIds.includes(car.id)
  const isAdmin = user?.roles.includes('Admin') ?? false

  return (
    <article className="card car-card">
      <h2>{car.brand} {car.model}</h2>
      <p>Rok produkcji: {car.productionDate || 'brak danych'}</p>
      <div className="actions">
        <Link className="button secondary" to={`/cars/${car.id}`}>Szczegóły</Link>
        <Link className="button secondary" to={`/cars/${car.id}/edit`}>Edytuj</Link>
        <button
          type="button"
          className={isFavorite ? 'favorite-button active-favorite' : 'favorite-button'}
          onClick={() => { if (user) toggleFavorite(user.id, car.id) }}
        >
          {isFavorite ? 'Ulubiony' : 'Ulubione'}
        </button>
        {isAdmin && <button type="button" className="danger" onClick={() => onDelete(car)}>Usuń</button>}
      </div>
    </article>
  )
}
