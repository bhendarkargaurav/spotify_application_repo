const express = require('express');
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const cookieparser = require('cookie-parser');
const connect = require('./config/database');
const { PORT } = require('./config/serverConfig');
const userRoutes = require('./routes/v1/index');

const playbackSocketHandler = require('./controllers/synchronousplay.js');
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        method: ["GET", "POST"]
    }
});

playbackSocketHandler(io);

app.use(express.json());
app.use(cors()); 
app.use(cookieparser());
app.use(express.urlencoded({extended: true, limit: '50mb'}));
app.use(express.json({ limit: '50mb' }))
app.use('/api', userRoutes);

app.get('/hello', (req, res) => {
  res.send('Hello, Deployed on AWS');
});

const setupAndStartServer = async () => {
    try {
        await connect();
        console.log('mongoDb connected');

        server.listen(PORT, () => {
            console.log('Server started at port', PORT || 3002)
        });
    } catch (error) {
        console.log(error)
    }
}    
    
setupAndStartServer();




