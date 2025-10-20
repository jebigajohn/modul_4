import { useNavigate } from 'react-router'
import CardItem from '../../components/cardItem/CardItem'
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
          <CardItem
            key={r.id}
            recipe={r}
            onClick={() => navigate(`/rezepte/${r.id}`)}
          />
        ))}
      </div>
    </section>
  )
}
