# Check for Node.js
node -v >/dev/null 2>&1
if [ $? -ne 0 ]; then
  echo "Node.js is not installed or not in the path. Please install Node.js version 18.18.0 or above."
  exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | awk '{print $NF}')

if [[ "$NODE_VERSION" < "18.18.0" ]]; then
  echo "Node.js version is too old. Please install Node.js version 18.18.0 or above."
  exit 1
fi

# Check for npm
npm -v >/dev/null 2>&1
if [ $? -ne 0 ]; then
  echo "npm is not installed or not in the path. Please install npm."
  exit 1
fi

# Check for Docker
docker -v >/dev/null 2>&1
if [ $? -ne 0 ]; then
  echo "Docker is not installed or not in the path. Please install Docker or Docker Desktop."
  exit 1
fi

# Execute "npm run dev:db"
echo "Initiating the database docker container..."
npm run dev:db
if [ $? -ne 0 ]; then
  echo "Failed to start the database container."
  exit 1
fi

# Execute "npm run install:api"
echo "Installing the API dependencies.."
npm run install:api
if [ $? -ne 0 ]; then
  echo "Failed to install the API dependencies."
  exit 1
fi

# Execute "npm run install:web"
echo "Installing the WEB dependencies.."
npm run install:web
if [ $? -ne 0 ]; then
	echo "Failed to install the WEB dependencies."
	exit 1
fi


# Execute "npm run install:app"
# echo "Installing the APP dependencies.."
# npm run install:app
# if [ $? -ne 0 ]; then
#   echo "Failed to install the APP dependencies."
#   exit 1
# fi

echo "Project setup completed. Create the .env files on each package sub-folder and fill using the .env.example files."
