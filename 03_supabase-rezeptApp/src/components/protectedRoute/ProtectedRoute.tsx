import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router'
import { mainContext, type MainContextProps } from '../../context/MainProvider'

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const { isLoggedIn } = useContext(mainContext) as MainContextProps
  const location = useLocation()

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return <>{children}</>
}
