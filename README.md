<img src="/public/logo.png" width="90" height="95">

# [Date Portal](https://dateportal.vercel.app)

Date Portal is an AI integrated web app to help you organize your romantic life, track your dates, manage your budget, set reminders, and keep promises.

## Features

- Add, edit, and delete dates with categories, cost, and notes
- Track monthly spending and budget
- View spending by category
- Set and manage reminders for important events
- Add and complete promises
- AI Assistant for date ideas and relationship advice powered by [HackClub AI](https://ai.hackclub.com)
- Dark mode & Responsive design for desktop and mobile

<details>
  <summary>
<h2>Screenshots</h2>
  </summary>
  <img width="1365" height="630" alt="Screenshot 2025-07-30 003334" src="https://github.com/user-attachments/assets/25c48233-38ae-47c2-8da2-6a7126f395ff" />
  <img width="1365" height="631" alt="image" src="https://github.com/user-attachments/assets/437cc998-23ba-474c-a040-efe5bf742bfb" />
  <img width="1365" height="631" alt="image" src="https://github.com/user-attachments/assets/2ab85ec4-dc64-48a9-98e8-b46c8c98cc34" />
  <img width="1365" height="629" alt="image" src="https://github.com/user-attachments/assets/242b19c0-236a-4779-81e3-f3b3ccb02c90" />
</details>

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
