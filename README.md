# Mask Usage

This application allow users to count times their have used their reusable masks.

You can acces a public instance of the app at [masks.dhonnabhain.me](https://masks.dhonnabhain.me)

## Data storage
It does not store any personal informations like names, age. Only data about users masks are stored (name, port duration time and max wash authorized number)

## Build

You are free to build and host your own version of this application
This application use Firebase as back-end, so if you want to host your own version, you should start by create an app on your Firebase console.

### Firebase requirement
On your Firebase console, you must enable authentication with Facebook / Google authentication and a masks collection in the app database.

### Run local dev mode
```shell
yarn dev
```

### Deploy
Static version is recommended to make it simplier to host.

```shell
yarn build
```

Once you have built the app, you should put it in S3 or in any other static app host provider (Firebase, Vercel, ...)
