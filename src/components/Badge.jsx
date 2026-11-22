export default function Badge({ children, color = 'slate' }) {
  const colors = {
    slate: 'bg-slate-100 text-slate-700',
    red: 'bg-red-100 text-red-700',
    amber: 'bg-amber-100 text-amber-800',
    green: 'bg-emerald-100 text-emerald-700',
    teal: 'bg-teal-100 text-teal-700',
  }

  return (
    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${colors[color] || colors.slate}`}>
      {children}
    </span>
  )
}