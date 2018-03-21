var express = require('express');
var path = require('path');
var request = require('request');
var bodyParser = require('body-parser');
var app = express();
const apikey='712fa00f880ea898d336bbb7c0f8efb4';

app.use(express.static('public'));
app.get('/', function (req, res) {
  res.render('index',{weather:'',error:''});
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.post('/',function(req,res){
   let city = req.body.city;
   /* console.log(req.body.city);*/
    let url=`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;
    request(url,function(err,response,body){
   if(err)
       {
            res.render('index',{weather:null,error:'Error please try agaian'});
       }
    else 
        {
            let weather = JSON.parse(body);
            if(weather.main==undefined)
            {
            res.render('index',{weather: null,error:'Error please try agaian'});
            }
            else
                {
                   /* console.log(weather.main.temp);*/
                    let weather_txt = weather.main.temp+" degree celsius in "+ city ;
                    res.render('index',{weather: weather_txt, error:null }); 
                }
        }
});   
  
});

  
app.listen(8080);
console.log("Server started at 8080");

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

