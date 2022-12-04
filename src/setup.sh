PS3='Please enter your choice (If this is your first time running the script, please select 1): '
options=("Setup API and Start WebServer" "Refresh local API Data" "Start WebServer" "Quit")
select opt in "${options[@]}"
do
    case $opt in
        "Setup API and Start WebServer")
            # Setup API
        cd public/api/
        npm install
        echo "Setting up local api please wait (this can take some time)..."
        node apiSetup.js
        echo "local api accessible on http://localhost:8080/api/POKEMON_NAME/data.json !"

        #Start Web server
        cd ../../
        npm install
        echo "Starting node server..."
        node server.js
            ;;
        "Refresh local API Data")
            # Setup API
            cd public/api/
            npm install
            echo "Refreshing local api please wait (this can take some time)..."
            node apiSetup.js
            echo "local api succesfully refreshed!"
            ;;
        "Start WebServer")
            #Start Web server
            npm install
            echo "Starting node server..."
            node server.js
            ;;
        "Quit")
            break
            ;;
        *) echo "invalid option $REPLY";;
    esac
done