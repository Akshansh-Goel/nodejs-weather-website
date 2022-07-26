const request = require('request');

const forecast = (latitude,longitude,callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=acf8a342f5c31861cea0737c65c6fac0&query='+latitude+','+longitude;

    request({url,json:true},(error,{body})=>{
        if(error){
            callback("Unable to coonect to weather service!",undefined);
        }
        else if(body.error){
            callback("Unable to find location. Try another search",undefined);
        }
        else{
            const weather_description = body.current.weather_descriptions[0];
            const actual_temperature = body.current.temperature;
            const feelslike_temperature = body.current.feelslike;
            data = `${weather_description}. It is ${actual_temperature} degrees out. It feels like ${feelslike_temperature} degree out`
            time = body.location.localtime
            callback(undefined,data,time);
        }

    })

}

module.exports = forecast;