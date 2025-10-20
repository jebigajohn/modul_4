import { Outlet } from 'react-router'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'

export default function Layout() {
  return (
    <div className="bg-background text-foreground min-h-screen container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Header />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
