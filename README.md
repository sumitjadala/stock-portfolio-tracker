Stock Portfolio Tracker
A full-stack application to track and manage stock investments, built with React, NestJS, and Firebase.

Core Technologies
Frontend: React (Vite), TypeScript, Material-UI, Zustand

Backend: NestJS, TypeScript

Database & Auth: Firebase (Firestore, Firebase Authentication)

Local Setup Instructions
Prerequisites
Node.js (v20 or later)

A personal Google Firebase project

1. Clone & Install
Clone the repository and install dependencies in both the /frontend and /backend directories.

bash
# In /frontend
npm install

# In /backend
npm install
2. Configure Backend (/backend)
Get Service Account Key: In your Firebase project settings, go to "Service accounts" and generate a new private key.

Add Key to Project: Rename the downloaded file to serviceAccountKey.json and place it in the backend/src/firebase/ directory.

Secure Your Key: This is crucial. Add serviceAccountKey.json to your backend/.gitignore file. This file must never be committed to Git.

Start Backend Server:

bash
npm run start:dev
The backend will run on http://localhost:3000.

3. Configure Frontend (/frontend)
Get Firebase Config: In your Firebase project settings, find your web app's firebaseConfig object.

Update firebase.ts: Open frontend/src/firebase.ts and replace the placeholder config with your own.

Create Environment File: Create a file named .env.local in the frontend root directory.

Add API URL: Add the following line to your .env.local file:

text
VITE_API_BASE_URL=http://localhost:3000
Start Frontend Server:

bash
npm run dev
The application will be accessible at http://localhost:5173.