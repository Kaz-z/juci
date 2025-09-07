import { NextRequest, NextResponse } from 'next/server'

// Instagram Basic Display API endpoint
const INSTAGRAM_API_URL = 'https://graph.instagram.com/me/media'

export async function GET(request: NextRequest) {
  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Instagram access token not configured' },
        { status: 500 }
      )
    }

    // Fetch Instagram posts
    const response = await fetch(
      `${INSTAGRAM_API_URL}?fields=id,caption,media_url,media_type,permalink,timestamp&access_token=${accessToken}&limit=8`,
      {
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    )

    if (!response.ok) {
      throw new Error(`Instagram API error: ${response.status}`)
    }

    const data = await response.json()

    // Filter for images only and format the data
    const posts = data.data
      ?.filter((post: any) => post.media_type === 'IMAGE')
      ?.slice(0, 8)
      ?.map((post: any) => ({
        id: post.id,
        caption: post.caption || '',
        mediaUrl: post.media_url,
        permalink: post.permalink,
        timestamp: post.timestamp,
      }))

    return NextResponse.json({ posts })
  } catch (error) {
    console.error('Instagram API error:', error)
    
    // Return fallback data if API fails
    return NextResponse.json({
      posts: [],
      error: 'Failed to fetch Instagram posts'
    })
  }
}
