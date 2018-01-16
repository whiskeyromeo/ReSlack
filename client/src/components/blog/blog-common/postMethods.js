import { timeSince } from '../../../utils/common';

export const formatPost = (post) => {
    let postDate = (post.postDate) ? (new Date(post.postDate)) : (new Date());
    postDate = timeSince(postDate);
    //postDate = postDate.toLocaleDateString("en-US", options);
    //let options = { year: 'numeric', month: 'long', day: 'numeric' };

    return {
        id: (post.id) ? post.id : Math.floor(Math.random()*10),
        imageURL : (post.imageURL.length > 0) ? post.imageURL : 'http://via.placeholder.com/150x150',
        title : (post.title.length >= 5) ? post.title : 'Temp Title',
        content : (post.content.length > 10) ? post.content : 'Your Content Here',
        postDate: postDate
    };

};