import HomePageClient from '@/components/HomePageClient'

/** Preload hero video from first paint (no poster flash — see HomePageClient video). */
export default function HomePage() {
  return (
    <>
      <link
        rel="preload"
        href="/videos/juci-trailer-2.mp4"
        as="video"
        type="video/mp4"
      />
      <HomePageClient />
    </>
  )
}
