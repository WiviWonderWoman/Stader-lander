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
    // let landMeny = document.getElementById('landMeny');
    // landMeny.addEventListener('click', function(event) {
    // console.log('event', event.target.id);
    // let landID = event.target.id;

    // let stadLand = app.städer.filter(a => a.countryid == landID); 
    // console.log(stadLand);
    // let stadMeny = stadLand.stadname;
    // console.log(stadMeny);
    // document.getElementById(landID).innerHTML += `<dd>`+stadMeny+`</dd>`;
    // })
    // console.log(app.länder);
}
    // let stadLand = app.städer.filter(a => a.countryid == event.target.id); 
    //     console.log(stadLand);
    // console.log(app.länder);


function meny() {
    let stadLand = [];
    for (let index = 0; index < app.länder.length; index++) {
        const land = app.länder[index];
        let landID = land.id;
        let landNamn = land.countryname;
        // console.log(land, landID, landNamn);
        document.getElementById('landMeny').innerHTML += `<dt id="`+landID+`">`+landNamn+`</dt>`;  
        // console.log(stadMeny);
    }
        console.log(app.länder);
        console.log(stadLand);    
    
    let landMeny = document.getElementById('landMeny');
        landMeny.addEventListener('click', function(event) {
        console.log('event', event.target.id);
        let landID = event.target.id;
    
        stadLand = app.städer.filter(a => a.countryid == landID); 
        console.log(stadLand);
        for (let index = 0; index < stadLand.length; index++) {
            const stad = stadLand[index];
            let stadID = stad.id;
            let stadNamn = stad.stadname;
            console.log(stadNamn);
            document.getElementById(landID).innerHTML += `<dd>`+stadNamn+`</dd>`;
        }
        // let stadMeny = stadLand.stadname;
    });
    // console.log(stadLand);
    document.getElementById('landMeny').innerHTML += `<dt>Besökt</dt>`;
}
  






