import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Button } from 'semantic-ui-react';

import '../../../styles/forms.css';



const AddPostForm = ({post, errors={}, onChange, onBlur, onSubmit, saveable, avatarGenClick }) => {
    let minTitle = 3;
    let minContent = 10;
    let invalidTitleMessage = `Title should be at least ${minTitle} characters`;
    let invalidContentMessage = `All content should have at least ${minContent} letters...`;
    let invalidURLMessage = "The URL provided is a not valid image";

    return (
        <div className="ui ">
            <form className="ui form infoForm">
                <div className="field">
                    <input
                        type="text"
                        name="title"
                        minLength={minTitle}
                        placeholder="Title"
                        value={post.title}
                        onChange={onChange}
                        onBlur={onBlur}
                        required
                    />
                    <label htmlFor="title" />
                    {(errors.invalid_title) ? <div className="invalidInput">{invalidTitleMessage}</div> : ''}
                </div>
                <div className="field">
                    <div className="ui action input">
                        <input
                            id="imageInput"
                            type="text"
                            onBlur={onBlur}
                            onChange={onChange}
                            name="imageURL"
                            placeholder="Picture URL"
                            value={post.imageURL}
                            required
                        />
                        <button 
                            className="button"
                            style={{backgroundColor : 'orange'}}
                            onClick={avatarGenClick}
                        >AutoGenerate</button>
                    </div>
                    <label htmlFor="imageURL" />
                    {(errors.invalidPicUrl != null) && <div className="invalidInput">{invalidURLMessage}</div>}
                </div>
                <div className="field">
                    <textarea
                        id="contentTextArea"
                        minLength={minContent}
                        placeholder="Content"
                        name="content"
                        value={post.content}
                        onChange={onChange}
                        onBlur={onBlur}
                        required
                        cols="30" rows="4" />
                    <label htmlFor="content" />
                    {(errors.invalid_content) ? <div className="invalidInput">{invalidContentMessage}</div> : ''}
                </div>
                <div
                    id="addPostButton"
                    className="ui clearing segment"
                >
                    <Button
                        floated="right"
                        animated
                        positive
                        onClick={onSubmit}
                        disabled={!saveable}
                    >
                        <Button.Content visible>
                            PostIt!
                            </Button.Content>
                        <Button.Content hidden>
                            <Icon name="plus" />
                        </Button.Content>
                    </Button>
                </div>
            </form>
        </div>
    );
};

AddPostForm.propTypes = {
    errors: PropTypes.object,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    saveable: PropTypes.bool,
    avatarGenClick: PropTypes.func,
    onBlur: PropTypes.func,
    post: PropTypes.object
};

export default AddPostForm;
