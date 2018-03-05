Last updated January 7, 2018

## Overview
- This is a variety of components I have started to put together in the past week after not
having touched React in close to two years. Trying to follow best practices here so hopefully
everything will be relatively easy to port/reuse as needed.
- The front end design is supported by Semantic-UI

### Note:
- I am currently in the process of reconfiguring this project to be something more along the lines of what one
might find with GoogleDocs, while having the ability to input the articles as html with inline css. 


## Setup 
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

## Next Steps
- 1. Incorporate editing of previous posts in the article to enable full collaboration
- 2. Fix the issue of state persistance by incorporating Redux with Sagas or Thunks( whichever works better with socket-io subscribe??...)
- 3. Incorporate basic authentication
- 4. Generalize the api to work with different databases
