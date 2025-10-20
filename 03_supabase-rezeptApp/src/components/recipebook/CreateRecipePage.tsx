// CreateRecipePage.tsx
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import supabase from '../../utils/supabase'
import { mainContext, type MainContextProps } from '../../context/MainProvider'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'

export default function CreateRecipePage() {
  const navigate = useNavigate()
  const { categories } = useContext(mainContext) as MainContextProps

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('') // category_id (uuid)
  const [imageUrl, setImageUrl] = useState('')
  const [servings, setServings] = useState('4')
  const [instructions, setInstructions] = useState<string[]>([''])
  const [ingredients, setIngredients] = useState<string[]>([''])
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState<string>('')

  const addIngredient = () => setIngredients((prev) => [...prev, ''])
  const removeIngredient = (idx: number) =>
    setIngredients((prev) =>
      prev.length > 1 ? prev.filter((_, i) => i !== idx) : prev
    )
  const updateIngredient = (idx: number, val: string) =>
    setIngredients((prev) => prev.map((v, i) => (i === idx ? val : v)))

  const addInstruction = () => setInstructions((prev) => [...prev, ''])
  const removeInstruction = (idx: number) =>
    setInstructions((prev) =>
      prev.length > 1 ? prev.filter((_, i) => i !== idx) : prev
    )
  const updateInstruction = (idx: number, val: string) =>
    setInstructions((prev) => prev.map((v, i) => (i === idx ? val : v)))

  function validate(): string {
    if (!title.trim()) return 'Bitte einen Titel angeben.'
    if (!description.trim()) return 'Bitte eine Beschreibung angeben.'
    if (!category) return 'Bitte eine Kategorie auswählen.'
    const s = parseInt(servings, 10)
    if (!Number.isFinite(s) || s < 1) return 'Servings muss >= 1 sein.'
    return ''
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const v = validate()
    setFormError(v)
    if (v) return

    setSubmitting(true)
    try {
      const { data: inserted, error } = await supabase
        .from('recipes')
        .insert({
          name: title.trim(),
          description: description.trim(),
          category_id: category, // UUID
          image_url: imageUrl.trim() || null,
          image_alt: title.trim(),
          servings: parseInt(servings, 10),
          instructions: instructions
            .map((i) => i.trim())
            .filter((i) => i !== '')
            .join('\n'),
        })
        .select('*')
        .single()

      if (error || !inserted) {
        console.error('Insert recipe failed', error)
        setFormError('Speichern fehlgeschlagen. Bitte später erneut versuchen.')
        return
      }

      const cleaned = ingredients.map((i) => i.trim()).filter((i) => i !== '')
      if (cleaned.length) {
        const rows = cleaned.map((name: string) => ({
          recipe_id: inserted.id,
          name,
          quantity: null,
          unit: null,
          additional_info: null,
        }))
        const { error: ingErr } = await supabase
          .from('ingredients')
          .insert(rows)
        if (ingErr) console.error('Insert ingredients failed', ingErr)
      }

      navigate(`/rezepte/${inserted.id}`)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="max-w-3xl mx-auto bg-card text-card-foreground rounded-2xl border border-border shadow p-6">
        <h1 className="text-2xl font-semibold mb-6">Neues Rezept erstellen</h1>

        {formError && (
          <div className="mb-4 rounded-md border border-destructive/30 bg-destructive/10 text-destructive px-3 py-2">
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-1.5">
            <Label>Titel *</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="grid gap-1.5">
            <Label>Beschreibung *</Label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              className="w-full rounded-xl border border-border px-3 py-2 bg-[--color-input-background] text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
              placeholder="Kurze Beschreibung des Rezepts…"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="grid gap-1.5">
              <Label>Kategorie *</Label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full rounded-xl border border-border px-3 py-2 bg-[--color-input-background] text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
              >
                <option value="">Bitte wählen…</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-1.5">
              <Label>Portionen *</Label>
              <Input
                type="number"
                min={1}
                value={servings}
                onChange={(e) => setServings(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid gap-1.5">
            <Label>Bild-URL</Label>
            <Input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://…"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Zutaten *</Label>
              <Button
                type="button"
                onClick={addIngredient}
                variant="outline"
                className="h-9 px-3"
              >
                + Zutat
              </Button>
            </div>
            <div className="space-y-2">
              {ingredients.map((ing, idx) => (
                <div key={idx} className="flex gap-2">
                  <Input
                    value={ing}
                    onChange={(e) => updateIngredient(idx, e.target.value)}
                    placeholder={`Zutat ${idx + 1}`}
                    required={idx === 0}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    onClick={() => removeIngredient(idx)}
                    disabled={ingredients.length === 1}
                    variant="outline"
                    className="h-10"
                  >
                    Entfernen
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Zubereitungsschritte *</Label>
              <Button
                type="button"
                onClick={addInstruction}
                variant="outline"
                className="h-9 px-3"
              >
                + Schritt
              </Button>
            </div>
            <div className="space-y-2">
              {instructions.map((step, idx) => (
                <div key={idx} className="flex gap-2 items-start">
                  <div className="w-8 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </div>
                  <textarea
                    value={step}
                    onChange={(e) => updateInstruction(idx, e.target.value)}
                    placeholder={`Schritt ${idx + 1}`}
                    required={idx === 0}
                    rows={2}
                    className="flex-1 rounded-xl border border-border px-3 py-2 bg-[--color-input-background] text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                  />
                  <Button
                    type="button"
                    onClick={() => removeInstruction(idx)}
                    disabled={instructions.length === 1}
                    variant="outline"
                    className="h-10"
                  >
                    Entfernen
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              onClick={() => navigate(-1)}
              variant="outline"
              className="flex-1"
            >
              Abbrechen
            </Button>
            <Button type="submit" disabled={submitting} className="flex-1">
              {submitting ? 'Speichern…' : 'Rezept speichern'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
