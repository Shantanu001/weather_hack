var express = require('express');
var path = require('path');
var request = require('request');
var bodyParser = require('body-parser');
var app = express();
const apikey='712fa00f880ea898d336bbb7c0f8efb4';

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.render('index',{weather:'',error:'',temp:'',humidity:'',description:'',pressure:''});
});

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');


app.post('/',function(req,res){
   let city = req.body.city;
   /* console.log(req.body.city);*/
    let url=`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;
    request(url,function(err,response,body){
   if(err)
       {
            res.render('index',{weather:null,error:'Please enter a valid city'});
       }
    else 
        {
            let weather = JSON.parse(body);
            if(weather.main==undefined)
            {
            res.render('index',{weather: null,error:'Please enter a valid city'});
            }
            else
                {
                    console.log(weather);
                    let weather_city =  weather.name;
                    let weather_temp = "Temparature : "+ weather.main.temp+"°C";
                    let weather_humidity = "Humidity : "+ weather.main.humidity+"";
                      let weather_pressure = "Pressure : "+ weather.main.pressure+"";
                    let weather_description = "Description : "+ weather.base+"";
                    res.render('index',{
                        weather: weather_city, 
                        error:null,
                        temp:weather_temp,
                        humidity:weather_humidity,
                        description:weather_description,
                        pressure:weather_pressure
                    }); 
                }
        }
});   
  
});

app.listen(8080);
console.log("Server started at 8080");


