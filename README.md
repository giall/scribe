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
cd api
npm run dev
```

To run the authentication service: https://github.com/giall/hecate#Scripts

## Deployment

Deploy the web app to Firebase Hosting:
```
cd web
npm run deploy
```

Deploy the API to Google Cloud Functions:
```
cd api
npm run build
npm run deploy --prefix dist
```
