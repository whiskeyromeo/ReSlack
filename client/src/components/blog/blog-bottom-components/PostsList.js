import React from 'react';
import PropTypes from 'prop-types';
import PostItem from './PostItem';

const PostsList = ({posts}) => {
    return (
        <div className="ui unstackable items">
            {
                posts.map(post => {
                    return (
                        <PostItem
                            key={post.id}
                            post={post}
                        />
                    );
                })
            }
        </div>
    );
};

PostsList.propTypes = {
    posts: PropTypes.array
};

export default PostsList;