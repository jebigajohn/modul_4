import { Outlet } from 'react-router'
import Header from '../components/header/Header'

export default function Layout() {
  return (
    <div className="bg-yellow-400">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
