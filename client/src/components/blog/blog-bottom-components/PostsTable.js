import React from 'react';
import PropTypes from 'prop-types';
import { formatPost } from '../blog-common/postMethods';
import { Link } from 'react-router-dom';

const PostTable = ({posts}) => {
    return (
        <table className="ui very basic celled striped table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th className="right aligned">Date</th>
                </tr>
            </thead>
            <tbody>
                { 
                
                    posts.map(post => {
                        post = formatPost(post);
                        return (
                            <tr key={post.id}>
                                <td className="collapsing">
                                    <h4 className="ui image header">
                                        <img className="ui mini rounded image" src={post.imageURL} alt=""/>
                                        {'    '}
                                        <Link to={{ pathname: `/post/${post.id}`, state: post }} >
                                            {post.title}
                                        </Link>
                                    </h4>
                                </td>
                                <td>{post.content}</td>
                                <td className="right aligned">{post.postDate}</td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
    );
};

PostTable.propTypes = {
    posts: PropTypes.array
};

export default PostTable;