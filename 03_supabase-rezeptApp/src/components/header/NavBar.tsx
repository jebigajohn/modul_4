import { useNavigate, useLocation } from 'react-router'
import { useContext, useMemo } from 'react'
import supabase from '../../utils/supabase'
import { mainContext, type MainContextProps } from '../../context/MainProvider'
import { useTheme } from '../../hooks/useTheme'
import { Moon, Sun } from 'lucide-react'

export default function NavBar() {
  const { isLoggedIn, setIsLoggedIn } = useContext(
    mainContext
  ) as MainContextProps
  const navigate = useNavigate()
  const location = useLocation()
  const { theme, toggle } = useTheme()

  const isActive = useMemo(
    () => (path: string) => location.pathname === path,
    [location.pathname]
  )

  const linkBase =
    'px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer'

  const getLinkClass = (path: string) =>
    isActive(path) ? `${linkBase} bg-gray-200` : `${linkBase} hover:bg-gray-100`

  const logOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('LogOut funktioniert nicht', error)
    }
    setIsLoggedIn(false)
    navigate('/')
  }

  return (
    <div className="flex items-center gap-3">
      {/* Logo & Titel bleiben unverändert */}
      <img src="/img/Icon.png" alt="Logo" className="h-5 w-5 object-contain" />
      <h1 className="text-xl font-semibold">Die Rezeptwelt</h1>

      <nav className="flex items-center gap-2">
        <span className={getLinkClass('/')} onClick={() => navigate('/')}>
          Home
        </span>
        <span
          className={getLinkClass('/rezepte')}
          onClick={() => navigate('/rezepte')}
        >
          Rezepte
        </span>
        <span
          className={getLinkClass('/about')}
          onClick={() => navigate('/about')}
        >
          Über uns
        </span>
        <span
          className={getLinkClass('/profile')}
          onClick={() => navigate('/profile')}
        >
          Dein Profil
        </span>
        <span
          className={getLinkClass('/cart')}
          onClick={() => navigate('/cart')}
        >
          Rezeptebuch
        </span>

        {!isLoggedIn ? (
          <>
            <span
              className={getLinkClass('/login')}
              onClick={() => navigate('/login')}
            >
              Login
            </span>
            <span
              className={getLinkClass('/signup')}
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </span>
          </>
        ) : (
          <div className="flex items-center space-x-4">
            <button
              onClick={logOut}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1.5 px-4 rounded-lg transition-all duration-200"
            >
              Log Out
            </button>
          </div>
        )}
      </nav>
      <div className="ml-auto flex items-center gap-2">
        <button
          onClick={toggle}
          aria-label="Toggle theme"
          className="p-2 rounded-full border hover:bg-secondary transition"
          title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  )
}
