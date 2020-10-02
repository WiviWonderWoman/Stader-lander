'use strict';
// objekt för globala variabler
const app = 
{
    länder: [],
    städer: [],
    besökta: [],
    invånare: 0
}
// kontroll utskrift
console.log(localStorage);

// kollar om det finns något sparat i localStorage och sparar då det i arrayen
 if(localStorage.getItem('id') !== null) {
    app.besökta = JSON.parse(localStorage.getItem("id") || "[]");
 }

// kontroll utskrift
console.log(app.besökta);

// hämtar länderna...
fetch('./land.json')
.then(resp => resp.json())
.then(data => land(data))

//...sparar i en array och anropar funktionen meny
function land(data){
    for (let index = 0; index < data.length; index++) {
         const element = data[index];
         app.länder.unshift(element);
    }
    meny();
}

// hämtar städerna... 
fetch('./stad.json')
.then(resp => resp.json())
.then(data => stad(data))

// ...sparar i en array
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

    // loopar igenom länderna och skriver ut huvudmenyn...
    for (let index = 0; index < app.länder.length; index++) {
        const land = app.länder[index];
        landID = land.id;
        landNamn = land.countryname;
        document.getElementById('landMeny').innerHTML += `<li ><button id="`+landID+`">`+landNamn+`</button></li>`;    
    }
    // ...och meny valet för "mina resmål"  
    document.getElementById('besöktMeny').innerHTML += `<li><button id="visited">Mina resmål</button></li>`;

    // tömmer eventuellt tidigare innehåll och visar instruktioner.
    document.getElementById('footer').innerHTML = "";
    document.getElementById('content').innerHTML = `<h2>Välj först land sedan stad i menyerna.<br />Klicka på "besökt" om du vill spara.<br />Du hittar sparade resmål under menyvalet "Mina resmål"<br /> för att radera klickar du på "rensa"</h2>`;
    
    // fångar upp klick på "mina resmål"
    let visaStäder = document.getElementById('visited');
    visaStäder.addEventListener('click', function() {
        
        // tömmer eventuellt tidigare innehåll
        document.getElementById('stadInfo').innerHTML = "";
        document.getElementById('footer').innerHTML = "";

        // div med lista för besökta städer + rubrik
        document.getElementById('content').innerHTML =`<div id="besökta"><ul></ul></div>`;
        document.getElementById('besökta').insertAdjacentHTML('beforebegin', `<h2>Du har besökt följande städer</h2>`)
       
        // loopar igenom arrayen med sparade stad id    
        for (let index = 0; index < app.besökta.length; index++) {
            const element = app.besökta[index];
            
            // letar upp det matchande objektet 
            let staden = app.städer.find(a => a.id == element);

            // sparar och adderar antalet invånare
            app.invånare += staden.population;
            
            // skriver ut listan av städer 
            document.getElementById('besökta').innerHTML += `<li>`+staden.stadname+`</li>`; 
        }
        // kontrollutskrift
        console.log(app.invånare);

        // skriver ut resultatet på uträkningen
        document.getElementById('besökta').insertAdjacentHTML('afterend', `<h2>Du har haft möjligheten att träffa<br /> `+app.invånare+`<br />människor på dina resmål!</h2>`);
        
        // nollställer uträkningen
        app.invånare = 0;

        // skriver ut och fångar upp klick på rensa knappen
        document.getElementById('footer').innerHTML = `<li ><button id="rensa">Rensa</button></li>`;
        let rensaMinnet = document.getElementById('rensa');
        rensaMinnet.addEventListener('click', function() {

            // tömmer localstorage och nollställer arrayen
            localStorage.clear();
            app.besökta = [];

            // tömmer eventuellt tidigare innehåll
            document.getElementById('content').innerHTML = "";
            document.getElementById('footer').innerHTML = "";

            // skriver ut meddelande om att minnet är rensat
            document.getElementById('content').innerHTML = `<h2>Minnet är tömt!</h2>`
        });
    });
    // fångar upp klick på land,
    let landMeny = document.getElementById('landMeny');
    landMeny.addEventListener('click', function(event) {
        
        //  tömmer eventuellt tidigare innehåll
        document.getElementById('content').innerHTML = "";
        document.getElementById('stadInfo').innerHTML ="";
        document.getElementById('footer').innerHTML = "";

        // fångar upp id på klickat land
        landID = event.target.id;

        // letar upp landet för att spara landsnamnet
        let landet = app.länder.find(a => a.id == landID);
        landNamn = landet.countryname;  
                
        // filtrerar fram städer som tillhör valde landet
        stadLand = app.städer.filter(a => a.countryid == landID); 
                
        // loopar igenom de filtrerade städerna  
        for (let index = 0; index < stadLand.length; index++) {
            const stad = stadLand[index];
            let stadID = stad.id;
            let stadNamn = stad.stadname;
            
            // skriver ut undermenyn med städer
            document.getElementById('content').innerHTML += `<li><button id="`+stadID+`">`+stadNamn+`</button></li>`; 
        }

        // fångar upp klick på stad
        let stadMeny = document.getElementById('content');
        stadMeny.addEventListener('click', function(event) {
                
            // fångar upp id på klickad stad
            let stadID = event.target.id;

            // letar upp staden för att spara namnet och antalet invånare           
            const stad = stadLand.find(a => a.id == stadID);
            let namn = stad.stadname;
            let invånare = stad.population; 

            // skriver ut informationen om staden + besökt knappen
            document.getElementById('stadInfo').innerHTML = `<div id="stad"><p>`+namn+` är en stad i `+landNamn+` här bor `+invånare+` invånare.</p></div><div class="flex-container"><button id="spara">Besökt</button></div>`;

            // fångar klick på besökt knapp
            const spara = document.getElementById('spara');
            spara.addEventListener('click', function() {
                
                // sparar stadens id i arrayen...
                app.besökta.push(stadID);
                // ...och i localstorage
                localStorage.setItem("id", JSON.stringify(app.besökta));

                // kontrollutskrift
                console.log('localS', localStorage);
                console.log('besökta', app.besökta);
            });
        });
    });
}