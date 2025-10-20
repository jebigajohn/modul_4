export default function EmptyState({
  icon,
  title,
  message,
}: {
  icon?: React.ReactNode
  title: string
  message?: string
}) {
  return (
    <div className="text-center py-12 text-muted-foreground flex flex-col items-center">
      {icon && <div className="mb-4">{icon}</div>}
      <p className="font-medium mb-1">{title}</p>
      {message && <p className="text-sm">{message}</p>}
    </div>
  )
}
