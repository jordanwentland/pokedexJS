import fetch from "node-fetch";
import fs from "fs";

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

async function apiPull() {
  let apiCall = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1154`
  );
  var data = await apiCall.json();
  fs.writeFile("./pokedex.json", JSON.stringify(data.results), (error) => {
    if (error) throw error;
  });
}

async function iterateData(data) {
  fs.mkdirSync(`./pokemon/`, { recursive: true });
  for (var i = 0; i < data.length; i++) {
    let pokeName = data[i]["name"];
    let pokeCall = await fetch(data[i]["url"]);
    let pokeData = await pokeCall.json();
    fs.mkdirSync(`./pokemon/${pokeName}/entry`, { recursive: true });
    fs.mkdirSync(`./pokemon/${i + 1}/entry`, { recursive: true });
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

async function iteratePokemonStats(i, pokeName) {
  const speciesString = fs.readFileSync(`./pokemon/${i+1}/data.json`);
  const speciesData = JSON.parse(speciesString);
  let pokeCall2 = await fetch(speciesData["species"]["url"]);
  let pokeData2 = await pokeCall2.json();
  console.log(` ${i+1} + ${pokeName}`);
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

apiPull();
setTimeout(function () {
  let data = readJSON();
  iterateData(data);
}, 1000);
