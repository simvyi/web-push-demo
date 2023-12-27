# Setup Guide

First you need to generate a local SSL certificate and add it to your rootCA. The following guide must be done for both the backend and frontend applications

## Generate Local SSL Certificate

1. Navigate to the `ssl/` directory
2. Run the `generate.sh` script. Either double-click from the file explorer or run `sh ./generate.sh` on Linux or MacOS, `.\generate.sh` on Windows.
3. Now you should have both `ssl/server.crt` and `ssl/server.key`

## Add Certificate to Root Certificate Authorities (rootCA)

Now we need to add the certificate in the rootCA folder
The following guide shows how to this on Windows

1. Navigate to the `ssl/server.crt` in the file explorer
2. Open the file by double-clicking it
3. Click `Install certificate...`
4. Select `Local Machine` and click `Next`
5. Select `Local Machine` and click `Next`
6. Select `Place all certificates in the following store`
7. Click `Browse...` and select the folder `Trusted Root Certification Authorities` and click `OK`
8. Click `Next` and `Finish`
9. You should now get a message confirming that the import was successful
10. Close the widget by clicking `OK`

## Install Dependencies

Before running the applications we need to install the dependncies. I like to use `pnpm` as my package manager, however you can also use `yarn` or `npm`.

Do the following:

1. Navigate to either the `backend/` or `frontend/` folder
2. Run `npm install`, `yarn install` or `pnpm install`
3. Run `pnpm dev` to start the application

## Configure VAPID Details

After installing all packages we need to generate a set of VAPID keys.
To do this do the following:

1. Navigate to the `backend/` folder and run `web-push generate-vapid-keys` from the CLI to generate the VAPID keys.
2. Insert the public and private keys into the `backend/src/env-variables.ts` then add a subject.
3. Insert the public key into the `frontend/src/env-variables.ts`

Now the application should work.

### Useful links

https://firebase.google.com/docs/admin/setup#c_1