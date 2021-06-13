const request = require('request')

const weatherStack = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b12f44a6d8b0c58a56a7a1267b984a9b&query='+ latitude + ',' + longitude
    
    
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather services.', undefined)
        } else if(body.error){
            callback('Unable to find the specified location.', undefined)
        } else{
            callback(undefined, body.current.weather_descriptions[0] +". It is currently " + body.current.temperature + " degrees out. There is a " + body.current.precip + "% chance of precipitation.")
            // callback(undefined, body)
        }
    })
}

module.exports = weatherStack
