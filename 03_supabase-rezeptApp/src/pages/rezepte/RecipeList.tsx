import { useContext } from 'react'
import { mainContext, type MainContextProps } from '../../context/MainProvider'
import { useNavigate } from 'react-router'
import { RecipeCard } from '../../components/recipebook/RecipeCard'
import type { IUser } from '../../interfaces/IUser'
import { useAddToBook } from '../../hooks/useAddToBook'

export default function RecipeList() {
  const { recipes } = useContext(mainContext) as MainContextProps & {
    user: IUser | null
  }
  const { handleAddToBook } = useAddToBook()
  const navigate = useNavigate()

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6">Alle Rezepte</h2>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((r) => (
          <li key={r.id}>
            <RecipeCard
              id={r.id}
              title={r.name}
              image={r.image_url ?? '/img/placeholder.jpg'}
              rating={0}
              time="—"
              difficulty="—"
              category="Rezepte"
              onClick={() => navigate(`/rezepte/${r.id}`)}
              actions={
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleAddToBook(r)
                    }}
                    className="inline-flex items-center justify-center rounded-full px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium"
                  >
                    Hinzufügen zum Rezeptbuch
                  </button>
                </>
              }
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
