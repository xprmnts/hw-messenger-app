# Messenger

A one-to-one realtime chat app.

[Preview Video](https://youtu.be/v4DPjOQmzQM)

## Features

1. Cookie Based Authentication via JWT Tokens
2. Real-time messaging and read receipts via Sockets.io

## Running Application Locally

```
psql
CREATE  DATABASE messenger;
\q

cd server
npm install

// seed the database
npm run seed

npm run dev
```

Create a .env file in the server directory and add your session secret

```
SESSION_SECRET = "your session secret"
```
