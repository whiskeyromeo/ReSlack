const io = require('socket.io')();
const r = require('rethinkdb');

// Push a new post into the db
function createPost({ connection, post }) {
    r.table('posts')
        .insert(post)
        .run(connection).then(() => {
            //console.log('created a post with title : ', post.title);
        });
}

// This function retrieves a single post and sends it back to the client
function getSinglePost({ client, connection, postId }) {
    let post = r.table('posts')
        .get(postId)
        .run(connection)
        .then((res) => {
            client.emit(`post:${postId}`, res);
        })
}

// publish a new Article
function handleArticlePublish({ connection, article, callback }) {
    r.table('articles')
        .insert(Object.assign(article, { timestamp: new Date() }))
        .run(connection)
        .then(callback)
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

// 
function subscribeToPostArticle({ client, connection, postId, from }) {
    let query = r.row('postId').eq(postId);

    if(from) {
        query = query.and(
            // Only get the most recent data
            r.row('timestamp').ge(new Date(from))
        );
    }

    return r.table('articles')
        .filter(query)
        .changes({include_initial: true})
        .run(connection)
        .then((cursor) => {
            cursor.each((err, articleRow) => client.emit(
                `article:${postId}`,
                articleRow.new_val
            ));
        });

}


r.connect({
    host:'localhost',
    port: 28015,
    db: 'basicblog',
}).then((connection) => {
    
    io.on('connection', (client) => {

        // Create a new Post
        client.on('createPost', ({post}) => {
            createPost({connection, post});
        });

        client.on('publishArticle', (article, callback) => handleArticlePublish({
            article,
            connection,
            callback,
        }));

        client.on('retrievePost', ({postId}) => {
            getSinglePost({client, connection, postId})
        });

        // get all posts
        client.on('subscribeToPosts', () => subscribeToPosts({
            client,
            connection
        }));

        client.on('subscribeToPostArticle', ({postId, from }) => {
            subscribeToPostArticle({
                client,
                connection,
                postId,
                from,
            });
        });
    });
});


const port = parseInt(process.argv[3], 10) || 9000;

io.listen(port)
console.log('server listening on port ', port);
