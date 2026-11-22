import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function NotFoundPage() {
  useDocumentTitle('Not Found')

  return (
    <div className="space-y-4 py-16 text-center">
      <h1 className="text-5xl font-bold text-slate-900">404</h1>
      <p className="text-slate-600">This page doesn't exist.</p>
      <Link
        to="/"
        className="inline-block rounded-lg bg-teal-600 px-4 py-2 text-white hover:bg-teal-500"
      >
        Back to Dashboard
      </Link>
    </div>
  )
}