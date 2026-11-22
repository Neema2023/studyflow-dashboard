export default function SummaryCard({ label, value, accent = 'slate' }) {
  const accents = {
    slate: 'border-l-slate-400',
    teal: 'border-l-teal-500',
    amber: 'border-l-amber-500',
    red: 'border-l-red-500',
    green: 'border-l-emerald-500',
  }

  return (
    <div className={`rounded-xl border border-slate-200 border-l-4 ${accents[accent]} bg-white p-5 shadow-sm`}>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-slate-900">{value}</p>
    </div>
  )
}