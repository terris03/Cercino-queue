# Cercino Queue - Guestlist Management System

A modern, responsive web application for managing event guestlists with real-time check-in functionality.

## Features

- **Guestlist Management**: Import/export CSV files, real-time guest tracking
- **Check-in System**: Mark guests as checked in with timestamp tracking
- **Search & Filter**: Find guests quickly with search functionality
- **Statistics Dashboard**: View event analytics and guest statistics
- **Profile Management**: User account settings and preferences
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices

## Tech Stack

- **Frontend**: React 18 with React Router
- **Backend**: Firebase Firestore for data storage
- **Authentication**: Firebase Auth (ready for implementation)
- **Hosting**: Firebase Hosting
- **Styling**: CSS3 with modern glassmorphism effects

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase CLI

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/Cercino-queue.git
cd Cercino-queue
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

### Firebase Setup

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize Firebase in your project:
```bash
firebase init
```

4. Deploy to Firebase Hosting:
```bash
npm run build
firebase deploy
```

## Project Structure

```
src/
├── components/
│   ├── Guestlist.js          # Main guestlist page
│   ├── Statistics.js         # Statistics dashboard
│   ├── Profile.js           # User profile page
│   └── BottomNavigation.js  # Bottom navigation component
├── firebase.js              # Firebase configuration
├── App.js                   # Main app component with routing
├── App.css                  # Main stylesheet
└── index.js                 # App entry point
```

## Usage

### Importing Guests

1. Prepare a CSV file with columns: `First Name`, `Second Name`, `Price`
2. Click "Import CSV" button
3. Select your CSV file
4. Guests will be automatically added to the system

### Checking In Guests

1. Find the guest in the list
2. Click "Check In" button next to their name
3. The guest will be marked as checked in with timestamp

### Exporting Data

1. Click "Export CSV" button
2. A CSV file will be downloaded with all guest data including check-in status

## Deployment

The app is configured for deployment to Firebase Hosting. After building the project, run:

```bash
firebase deploy
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
