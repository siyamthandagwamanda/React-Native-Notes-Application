<img src="https://socialify.git.ci/siyamthandagwamanda/React-Native-Notes-Application/image?language=1&owner=1&name=1&stargazers=1&theme=Light" alt="React-Native-Notes-Application" width="640" height="320" />

# React Native Notes Application

A note-taking app built with React Native and Expo Router. Users register and log in,
then create, view, edit, delete, search and sort notes grouped by category
(Work, Study, Personal). All data is stored on the device with AsyncStorage.

## Download the app

**APK (Google Drive):** https://expo.dev/accounts/siyamthandagwamanda/projects/Notes-App/builds/2e9c6b86-9f76-44b5-9567-c52adb20de83

Android only. Download the APK on an Android phone, open it, and allow installs from
unknown sources if asked.

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
- **Profile:** update username, email and password (leave the password empty to keep it)
- **Log out**

### Notes management
- **Add** a note with text, category and an optional title. The date added is saved automatically
- **View** your notes, with each category on its own page
- **Edit** a note. Edited notes show when they were last updated
- **Delete** a note, with a confirmation prompt
- **Search:** a note matches when every typed word appears in its title or text
- **Sort** by date added, newest first or oldest first

## Screens

| Screen | File | Access |
| --- | --- | --- |
| Login | `src/app/login.tsx` | Logged out |
| Register | `src/app/register.tsx` | Logged out |
| Home (categories) | `src/app/index.tsx` | Logged in |
| Category page | `src/app/category/[name].tsx` | Logged in |
| Add / edit note | `src/app/note.tsx` | Logged in |
| Profile | `src/app/profile.tsx` | Logged in |

## Navigation

The app uses **Expo Router** (file-based routing): every file in `src/app` is a screen.

- `src/app/_layout.tsx` uses `Stack.Protected` to decide which screens are available.
  When a user logs in or out, the guards switch and the router moves to an allowed screen automatically.
- `category/[name].tsx` is a **dynamic route**: one file serves `/category/Work`,
  `/category/Study` and `/category/Personal`.
- The note screen receives **route params**: an `id` when editing, or a `category` when adding.

## Project structure

```
src/
  app/                   screens (Expo Router routes)
    _layout.tsx          protected routing
    login.tsx
    register.tsx
    index.tsx            home: category buttons, profile, log out
    category/
      [name].tsx         notes in one category, with search and sort
    note.tsx             add and edit form
    profile.tsx          update credentials
  components/
    AuthContext.tsx      shares the logged-in user with every screen
    NoteCard.tsx         one note in a list
  services/
    storage.ts           all AsyncStorage reads and writes (users and notes)
  types/
    types.ts             User and Note types, category list
  utils/
    hash.ts              password hashing helper
  styles/
    form.ts              shared form styles
```

**Separation of concerns:** screens never call AsyncStorage directly. They call functions in
`services/storage.ts`, so the UI is kept separate from the data layer.

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

Data is stored per device, so an account created on one phone does not exist on another.
The user stays logged in only while the app is open.

## Building the APK

```bash
npx eas-cli@latest login
npx eas-cli@latest build -p android --profile preview
```

The `preview` profile in `eas.json` produces an installable `.apk`.

## Built with

- Expo and Expo Router
- React Native with TypeScript
- `@react-native-async-storage/async-storage`
- EAS Build

## Authors

- Siyamthanda Gwamanda
- Mlab CodeTriber