Last updated January 7, 2018

### Overview

This is a fun little toy application which I have been using to explore React in its current form after having been away from the framework for close to two years. 

The basic idea of the application is to provide a way for people in an organization to share design ideas in a chat or 'post'. Currently the configuration only supports html5 markup and inline css styling, but I think it would be nice to add some support for additional features in the future such as external styling and editing of the chats themselves.

Right now the functionality only allows for the creation of posts and articles (each entry by a user in a post) associated with those posts.

The front end design is supported by Semantic-UI and the semantic-react library. As this is the case the components imported into the application can be used directly in the chat.


### Setup 
- Install dependencies, this should work with both yarn and npm.
- You'll need rethinkdb in order for the streaming functionality to work. You can find installation instructions [on their site](https://www.rethinkdb.com/)
- Once the db is up, run the database
>```
>rethinkdb
>```
- Following this you will need to open the GUI for rethinkdb and create
a new database 'basicblog' (as specified in config.js on the server), and two tables: posts and articles.
- Now you should be able to run the server
>```
> cd server && yarn start
>```
- and the client
>```
> cd client && yarn start
>```

### Next Steps
- 1. Incorporate editing of previous articles in the post to enable full collaboration and editing
- 2. Fix the issue of state persistance by incorporating Redux with Sagas or Thunks( whichever works better with socket-io subscribe??...)
- 3. Incorporate basic authentication
- 4. Generalize the api to work with different databases

