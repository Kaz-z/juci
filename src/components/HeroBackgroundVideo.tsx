'use client'

import { useEffect, useRef } from 'react'

const SRC = '/videos/juci-trailer-2.mp4#t=0.001'

/**
 * Muted background trailer: mobile Safari often ignores autoplay alone; we call play()
 * after load and once on first touch/click (no visible control). CSS hides WebKit play chrome.
 */
export default function HeroBackgroundVideo() {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    el.defaultMuted = true
    el.muted = true
    el.setAttribute('muted', '')
    el.setAttribute('playsinline', '')
    el.setAttribute('webkit-playsinline', '')
    el.setAttribute('x5-playsinline', '')

    const tryPlay = () => {
      el.muted = true
      const p = el.play()
      if (p !== undefined) p.catch(() => {})
    }

    tryPlay()

    el.addEventListener('loadeddata', tryPlay)
    el.addEventListener('canplay', tryPlay)
    el.addEventListener('pause', () => {
      if (document.visibilityState === 'visible') tryPlay()
    })

    const onVis = () => {
      if (document.visibilityState === 'visible') tryPlay()
    }
    document.addEventListener('visibilitychange', onVis)

    // First user gesture unlocks autoplay on strict mobile policies (no UI).
    const onFirstGesture = () => {
      tryPlay()
      window.removeEventListener('touchstart', onFirstGesture, opts)
      window.removeEventListener('click', onFirstGesture, opts)
    }
    const opts = { capture: true, passive: true } as const
    window.addEventListener('touchstart', onFirstGesture, opts)
    window.addEventListener('click', onFirstGesture, opts)

    return () => {
      el.removeEventListener('loadeddata', tryPlay)
      el.removeEventListener('canplay', tryPlay)
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('touchstart', onFirstGesture, opts)
      window.removeEventListener('click', onFirstGesture, opts)
    }
  }, [])

  return (
    <video
      ref={ref}
      className="hero-bg-video absolute inset-0 h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      controls={false}
      disablePictureInPicture
      disableRemotePlayback
      {...({ fetchPriority: 'high' } as Record<string, string>)}
      aria-label="JUCI trailer"
    >
      <source src={SRC} type="video/mp4" />
    </video>
  )
}
