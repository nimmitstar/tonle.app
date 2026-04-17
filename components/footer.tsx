import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-sky-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              © 2026 Tonle. Free online tools.
            </span>
          </div>

          <div className="flex gap-6 text-sm">
            <Link
              href="/"
              className="text-zinc-600 dark:text-zinc-400 hover:text-sky-500 dark:hover:text-sky-400"
            >
              Home
            </Link>
            <a
              href="https://github.com/koombi/tonle.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 dark:text-zinc-400 hover:text-sky-500 dark:hover:text-sky-400"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
