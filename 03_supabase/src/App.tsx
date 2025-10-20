import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router'

import Layout from './layout/Layout'
import Home from './pages/home/Home'
import Cart from './pages/cart/Cart'
import SignUp from './pages/signup/SignUp'
import Login from './pages/login/Login'
import Profile from './pages/profile/Profile'
import ProtectedRoute from './components/protectedRoute/ProtectedRoute'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        {/* new */}
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="cart"
          element={
            <ProtectedRoute>
              {' '}
              <Cart />
            </ProtectedRoute>
          }
        />
      </Route>
    )
  )

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
