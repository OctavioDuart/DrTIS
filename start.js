const express = require ('express');
const bodyParser  = require ('body-parser'); 
const dbConnect = require ('./src/database/connection'); //Log
const port = process.env.PORT || 3000 ;
var app  = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

const Router = require ('./src/route_settings');
const routes_list = new Router;
app = routes_list.Load(app);


app.listen(port , (err)=> {
    (err) ? console.error(`Server error :  ${err} `) : 
            console.log(`Server running -  PORT :  ${port} `);
})