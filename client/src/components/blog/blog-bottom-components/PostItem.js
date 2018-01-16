import React from 'react';
import PropTypes from 'prop-types';
import { formatPost } from '../blog-common/postMethods';
import { Link } from 'react-router-dom';

const PostItem = ({post}) => {
    const currentPost = formatPost(post);
    return (
        <div className="item">
            <div className="image">
                <img src={currentPost.imageURL} alt=""/>
            </div>
            <div className="content">
                <Link to={{ pathname: `/post/${currentPost.id}`, state: post }} >
                    <div className="header">{currentPost.title}</div>
                </Link>
                <div className="meta">
                    <span>{currentPost.content}</span>
                </div>
                <div className="description">
                    <p />
                </div>
                <div className="extra">
                    Posted { currentPost.postDate } Ago
                </div>
            </div>
        </div>
    );
};

PostItem.propTypes = {
    post: PropTypes.object
};


export default PostItem;