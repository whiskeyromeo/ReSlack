import '../stylesheets/blog.css';

import React, { Component } from 'react';
import { Button, Transition, Divider } from 'semantic-ui-react';

import { ImageCard } from './Card';
import { InfoForm } from './Forms';
import { PostModal } from './PostModal';

import { createPost, subscribeToPosts } from '../connection/api';



class BlogTop extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            picUrl: '',
        }
        this.onFormChange = this.onFormChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormChange(stateVar, newVal) {
        let newState = {};
        newState[stateVar] = newVal;
        this.setState(newState);
    }

    onFormSubmit(post) {
        // Reset the state
        this.setState({ title: '', content: '', picUrl: ''})
        this.props.handleFormSubmit(post);
    }

    render() {
        const {title, content, picUrl} = this.state;

        return(
            <div className="ui stackable grid">
                <div className="ten wide column">
                    <InfoForm 
                        title={title}
                        content={content}
                        picUrl={picUrl}
                        onFormChange={this.onFormChange}
                        onButtonClick={this.onFormSubmit}
                    />
                </div>
                <div className="six wide column">
                    <div className="ui segment">
                        <div className="header">Preview: </div>
                        <ImageCard
                            image={(picUrl.length > 0) ? picUrl : 'http://via.placeholder.com/150x150'}
                            title={(title.length >= 3) ? title : 'Title Goes Here'}
                            content={(content.length >= 10) ? content : 'Content Goes Here...'}
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

        subscribeToPosts((post) => {
            this.setState(prevState => ({
                posts: prevState.posts.concat([post]),
            }))
        })

        this.addPost = this.addPost.bind(this);
        this.renderPost = this.renderPost.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
        this.selectPost = this.selectPost.bind(this);
    }

    toggleForm() {
        this.setState({showForm: !this.state.showForm});    
    }

    selectPost(post) {
        console.log(post.id);
        this.setState({ selectedPost : post })
        
    }

    renderPost(i) {
        const post = this.state.posts[i];
        return (
            <PostModal 
                key={post.id}
                post={post}
                trigger={
                    <ImageCard
                        key={post.id}
                        title={post.title}
                        content={post.content}
                        image={post.imageURL}
                        postDate={post.postDate}
                        onClick={evt => this.selectPost(post)}
                    /> 
                }
             />
        )
    }


    addPost(post) {
        console.log('post was : ', post);
        createPost(post);
    }

    render() {
        const { showForm, posts } = this.state;

        return (
            <div className="ui container component" >
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
                        <BlogTop 
                            handleFormSubmit={this.addPost}
                        />
                    </div>
                </Transition>
                <div id="blogPostContainer" className="ui three stackable cards">
                    {posts.map((x,i) => {
                        return this.renderPost(i);
                    })}
                </div>
                <Divider />
            </div>
        );
    }
}

export default Blog;