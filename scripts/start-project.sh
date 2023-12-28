# Navigate to the api directory
cd packages/api

# Open a new terminal window and execute "npm run dev"
gnome-terminal -- npm run dev &

# Navigate to the root directory
cd ../..

# Navigate to the web directory
cd packages/web

# Open another terminal window and execute "npm run dev:web"
gnome-terminal -- npm run dev &

# Navigate to the root directory
cd ../..

# Navigate to the app directory
cd packages/app

# Open another terminal window and execute "npm run start"
gnome-terminal -- npm start &

# Navigate to the root directory
cd ../..
