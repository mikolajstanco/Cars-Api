import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import type { Car } from '../models/Car'
import { bodyTypes, fuelTypes } from '../models/Car'
import { getCarById } from '../services/carService'

export default function CarDetailsPage() {
  const { id } = useParams()
  const [car, setCar] = useState<Car | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return
    const controller = new AbortController()
    getCarById(id, controller.signal).then(setCar).catch((requestError: unknown) => {
      if (requestError instanceof Error && requestError.name !== 'AbortError') setError(requestError.message)
    })
    return () => controller.abort()
  }, [id])

  if (error) return <p className="error" role="alert">{error}</p>
  if (!car) return <p>Ładowanie samochodu...</p>

  const details = [
    ['Marka', car.brand], ['Model', car.model], ['Liczba drzwi', car.doorsNumber],
    ['Pojemność bagażnika', `${car.luggageCapacity} l`], ['Pojemność silnika', `${car.engineCapacity} cm³`],
    ['Rodzaj paliwa', fuelTypes[car.fuelType] ?? 'Nieznany'], ['Data produkcji', car.productionDate],
    ['Średnie spalanie', `${car.averageFuelConsumption} l/100 km`], ['Typ nadwozia', bodyTypes[car.bodyType] ?? 'Nieznany'],
  ]
  return <section className="stack">
    <div className="page-heading"><h1>{car.brand} {car.model}</h1><div className="actions"><Link className="button secondary" to={`/cars/${car.id}/edit`}>Edytuj</Link><Link className="button secondary" to="/cars">Wróć do listy</Link></div></div>
    <dl className="card details">{details.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
  </section>
}
