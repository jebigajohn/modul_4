import type { LucideIcon } from 'lucide-react'
import type { ComponentType } from 'react'

type IconType = LucideIcon | ComponentType<{ className?: string }>

interface CategoryChipProps {
  icon?: IconType
  label: string
  active?: boolean
  onClick?: () => void
}

export function CategoryChip({
  icon: Icon,
  label,
  active = false,
  onClick,
}: CategoryChipProps) {
  return (
    <button
      onClick={onClick}
      className={`
    flex flex-col items-center gap-2 px-4 py-3 rounded-xl transition-all
    focus-visible:ring-2 focus-visible:ring-ring/50 outline-none
    ${
      active
        ? 'bg-primary text-primary-foreground shadow-md'
        : 'bg-card hover:bg-secondary border border-border text-foreground'
    }
  `}
    >
      {Icon ? <Icon className="w-6 h-6" /> : <span className="w-6 h-6" />}
      <span className="text-sm whitespace-nowrap">{label}</span>
    </button>
  )
}
