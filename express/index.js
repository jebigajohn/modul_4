import express from 'express'

// Diese App Variable ist wie ein Virtueller Server, in diesem falle nur lokal auf dem Rechner
const app = express()

const PORT = 3000

const users_DatenBank = [
  {
    id: 1,
    name: 'John',
    city: 'Hamburg',
    age: 20,
  },
  {
    id: 2,
    name: 'Hannah',
    city: 'Berlin',
    age: 20,
  },
  {
    id: 3,
    name: 'Joe',
    city: 'Berlin',
    age: 30,
  },
]

const cities = [
  {
    id: 1,
    name: 'Hamburg',
  },

  {
    id: 2,
    name: 'Berlin',
  },
  {
    id: 3,
    name: 'Wien',
  },
]

// ? app.get ist eine GET Methode und hat zwei Parameter
// ? der erste ist die Route, und der zweite ist eine Callback Function
// ? die selbst wieder zwei Paramter hat (req, res)
app.get('/users', (req, res) => {
  // ? Der Browser kann nur mit JSON-Daten umgehen
  // ? Deshalb müssen wir die Daten mit res in JSON umwandeln
  res.json(users_DatenBank)
})

app.get('/cities', (req, res) => {
  res.json(cities)
})

app.listen(PORT, () => {
  console.log('Server ist am laufen auf localhost' + PORT)
})
