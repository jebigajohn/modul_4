import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router'

import Layout from './layout/Layout'
import Home from './pages/home/Home'
import RecipeDetail from './pages/rezepte/RecipeDetail'
import RecipeList from './pages/rezepte/RecipeList'
import ProtectedRoute from './components/protectedRoute/ProtectedRoute'
import Profile from './pages/profile/Profile'
import Cart from './pages/cart/Cart'
import SignUp from './pages/signup/SignUp'
import Login from './pages/login/Login'
import About from './pages/about/About'
import CreateRecipePage from './components/recipebook/CreateRecipePage'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="rezepte" element={<RecipeList />} />
        <Route path="about" element={<About />} />
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
        <Route
          path="/rezepte/neu"
          element={
            <ProtectedRoute>
              <CreateRecipePage />
            </ProtectedRoute>
          }
        />
        <Route path="rezepte/:id" element={<RecipeDetail />} />
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
