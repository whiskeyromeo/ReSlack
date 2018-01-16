import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import PostsGrid from './PostsGrid';
import PostsList from './PostsList';
import PostsTable from './PostsTable';
import PostsSortableTable from './PostsSortableTable';

import { comparePosts } from '../../../utils/common';
import { subscribeToPosts } from '../../../api/api';

class BlogItemView extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            activeButton: 'table-btn',
            posts: []
        };
        this.renderPostsView = this.renderPostsView.bind(this);
        this.setActiveView = this.setActiveView.bind(this);
    }

    //TODO:  This presents an issue when pressing the back button.
    // This should be fixed when Redux is used to handle the posts
    componentWillMount() {
        subscribeToPosts((post) => {
            this.setState(prevState => ({
                posts: prevState.posts.concat([post])
            }));
        });
    }

    setActiveView(evt) {
        const id = evt.target.id;
        if(this.state.activeButton !== id) {
            this.setState({activeButton: id});
        }
    }

    renderPostsView() {
        const active = this.state.activeButton;
        if (active === 'grid-btn') {
            return <PostsGrid posts={this.state.posts} />;
        } else if (active === 'list-btn') {
            return <PostsList posts={this.state.posts} />;
        } else if (active === 'sort-table-btn') {
            return <PostsSortableTable posts={this.state.posts} />;
        } else {
            return <PostsTable posts={this.state.posts} />;
        }
    }


    render() {
        const posts = this.state.posts;
        posts.sort(comparePosts);

        return (
            <div>
                <div className="ui stackable grid">
                    <div className="thirteen wide column">
                        <h4>Current Posts</h4>
                    </div>
                    <div className="three wide column">
                        <Button.Group basic>
                            <Button id="grid-btn" icon onClick={this.setActiveView}>
                                <i id="grid-btn" className="grid layout icon" />
                            </Button>
                            <Button id="list-btn" icon onClick={this.setActiveView}>
                                <i id="list-btn" className="list layout icon" />
                            </Button>
                            <Button id="table-btn" icon onClick={this.setActiveView}>
                                <i id="table-btn" className="list layout icon" />
                            </Button>
                            <Button id="sort-table-btn" icon onClick={this.setActiveView}>
                                <i id="sort-table-btn" className="list layout icon" />
                            </Button>
                        </Button.Group>
                    </div>
                </div>
                {this.renderPostsView()}
            </div>
        );
    }
   
}

BlogItemView.propTypes = {
    posts: PropTypes.array
};

export default BlogItemView;