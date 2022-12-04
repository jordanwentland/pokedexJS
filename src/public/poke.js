
//This function grabs almost all of the pokemon information from the local api. 
async function pokeInfo() {
  //Nested in a try catch statement to be able to not return any information incase error arises (no pokemon for example)
  try {
    let pokemon = document.getElementById("pokeName").value.toLowerCase();
    if (pokemon === "random") {
      pokemon = getRandomInt(905);
    }
    //calls api for first set of data and info 
    let apiCall = await fetch(`http://localhost:8080/api/pokemon/${pokemon}/data.json`);
    var data = await apiCall.json();
    let sprite = data["sprites"]["other"]["home"];
    //calls api for pokemon stats
    let apiCall2 = await fetch(`http://localhost:8080/api/pokemon/${pokemon}/entry/data.json`);
    var data2 = await apiCall2.json();
    //pulls out the pokedex entries
    let preBio = data2["flavor_text_entries"];
    var bio = [];
    for (var i = 0; i < preBio.length; i++) {
      checkbio = [];
      if (preBio[i]["language"]["name"] === "en") {
        bio.push(preBio[i]);
      }
    }
    //utilizing DOM in JS to modify the HTML file with the recently pulled data from the API
    document.getElementById("bio").innerHTML =
      bio[getRandomInt(bio.length)]["flavor_text"];
    document.getElementById("name").innerHTML =
      data["name"].charAt(0).toUpperCase() + data["name"].slice(1);
    document.getElementById("code").innerHTML = "Pokemon Found!";
    document.getElementById("shiny").setAttribute("src", sprite["front_shiny"]);
    document
      .getElementById("normal")
      .setAttribute("src", sprite["front_default"]);
    pokeStats(data);
    //In case the pokemon is not found or an error occurs, reset all fiels and display 'Pokemon not found' utilizing DOM.
  } catch (error) {
    document.getElementById("code").innerHTML = "Pokemon Not Found!";
    document.getElementById("bio").innerHTML = "";
    document.getElementById("name").innerHTML = "";
    document.getElementById("shiny").setAttribute("src", "");
    document.getElementById("normal").setAttribute("src", "");
    console.log("error caught");
    console.log(error);
  }
}
//This function pulls the pokemon stats from the local pokeStat portion of the API via fetch requests and DOM to modify the html
function pokeStats(data) {
  document.getElementById("statsTable").innerHTML="";
  let statsData = data["stats"];
  var headers = ["Stat", "Value"];
  var table = document.createElement("TABLE");
  statLength = statsData.length
  for (var i = 0; i < statLength; i++) {
    var row = table.insertRow(i);
    row.insertCell(0).innerHTML = statsData[i]['stat']['name'];
    row.insertCell(1).innerHTML = statsData[i]["base_stat"];
  }
  var header = table.createTHead();
  var headerRow = header.insertRow(0);
  for (var i = 0; i < headers.length; i++) {
    headerRow.insertCell(i).innerHTML = headers[i];
  }
  document.getElementById("statsTable").append(table);
}

//Function to generate random number 
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}