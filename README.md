# Scribe

This is a simple note taking web application made with Angular, demonstrating how to use the [Hecate authentication service](https://github.com/giall/hecate) in a web application.

## Demo
The web app is hosted with Firebase Hosting and the Notes API as well the authentication service are running on Google Cloud Functions.

Try the web app here: http://scribe-notes.web.app

## Running locally

To run the web app on `http://localhost:4200/`:
```
cd web
npm start
```

To run the backend on `http://localhost:5000/`:
```
cd api/functions
npm run serve
```

To run the authentication service: https://github.com/giall/hecate#Scripts

## Deployment

Deploy the web app to Firebase Hosting:
```
cd web
npm run deploy
```

Deploy the API to Firebase Functions:
```
cd api/functions
npm run build
npm run deploy
```
Note: This requires the Firebase CLI and a Firebase project to be set up.