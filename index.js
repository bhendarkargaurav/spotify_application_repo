const express = require('express');
const cors = require("cors");
const cookieparser = require('cookie-parser');

const connect = require('./config/database');
const { PORT } = require('./config/serverConfig');

const userRoutes = require('./routes/v1/index');

const setupAndStartServer = () => {
    const app = express();
    app.use(express.json());
    app.use(cors()); 
    app.use(cookieparser());
    app.use(express.urlencoded({extended: true}));

    app.listen(PORT, async () => {
        console.log(`Server started at port ${PORT}`);
        await connect();
        console.log('mongoDB connected');


        // const artistRepo = ArtistRepository;
        // const artist = await ArtistRepository.createArtist({          //direct fetching from repo
        //     name: 'Arijit',
        //     bio: 'Top song Ye dil hai mushkil',
        //     profileImageUrl: 'hghjcfdfjhbcakbjbc',
        //     socialLinks: "BlankSpace"                                 // when we are using model into repository 
        // });  
        // console.log("artist created succesfully", artist);

        // const userRepo = new UserRepository();
        // console.log("userdata is ", userData);
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
        
        
    });
};

setupAndStartServer();




