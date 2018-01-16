import React from 'react';
import ImageCard from '../blog-bottom-components/ImageCard';
import AddPostForm from './AddPostForm';

import _ from 'lodash';
import Identicon from '../../../../node_modules/identicon.js/identicon';
import { createPost } from '../../../api/api';


// TODO : Remove a lot of repetitious code from the validation sections
class BlogFormContainer extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            errors: {},
            saveable: false,
            currentPost: this.resetPost()
        };

        this.checkIfPostIsSaveable = this.checkIfPostIsSaveable.bind(this);
        this.generateAvatar = this.generateAvatar.bind(this);
        this.getInputValue = this.getInputValue.bind(this);
        this.getInputOnBlur = this.getInputOnBlur.bind(this);
        this.resetPost = this.resetPost.bind(this);
        this.saveNewPost = this.saveNewPost.bind(this);
        this.validatePhotoURL = this.validatePhotoURL.bind(this);
        this.validatePost = this.validatePost.bind(this);
    }

    checkIfPostIsSaveable() {
        if(this.validatePost() && _.isEmpty(this.state.errors)) {
            this.setState({saveable: true});
        } else {
            if(this.state.saveable) {
                this.setState({saveable: false});
            }
        }
    }

    resetPost() {
        return {
            title: '',
            content: '',
            imageURL: '',
            postDate: new Date()
        };
    }
    
    getInputValue(evt) {
        let currentPost = this.state.currentPost;
        if(currentPost[evt.target.name].length > evt.target.minLength) {
            this.validateTextInputs(evt);
        }
        currentPost[evt.target.name] = evt.target.value;
        this.setState({currentPost: currentPost});
    }

    generateAvatar(evt) {
        evt.preventDefault();
        // Quick method to generate a hash from a value
        let arr = window.crypto.getRandomValues(new Uint8Array((32 || 40)/2));
        let hash = Array.from(arr, (val) => {
            return ('0' + val.toString(16)).substr(-2);
        }).join('');
        let data = new Identicon(hash, {format: 'svg'}).toString();
        let src = `data:image/svg+xml;base64,${data}`;
        this.validatePhotoURL(src);
    }

    getInputOnBlur(evt) {
        if (evt.target.name === 'imageURL') {
            this.validatePhotoURL(evt.target.value);
        } else {
            this.validateTextInputs(evt);
        }
        this.checkIfPostIsSaveable();
    }

    saveNewPost(evt) {
        evt.preventDefault();
        createPost(this.state.currentPost);
        this.setState({ currentPost : this.resetPost(), errors : {}});
    }


    validatePost() {
        const currentPost = this.state.currentPost;
        const vals = Object.values(currentPost);
        for(let i in vals) {
            if(vals[i].length === 0) {
                return false;
            }
        }
        return true;
    }

    validatePhotoURL(imageURL, timeLimit = 2000) {
        let currentPost = this.state.currentPost;
        let currentErrors = this.state.errors;

        new Promise((resolve, reject) => {
            let timeout = timeLimit;
            let timer, img = new Image();
            img.onerror = img.onabort = () => {
                clearTimeout(timer);
                img.src = '';
                reject('error');
            };
            img.onload = () => {
                clearTimeout(timer);
                resolve("success");
            };
            timer = setTimeout(() => {
                img.src = '';
                reject("timeout");
            }, timeout);
            img.src = imageURL;
        }).then((res) => {
            currentPost.imageURL = imageURL;
            delete currentErrors['invalidPicUrl'];
            this.setState({ currentPost: currentPost, errors: currentErrors });
        }).catch((err) => {
            currentPost.imageURL = '';
            currentErrors['invalidPicUrl'] = err;
            this.setState({ currentPost: currentPost, errors: currentErrors });
        });
    }

    validateTextInputs(evt) {
        let currentPost = this.state.currentPost;
        let currentErrors = this.state.errors;
        let target = evt.target;

        // For the other inputs, ensure they are of the minimum length set in the input
        if (target.value.length < target.minLength) {
            currentErrors['invalid_' + target.name] = true;
        } else {
            delete currentErrors['invalid_' + target.name];
            currentPost[target.name] = target.value;
        }
        this.setState({ currentPost: currentPost, errors: currentErrors });
        this.checkIfPostIsSaveable();
    }

    render() {
        const { errors, saveable, currentPost } = this.state;

        const props = {
            saveable: saveable,
            onChange: this.getInputValue,
            onSubmit: this.saveNewPost,
            onBlur: this.getInputOnBlur,
            errors: errors,
            post: currentPost,
            avatarGenClick: this.generateAvatar,
        };

        return (
            <div className="ui segment stackable grid">
                <div className="ten wide column">
                    <AddPostForm  {...props} />
                </div>
                <div className="six wide column">
                    <div className="">
                        <ImageCard
                            post={props.post}
                        />
                    </div>
                </div>
            </div>
        );
    }
}


export default BlogFormContainer;


