<img src="https://socialify.git.ci/siyamthandagwamanda/React-Native-Notes-Application/image?language=1&owner=1&name=1&stargazers=1&theme=Light" alt="React-Native-Notes-Application" width="640" height="320" />

# React Native Notes Application

A note-taking app built with React Native and Expo Router. Users register and log in,
then create, view, edit, delete, search and sort notes grouped by category
(Work, Study, Personal). All data is stored on the device with AsyncStorage.

## Download the app

**APK (Google Drive):** PASTE-YOUR-DRIVE-LINK-HERE

## Run it locally

```bash
npm install
npx expo start
```

Scan the QR code with **Expo Go** (Android) or the Camera app (iOS).

## Features

### User management
- **Register** with a username, email address and password
- **Log in** with email and password
- **Protected routes:** logged-out users can only reach Login and Register;
  logged-in users cannot go back to Login or Register
- **Profile:** update username, email and password
- **Log out**

### Notes management
- **Add** a note with text, category and an optional title. The date added is saved automatically
- **View** all your notes, with each category on its own page
- **Edit** a note. Edited notes show when they were last updated
- **Delete** a note
- **Search:** a note matches when every typed word appears in its title or text
- **Sort** by date added, oldest first or newest first

## Navigation

The app uses **Expo Router** (file-based routing). Every file in `src/app` is a screen.
`src/app/_layout.tsx` uses `Stack.Protected` to decide which screens are available:

| Logged out | Logged in |
| --- | --- |
| Login, Register | Home, category pages, note screens, profile |

When a user logs in or out, the guards switch and the router moves to an allowed screen automatically.

## Project structure

```
src/
  app/            screens (Expo Router routes)
    _layout.tsx   protected routing
    login.tsx
    register.tsx
    index.tsx     home
  components/
    AuthContext.tsx   shares the logged-in user with every screen
  services/
    storage.ts    all AsyncStorage reads and writes (users and notes)
  types/
    types.ts      User and Note types
  utils/
    hash.ts       password hashing helper
  styles/
    form.ts       shared form styles
```

Screens never call AsyncStorage directly. They call functions in `services/storage.ts`,
which keeps the UI separate from the data layer.

## Security and storage

This app uses `AsyncStorage` for local data, as set out in the project brief.
To protect user accounts within a local-only setup, without extra dependencies, the app includes:

- **Protected routes:** users must log in before reaching any notes screen.
- **Account isolation:** each note is saved with its owner's `userId`, and the app only shows
  and edits notes belonging to the logged-in user.
- **Hashed passwords:** passwords are never saved as plain text. They are passed through
  a lightweight hashing helper (`simpleHash`) before being stored.
- **Production note:** `AsyncStorage` stores data, including note contents, unencrypted on the device.
  A production version would keep credentials in `expo-secure-store` (or native Keychain/Keystore)
  and use a proper hashing algorithm such as bcrypt or Argon2, usually on a backend server.

## Built with

- Expo and Expo Router
- React Native with TypeScript
- `@react-native-async-storage/async-storage`

## Authors

- Siyamthanda Gwamanda
- Mlab 2026 Cohort @CodeTriber
