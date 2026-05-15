# Akoh Rawlings Enow - Professional Portfolio Website

A modern, premium software engineering portfolio built with Next.js 16, Tailwind CSS, Framer Motion, and Firebase. Features animated hero sections, smooth transitions, and a secure admin dashboard for content management.

## 🚀 Live Features

### Public Pages (4 Main Pages)
1. **Home Page** (`/`)
   - Hero section with animated typing effect
   - Animated statistics counter
   - Featured projects carousel
   - Skills preview section
   - Experience highlights
   - Latest blog previews
   - Smooth scroll animations and transitions

2. **About/Skills/Experience Page** (`/about`)
   - Professional biography
   - Detailed skills grouped by categories (Frontend, Backend, Databases, Tools)
   - Animated skill progress bars
   - Experience timeline with flip animations
   - Certifications and achievements
   - Hover effects and scroll reveals

3. **Projects & Blog Page** (`/projects`)
   - Dynamic project cards with filtering
   - Project showcase with GitHub integration
   - Blog section with rich text support
   - Search and filter functionality
   - Featured article highlighting
   - Card hover and flip animations

4. **Contact Page** (`/contact`)
   - Professional contact form with validation
   - Success/error notifications
   - Social media section with animated icons
   - Location section
   - Professional footer with quick links

### Admin Dashboard (Protected)
- **Login Page** (`/admin/login`) - Firebase email/password authentication
- **Dashboard Overview** (`/admin/dashboard`) - Analytics and overview
- **Projects Manager** (`/admin/projects`) - CRUD operations for projects with visibility toggle
- **Skills Manager** (`/admin/skills`) - Manage skills by category
- **Experience Manager** (`/admin/experience`) - Add/edit/delete work experience
- **Blog Manager** (`/admin/blog`) - Create and manage blog posts with rich text
- **Settings** (`/admin/settings`) - Update profile, bio, social links, and upload CV

## 📋 Setup Instructions

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Firebase Configuration
The portfolio requires Firebase for authentication and data storage. To set it up:

1. Create a Firebase project at [firebase.google.com](https://firebase.google.com)
2. Get your Firebase config credentials
3. Add these environment variables to your `.env.local` file:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

**Note**: Without Firebase configuration, the app will still build and run, but admin authentication and data persistence won't work. The public pages will function normally using localStorage for demo data.

### 3. Run Development Server
```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your portfolio.

### 4. Build for Production
```bash
pnpm build
pnpm start
```

## 🎨 Design Features

### Color Palette (Premium Theme)
- **Primary**: Royal Blue (`#4f6ef7`) - Main brand color
- **Secondary**: Dark Navy (`#6b7280`) - Supporting color
- **Accent**: Teal (`#14b8a6`) - Highlight and interactive elements
- **Background**: White (light) / Dark Navy (dark)
- **Text**: Dark Navy (light) / Light Gray (dark)

### Animations & Effects
- ✨ **Typing Effect** - Animated name introduction on home hero
- 🎯 **Counter Animations** - Smooth number transitions for statistics
- 🌊 **Scroll Reveals** - Elements animate in as you scroll
- 🎪 **Card Flip Animations** - Skill and experience cards flip on hover
- 🌀 **Particle Background** - Floating particles for visual interest
- 🎠 **Carousel Sliders** - Smooth project showcase carousel
- 💫 **Glassmorphism Effects** - Modern frosted glass UI elements
- 🌗 **Dark Mode Support** - Automatic dark mode toggle

### Responsive Design
- ✅ Mobile-first approach
- ✅ Fully responsive on all screen sizes
- ✅ Touch-friendly navigation
- ✅ Mobile hamburger menu for admin panel

## 📁 Project Structure

```
app/
├── page.tsx                 # Home page
├── about/page.tsx          # About/Skills/Experience page
├── projects/page.tsx       # Projects & Blog page
├── contact/page.tsx        # Contact page
├── admin/
│   ├── login/page.tsx      # Admin login
│   ├── dashboard/page.tsx  # Admin dashboard
│   ├── projects/page.tsx   # Project management
│   ├── skills/page.tsx     # Skills management
│   ├── experience/page.tsx # Experience management
│   ├── blog/page.tsx       # Blog management
│   └── settings/page.tsx   # Settings/profile
└── layout.tsx              # Root layout

components/
├── navigation/
│   ├── Header.tsx          # Main navigation header
│   └── Footer.tsx          # Footer component
├── animations/
│   ├── ScrollReveal.tsx    # Scroll reveal wrapper
│   ├── ParticlesBackground.tsx
│   ├── AnimatedCounter.tsx
│   └── TypingEffect.tsx
├── sections/
│   ├── HeroSection.tsx     # Home hero
│   ├── StatsSection.tsx    # Statistics cards
│   ├── SkillsPreviewSection.tsx
│   ├── SkillsFullSection.tsx
│   ├── ExperienceSection.tsx
│   ├── AboutSection.tsx
│   ├── ProjectsSection.tsx
│   ├── ContactSection.tsx
├── theme/
│   └── ThemeToggle.tsx     # Dark mode toggle
└── admin/
    └── AdminSidebar.tsx    # Admin navigation

lib/
├── firebase.ts             # Firebase configuration
├── auth-context.tsx        # Authentication context
└── utils.ts                # Utility functions
```

## 🔐 Admin Authentication

The admin dashboard uses Firebase Authentication with email and password.

### First-Time Admin Setup
1. Go to `/admin/login`
2. Click "Create an account"
3. Set up your email and password
4. You'll be authenticated and redirected to the dashboard

### Demo Mode (Without Firebase)
If Firebase is not configured, the admin pages use localStorage for demo purposes. You can:
- Add/edit/delete projects, skills, experiences, and blog posts locally
- Changes are persisted in your browser's localStorage
- Perfect for development and testing!

## 🌐 GitHub Integration

The projects section is set up to integrate with GitHub (Enow-Rawlings username). To enable:

1. Add your GitHub token in the admin settings
2. The system will fetch your public repositories
3. Toggle repository visibility from the admin dashboard
4. Edit repository details manually in the admin panel

## 🚀 Deployment

### Deploy to Vercel
```bash
vercel
```

The easiest way to deploy this portfolio:

1. Push your code to GitHub
2. Connect your repo to Vercel
3. Add Firebase environment variables in Vercel dashboard
4. Deploy!

### Other Platforms
Works with any Node.js hosting (AWS, Heroku, Railway, etc.)

## 📝 Customization Guide

### Update Portfolio Content
1. **Admin Dashboard**: Go to `/admin` and login
2. **Add Projects**: Click "New Project" and fill in details
3. **Manage Skills**: Add skills with proficiency levels
4. **Add Experience**: Create work history entries
5. **Write Blog**: Create articles with rich text editor
6. **Update Settings**: Change name, email, bio, social links

### Customize Colors
Edit `/app/globals.css` and `/tailwind.config.ts` to modify the color palette.

### Customize Animations
Adjust animation timing and effects in:
- `components/animations/*.tsx`
- `/tailwind.config.ts` (keyframes)
- Framer Motion props in components

### Update Contact Form
Edit `/components/sections/ContactSection.tsx` to integrate your email service (Resend, SendGrid, etc.)

## 🛠️ Tech Stack

- **Framework**: Next.js 16
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Backend**: Firebase (Firestore, Auth, Storage)
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Markdown**: React Markdown
- **TypeScript**: Full type safety

## 📊 Performance

- ⚡ **Optimized Images**: Next.js image optimization
- 🔄 **Lazy Loading**: Components load on demand
- 📦 **Code Splitting**: Automatic route-based code splitting
- 🎯 **SEO Optimized**: Meta tags, Open Graph, structured data
- 🗜️ **Minified CSS/JS**: Production-ready bundles

## 🔒 Security Features

- 🔐 **Firebase Auth**: Secure authentication
- 🛡️ **Environment Variables**: Sensitive data protected
- 📊 **Admin Routes**: Protected with authentication
- 🚫 **Input Validation**: Form validation on client & server
- 🗝️ **RLS Ready**: Firebase Rules can be configured for data protection

## 📞 Support & Troubleshooting

### Build Issues
- Clear cache: `rm -rf .next`
- Reinstall deps: `pnpm install`
- Check Node version: `node --version` (requires 16+)

### Firebase Not Working
- Verify environment variables are set correctly
- Check Firebase project is active
- Ensure email/password auth is enabled in Firebase Console
- Check Firestore rules allow read/write

### Animations Not Smooth
- Check browser hardware acceleration is enabled
- Reduce animation complexity if needed
- Use Chrome DevTools to profile performance

## 📄 License

This portfolio template is open for personal and commercial use.

## 🤝 Contributing

Feel free to customize and improve this portfolio for your needs!

---

**Built with ❤️ using v0**

For more info on Next.js: [nextjs.org](https://nextjs.org)
For more info on Firebase: [firebase.google.com](https://firebase.google.com)
For more info on Tailwind CSS: [tailwindcss.com](https://tailwindcss.com)
