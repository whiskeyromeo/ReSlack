import React from 'react';
import BlogItemView from './blog-bottom-components/BlogItemView';
import BlogFormContainer from './blog-top-components/BlogFormContainer';
import { Button, Divider, Transition } from 'semantic-ui-react';

import '../../styles/blog.css';



class BlogPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false
        };
        this.toggleFormContainer = this.toggleFormContainer.bind(this);
    }

    toggleFormContainer() {
        console.log('coming from toggleform');
        if (!this.refs.testRef)
            this.setState({showForm: !this.state.showForm});
    }



    render() {
        const { showForm } = this.state;
        return (
            <div className="ui container component">
                <div id="addBlogContainer" className="ui clearing">
                <div className="ui clearing grid">
                    <h2 id="blogTitle" className="thirteen wide column">Add A New Post!</h2>
                    <div className="three wide column">
                        <Button 
                            color="vk"
                            onClick={this.toggleFormContainer}
                        >
                            {(showForm) ? 'Hide the Form' : 'Add A Post'}
                        </Button>
                    </div>
                </div>
                <Transition visible={showForm} animation="scale" duration={1000}>
                    <div>
                        <BlogFormContainer />
                    </div>
                </Transition>
                <Divider />
                <BlogItemView />
                </div>
                
            </div>
        );
    }
}

export default BlogPage;