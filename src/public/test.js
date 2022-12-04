import fetch from "node-fetch";
import fs from "fs";

//apiPull();
let data = readJSON();
iterateData(data);

async function apiPull() {
  let apiCall = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1154`
  );
  var data = await apiCall.json();
  fs.writeFile("pokedex.json", JSON.stringify(data), (error) => {
    if (error) throw error;
  });
}

function readJSON() {
  try {
    const jsonString = fs.readFileSync("./pokedex.json");
    const data = JSON.parse(jsonString);
    return data.results;
  } catch (err) {
    console.log(err);
    return;
  }
}

async function iterateData(data) {
  fs.mkdirSync(`./pokemon/`, { recursive: true });
  for (var i = 0; i < data.length; i++) {
    let pokeName = data[i]["name"];
    let pokeCall = await fetch(data[i]["url"]);
    let pokeData = await pokeCall.json();
    fs.mkdirSync(`./pokemon/${pokeName}`, { recursive: true });
    fs.mkdirSync(`./pokemon/${i+1}`, { recursive: true });
    fs.writeFileSync(
      `./pokemon/${pokeName}/data.json`,
      JSON.stringify(pokeData),
      (error) => {
        if (error) throw error;
      }
    );
    fs.writeFileSync(
      `./pokemon/${i+1}/data.json`,
      JSON.stringify(pokeData),
      (error) => {
        if (error) throw error;
      }
    );
  }
}
