import openSocket from 'socket.io-client';

import Rx from 'rxjs/Rx';

const port = parseInt(window.location.search.replace('?', ''),10) || 9000;

const socket = openSocket(`http://localhost:${port}`);

function connectionEstablished(msg) {
    socket.emit('checkValidConnection', { msg });
}


function createPost(post) {
    socket.emit('createPost', { post });
}

function deletePost(postId) {

}


function subscribeToPostArticle(postId, cb) {
    const articleStream = Rx.Observable.fromEventPattern(
        h => socket.on(`post:${postId}`, h),
        h => socket.off(`post:${postId}`, h),
    );

    const bufferedTimeStream = articleStream
        .bufferTime(100) // buffer items for 100 millis
        .map(articles => ({articles})); // Access the array from the buffer

    const reconnectStream = Rx.Observable.fromEventPattern(
        h => socket.on('connect', h),
        h => socket.off('connect', h),
    );

    // TODO : This is a breaking pattern -->  need to update the db
    const maxStream = articleStream
        .map(article => new Date(article.timestamp).getTime())
        .scan((a,b) => Math.max(a,b),0);


}




function subscribeToPosts(cb) {
    socket.on('post', cb);
    socket.emit('subscribeToPosts');
}

function retrievePost(postId, cb) {
    socket.emit('retrievePost', { postId })
    socket.on(`post:${postId}`, (res) => {
        console.log('response from server: ', res);
    });
}

function subscribeToConnection(cb) {

    socket.on('connect', () => cb({
        state: 'connected',
        port,
    }));
    
    socket.on('disconnect', () => cb({
        state: 'disconnected',
        port,
    }));

    socket.on('connect_error', () => cb({
        state: 'connect_error',
        port,
    }));
}

export {
    subscribeToConnection,
    connectionEstablished,
    createPost,
    deletePost,
    subscribeToPosts,
    retrievePost,
};