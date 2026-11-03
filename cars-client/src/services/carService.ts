import type { Car, NewCar } from '../models/Car'

const carsUrl = `${import.meta.env.VITE_API_URL ?? 'http://localhost:3000'}/cars`

async function ensureSuccess(response: Response) {
  if (!response.ok) {
    throw new Error(`Żądanie nie powiodło się. Status: ${response.status}`)
  }
}

export async function getCars(signal?: AbortSignal): Promise<Car[]> {
  const response = await fetch(carsUrl, { signal })
  await ensureSuccess(response)
  return response.json() as Promise<Car[]>
}

export async function getCarById(id: string, signal?: AbortSignal): Promise<Car> {
  const response = await fetch(`${carsUrl}/${encodeURIComponent(id)}`, { signal })
  await ensureSuccess(response)
  return response.json() as Promise<Car>
}

export async function createCar(car: NewCar): Promise<Car> {
  const response = await fetch(carsUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car),
  })
  await ensureSuccess(response)
  return response.json() as Promise<Car>
}

export async function updateCar(id: string, car: NewCar): Promise<Car> {
  const response = await fetch(`${carsUrl}/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car),
  })
  await ensureSuccess(response)
  return response.json() as Promise<Car>
}

export async function deleteCar(id: string): Promise<void> {
  const response = await fetch(`${carsUrl}/${encodeURIComponent(id)}`, { method: 'DELETE' })
  await ensureSuccess(response)
}
