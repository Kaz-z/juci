'use client'

import QRCode from 'qrcode.react'

interface QRProps {
  value: string
  size?: number
  caption?: string
  className?: string
}

export default function QR({ value, size = 128, caption, className }: QRProps) {
  return (
    <div className={`inline-flex flex-col items-center space-y-2 ${className || ''}`}>
      <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
        <QRCode
          value={value}
          size={size}
          level="M"
          includeMargin={false}
          bgColor="#FFFFFF"
          fgColor="#111111"
        />
      </div>
      {caption && (
        <p className="text-sm text-gray-600 text-center max-w-[200px]">
          {caption}
        </p>
      )}
    </div>
  )
}
