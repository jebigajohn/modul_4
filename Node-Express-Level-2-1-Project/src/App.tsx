import { useEffect, useState } from 'react'
import './App.css'
import type { IPerson } from './interfaces/IPerson'
import type { IStarship } from './interfaces/IStarship'

function App() {
  const [person, setPerson] = useState<IPerson[]>([])
  const [starship, setStarship] = useState<IStarship[]>([])

  useEffect(() => {
    fetch('http://localhost:3000/people')
      .then((res) => res.json())
      .then((data) => setPerson(data))
      .catch((err) => console.error('GET /people failed:', err))

    fetch('http://localhost:3000/starships')
      .then((res) => res.json())
      .then((data) => setStarship(data))
      .catch((err) => console.error('GET /starships failed:', err))
  }, [])
  return (
    <>
      <div>
        <h1>Person</h1>
        <ul>
          {person.map((p) => (
            <li key={p.id}>{p.name}</li>
          ))}
        </ul>
      </div>

      <div>
        <h1>Starships</h1>
        <ul>
          {starship.map((s) => (
            <li key={s.id}>{s.name}</li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
