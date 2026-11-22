export default function Button({
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed'
  const variants = {
    primary: 'bg-slate-900 text-white hover:bg-slate-700',
    accent: 'bg-teal-600 text-white hover:bg-teal-500',
    ghost: 'bg-transparent text-slate-700 hover:bg-slate-100',
    danger: 'bg-red-600 text-white hover:bg-red-500',
    outline: 'border border-slate-300 text-slate-700 hover:bg-slate-50',
  }

  return (
    <button type={type} className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}