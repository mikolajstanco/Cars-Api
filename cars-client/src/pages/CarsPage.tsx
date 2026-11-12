import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import type { Car } from '../models/Car'
import { deleteCar, getCars } from '../services/carService'
import CarCard from '../components/CarCard'
import { useCarUiStore } from '../store/useCarUiStore'

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const searchTerm = useCarUiStore((state) => state.searchTerm)
  const setSearchTerm = useCarUiStore((state) => state.setSearchTerm)
  const showFavoritesOnly = useCarUiStore((state) => state.showFavoritesOnly)
  const setShowFavoritesOnly = useCarUiStore((state) => state.setShowFavoritesOnly)
  const favoriteCarIds = useCarUiStore((state) => state.favoriteCarIds)
  const removeFavorite = useCarUiStore((state) => state.removeFavorite)

  useEffect(() => {
    const controller = new AbortController()
    async function loadCars() {
      try {
        setLoading(true)
        setError('')
        setCars(await getCars(controller.signal))
      } catch (requestError) {
        if (axios.isCancel(requestError)) return
        setError(requestError instanceof Error ? requestError.message : 'Wystąpił nieznany błąd.')
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }
    void loadCars()
    return () => controller.abort()
  }, [])

  const normalizedSearch = searchTerm.trim().toLocaleLowerCase()
  const visibleCars = cars.filter((car) => {
    const matchesSearch = car.brand.toLocaleLowerCase().includes(normalizedSearch)
      || car.model.toLocaleLowerCase().includes(normalizedSearch)
    const matchesFavorite = !showFavoritesOnly || favoriteCarIds.includes(car.id)
    return matchesSearch && matchesFavorite
  })

  async function handleDelete(car: Car) {
    if (!window.confirm(`Czy na pewno chcesz usunąć samochód ${car.brand} ${car.model}?`)) return
    try {
      await deleteCar(car.id)
      removeFavorite(car.id)
      setCars((current) => current.filter((item) => item.id !== car.id))
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Nie udało się usunąć samochodu.')
    }
  }

  return (
    <section>
      <div className="page-heading"><h1>Samochody</h1><Link className="button primary" to="/cars/new">Dodaj samochód</Link></div>
      <div className="cars-toolbar">
        <input type="search" placeholder="Szukaj po marce lub modelu..." value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
        <label className="favorite-filter">
          <input type="checkbox" checked={showFavoritesOnly} onChange={(event) => setShowFavoritesOnly(event.target.checked)} />
          Tylko ulubione
        </label>
      </div>
      {loading && <p>Ładowanie samochodów...</p>}
      {error && <p className="error" role="alert">{error}</p>}
      {!loading && !error && visibleCars.length === 0 && <p className="notice">{cars.length === 0 ? 'Brak samochodów.' : 'Brak wyników dla podanych filtrów.'}</p>}
      <div className="car-list">
        {visibleCars.map((car) => <CarCard key={car.id} car={car} onDelete={handleDelete} />)}
      </div>
    </section>
  )
}
