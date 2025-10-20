export default function About() {
  return (
    <section className="max-w-4xl mx-auto text-center space-y-8">
      <h1 className="text-3xl font-semibold">Über uns</h1>

      <p className="text-muted-foreground text-lg leading-relaxed">
        Willkommen bei{' '}
        <span className="font-semibold text-primary">Die Rezeptwelt</span> –
        einer Community von Menschen, die gerne kochen, genießen und Neues
        ausprobieren. Unser Ziel ist es, dir einfache und inspirierende Rezepte
        an die Hand zu geben, die deinen Alltag bereichern.
      </p>

      <div className="grid sm:grid-cols-2 gap-6 text-left">
        <div className="p-6 rounded-xl border border-border bg-card shadow">
          <h2 className="text-xl font-medium mb-2">Unsere Mission</h2>
          <p className="text-muted-foreground">
            Wir möchten Kochen für jeden zugänglich machen – ob Anfänger oder
            Profi. Hier findest du Rezepte mit frischen Zutaten, leicht
            verständlich erklärt.
          </p>
        </div>

        <div className="p-6 rounded-xl border border-border bg-card shadow">
          <h2 className="text-xl font-medium mb-2">Das Team</h2>
          <p className="text-muted-foreground">
            Unser kleines Team liebt es, neue Ideen auszuprobieren. Von
            klassischer Hausmannskost bis zu modernen Kreationen – wir
            probieren, fotografieren und teilen alles mit dir!
          </p>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} Die Rezeptwelt – mit ❤️ gemacht.
      </p>
    </section>
  )
}
