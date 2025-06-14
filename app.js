const express = require('express');
const cors = require("cors");
const cookieparser = require('cookie-parser');
const connect = require('./config/database');
const { PORT } = require('./config/serverConfig');
const userRoutes = require('./routes/v1/index');

const app = express();

app.use(express.json());
app.use(cors()); 
app.use(cookieparser());
app.use(express.urlencoded({extended: true, limit: '50mb'}));
app.use(express.json({ limit: '50mb' }));


app.use('/api', userRoutes);

const setupAndStartServer = async () => {
    try {
        await connect();
        console.log('mongoDb connected');

        app.listen(PORT, () => {
            console.log('Server started at port', PORT)
        });
    } catch (error) {
        console.log(error)
    }
}    
    
setupAndStartServer();




