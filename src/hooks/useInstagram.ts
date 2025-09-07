'use client'

import { useState, useEffect } from 'react'

interface InstagramPost {
  id: string
  caption: string
  mediaUrl: string
  permalink: string
  timestamp: string
}

interface UseInstagramReturn {
  posts: InstagramPost[]
  loading: boolean
  error: string | null
}

export function useInstagram(): UseInstagramReturn {
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch('/api/instagram')
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch posts')
        }

        setPosts(data.posts || [])
      } catch (err) {
        console.error('Error fetching Instagram posts:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
        
        // Set fallback placeholder data
        setPosts([])
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return { posts, loading, error }
}
