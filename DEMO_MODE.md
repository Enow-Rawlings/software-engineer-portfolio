# Demo Mode - Portfolio Without Firebase

This portfolio is designed to work **with or without Firebase**. If you skip Firebase setup, the admin panel will use browser localStorage for demo purposes.

## Running in Demo Mode

Simply start the development server:

```bash
pnpm dev
```

Visit the portfolio:
- **Public Pages**: `http://localhost:3000` - Fully functional
- **Admin Dashboard**: `http://localhost:3000/admin` - Uses localStorage

## Default Demo Data

### Skills (in localStorage)

The admin/skills page comes with 5 default skills:

```
Frontend:
  - React - 95%
  - TypeScript - 90%

Backend:
  - Node.js - 88%

Databases:
  - MongoDB - 85%

Tools:
  - Firebase - 92%
```

### Experience (in localStorage)

One sample experience entry:
```
Company: Tech Company A
Position: Senior Developer
Duration: 2 years
Current: Yes
Skills: React, Node.js, MongoDB
Highlights:
  - Led development of core features
  - Mentored junior developers
  - Improved performance by 40%
```

### Projects (in localStorage)

Starts empty - you can add projects through the admin panel.

### Blog Posts (in localStorage)

One sample blog post:
```
Title: Getting Started with React 18
Category: React
Featured: Yes
Content: # React 18\n\nReact 18 introduces...
Tags: React, JavaScript, Tutorial
```

## Using Demo Mode

### Accessing Admin Panel

1. Go to `http://localhost:3000/admin/login`
2. **No actual login needed** - just enter any email/password
3. You'll be logged in with demo credentials
4. Redirect to `/admin/dashboard`

### Adding Content

Click on any admin menu item:

#### Add Projects
1. Go to `/admin/projects`
2. Click "New Project"
3. Fill in title, description, technologies, links
4. Click Save - it's saved to localStorage

#### Add Skills
1. Go to `/admin/skills`
2. Click "Add Skill"
3. Enter skill name, category, proficiency level
4. Skills are immediately available on `/about`

#### Add Experience
1. Go to `/admin/experience`
2. Click "Add Experience"
3. Fill in company, position, dates, description
4. Timeline updates on `/about`

#### Write Blog
1. Go to `/admin/blog`
2. Click "New Post"
3. Write with markdown support
4. Posts appear on `/projects`

#### Update Settings
1. Go to `/admin/settings`
2. Change name, email, bio, social links
3. These update across the portfolio

## Data Persistence

**localStorage** persists data as long as:
- You don't clear browser storage
- You don't clear site data
- You stay in the same domain/browser

**When you upgrade to Firebase**, all localStorage data remains unchanged. You can manually migrate it to Firestore whenever ready.

## Switching to Firebase

When ready to connect real backend:

1. Follow [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)
2. Add environment variables
3. Restart dev server
4. Admin panel automatically switches to Firebase
5. localStorage data is still available but Firestore takes priority

## Development Workflow

**Perfect for:**
- 🎨 Designing the portfolio
- 📝 Creating content locally
- 🧪 Testing features
- 📱 Testing on different devices
- 🚀 Deploying to preview/staging

**Limitations:**
- ❌ Data doesn't persist across devices
- ❌ No multi-user support
- ❌ No permanent backup
- ❌ Can't share admin access

## Clearing Demo Data

To reset and start fresh:

### Option 1: Clear All Storage
```javascript
// In browser console:
localStorage.clear()
sessionStorage.clear()
location.reload()
```

### Option 2: Clear Specific Data
```javascript
// In browser console:
localStorage.removeItem('portfolio_projects')
localStorage.removeItem('portfolio_skills')
localStorage.removeItem('portfolio_experiences')
localStorage.removeItem('portfolio_blog_posts')
localStorage.removeItem('portfolio_settings')
location.reload()
```

### Option 3: Hard Refresh
Press `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)

## Tips for Demo Mode

1. **Populate Content**: Add projects, skills, and blog posts to see the portfolio in action
2. **Test Animations**: Check all the animations on different pages
3. **Try Dark Mode**: Click the theme toggle in the header
4. **Test Responsiveness**: Use browser DevTools to test mobile view
5. **Share Your Portfolio**: Deploy to Vercel even with demo data!

## Moving Data to Firebase Later

When you're ready to switch to Firebase:

1. Set up Firebase (see FIREBASE_SETUP.md)
2. Go to `/admin` and log in with your Firebase account
3. Manually re-enter or export your demo data
4. The app will use Firebase instead of localStorage

## Architecture Notes

The demo data is stored with these keys:
- `portfolio_projects` - Array of projects
- `portfolio_skills` - Array of skills
- `portfolio_experiences` - Array of experiences
- `portfolio_blog_posts` - Array of blog posts
- `portfolio_settings` - Portfolio settings object

Each component checks localStorage first, allowing seamless Firebase integration later.

---

**Ready to add Firebase? Follow [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)**

**Questions? Check [README_PORTFOLIO.md](./README_PORTFOLIO.md) for more details.**
