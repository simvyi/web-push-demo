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
