import { useNavigate } from 'react-router'
import CarForm from '../components/CarForm'
import { createCar } from '../services/carService'

export default function CreateCarPage() {
  const navigate = useNavigate()
  return <section className="stack"><h1>Dodaj samochód</h1><CarForm submitLabel="Dodaj samochód" onSubmit={async (car) => { const created = await createCar(car); navigate(`/cars/${created.id}`) }} /></section>
}
