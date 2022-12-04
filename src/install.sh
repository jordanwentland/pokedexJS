# Setup API
cd public/api/
npm install
echo "Setting up local api please wait (this can take some time)..."
node apiSetup.js
echo "local api accessible on http://localhost:8080/api/POKEMON_NAME/data.json !!"

#Start Web server
cd ../../
npm install
echo "Starting node server..."
node server.js
