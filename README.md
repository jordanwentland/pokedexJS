#  Final Project - PokedexJS


## Description

### Goal
The goal of this project was to create a web application that would be able to do the following task: Take Pokemon names or numbers as an entry and return the Pokemon's game sprite (shiny and normal), random Pokedex entry from the games, and the Pokemon's base stats. 
My goal was to do this while displaying all of the information in an easy to read format on the front end. The final result is this: pokedex.js

---

### Technical
This web application is broken down into 2 major portions: The web server and the API. When this application is started, a JavaScript file pull down API data from an already existing Pokemon API called [pokeapi.co](https://pokeapi.co/). The goal in pulling this information down and accessing it locally is to reduce the traffic load to the website in the long run by hosting the API locally. Once the API is created, our web server is started and is accessible at http://localhost:8080. The web server utilizes JavaScript. Specifically, node is being used to run the application and express is handling the routing of information appropriately. 

By using Express, I was able to run the web server and host the API information utilizing the same web server script making it much more lean and convenient to use. 

---

#### The structure
```
PokedexJS
│   setup.sh
│   server.js
│   package.json
└───public
│   │   index.html
│   │   favicon.ico
│   │   poke.js
│   │   style.css
└───────api
│   │   │   apiSetup.js
│   │   │   package.json
```
---
#### To-Do items:
```
[wip] Implement auto API sizing (currently stuck at first 1154 entries)
[] Refine Express routes
[wip] Work on CSS Styling and HTML page 
[] Streamline the JS scripts
[] Asynchronous fetch requests
``` 

---
#### End note: 
```
This project is still a WIP - please raise all issues on github.
```
---

## Getting Started

### Installing

To install and initialize this program, you can do it in 1 of 3 ways

* Method 1 (git): 
	* download the repository by running 
	 `git clone hhttps://github.com/jordanwentland/pokedexJS`
	 * After this, navigate into: `/src`
	 * run the setup.sh script `./setup.sh`
		 * if required, do `chmod +wrx setup.sh` to enable the running of it
	* Select option `1` to setup the api and start the webserver
* Method 2 (download):
	* download the ```PokeJS``` zip from the following link: [master.zip](https://github.com/jordanwentland/pokedexJS/archive/refs/heads/master.zip)
	 * unzip the folder and navigate into it 
	 * After this, navigate into: `/src`
	 * run the setup.sh script `./setup.sh`
		 * if required, do `chmod +wrx setup.sh` to enable the running of it
	* Select option `1` to setup the api and start the webserver
* Method 3 (./setup.sh error )
	* If the setup.sh script does not run as intended or fails - you can run the setup via the following process:
		* navigate into: `/src`
		* `cd public/api/`
		* `npm install` this will install the required node packages for the API
		* `node apiSetup.js` this initiates and pulls all files for the API 
		* `cd ../../` this returns to the root `/src` directory 
		* `npm install` this will install the required node packages for the web
		* `node server.js` this will start the web server + API content serving
---
### How to use the program

after running the ```./setup.sh``` script a web-server will by started on your machine at http://localhost:8080. By navigating to this page, you will be greeted with the application.

The application can take valid Pokemon names, Pokedex entries, or Random as entries. Below is a list of example entries to use:
```
- Snom 
- Bulbasaur
- Pikachu
- Random
- Larvesta
- Charizard
- Rayquaza
```
Each of these should return a valid output.

---

### Authors

Jordan Wentland for IT-3080c final 
