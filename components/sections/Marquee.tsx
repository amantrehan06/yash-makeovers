const items = [
  'Bridal Makeup',
  'Hairstyling',
  'South Asian Weddings',
  'Luxury Products',
  'Pre-Bridal Events',
  'HD Waterproof Makeup',
  'Mehndi · Sangeet · Reception',
  'Baraat · Walima · Nikkah',
  'Full Glam',
  'GTA\'s Most Trusted Artist',
]

export function Marquee() {
  const doubled = [...items, ...items]

  return (
    <div className="bg-gold py-4 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="text-ivory text-sm font-medium tracking-widest uppercase mx-8 flex-shrink-0">
            {item}
            <span className="ml-8 text-gold-pale opacity-60">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
