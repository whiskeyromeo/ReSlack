export const comparePosts = (a, b) => {
    const a_time = new Date(a.postDate).getTime();
    const b_time = new Date(b.postDate).getTime();
    if(a_time < b_time) {
        return -1;
    } else if( a_time > b_time) {
        return 1;
    }
    return 0;
};


export const timeSince = (dateString) => {
    const date = new Date(dateString);
    const seconds = Math.floor((Date.now() - date) / 1000);
    let interval = Math.floor(seconds/ 31536000);
    
    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
};