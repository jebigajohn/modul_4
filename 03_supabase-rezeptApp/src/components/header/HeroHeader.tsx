export default function HeroHeader() {
  return (
    <div className="relative h-56 md:h-72 w-full rounded-xl overflow-hidden mb-8">
      <img
        src="/img/hero.jpg"
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
        <h2 className="text-white text-2xl md:text-3xl font-semibold leading-snug max-w-3xl font-handwritten drop-shadow">
          Lassen Sie sich inspirieren, kochen Sie mit Leidenschaft
        </h2>
      </div>
    </div>
  )
}
