const path = require('path')
const hbs = require('hbs')
const express = require('express')
const geocode = require('../utils/geocode')
const weatherstack = require('../utils/weatherstack')

// Directories.
const public = path.join(__dirname, '../public')
const views = path.join(__dirname, '../templates/views')
const partials = path.join(__dirname, '../templates/partials')


const app = express()
const port = process.env.PORT || 3000

// Setting up the templating engine. Have to make a views folder in project root.
app.set('view engine', 'hbs')
// Set up the path.
app.set('views', views)
// Set up partials.
hbs.registerPartials(partials)


// Serving up the public folder. For static files.
app.use(express.static(public))

 

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sanyam',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sanyam'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        help: 'For support, please contact us at 555-420-69.'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            res.send({
                error,
            })
        } else{
            weatherstack(latitude, longitude, (error, data) => {
                if(error){
                    res.send({
                        error
                    })
                } else{
                    res.send({
                        location,
                        forecast: data,
                        address: req.query.address
                    })
                }
            })
        }
    })

    
})

app.get('/help/*', (req, res) => {
    res.send('Help Article not found!')
})

app.get('*', (req, res) => {
    res.render('404')
})


// Start the server.
app.listen(port, () => {
    console.log('Server is up on port ' + port + '.')
})
