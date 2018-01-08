const io = require('socket.io')();
const r = require('rethinkdb');


function createPost({ connection, post }) {
    r.table('posts')
        .insert(post)
        .run(connection).then(() => {

            console.log('created a post with title : ', post.title);
        });
}

// This retrieves all posts from the post table and sends them over to the client
function subscribeToPosts({ client, connection }) {
    r.table('posts')
        .changes({include_initial: true})
        .run(connection)
        .then((cursor) => {
            cursor.each((err, postRow) => 
                client.emit('post', postRow.new_val)
            )
        });
}

// This function retrieves a single post and sends it back to the client
function getSinglePost({client, connection, postId}) {
    let post = r.table('posts')
        .get(postId)
        .run(connection)
        .then((res) => {
            client.emit(`post:${postId}`, res);
            console.log(res);
        })
}


r.connect({
    host:'localhost',
    port: 28015,
    db: 'basicblog',
}).then((connection) => {
    
    io.on('connection', (client) => {
        
        client.on('checkValidConnection', ({msg}) => {
            console.log('message : ', msg);
        })

        // Create a new Post
        client.on('createPost', ({post}) => {
            createPost({connection, post});
        });

        // get all posts
        client.on('subscribeToPosts', () => subscribeToPosts({
            client,
            connection
        }));

        client.on('retrievePost', ({postId}) => {
            getSinglePost({client, connection, postId})
        })


    })


});

const port = parseInt(process.argv[2], 10) || 9000;
io.listen(port);
console.log('server listening on port ', port);
