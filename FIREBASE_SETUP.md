# Firebase Setup Guide for Akoh's Portfolio

Follow these steps to connect Firebase to your portfolio website.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter a project name (e.g., "akoh-portfolio")
4. Select location and click "Create project"
5. Wait for the project to initialize

## Step 2: Enable Authentication

1. In the left sidebar, click "Authentication"
2. Click "Get started"
3. Select "Email/Password" as the sign-in method
4. Toggle it ON and click "Save"

## Step 3: Create Firestore Database

1. In the left sidebar, click "Firestore Database"
2. Click "Create database"
3. Select "Start in test mode" (for development)
4. Choose a location (closest to you)
5. Click "Create"

## Step 4: Get Your Firebase Config

1. Click the gear icon ⚙️ at the top left → "Project settings"
2. Scroll down to "Your apps" section
3. Click the web icon `</>` (if you haven't created an app, create one)
4. Copy all the credentials shown

Your config should look like:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789...",
  appId: "1:123456789:web:abcdef..."
};
```

## Step 5: Add Environment Variables

1. In your portfolio project, create a `.env.local` file (if it doesn't exist)
2. Add your Firebase credentials:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789...
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef...
```

3. Save the file
4. Restart your dev server (`pnpm dev`)

## Step 6: Verify It Works

1. Go to `http://localhost:3000/admin/login`
2. Click "Create an account"
3. Enter your email and password
4. You should successfully create an admin account
5. You'll be redirected to the admin dashboard

## Step 7: Create Admin Collections (Optional)

For production, set up Firestore collections manually:

### Create Collections:

1. **projects** - Store portfolio projects
   - Fields: title, description, technologies, github, demo, image, visible, createdAt
   
2. **skills** - Store skills and proficiency
   - Fields: name, category, level, icon
   
3. **experiences** - Store work experience
   - Fields: company, position, duration, description[], skills[], startDate, endDate, current
   
4. **blogPosts** - Store blog articles
   - Fields: title, excerpt, content, category, tags[], featured, published, publishedAt

5. **settings** - Store portfolio settings
   - Fields: name, email, bio, profileImage, cvUrl, socialLinks

## Step 8: Configure Firestore Security Rules (Important!)

Go to Firestore → Rules and replace with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read/write their own data
    match /projects/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /skills/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /experiences/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /blogPosts/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /settings/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Deploying to Vercel

When deploying to Vercel:

1. Push your code to GitHub
2. Connect to Vercel
3. Go to "Settings" → "Environment Variables"
4. Add all your Firebase environment variables
5. Redeploy

Vercel will use these variables automatically.

## Troubleshooting

### "Firebase: Error (auth/invalid-api-key)"
- Make sure all environment variables are set correctly
- Check there are no extra spaces
- Restart your dev server after adding variables

### "Cannot access Firestore"
- Make sure Firestore database is created
- Check Firestore Rules allow read/write
- Verify you're signed in with an authenticated user

### Admin login not working
- Ensure Authentication is enabled in Firebase
- Check email/password auth method is active
- Verify environment variables are correct

### Data not saving
- Check Firestore database exists
- Verify Firestore Rules (see step 8)
- Check browser console for error messages
- Ensure you're authenticated (logged into admin)

## Next Steps

Once Firebase is set up:

1. Go to `/admin/login` and create your admin account
2. Visit `/admin/dashboard` to manage content
3. Add your projects, skills, experiences, and blog posts
4. Update your profile in Settings
5. The portfolio will automatically fetch and display your content!

## Advanced: GitHub API Integration

To fetch your GitHub repositories:

1. Create a GitHub Personal Access Token
2. Add it to your admin settings
3. Click "Fetch from GitHub"
4. Select which repos to display

---

**Need help?** Check the main README.md for more detailed documentation.
