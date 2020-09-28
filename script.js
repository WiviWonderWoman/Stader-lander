'use strict';
fetch('./land.json')
.then(resp => resp.json())
.then(data => console.log(data))

fetch('./stad.json')
.then(resp => resp.json())
.then(data => console.log(data))


