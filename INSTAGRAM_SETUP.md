# Instagram Integration Setup

This guide will help you set up real Instagram posts from @juci.co on your website.

## Prerequisites

1. The @juci.co Instagram account must be a **Business** or **Creator** account
2. You need access to the Instagram account
3. You'll need a Facebook Developer account

## Step-by-Step Setup

### 1. Create Facebook App

1. Go to [Facebook for Developers](https://developers.facebook.com/)
2. Click "Create App"
3. Choose "Consumer" app type
4. Fill in app details:
   - App Name: "Juci Website"
   - App Contact Email: Your email
5. Create the app

### 2. Add Instagram Basic Display

1. In your Facebook App dashboard, click "Add Product"
2. Find "Instagram Basic Display" and click "Set Up"
3. Go to Instagram Basic Display → Basic Display

### 3. Create Instagram App

1. Click "Create New App"
2. Fill in the details:
   - Display Name: "Juci Website"
   - Valid OAuth Redirect URIs: `https://yourdomain.com/auth/callback`
   - Deauthorize Callback URL: `https://yourdomain.com/auth/deauthorize`
   - Data Deletion Request URL: `https://yourdomain.com/auth/delete`

### 4. Add Instagram Tester

1. Go to "Roles" → "Instagram Testers"
2. Click "Add Instagram Testers"
3. Enter the Instagram username for @juci.co
4. The Instagram account owner needs to accept the invitation

### 5. Generate Access Token

1. Go to "Instagram Basic Display" → "Basic Display"
2. Click "Generate Token" next to your Instagram account
3. Log in to Instagram and authorize the app
4. Copy the generated access token

### 6. Get Long-Lived Token (Recommended)

Short-lived tokens expire in 1 hour. Exchange for a long-lived token (60 days):

```bash
curl -i -X GET "https://graph.instagram.com/access_token
  ?grant_type=ig_exchange_token
  &client_secret={your-app-secret}
  &access_token={your-short-lived-token}"
```

### 7. Set Environment Variable

Create a `.env.local` file in your project root:

```env
INSTAGRAM_ACCESS_TOKEN=your_long_lived_token_here
```

### 8. Test the Integration

1. Restart your development server
2. Visit your homepage
3. The Instagram section should now show real posts from @juci.co

## Token Refresh

Long-lived tokens expire after 60 days. Set up automatic refresh:

```bash
curl -i -X GET "https://graph.instagram.com/refresh_access_token
  ?grant_type=ig_refresh_token
  &access_token={your-long-lived-token}"
```

## Troubleshooting

### Common Issues

1. **"Instagram access token not configured"**
   - Make sure `.env.local` exists with the correct token
   - Restart your development server

2. **"Invalid access token"**
   - Token may have expired
   - Generate a new token following steps 5-6

3. **"No posts showing"**
   - Check if the Instagram account has public posts
   - Verify the account is set as a tester in Facebook App

4. **API Rate Limits**
   - Instagram API has rate limits
   - The app caches responses for 1 hour to minimize requests

### Fallback Behavior

If the Instagram API fails or is not configured, the website will show placeholder content with fruit emojis, ensuring the site always works.

## API Endpoints Used

- **Media**: `https://graph.instagram.com/me/media`
- **Fields**: `id,caption,media_url,media_type,permalink,timestamp`
- **Limit**: 8 posts (only images are displayed)

## Security Notes

- Never commit your access token to version control
- Use environment variables for sensitive data
- Consider implementing token refresh automation for production
- Monitor API usage to stay within rate limits
