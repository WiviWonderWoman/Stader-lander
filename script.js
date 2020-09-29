'use strict';
const app = 
{
    länder: [],
    // value: "1234",

}

fetch('./land.json')
.then(resp => resp.json())
.then(data => landMeny(data))

function landMeny(data){
     for (let index = 0; index < data.length; index++) {
         const element = data[index];
         app.länder.unshift(element);
         document.getElementById('landMeny').innerHTML += `<li><button>`+element.countryname+`</button></li>`;
        }
        document.getElementById('landMeny').innerHTML += `<li><button id="visited">Besökt</button></li>`;
}
console.log(app.länder);

// fetch('./stad.json')
// .then(resp => resp.json())
// .then(data => console.log(data))

    






