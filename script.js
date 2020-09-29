'use strict';
const app = 
{
    länder: [],
    städer: [],
    
}

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
    for (let index = 0; index < app.länder.length; index++) {
        const land = app.länder[index];
        let landID = land.id;
        let landNamn = land.countryname;
        // console.log(land, landID, landNamn);
        document.getElementById('landMeny').innerHTML += `<li ><button id="`+landID+`">`+landNamn+`</button></li>`;  
        // console.log(stadMeny);
    }   
    
    let landMeny = document.getElementById('landMeny');
        landMeny.addEventListener('click', function(event) {
            document.getElementById('content').innerHTML ="";
            console.log(event.target.id);
        let landID = event.target.id;
       
    
        stadLand = app.städer.filter(a => a.countryid == landID); 
        
        for (let index = 0; index < stadLand.length; index++) {
            const stad = stadLand[index];
            let stadID = stad.id;
            let stadNamn = stad.stadname;
            console.log(stadNamn);
            document.getElementById('content').innerHTML += `<li><button id="`+stadID+`">`+stadNamn+`</button></li>`;
        }
        // let stadMeny = stadLand.stadname;
    });
    // console.log(stadLand);
    document.getElementById('landMeny').innerHTML += `<li><button id="visited">Besökt</button></li>`;
}
  






