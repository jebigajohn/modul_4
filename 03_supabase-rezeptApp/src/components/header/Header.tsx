import HeroHeader from './HeroHeader'
import NavBar from './NavBar'

export default function Header() {
  return (
    <header className="border-b bg-background/80 backdrop-blur">
      <div className="container p-4">
        <NavBar />
      </div>
      <HeroHeader />
    </header>
  )
}
