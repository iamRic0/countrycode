## set up locally

install backend  dependencies 

` npm i  `


to run backend 

` node server.js  `

install frontend  dependencies 
`cd client` <br>
` npm i  `


if nodemon is installed

` nodemon server.js  `

to run frontend

`cd client`
<br>
`npm start`


## API endpoint

### /api/newpost GET

```

request - .zip file


response -

[{filename: "1.txt" // filename
isfilecontent: true // is file content present
names: Array [ {0: Object { name: "Sri Lanka", status: "SUCCESS", code: "lk" }}, {…}, {…}, … ] 
// array of country codes and their respective names and status },...]

```
