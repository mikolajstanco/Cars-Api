import { useState, type FormEvent } from 'react'
import type { Car, NewCar } from '../models/Car'
import { bodyTypes, fuelTypes } from '../models/Car'

type Props = {
  initialCar?: Car
  submitLabel: string
  onSubmit: (car: NewCar) => Promise<void>
}

const emptyCar: NewCar = {
  brand: '', model: '', doorsNumber: 5, luggageCapacity: 0, engineCapacity: 0,
  fuelType: 0, productionDate: '', averageFuelConsumption: 0, bodyType: 0,
}

function toFormCar(car?: Car): NewCar {
  if (!car) return emptyCar
  const { id, ...values } = car
  void id
  return values
}

export default function CarForm({ initialCar, submitLabel, onSubmit }: Props) {
  const [car, setCar] = useState<NewCar>(() => toFormCar(initialCar))
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  function updateField(field: keyof NewCar, value: string) {
    setCar((current) => ({
      ...current,
      [field]: ['doorsNumber', 'luggageCapacity', 'engineCapacity', 'fuelType', 'averageFuelConsumption', 'bodyType'].includes(field)
        ? Number(value)
        : value,
    }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setSaving(true)
    try {
      await onSubmit(car)
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Nie udało się zapisać samochodu.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="field"><label>Marka<input required value={car.brand} onChange={(e) => updateField('brand', e.target.value)} /></label></div>
        <div className="field"><label>Model<input required value={car.model} onChange={(e) => updateField('model', e.target.value)} /></label></div>
        <div className="field"><label>Liczba drzwi<input required min="1" type="number" value={car.doorsNumber} onChange={(e) => updateField('doorsNumber', e.target.value)} /></label></div>
        <div className="field"><label>Pojemność bagażnika (l)<input required min="0" type="number" value={car.luggageCapacity} onChange={(e) => updateField('luggageCapacity', e.target.value)} /></label></div>
        <div className="field"><label>Pojemność silnika (cm³)<input required min="0" type="number" value={car.engineCapacity} onChange={(e) => updateField('engineCapacity', e.target.value)} /></label></div>
        <div className="field"><label>Rodzaj paliwa<select value={car.fuelType} onChange={(e) => updateField('fuelType', e.target.value)}>{fuelTypes.map((name, index) => <option key={name} value={index}>{name}</option>)}</select></label></div>
        <div className="field"><label>Data produkcji<input required type="date" value={car.productionDate} onChange={(e) => updateField('productionDate', e.target.value)} /></label></div>
        <div className="field"><label>Średnie spalanie (l/100 km)<input required min="0" step="0.1" type="number" value={car.averageFuelConsumption} onChange={(e) => updateField('averageFuelConsumption', e.target.value)} /></label></div>
        <div className="field"><label>Typ nadwozia<select value={car.bodyType} onChange={(e) => updateField('bodyType', e.target.value)}>{bodyTypes.map((name, index) => <option key={name} value={index}>{name}</option>)}</select></label></div>
      </div>
      {error && <p className="form-error" role="alert">{error}</p>}
      <button type="submit" disabled={saving}>{saving ? 'Zapisywanie...' : submitLabel}</button>
    </form>
  )
}
