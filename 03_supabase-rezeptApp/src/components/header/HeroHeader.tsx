export default function HeroHeader() {
  return (
    <div className="bg-background">
      <div className="container">
        <div className="relative h-56 md:h-72 w-full rounded-xl overflow-hidden mb-8 border border-border">
          <img
            src="/img/hero.jpg"
            alt="Hero"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center px-6 text-center">
            <h2 className="text-white text-2xl md:text-3xl font-semibold leading-snug max-w-3xl">
              Lassen Sie sich inspirieren, kochen Sie mit Leidenschaft und
              erleben Sie unvergessliche Momente bei Tisch.
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
}
