=========================
STOCK PORTFOLIO TRACKER
=========================

A full-stack web application designed to help users track and manage their stock investment portfolios. Built with a modern tech stack featuring React on the frontend and NestJS on the backend, with Firebase for authentication and database services.


KEY FEATURES
------------
- Secure User Authentication: Sign up, log in, and session management handled by Firebase Authentication.
- Interactive Dashboard: A clean, responsive dashboard that provides a snapshot of your portfolio's key metrics.
- Portfolio Metrics: View total portfolio value and the number of unique holdings.
- Data Visualization: Interactive charts for portfolio performance and asset allocation.
- Full Transaction Management: Add new buy/sell transactions via a user-friendly modal. All transactions are securely stored per user.
- Dynamic UI: The application state is managed globally with Zustand, allowing for seamless updates like auto-refreshing the dashboard after a new transaction is added.


TECH STACK
----------
Frontend:
- Framework: React (Vite)
- Language: TypeScript
- UI Library: Material-UI (MUI)
- State Management: Zustand
- Charting: Recharts
- Client-side Auth: Firebase SDK

Backend:
- Framework: NestJS
- Language: TypeScript
- Database: Firestore (via Firebase Admin SDK)
- Authentication: Firebase Admin SDK (for JWT verification)


GETTING STARTED
---------------

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

PREREQUISITES:
- Node.js (v20 or later recommended)
- npm or yarn
- A Google Firebase project (you can create one for free)


INSTALLATION & SETUP
--------------------

Step 1: Clone the repository
git clone https://github.com/sumitjadala/stock-portfolio-tracker.git
cd stock-portfolio-tracker

Step 2: Set up the Backend
- Navigate to the backend directory:
  cd backend

- Install dependencies:
  npm install

- Crucial Step: Create your Firebase Service Account key.
  1. Go to your Firebase project console -> Project Settings -> Service accounts.
  2. Click "Generate new private key".
  3. A JSON file will be downloaded. Rename this file to serviceAccountKey.json.
  4. Place this serviceAccountKey.json file inside the backend/src/firebase/ directory.

- Run the development server:
  npm run start:dev
  (The backend will be running on http://localhost:3000)

Step 3: Set up the Frontend
- Open a new terminal and navigate to the frontend directory:
  cd frontend

- Install dependencies:
  npm install

- Crucial Step: Configure your Firebase client.
  1. In your Firebase project console, go to Project Settings and find the "Your apps" card.
  2. Click the Web (</>) icon to find your app's configuration.
  3. Copy the firebaseConfig object.
  4. Open the frontend/src/firebase.ts file and replace the placeholder firebaseConfig object with the one you copied.

- Run the development server:
  npm run dev
  (The frontend will be running on http://localhost:5173)