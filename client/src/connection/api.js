import openSocket from 'socket.io-client';
import Rx from 'rxjs/Rx';

// The port of the server --> may be passed into the URL
// like so : http://localhost:<client_port>?<specified_port>
const port = parseInt(window.location.search.replace('?', ''),10) || 9000;
// Open the socket to the server on the specified port
const socket = openSocket(`http://localhost:${port}`);


// Create a new post in the posts table
function createPost(post) {
    socket.emit('createPost', { post });
}

// Delete a post from the posts table
function deletePost(postId) {
    // TODO : Implement this
}

// publish changes from an article to the db
function publishArticle({ postId, article }) {
    //sync.queue({ postId, article });
    socket.emit('publishArticle', { postId, article }, () => {})
}
// Retrieve a particular post
// Currently just outputs the post to the console
function retrievePost(postId, cb) {
    socket.emit('retrievePost', { postId });
    socket.on(`post:${postId}`, cb);
}

// Subscribe to changes in the currently selected article so that we can see
// any real time updates to the article/collaborate with others
function subscribeToPostArticle(postId, cb) {
    const articleStream = Rx.Observable.fromEventPattern(
        // Handle the messages between the server and client
        h => socket.on(`article:${postId}`, h),
        h => socket.off(`article:${postId}`, h),
    );

    const bufferedTimeStream = articleStream
        .bufferTime(100) // buffer items for 100 millis
        .map(articles => ({articles})); // Access the array from the buffer

    const reconnectStream = Rx.Observable.fromEventPattern(
        h => socket.on('connect', h),
        h => socket.off('connect', h),
    );

    // Get the latest article posted
    const maxStream = articleStream
        .map(article => new Date(article.timestamp).getTime())
        .scan((a,b) => Math.max(a,b),0);    

    // if the stream is interrupt, this should assist in reestablishing it
    reconnectStream
        .withLatestFrom(maxStream)
        .subscribe((joined) => {
            const lastReceivedTimestamp = joined[1];
            socket.emit('subscribeToPostArticle', {
                postId,
                from: lastReceivedTimestamp,
            });
        });

        // Feed values from the observable over the callback
        bufferedTimeStream.subscribe(articleEvent => cb(articleEvent));

        // Open up the server and begin piping events
        socket.emit('subscribeToPostArticle',{ postId });
}


// Retrieve all of the current posts from the db
function subscribeToPosts(cb) {
    socket.on('post', cb);
    socket.emit('subscribeToPosts');
}


// Provide the current state of the connection so
// we can let the users know if the connection is up/down/or off entirely
function subscribeToConnection(cb) {

    // This needs to be once, otherwise on server
    // reload whatever message was sent last over the chat
    // will be reloaded in the client, resulting in duplicates
    socket.on('connect', () => cb({
        state: 'connected',
        port,
    }));
    
    socket.on('connect_error', () => cb({
        state: 'connect_error',
        port,
    }));

    socket.on('disconnect', () => cb({
        state: 'disconnected',
        port,
    }));

}

export {
    createPost,
    deletePost,
    publishArticle,
    retrievePost,
    subscribeToConnection,
    subscribeToPostArticle,
    subscribeToPosts,
};