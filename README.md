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

