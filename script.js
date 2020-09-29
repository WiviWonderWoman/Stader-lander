'use strict';
const app = 
{
    länder: [],
    städer: [],
    
}
console.log(app.städer);
console.log(app.länder);
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


fetch('./stad.json')
.then(resp => resp.json())
.then(data => stad(data))

function stad(data){
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        app.städer.push(element);
    }
}



function meny() {
    let stadLand = [];
    // let landNamn = "";
    for (let index = 0; index < app.länder.length; index++) {
        const land = app.länder[index];
        let landID = land.id;
        let landNamn = land.countryname;
        // console.log(land, landID, landNamn);
        document.getElementById('landMeny').innerHTML += `<li ><button id="`+landID+`">`+landNamn+`</button></li>`;  
        // console.log(stadMeny);
    }   
    let landID = "";
    
    let landMeny = document.getElementById('landMeny');
    landMeny.addEventListener('click', function(event) {
        document.getElementById('content').innerHTML ="";
        document.getElementById('stadInfo').innerHTML ="";
        let landsnamn = "";
        console.log(event.target.id);
        landID = event.target.id;
       
        stadLand = app.städer.filter(a => a.countryid == landID); 
        
        // let stadID ="";
        for (let index = 0; index < stadLand.length; index++) {
            const stad = stadLand[index];
            let stadID = stad.id;
            let stadNamn = stad.stadname;
            console.log(stadNamn);
            document.getElementById('content').innerHTML += `<li><button id="`+stadID+`">`+stadNamn+`</button></li>`; 
        }
        let stadMeny = document.getElementById('content');
            stadMeny.addEventListener('click', function(event) {
                // console.log(event.target.id);
                
                let stadID = event.target.id;
                console.log(stadID);
                // console.log(stadLand);
                const stad = stadLand.find(a => a.id == stadID);
                let namn = stad.stadname;
                let invånare = stad.population; 

                const landet = app.länder.find(a => a.id == stadID);
                landsnamn = landet.countryname;

                document.getElementById('stadInfo').innerHTML = `<h2>`+namn+`</h2><p>är en stad i `+landsnamn+` här bor `+invånare+` innvånare.`;
                // console.log(stad);
        });

    });
        
    
    document.getElementById('landMeny').innerHTML += `<li><button id="visited">Besökt</button></li>`;
}
  


