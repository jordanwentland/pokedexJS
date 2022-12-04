async function pokeInfo() {
  try {
    let pokemon = document.getElementById("pokeName").value.toLowerCase();
    if (pokemon === "random") {
      pokemon = getRandomInt(905);
    }
    let apiCall = await fetch(`http://localhost:8080/api/pokemon/${pokemon}/data.json`);
    var data = await apiCall.json();
    let sprite = data["sprites"]["other"]["home"];
    let apiCall2 = await fetch(`http://localhost:8080/api/pokemon/${pokemon}/entry/data.json`);
    var data2 = await apiCall2.json();
    let preBio = data2["flavor_text_entries"];
    var bio = [];
    for (var i = 0; i < preBio.length; i++) {
      checkbio = [];
      if (preBio[i]["language"]["name"] === "en") {
        bio.push(preBio[i]);
      }
    }
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

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}