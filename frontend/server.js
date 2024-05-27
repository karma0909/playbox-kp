const express = require('express')
const app = express()
const path = require('path')
// const Home = require('./src/Components/Home')
const ReactDOMServer = require('react-dom/server')

app.set('view engine','ejs')

// require('@babel/preset-react')({
//     presets: ['@babel/preset-react']

// })   

app.get('/',(req,res)=>{
    // res.status(200).send('Server Started')
    console.log('Server Started')
    // homePage()
    res.contentType('html')
    // res.redirect('src\Components\Home.js')
    // sendFile(path.join(__dirname,'src/Components','Home.js'))
    // res.send(ReactDOMServer.renderToString(Home()))
    // res.send(homePage)

})

app.get('/SignIn',(req,res)=>{
    res.write("SignIn page")
})

app.listen(3000,(req,res)=>{
    console.log("Connected to port 3000")
})

// const http = require('http')

// http.createServer(app)

// const url = require('url')
// const getname = require('./demo')
// http.createServer((req,res)=>{
//     res.writeHead(200,{'Content-Type':'text/html'})
//     res.write("Hello Krish")
//     const q = url.parse(req.url)

//     const queryString = q.query
//     res.write("Query String : " + queryString.password + '\n')
//     res.write("Search : " + q.search+ '\n')
//     res.write("host : " + q.host+ '\n')
//     res.write("hostName : " + q.hostname + '\n')
//     res.write("Path :" + q.path + '\n')//return a whole url from your file name
//     res.write("pathName : " + q.pathname + '\n')
//     res.end()
// }).listen(3000).on('listening',()=>{
//     console.log('Listen on port 8080'+ getname.getName())
// })