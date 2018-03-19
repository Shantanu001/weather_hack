//var http = require('http');
var express = require('express');
var path = require('path');
var request = require('request');
//var fs= require('fs');
var index = require('./routes/index');
var app = express();
app.locals.videodata = require('./data.json');
var city = 'patna';  
var apikey='712fa00f880ea898d336bbb7c0f8efb4';
var url=`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;

/*
function onRequest(req,res)
{
    res.writeHead(200,{"Context-Type":"text/html"});
    res.write("hello");
    res.end();
}*/
request(url,function(err,response,body){
   if(err)
       {
           console.log("err:",err);
       }
    else 
        {
            console.log("body:",body);
            let weather = JSON.parse(body);
            console.log("Temp is "+weather.main.temp+"degree C");
        }
});

app.use('/',index);
//http.createServer(onRequest).listen(8080);
app.listen(8080);
console.log("Server started at 8080");

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

