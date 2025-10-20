import { useNavigate } from 'react-router'

import type { IRecipe } from '../../interfaces/IRecipe'

type Props = { top: IRecipe[] }

export default function HeroTopRecipes({ top }: Props) {
  const navigate = useNavigate()

  return (
    <section>
      <h2 className="text-2xl font-semibold text-center mb-6">
        Die beliebtesten Rezepte
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {top.map((r) => (
          <RecipeCard
            key={vm.id}
            id={vm.id}
            title={vm.title}
            image={vm.image}
            rating={vm.rating}
            time={vm.time}
            difficulty={vm.difficulty}
            category={vm.category}
            onClick={() => navigate(`/rezepte/${vm.id}`)}
            actions={
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleAddToBook(vm)
                }}
                className="inline-flex items-center justify-center rounded-full px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium"
              >
                Hinzufügen zum Rezeptbuch
              </button>
            }
          />
        ))}
      </div>
    </section>
  )
}
