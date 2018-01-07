import '../stylesheets/blog.css';

import React, { Component } from 'react';
import { Button, Transition, Divider } from 'semantic-ui-react';

import { ImageCard, Card } from './Card';
import { InfoForm } from './Forms';

class BlogTop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            picUrl: '',
        }
    }

    render() {
        return(
            <div className="ui stackable grid">
                <div className="ten wide column">
                    <InfoForm 
                        title={this.state.title}
                        content={this.state.content}
                        picUrl={this.state.picUrl}
                    />
                </div>
                <div className="six wide column">
                    <div className="ui segment">
                        <div className="header">Preview: </div>
                        <ImageCard
                            image={'http://via.placeholder.com/150x150'}
                            title={'Title Goes Here'}
                            content={'Content Goes Here...'}
                        />
                    </div>
                </div>
            </div >
        );
    }
}


class Blog extends Component {

    constructor() {
        super();
        this.state = {
            showForm: true,
            posts : [],
        }

    }

    toggleForm = () => {
        this.setState({showForm: !this.state.showForm});
        
    }

    render() {

        const { showForm } = this.state;

        return (
            <div className="ui container component" >
                <BlogTop />
                <div id="addBlogContainer" className="ui clearing segment">
                    <h2 id="blogTitle">Some Simple Blog</h2>
                    <Button 
                        floated="right"
                        color="orange"
                        onClick={this.toggleForm}
                    >
                        {(showForm) ? 'Hide the Form' : 'Add A Post' }
                    </Button>
                </div>
                <Transition visible={showForm} animation='scale' duration={1000} >
                    <div>
                        <InfoForm />
                    </div>
                </Transition>
                <div id="blogPostContainer" className="ui cards">
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </div>
                <Divider />
            </div>
        );
    }
}

export default Blog;