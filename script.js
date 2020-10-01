'use strict';
// objekt för globala variabler
const app = 
{
    länder: [],
    städer: [],
    besökta: [],
    invånare: 0
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
    }
    document.getElementById('footer').innerHTML = "";
    document.getElementById('content').innerHTML = `<h2>Välj först land sedan stad i menyerna.<br />Klicka på "besökt" om du vill spara.<br />Du hittar sparade resmål under menyvalet "Mina resmål"<br /> för att radera klickar du på "rensa"</h2>`;
    // och meny valet för "besökta"  
    document.getElementById('besöktMeny').innerHTML += `<li><button id="visited">Mina resmål</button></li>`;
    let visaStäder = document.getElementById('visited');
    visaStäder.addEventListener('click', function() {
        
        document.getElementById('content').innerHTML =`<div id="besökta"><ul></ul></div>`;
        document.getElementById('stadInfo').innerHTML = "";
        document.getElementById('footer').innerHTML = "";
        document.getElementById('besökta').insertAdjacentHTML('beforebegin', `<h2>Du har besökt följande städer</h2>`)
        for (let index = 0; index < app.besökta.length; index++) {
            const element = app.besökta[index];
            
            let staden = app.städer.find(a => a.id == element);
            app.invånare += staden.population;
            
            document.getElementById('besökta').innerHTML += `<li>`+staden.stadname+`</li>`; 
        }
        console.log(app.invånare);
        document.getElementById('besökta').insertAdjacentHTML('afterend', `<h2>Du har haft möjligheten att träffa<br /> `+app.invånare+`<br />människor på dina resmål!</h2>`);
        app.invånare = 0;
        document.getElementById('footer').innerHTML = `<li ><button id="rensa">Rensa</button></li>`;
        let rensaMinnet = document.getElementById('rensa');
        rensaMinnet.addEventListener('click', function() {
            localStorage.clear();
            app.besökta = [];
            document.getElementById('content').innerHTML = "";
            document.getElementById('content').innerHTML = `<h2>Minnet är tömt!</h2>`
            document.getElementById('footer').innerHTML = "";
        })
    })

    // fångar upp klick på land, tömmer eventuellt tidigare innehåll
    let landMeny = document.getElementById('landMeny');
    landMeny.addEventListener('click', function(event) {
            
            document.getElementById('content').innerHTML = "";
            
            document.getElementById('stadInfo').innerHTML ="";
            document.getElementById('footer').innerHTML = "";
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
            document.getElementById('stadInfo').innerHTML = `<div id="stad"><p>`+namn+` är en stad i `+landNamn+` här bor `+invånare+` invånare.</p></div><div class="flex-container"><button id="spara">Besökt</button></div>`;

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