'use strict';
// objekt för globala variabler
const app = 
{
    länder: [],
    städer: [],
    besökta: [] 
}
console.log(localStorage);
 if(localStorage.getItem('id') !== null) {
    app.besökta = JSON.parse(localStorage.getItem("id") || "[]");
    // app.besökta = [localStorage.getItem('id')];
 }

console.log(app.besökta);


// hämta länderna, sparar i en array och anropar funktionen meny
fetch('./land.json')
.then(resp => resp.json())
.then(data => land(data))

function land(data){
    for (let index = 0; index < data.length; index++) {
         const element = data[index];
         app.länder.unshift(element);
    }
    meny();
}

// hämtar städerna, sparar i en array
fetch('./stad.json')
.then(resp => resp.json())
.then(data => stad(data))

function stad(data){
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        app.städer.push(element);
    }
}

// funktion som renderar huvudmeyn...
function meny() {

    // variabel för städer sorterade efter land
    let stadLand = [];
    let landNamn = "";
    let landID = "";

    // loopar igenom länderna och skriver ut huvudmenyen
    for (let index = 0; index < app.länder.length; index++) {
        const land = app.länder[index];
        landID = land.id;
        landNamn = land.countryname;
        document.getElementById('landMeny').innerHTML += `<li ><button id="`+landID+`">`+landNamn+`</button></li>`; 

    } // och meny valet för "besökt"  
    document.getElementById('besöktMeny').innerHTML += `<li><button id="visited">Besökta</button></li>`;
    let visaStäder = document.getElementById('visited');
    visaStäder.addEventListener('click', function() {
        document.getElementById('content').innerHTML =`<div id="besökta"><ul></ul></div>`;
        document.getElementById('stadInfo').innerHTML = "";
        
        for (let index = 0; index < app.besökta.length; index++) {
            const element = app.besökta[index];
            // console.log(element);

            let staden = app.städer.find(a => a.id == element);
            document.getElementById('besökta').innerHTML += `<li>`+staden.stadname+`</li>`;
            console.log(staden);
        }
    })

    // fångar upp klick på land, tömmer eventuellt tidigare innehåll
    let landMeny = document.getElementById('landMeny');
    landMeny.addEventListener('click', function(event) {
            document.getElementById('content').innerHTML ="";
            document.getElementById('stadInfo').innerHTML ="";

            // fångar upp id på klickat land
            landID = event.target.id;
            // letar upp landet för att spara landsnamnet
            let landet = app.länder.find(a => a.id == landID);
            landNamn = landet.countryname;
                
            // kontrollutskrift
            console.log(landID, landNamn);   
                
            // filtrerar fram städer som tillhör valde landet
            stadLand = app.städer.filter(a => a.countryid == landID); 
                
            // loopar igenom de filtrerade städerna och skriver ut undermenyn med städer
            for (let index = 0; index < stadLand.length; index++) {
                const stad = stadLand[index];
                let stadID = stad.id;
                let stadNamn = stad.stadname;
                console.log(stadNamn);
                document.getElementById('content').innerHTML += `<li><button id="`+stadID+`">`+stadNamn+`</button></li>`; 
            }
            // fångar upp klick på stad, tömmer eventuellt tidigare innehåll
            let stadMeny = document.getElementById('content');
            stadMeny.addEventListener('click', function(event) {
                
            // fångar upp id på klickad stad
            let stadID = event.target.id;

            // letar upp staden för att spara namnet och antalet invånare           
            const stad = stadLand.find(a => a.id == stadID);
            let namn = stad.stadname;
            let invånare = stad.population; 

            // skriver ut informationen om staden
            document.getElementById('stadInfo').innerHTML = `<div id="stad"><h2>`+namn+` är en stad i `+landNamn+`<br /> här bor `+invånare+` invånare.</h2></div><div class="flex-container"><button id="spara">Besökt</button></div>`;

            const spara = document.getElementById('spara');
            spara.addEventListener('click', function() {
                console.log('event', stadID);
                
                app.besökta.push(stadID);
                
                localStorage.setItem("id", JSON.stringify(app.besökta));
                console.log('localS', localStorage);
                console.log('besökta', app.besökta);
            })
        });
    });
}