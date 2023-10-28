:: Check for Node.js
node -v >nul 2>&1
if errorlevel 1 (
    echo "Node.js is not installed or not in the path. Please install Node.js version 18.16.0 or above."
    exit /b 1
)

:: Check Node.js version
for /f "tokens=3" %%a in ('node -v') do (
    set NODE_VERSION=%%a
)

if %NODE_VERSION% LSS 18.16.0 (
    echo "Node.js version is too old. Please install Node.js version 18.16.0 or above."
    exit /b 1
)

:: Check for npm
npm -v >nul 2>&1
if errorlevel 1 (
    echo "npm is not installed or not in the path. Please install npm."
    exit /b 1
)

:: Check for Docker
docker -v >nul 2>&1
if errorlevel 1 (
    echo "Docker is not installed or not in the path. Please install Docker or Docker Desktop."
    exit /b 1
)

:: Execute "npm run dev:db"
echo "Executing npm run dev:db..."
npm run dev:db
if errorlevel 1 (
    echo "Failed to start the database container."
    exit /b 1
)

:: Execute "npm run install:api"
echo "Executing npm run install:api..."
npm run install:api
if errorlevel 1 (
    echo "Failed to install the API dependencies."
    exit /b 1
)

:: Execute "npm run install:web"
echo "Executing npm run install:web..."
npm run install:web
if errorlevel 1 (
		echo "Failed to install the WEB dependencies."
		exit /b 1
)

:: Execute "npm run install:app"
@REM echo "Executing npm run install:app..."
@REM npm run install:app
@REM if errorlevel 1 (
@REM     echo "Failed to install the APP dependencies."
@REM     exit /b 1
@REM )

echo "Project setup completed. Create the .env files on each package sub-folder and fill using the .env.example files."
