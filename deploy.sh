#!/bin/bash

# Build the React app
echo "Building React app..."
npm run build

# Deploy to Firebase
echo "Deploying to Firebase..."
firebase deploy

echo "Deployment complete!"
echo "Your app is now live at: https://cercino-queue.firebaseapp.com"
