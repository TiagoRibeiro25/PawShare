:: Navigate to the api directory
cd packages/api

:: Open a cmd.exe and execute "npm run dev"
start cmd.exe /k "npm run dev"

:: Navigate to the root directory
cd ../..

:: Navigate to the web directory
cd packages/web

:: Open another cmd.exe and execute "npm run dev"
start cmd.exe /k "npm run dev"

:: Navigate to the root directory
:: cd ../..

:: Navigate to the app directory
:: cd packages/app

:: Open another cmd.exe and execute "npm run dev:app"
@REM start cmd.exe /k "npm run dev:app"

:: Navigate to the root directory
@REM :: cd ../..
