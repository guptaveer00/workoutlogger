I work out all the time, so I wanted a simple place to keep track of what I did. I built this app to save my exercises and look back at the weight and sets I logged.

The Workout History screen shows my saved exercises with the date, weight in pounds, and number of sets, with the newest exercise at the top. When I tap Add Exercise, the Log Exercise screen lets me enter the exercise name, weight, and sets. I can enter zero pounds for a bodyweight exercise, and when I tap Save, the app adds today’s date and takes me back to my history. My entries are still there when I close and reopen the app.

I used Expo SDK 58 and tested the app on my iPhone with Expo Go. To run it, install Node.js 22.13 or newer, open the project folder in Terminal, and run `npm install`, then `npx expo login`, then `npx expo start`. Sign into the same Expo account on your computer and phone, connect both devices to the same Wi-Fi, and scan the QR code with the iPhone camera to open the app in Expo Go.

One thing that surprised me was how quickly I could see a change on my phone. When the welcome message changed on the computer, the new message showed up in Expo Go without me having to reinstall the app.

After the review, I fixed an issue where a slow save could close a new form if I had already left the old one. I left damaged history recovery and stricter checks for manually changed dates and IDs for later because the app has no way to import or edit saved entries. If the app has trouble reading the history, it keeps the saved data and lets the user try again.
