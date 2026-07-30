# Mamifs Tech Center

Marketing website + student/staff portal for Mamifs Tech Center. Built with
React, Vite, Tailwind CSS, and Firebase (Auth + Firestore). Deploys to
Firebase Hosting automatically via GitHub Actions.

## What's included

- Marketing site: Home, Programs, Testimonials, Contact (with a live Firestore-backed enrollment form)
- Student portal: sign in with Student ID + PIN, track lesson progress per course
- Staff dashboard: sign in with email/password, view enrolled students and inquiries
- Navy / amber / teal brand, IBM Plex Sans + Mono, circuit-board motif
- GitHub Actions: auto-deploy to Firebase Hosting on merge to `main`, preview deploys on pull requests

## 1. Push this to GitHub

```bash
cd mamifs-tech-center
git init
git add .
git commit -m "Initial commit: Mamifs Tech Center site + portal"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/mamifs-tech-center.git
git push -u origin main
```

## 2. Create a Firebase project

1. Go to [console.firebase.google.com](https://console.firebase.google.com) → **Add project**.
2. Once created, go to **Build → Authentication → Sign-in method** and enable **Email/Password** (this is for staff logins).
3. Go to **Build → Firestore Database → Create database** (start in production mode).
4. Go to **Project settings → General → Your apps → Add app → Web**, and copy the config values.

## 3. Local development

```bash
npm install
cp .env.example .env.local   # then paste in your Firebase config values
npm run dev
```

## 4. Connect GitHub to Firebase Hosting (CI/CD)

The easiest way to wire up the two included workflows:

```bash
npm install -g firebase-tools
firebase login
firebase init hosting:github
```

This CLI command will:
- Ask which Firebase project to link (update `.firebaserc` with its ID)
- Create a service account and add `FIREBASE_SERVICE_ACCOUNT` to your GitHub repo secrets automatically
- Offer to generate the same workflow files already included here (safe to keep ours or let it overwrite)

Then manually add these additional repo secrets under **GitHub repo → Settings → Secrets and variables → Actions**:

| Secret | Where to find it |
|---|---|
| `FIREBASE_PROJECT_ID` | Firebase console → Project settings |
| `VITE_FIREBASE_API_KEY` | Firebase console → Project settings → Your apps |
| `VITE_FIREBASE_AUTH_DOMAIN` | same |
| `VITE_FIREBASE_PROJECT_ID` | same |
| `VITE_FIREBASE_STORAGE_BUCKET` | same |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | same |
| `VITE_FIREBASE_APP_ID` | same |

Once secrets are set, every push to `main` auto-builds and deploys to your live
Firebase Hosting URL. Every pull request gets its own preview URL.

## 5. Deploy Firestore rules

```bash
firebase deploy --only firestore:rules
```

## 6. Add your first staff account

In Firebase Console → Authentication → Users → **Add user**, create an
email/password login for yourself or an instructor. That account can now
sign in at `/login` under the **Staff** tab and reach `/admin`.

## 7. Add your first student

In Firestore Console, create a `students` collection with a document
containing:

```json
{
  "studentId": "STU-001",
  "pin": "1234",
  "name": "Jane Student"
}
```

That student can now sign in at `/login` under the **Student** tab using
Student ID `STU-001` and PIN `1234`.

## Notes on this build

- Lesson content for the 7 tracks is scaffolded with lesson **counts**, not
  full lesson text yet (`src/data/programs.js`). Swap in real curriculum
  content when ready — the progress tracker already works against these counts.
- Student PIN login is intentionally lightweight (no Firebase Auth account
  per student) to keep enrollment simple. See the comments in
  `firestore.rules` if you want to harden this later.
- Replace the placeholder Firebase project ID in `.firebaserc` and the
  `REPLACE-WITH-YOUR-FIREBASE-PROJECT-ID` values once your project exists.
