async function pokeInfo() {
  try {
    let pokemon = document.getElementById("pokeName").value.toLowerCase();
    if (pokemon === "random") {
      pokemon = getRandomInt(905);
    }
    let apiCall = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`);
    var data = await apiCall.json();
    let sprite = data["sprites"]["other"]["home"];
    let call2 = data["species"]["url"];
    let apiCall2 = await fetch(`${call2}`);
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
  } catch (error) {
    document.getElementById("code").innerHTML = "Pokemon Not Found!";
    document.getElementById("bio").innerHTML = "";
    document.getElementById("name").innerHTML = "";
    document.getElementById("shiny").setAttribute("src", "");
    document.getElementById("normal").setAttribute("src", "");
    console.log("error caught");
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
