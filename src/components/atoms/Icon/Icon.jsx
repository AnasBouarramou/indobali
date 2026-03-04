/**
 * Atom — Icon
 * Thin wrapper around Lucide-React icons.
 * Keeps icon imports centralized and allows global size/color defaults.
 *
 * @param {React.ComponentType} icon  — a Lucide icon component (e.g. BookOpen)
 * @param {number} size
 * @param {string} color
 * @param {string} className
 */
export default function Icon({ icon: LucideIcon, size = 20, color, className = '', ...rest }) {
  if (!LucideIcon) return null
  return <LucideIcon size={size} color={color} className={className} aria-hidden="true" {...rest} />
}
