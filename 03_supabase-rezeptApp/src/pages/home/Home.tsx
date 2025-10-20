import { useContext, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import { mainContext, type MainContextProps } from '../../context/MainProvider'
import type { IRecipe } from '../../interfaces/IRecipe'
import { toRecipeCardVM } from '../../mappers/recipeMappers'
import { Search } from 'lucide-react'
import { RecipeCard } from '../../components/recipebook/RecipeCard'
import { CategoryChip } from '../../components/categoryChip/CategoryChip'
import { useAddToBook } from '../../hooks/useAddToBook'

export default function Home() {
  const navigate = useNavigate()
  const { recipes, categories } = useContext(mainContext) as MainContextProps
  const { handleAddToBook } = useAddToBook()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const categoryChips = useMemo(
    () => [
      { id: 'all', label: 'Alle' },
      ...categories.map((c) => ({ id: c.id, label: c.name })),
    ],
    [categories]
  )

  const vms = useMemo(
    () => recipes.map((r) => toRecipeCardVM(r as IRecipe, categories)),
    [recipes, categories]
  )

  const filtered = useMemo(() => {
    return vms.filter((vm) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        categories.find((c) => c.id === selectedCategory)?.name === vm.category
      const matchesSearch = vm.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [vms, selectedCategory, searchQuery, categories])

  return (
    <div className="min-h-screen pb-10">
      {/* Header-like Suchfeld */}
      <div className="sticky top-0 bg-white/80 backdrop-blur border-b z-10 px-4 py-4">
        <div className="relative max-w-3xl mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="search"
            placeholder="Rezepte suchen…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-2 rounded-lg border"
          />
        </div>
      </div>

      <div className="px-4 py-6 max-w-6xl mx-auto">
        {/* Kategorien */}
        <h2 className="mb-3 text-lg font-semibold">Kategorien</h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {categoryChips.map((chip) => (
            <CategoryChip
              key={chip.id}
              label={chip.label}
              active={selectedCategory === chip.id}
              onClick={() => setSelectedCategory(chip.id)}
            />
          ))}
        </div>

        {/* Grid */}
        <h2 className="mt-8 mb-4 text-lg font-semibold">
          {selectedCategory === 'all'
            ? 'Entdecke Rezepte'
            : categoryChips.find((c) => c.id === selectedCategory)?.label}
        </h2>

        {filtered.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <div className="w-20 h-20 rounded-full bg-secondary/50 mx-auto mb-4 flex items-center justify-center">
              <Search className="w-8 h-8" />
            </div>
            <p className="mb-2">Keine Rezepte gefunden.</p>
            <p className="text-sm">Passe die Suche oder die Kategorie an.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((vm) => (
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
        )}
      </div>
    </div>
  )
}
