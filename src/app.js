const path = require('path')
const express = require('express')                    //string,html,json 
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

// console.log(__dirname)   //till src 
// console.log(__filename)  //till app.js
// console.log(path.join(__dirname,'../public'))

const app = express() //server 

//Define paths for express config
const publicDirPAth = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Set up handle bar engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirPAth))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Akshansh Goel',
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Akshansh Goel'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        msg:'This is some helpful text.',
        title:'Help',
        name : 'Akshansh Goel'
    })
})

// app.get('',(req, res)=>{                  //'' path
//     res.send('<h1>Weather</h1>')

// })


// app.get('/help',(req,res)=>{         //callback fn: to show what to do on page
//     res.send([{
//         name : 'Akshansh Goel',          //hmne bheja js object mila hame json
//         age : 27,
//     },{
//         name:'Sarah',
//         age:24
//     }])
// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>About</h1>')
// })

app.get('/weather',(req,res)=>{
    
    const address = req.query.address
    if(!address){
        return res.send({
            error : "Address must be provided"
        })
    }
    geocode(address,(error,{latitude,longitude,location} = {})=>{    //={}  default parameters if lat long loc not provide default will be used
        if (error){
            return res.send({error});
        }
    
        forecast(latitude,longitude,(error,forecastData)=>{   //callback chaining
            if(error){
                return res.send({error});
            }
            res.send({
                location:location,
                forecastData:forecastData
            })
         })
     })

    // res.send({
    //     address : req.query.address,
    //     location:'Philadelphia',
    //     forecast:'Its 15 degree outside!'
    // })

})

// app.get('/products',(req,res)=>{
//     if(!req.query.search){
//         return res.send({                   
//             error : 'Use must provide a search term'
//         })
//     }

//     console.log(req.query.search)
//     res.send({
//         products : []
//     })
// })

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:404,
        msg:"Help page not found",
        name : 'Akshansh Goel'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:404,
        msg:"page not found",
        name : "Akshansh Goel"
    })

})

//port : 3000
app.listen(3000,()=>{
    console.log('Server is up on port 3000.')
}) //for local machine

// Cannot set headers after they are sent to the client : two res.send cant be sent two browser