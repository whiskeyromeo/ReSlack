import React from 'react';
import PropTypes from 'prop-types';
import ImageCard from './ImageCard';

const PostsGrid = ({posts = []}) => {
    return (
        <div id="blogPostContainer" className="ui four stackable cards">
            {
                posts.map(post => {
                    return (
                        <ImageCard
                            key={post.id}
                            post={post}
                        />
                    );
                })
            }
        </div>
    );
};

PostsGrid.propTypes = {
    posts: PropTypes.array
};

export default PostsGrid;


