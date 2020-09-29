'use strict';
const app = 
{
    länder: [],
    städer: []
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
        console.log(app.städer);
}
 

fetch('./stad.json')
.then(resp => resp.json())
.then(data => stad(data))

function stad(data){
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        app.städer.push(element);
    }
    console.log(app.länder);
}

function meny() {
    for (let index = 0; index < app.länder.length; index++) {
        const land = app.länder[index];
        let landID = land.id;
        let landNamn = land.countryname;
        console.log(land, landID, landNamn);
        document.getElementById('landMeny').innerHTML += `<dt>`+landNamn+`</dt>`;  
    }
    document.getElementById('landMeny').innerHTML += `<dt>Besökt</dt>`;
}
  






