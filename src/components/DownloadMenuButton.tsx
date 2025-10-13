'use client'

import { site } from '../../site.config'

export default function DownloadMenuButton() {
  return (
    <a
      href={site.pdfMenuUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-0 top-2/3 -translate-y-1/2 z-40 bg-cta hover:bg-cta/90 text-white font-bold py-6 px-4 rounded-l-2xl shadow-2xl transition-all duration-300 hover:-translate-x-1 group"
      aria-label="View menu PDF"
    >
      <div className="flex flex-col items-center space-y-2">
        <div className="writing-mode-vertical text-sm tracking-wider uppercase">
          Download Menu
        </div>
      </div>
    </a>
  )
}
