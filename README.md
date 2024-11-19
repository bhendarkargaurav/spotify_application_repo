## Spotify Backend 

### This is a simplified version of spotify_backend Using Nodejs, express and MongoDB.

-> There will be the simple functionality to handle 
-> User, Music Storage and Search Function:

   User: 
       user should be able register, login, update and delate their accound.
       use JWT and Bcrypt for authentication.

     -> Bcrypt takes the password and generates a hash with a unique salt.
     -> The hash is stored in the database instead of the original password.
     -> JWT(json web tocke) used to generate tocken after login and that tocken 
        is not save in server its stored in browser.

    Song:
        song can be added including name, artist, time and all the neccesary details
        user can able to fetch song using song id,
        user can update and delete song