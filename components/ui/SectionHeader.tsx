'use client'

import { motion } from 'framer-motion'

interface SectionHeaderProps {
  eyebrow?:  string
  title:     string
  subtitle?: string
  centered?: boolean
  light?:    boolean
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  centered = false,
  light = false,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`mb-12 ${centered ? 'text-center' : ''}`}
    >
      {eyebrow && (
        <p className={`text-xs uppercase tracking-widest mb-4 ${light ? 'text-gold-light' : 'text-gold'}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`font-serif text-headline md:text-5xl leading-tight ${light ? 'text-ivory' : 'text-dark'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base leading-relaxed max-w-2xl ${centered ? 'mx-auto' : ''} ${light ? 'text-ivory-3' : 'text-muted'}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
