import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import CarForm from '../components/CarForm'
import type { Car } from '../models/Car'
import { getCarById, updateCar } from '../services/carService'

export default function EditCarPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [car, setCar] = useState<Car | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return
    const carId = id
    const controller = new AbortController()
    async function loadCar() {
      try {
        setCar(await getCarById(carId, controller.signal))
      } catch (requestError) {
        if (axios.isCancel(requestError)) return
        setError(requestError instanceof Error ? requestError.message : 'Wystąpił nieznany błąd.')
      }
    }
    void loadCar()
    return () => controller.abort()
  }, [id])

  if (error) return <p className="error" role="alert">{error}</p>
  if (!car || !id) return <p>Ładowanie samochodu...</p>
  return <section className="stack">
    <div className="page-heading"><h1>Edytuj samochód</h1><Link to={`/cars/${id}`}>Anuluj</Link></div>
    <CarForm initialCar={car} submitLabel="Zapisz zmiany" onSubmit={async (updatedCar) => { await updateCar(id, updatedCar); navigate(`/cars/${id}`) }} />
  </section>
}
