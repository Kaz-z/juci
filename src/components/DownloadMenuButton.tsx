'use client'

import { Download } from 'lucide-react'
import { site } from '../../site.config'

export default function DownloadMenuButton() {
  const handleDownload = () => {
    // Open the PDF menu in a new tab
    window.open(site.pdfMenuUrl, '_blank')
  }

  return (
    <button
      onClick={handleDownload}
      className="fixed right-0 top-2/3 -translate-y-1/2 z-40 bg-cta hover:bg-cta/90 text-white font-bold py-6 px-4 rounded-l-2xl shadow-2xl transition-all duration-300 hover:-translate-x-1 group"
      aria-label="Download menu PDF"
    >
      <div className="flex flex-col items-center space-y-2">
        <Download className="h-6 w-6 group-hover:scale-110 transition-transform" />
        <div className="writing-mode-vertical text-sm tracking-wider uppercase">
          Download Menu
        </div>
      </div>
    </button>
  )
}
