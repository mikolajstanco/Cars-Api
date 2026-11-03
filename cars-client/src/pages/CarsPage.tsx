import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router'
import type { Car } from '../models/Car'
import { deleteCar, getCars } from '../services/carService'

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([])
  const [filter, setFilter] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    getCars(controller.signal)
      .then(setCars)
      .catch((requestError: unknown) => { if (requestError instanceof Error && requestError.name !== 'AbortError') setError(requestError.message) })
      .finally(() => setLoading(false))
    return () => controller.abort()
  }, [])

  const filteredCars = useMemo(() => {
    const query = filter.trim().toLocaleLowerCase()
    return cars.filter((car) => `${car.brand} ${car.model}`.toLocaleLowerCase().includes(query))
  }, [cars, filter])

  async function handleDelete(car: Car) {
    if (!window.confirm(`Czy na pewno chcesz usunąć samochód ${car.brand} ${car.model}?`)) return
    try {
      await deleteCar(car.id)
      setCars((current) => current.filter((item) => item.id !== car.id))
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Nie udało się usunąć samochodu.')
    }
  }

  return (
    <section>
      <div className="page-heading"><h1>Samochody</h1><Link className="button primary" to="/cars/new">Dodaj samochód</Link></div>
      <div className="filter"><label>Filtruj po marce lub modelu<input value={filter} onChange={(event) => setFilter(event.target.value)} placeholder="np. Toyota" /></label></div>
      {loading && <p>Ładowanie samochodów...</p>}
      {error && <p className="error" role="alert">{error}</p>}
      {!loading && !error && filteredCars.length === 0 && <p className="notice">{cars.length === 0 ? 'Brak samochodów.' : 'Brak wyników dla podanego filtra.'}</p>}
      <div className="car-list">
        {filteredCars.map((car) => <article className="card car-card" key={car.id}>
          <h2>{car.brand} {car.model}</h2>
          <p>Rok produkcji: {car.productionDate || 'brak danych'}</p>
          <div className="actions">
            <Link className="button secondary" to={`/cars/${car.id}`}>Szczegóły</Link>
            <Link className="button secondary" to={`/cars/${car.id}/edit`}>Edytuj</Link>
            <button className="danger" onClick={() => handleDelete(car)}>Usuń</button>
          </div>
        </article>)}
      </div>
    </section>
  )
}
