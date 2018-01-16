import React from 'react';
import PropTypes from 'prop-types';
import { formatPost } from '../blog-common/postMethods';
import { Link } from 'react-router-dom';

const ImageCard = ({post}) => {
    const currentPost = formatPost(post);
    const id = (currentPost.id) ? currentPost.id : '';
    return (
        <div className="ui card">
            <div className="image">
                <img src={currentPost.imageURL} alt="" width="150" height="150"/> 
            </div>
            <div className="content">
                <Link to={{ pathname: `/post/${id}`, state: post }} >
                    <div className="header">{currentPost.title}</div>
                </Link>
                <div className="description">{currentPost.content}</div>
            </div>
            <div className="extra content">
                <span className="right floated">Posted {currentPost.postDate} ago</span>
            </div>
        </div>
    );
};

ImageCard.propTypes = {
    post: PropTypes.object.isRequired
};


export default ImageCard;

