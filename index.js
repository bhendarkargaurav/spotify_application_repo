const express = require('express');

const connect = require('./config/database');

const { PORT } = require('./config/serverConfig');

const User = require('./models/user');

const setupAndStartServer = () => {
    const app = express();

    app.listen(PORT, async () => {
        console.log(`Server started at port ${PORT}`);
        await connect();
        console.log('mongoDB connected');

        const user = await User.create({
            username: 'Gaurav',
            email: 'gaurav123@456.com',
            password: '123456',
        });
        console.log(user);
    })
}

setupAndStartServer();




