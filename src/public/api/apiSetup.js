//Import statements for application
import fetch from "node-fetch";
import fs from "fs";

//This function attempts to read the json file that is created. 
function readJSON() {
  try {
    const jsonString = fs.readFileSync("./pokedex.json");
    const data = JSON.parse(jsonString);
    return data;
  } catch (err) {
    console.log(err);
    return;
  }
}

//reaches out to pokeapi.co and stores the base data in a "pokedex.json file" for use later. 
async function apiPull() {
  let apiCall = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1154`
  );
  var data = await apiCall.json();
  fs.writeFile("./pokedex.json", JSON.stringify(data.results), (error) => {
    if (error) throw error;
  });
}

//This function iterates through the pokedex.json file and create directories and data.json files for each pokemon.
async function iterateData(data) {
  //creates the /pokemon folder
  fs.mkdirSync(`./pokemon/`, { recursive: true });
  //for each entry in pokedex.json, do the following:
  for (var i = 0; i < data.length; i++) {
    //grabs pokemon name
    let pokeName = data[i]["name"];
    //calls for pokemon specific URL 
    let pokeCall = await fetch(data[i]["url"]);
    let pokeData = await pokeCall.json();
    //Makes individual pokemon directory by name and number 
    fs.mkdirSync(`./pokemon/${pokeName}/entry`, { recursive: true });
    fs.mkdirSync(`./pokemon/${i + 1}/entry`, { recursive: true });
    //writes the data to the proper folder
    fs.writeFileSync(
      `./pokemon/${pokeName}/data.json`,
      JSON.stringify(pokeData),
      (error) => {
        if (error) throw error;
      }
    );
    fs.writeFileSync(
      `./pokemon/${i + 1}/data.json`,
      JSON.stringify(pokeData),
      (error) => {
        if (error) throw error;
      }
    );
    iteratePokemonStats(i, pokeName)
  }
  fs.unlinkSync('./pokedex.json')
}
//Function to iterate through the pokemon stats 
async function iteratePokemonStats(i, pokeName) {
  //read in the specific pokemon data.json file
  const speciesString = fs.readFileSync(`./pokemon/${i+1}/data.json`);
  const speciesData = JSON.parse(speciesString);
  //grabs the "speciess" url and fetches that data 
  let pokeCall2 = await fetch(speciesData["species"]["url"]);
  let pokeData2 = await pokeCall2.json();
  //logs the pokedex # and name of pokemon to console 
  console.log(` ${i+1} + ${pokeName}`);
  //Writes the data to the appropriate pokemons entry
  fs.writeFileSync(
    `./pokemon/${i + 1}/entry/data.json`,
    JSON.stringify(pokeData2),
    (error) => {
      if (error) throw error;
    }
  );
  fs.writeFileSync(
    `./pokemon/${pokeName}/entry/data.json`,
    JSON.stringify(pokeData2),
    (error) => {
      if (error) throw error;
    }
  );
}
//Pulls the API, waits 1 second to let the file generate, and then reads in the json data, and then iterates through the data. 
apiPull();
setTimeout(function () {
  let data = readJSON();
  iterateData(data);
}, 1000);
