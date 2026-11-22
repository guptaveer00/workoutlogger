# Workout Logger

## Setup

This project uses Expo SDK 58 and was tested on a physical iPhone with Expo Go. Install Node.js 22.13 or newer and Expo Go, then run these commands from the project folder:

```sh
npm install
npx expo login
npx expo start
```

Sign into the same Expo account on your computer and phone. Connect both devices to the same Wi-Fi network, then scan the terminal QR code with the iPhone Camera app and open Expo Go.

## Review follow-up

- The project author tested the save and reopen flow on an iPhone in Expo Go after the raw build.
- A completed save now returns to Workout History only while its original form is still focused. Leaving the form during a save lets the write finish without dismissing another screen.
- Corrupted history recovery and stricter checks for externally altered dates and IDs are deferred. The app has no import or edit path for saved rows. A failed read keeps the original data intact and offers a retry.
