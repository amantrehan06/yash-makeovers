interface BadgeProps {
  children: React.ReactNode
  variant?: 'gold' | 'dark' | 'ivory'
}

const variantClasses = {
  gold: 'bg-gold-pale text-gold-dim border border-gold-pale',
  dark: 'bg-dark-3 text-ivory-3 border border-dark-3',
  ivory: 'bg-ivory-2 text-muted border border-ivory-4',
}

export function Badge({ children, variant = 'gold' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium tracking-wide ${variantClasses[variant]}`}
    >
      {children}
    </span>
  )
}
