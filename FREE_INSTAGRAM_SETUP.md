# Free Instagram Feed Setup Guide

Here are several **completely free** ways to display Instagram posts from @juci.co on your website:

## 🆓 Option 1: LightWidget (Recommended)

**Pros:** Free, no API needed, responsive, customizable
**Cons:** Small "Powered by" branding

### Setup Steps:
1. Go to [lightwidget.com](https://lightwidget.com)
2. Click "Create Widget"
3. Enter Instagram username: `juci.co`
4. Choose settings:
   - Layout: Grid
   - Posts: 8
   - Columns: 4
   - Size: Medium
5. Click "Get Widget"
6. Copy the provided iframe code
7. Replace the hash in `InstagramWidget.tsx` with your generated hash

### Example Code:
```html
<iframe src="https://cdn.lightwidget.com/widgets/lightwidget.html?hash=YOUR_HASH_HERE" 
        scrolling="no" allowtransparency="true" 
        class="lightwidget-widget" 
        style="width:100%;border:0;overflow:hidden;">
</iframe>
```

---

## 🆓 Option 2: SnapWidget

**Pros:** Very customizable, free tier available
**Cons:** Limited posts on free plan

### Setup Steps:
1. Go to [snapwidget.com](https://snapwidget.com)
2. Click "Create Free Widget"
3. Connect Instagram account or enter username
4. Customize:
   - Widget Type: Grid
   - Number of Photos: 8
   - Photo Size: Medium
   - Layout: 4 columns
5. Generate widget code
6. Copy and paste into your website

---

## 🆓 Option 3: Instagram Embed Posts (Manual)

**Pros:** Official Instagram embeds, no third-party
**Cons:** Manual process, need to update regularly

### Setup Steps:
1. Go to specific Instagram post on web
2. Click the "..." menu
3. Select "Embed"
4. Copy the embed code
5. Paste into your HTML

### Example:
```html
<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/POST_ID/">
</blockquote>
<script async src="//www.instagram.com/embed.js"></script>
```

---

## 🆓 Option 4: Elfsight Widget

**Pros:** Good free tier, easy setup
**Cons:** Branding on free plan

### Setup Steps:
1. Go to [elfsight.com/instagram-feed-widget](https://elfsight.com/instagram-feed-widget/)
2. Click "Add Instagram Feed for Free"
3. Create account
4. Enter @juci.co username
5. Customize appearance
6. Get embed code

---

## 🆓 Option 5: Manual Screenshots (Simple)

**Pros:** No external dependencies, full control
**Cons:** Need to update manually

### Setup Steps:
1. Take screenshots of @juci.co posts
2. Save as images in `/public/images/instagram/`
3. Create a simple grid component
4. Update images periodically

### Example Component:
```jsx
const instagramPosts = [
  { id: 1, image: '/images/instagram/post1.jpg', link: 'https://instagram.com/p/POST1' },
  { id: 2, image: '/images/instagram/post2.jpg', link: 'https://instagram.com/p/POST2' },
  // ... more posts
];
```

---

## 🚀 Implementation

### Update your homepage to use the free widget:

```tsx
// Replace the current Instagram section with:
import InstagramWidget from '@/components/InstagramWidget'

// In your JSX:
<InstagramWidget username="juci.co" limit={8} />
```

### Or use LightWidget directly:

```tsx
<div className="instagram-feed">
  <iframe 
    src="https://cdn.lightwidget.com/widgets/lightwidget.html?hash=YOUR_HASH" 
    scrolling="no" 
    allowTransparency={true}
    className="w-full h-96 border-0 rounded-2xl"
  />
</div>
```

---

## 📱 Recommended Approach

**For @juci.co, I recommend LightWidget because:**

1. ✅ **Completely Free** - No API costs or limits
2. ✅ **No Setup Complexity** - Just get a widget code
3. ✅ **Auto-Updates** - Shows latest posts automatically  
4. ✅ **Responsive** - Works on all devices
5. ✅ **Fast** - No server-side API calls needed
6. ✅ **Reliable** - Third-party handles Instagram changes

### Quick Setup (5 minutes):
1. Visit [lightwidget.com](https://lightwidget.com)
2. Create widget for `juci.co`
3. Copy iframe code
4. Replace current Instagram section
5. Done! ✨

---

## 🎨 Styling Tips

### Make it match your brand:
```css
.lightwidget-widget {
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}
```

### Hide branding (CSS):
```css
.lightwidget-widget [class*="branding"] {
  display: none !important;
}
```

---

## 🔄 Alternative: Hybrid Approach

Combine multiple methods:
1. Use LightWidget for main feed
2. Add 2-3 manual embeds for featured posts
3. Keep fallback placeholder content

This gives you the best of both worlds - automatic updates plus control over featured content!

Choose the option that works best for your needs. **LightWidget is the easiest and most reliable free option.**
