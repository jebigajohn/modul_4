export default function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground space-y-3">
        <div className="flex justify-center gap-4">
          <a href="/about" className="hover:text-foreground transition-colors">
            Über uns
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Datenschutz
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Impressum
          </a>
        </div>

        <p>
          © {new Date().getFullYear()} Die Rezeptwelt · Alle Rechte vorbehalten.
        </p>
      </div>
    </footer>
  )
}
