import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-700 via-indigo-800 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-white/10 flex items-center justify-center text-xl font-bold text-white">
              A
            </div>
            <div>
              <div className="text-sm font-semibold">Arithmos</div>
              <div className="text-xs text-slate-300">Payroll & HR simplified</div>
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-3 text-sm">
            {/* <a href="/home" className="px-3 py-1 rounded-md hover:bg-white/10 transition">About</a>
            <a href="/home" className="px-3 py-1 rounded-md hover:bg-white/10 transition">Privacy</a>
            <a href="/home" className="px-3 py-1 rounded-md hover:bg-white/10 transition">Terms</a>
            <a href="/home" className="px-3 py-1 rounded-md hover:bg-white/10 transition">Contact</a> */}
          </nav>
        </div>

        <div className="mt-4 border-t border-white/10 pt-4 text-center sm:text-left flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <small className="text-xs text-slate-300">© {new Date().getFullYear()} Arithmos. All rights reserved.</small>
          <div className="text-xs text-slate-300">
            • 
          </div>
        </div>
      </div>
    </footer>
  )
}
