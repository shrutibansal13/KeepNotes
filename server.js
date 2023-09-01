const express = require('express');
const app= express();
require('dotenv').config();
const bodyParser = require('body-parser');
const connectDB= require('./config/dbConnection')
const router = require('./routes')
const cors = require('cors');
const http = require('http')
const socket= require('./socket')
const {Server}= require('socket.io')
const server = http.createServer(app)
app.use(cors());
const io= new Server(server,{
    cors:{
        origin:'http://localhost:3000',
        methods:['GET, POST','PUT','DELETE']
    }
})
connectDB();
socket(io);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));  
app.use(express.json({ type: 'application/*+json' }));
app.use(express.urlencoded({extended: true })); 
app.use(router);

server.listen(8001);
module.exports = app;