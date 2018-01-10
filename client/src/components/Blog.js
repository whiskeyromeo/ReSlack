import '../stylesheets/blog.css';

import React, { Component } from 'react';
import { Button, Transition, Divider } from 'semantic-ui-react';

import Article from './Article';
import { ImageCard } from './Card';
import { InfoForm } from './Forms';

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
            showForm: false,
            posts : [],
            selectedPost: null,
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
        this.unselectPost = this.unselectPost.bind(this);
    }

    toggleForm() {
        this.setState({showForm: !this.state.showForm});    
    }

    selectPost(post) {
        console.log(post.id);
        this.setState({ selectedPost : post.id });
    }

    unselectPost() {
        this.setState({selectedPost: null});

    }

    renderPost(i) {
        const post = this.state.posts[i];
        return (  
            <ImageCard
                key={post.id}
                id={post.id}
                title={post.title}
                content={post.content}
                image={post.imageURL}
                postDate={post.postDate}
                post={post}
            />
        )
    }


    addPost(post) {
        console.log('post was : ', post);
        createPost(post);
    }

    render() {
        const { showForm, posts, selectedPost } = this.state;

        const article = (
            <Article post={selectedPost} returnToBlog={this.unselectPost} />
        )

        const content = (
            <div className="ui container component" >
                <div id="addBlogContainer" className="ui clearing segment">
                    <h2 id="blogTitle">Some Simple Blog</h2>
                    <Button
                        floated="right"
                        color="orange"
                        onClick={this.toggleForm}
                    >
                        {(showForm) ? 'Hide the Form' : 'Add A Post'}
                    </Button>
                </div>
                <Transition visible={showForm} animation='scale' duration={1000} >
                    <div>
                        <BlogTop
                            handleFormSubmit={this.addPost}
                        />
                    </div>
                </Transition>
                <div id="blogPostContainer" className="ui four stackable cards">
                    {posts.map((x, i) => {
                        return this.renderPost(i);
                    })}
                </div>
                <Divider />
            </div>
        );
        if(selectedPost)
            return article;
        else    
            return content
    }   
}

export default Blog;