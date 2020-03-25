## live demo - https://country-codes-zip.herokuapp.com/

## set up locally with docker

`docker build .`
<br>

then run docker container in port 5000

### docker-compose is yet to be configured with docker mongo instance

## set up locally

install backend dependencies

`npm i`

to run backend

`node server.js`

install frontend dependencies
`cd client` <br>
`npm i`

if nodemon is installed

`nodemon server.js`

to run frontend

`cd client`
<br>
`npm start`

## API endpoint

### /api/newpost GET

#### .zip file must contain the files (directories are not supported) with country codes seperated by a new line .

```

request - .zip file


response -

[{filename: "1.txt" // filename
isfilecontent: true // is file content present
names: Array [ {0: Object { name: "Sri Lanka", status: "SUCCESS", code: "lk" }}, {…}, {…}, … ]
// array of country codes and their respective names and status },...]

```
