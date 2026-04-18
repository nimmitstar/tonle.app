import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-zinc-200 dark:text-zinc-800">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          Page not found
        </h2>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          This page doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-sky-500 text-white rounded-lg font-medium hover:bg-sky-600 transition-colors"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  )
}
