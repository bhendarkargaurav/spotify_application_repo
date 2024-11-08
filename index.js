const express = require('express');


const connect = require('./config/database');

const { PORT } = require('./config/serverConfig');

// const User = require('./models/user');
// const UserRepository = require('./repository/user-repository');
// const UserService = require('./services/user-service');
// const createUser = require('./controllers/user-controllers')


const userRoutes = require('./routes/v1/index');

const setupAndStartServer = () => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    app.listen(PORT, async () => {
        console.log(`Server started at port ${PORT}`);
        await connect();
        console.log('mongoDB connected');

        // const user = await User.create({
        //     username: 'Gaurav Bhendarkar',
        //     email: 'gaurav123@.com',                // when we are using model directly into index.js then use this 
        //     password: '123456',
        // });
        // console.log(user);
        

        // const userRepo = new UserRepository();
        // // console.log("userdara is ", userData);
        // const user = await userRepo.createUser({          //direct fetching from repo
        //     username: 'Aarthi',
        //     email: 'aarthi123@.com',
        //     password: '9080',
        //     playlists: "BlankSpace"                                 // when we are using model into repository 
        // });                                                              // and repository into index.js
        // const user = await userRepo.findById('67265d0525ead4f6f98096ec');
        // const user = await userRepo.findByEmail("gaurav123@.com");
       
        // const userRepo = new UserService();
        
        app.use('/api', userRoutes);
        
        // console.log(user);
    })
}

setupAndStartServer();




