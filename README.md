<img src="/public/logo.png" width="90" height="95">

# [Date Portal](https://dateportal.vercel.app)

Date Portal is a web app to help you organize your romantic life, track your dates, manage your budget, set reminders, and keep promises.

## Features
- Add, edit, and delete dates with categories, cost, and notes
- Track monthly spending and budget
- View spending by category
- Set and manage reminders for important events
- Add and complete promises
- AI Assistant for date ideas and relationship advice powered by [HackClub AI](https://ai.hackclub.com)
- Responsive design for desktop and mobile

## Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/leecheeyong/DatePortal.git
   cd DatePortal
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Configure Firebase:**
   - Go to [Firebase Console](https://console.firebase.google.com/) and create a new project.
   - Enable **Authentication** (Email/Password).
   - Set up **Cloud Firestore** in test mode (or with secured rules).
   - Edit the `src/composables/useFirebase.js` (`26-33 line`) file, replace with your Firebase credentials

## License

DatePortal is available as open source under the terms of the [MIT License](https://github.com/leecheeyong/DatePortal/blob/main/LICENSE).