export default function SummaryCard({ label, value, accent = 'slate' }) {
  const accents = {
    slate: 'border-slate-200 text-slate-900',
    green: 'border-slate-200 text-slate-900',
    amber: 'border-slate-200 text-slate-900',
    red: 'border-slate-200 text-slate-900',
  }

  return (
    <div className="flex flex-col justify-center rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:rounded-2xl md:p-6">
      <p className="text-2xl font-bold text-slate-900 md:text-4xl">{value}</p>
      <p className="mt-1 text-xs font-medium text-slate-500 md:text-base">{label}</p>
    </div>
  )
}