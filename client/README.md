Last updated January 7, 2018

### Overview
- This is a variety of components I have started to put together in the past week after not
having touched React in close to two years. Trying to follow best practices here so hopefully
everything will be relatively easy to port/reuse as needed.
- The front end design is supported by Semantic-UI


### Setup 
- install dependencies, I've been using yarn but you can use npm as well.
- You'll need rethinkdb with the current setup so follow the instructions on their site to install that
- Once the db is up, create a db 'basicblog' with 2 tables : posts, articles
- run rethinkdb
>```
>rethinkdb
>```
- run the server
>```
> cd server && yarn start
>```
- run the client
>```
> cd client && yarn start
>```

### Next Steps
- 1. Incorporate editing of previous posts in the article to enable full collaboration
- 2. Fix the issue of state persistance by incorporating Redux with Sagas or Thunks( whichever works better with socket-io subscribe??...)
- 3. Incorporate basic authentication
- 4. Generalize the api to work with different databases

### ScratchBoard - Contrib
- The idea behind this application is to provide a means for individuals to collatbotae in the production of web articles
- It would be nice if there was some way to set it up in such a way as to allow for the use of interchangeable components
- This is an architecture issue
- The main point of the app is o provide a baseline architecture from which we can interchange components 
- That is: 
    - The clients and servers should interface through well defined API endpoints 
        - ( currently Socket --> perhaps a GraphQL implementation is warranted?)
    - Configuration files should be used to provide the individual permissions/classnames/ids of the components
        - Hardcoding works against the interchangeability, it is an antipattern in this manner
    - Find a new way to integrate testing. It seems as though the best idea might not be to include all of the tests files
    in the same directories as the files being tested. This will probably require a little bit of trial and error
    to find the best method which scales appropriately. 
