import React, {Component} from 'react';
import { Button, Icon } from 'semantic-ui-react';

import '../stylesheets/forms.css';

/**
 * Provides a basic information form via which a user can enter
 * a title. desc
 */
class InfoForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            invalidPicUrl: false,
            invalidTitle: false,
            invalidContent: false,
            submitEnabled: false,
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.updatePicUrl = this.updatePicUrl.bind(this);
        this.updateTitle = this.updateTitle.bind(this);
        this.updateContent = this.updateContent.bind(this);
    } 

    /**
     * Update current title based on the form title value
     * @param evt The click event
     */
    updateTitle(evt) {
       let title = evt.target.value;
       this.props.onFormChange('title', title);
       if(title.length < 3) {
           this.setState({invalidTitle: true,});
       } else {
           this.setState({invalidTitle:false});
       }
    }

    /**
     * Update current content based on the form content value
     * @param evt The click event
     */
    updateContent(evt) {
        let content = evt.target.value; 
        this.props.onFormChange('content', content);
        if (content.length < 10) {
            this.setState({invalidContent: true,});
        } else {
            this.setState({invalidContent: false});
        }
    }

    /**
     * Update current imageURL based on the form imageURL value
     * @param evt The click event
     */
    updatePicUrl(evt) {
        let regex = new RegExp(/[-a-zA-Z0-9@:%_.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_.~#?&//=]*)?/gi);
        let picUrl = evt.target.value;
        
        this.props.onFormChange('picUrl', picUrl);
        if(picUrl.match(regex)) {
            this.setState({invalidPicUrl: false})
        } else {
            this.setState({ invalidPicUrl : true, });
        }
        
    }

    /**
     * Deal with the form submission, passing the value from 
     * The inputs back to the parent component of the form
     * @param evt The form submission event
     */
    handleFormSubmit(evt) {
        evt.preventDefault();
        
        let post = {
            title : this.props.title,
            content : this.props.content,
            imageURL : this.props.picUrl,
            postDate : (new Date()),
        }
        this.titleInput.value = "";
        this.imageInput.value = "";
        this.contentTextArea.value = "";
        this.props.onButtonClick(post)
    }

    componentWillUpdate(nextProps, nextState) {
        if((nextProps.title.length >= 3  && !nextState.invalidTitle) 
            && (nextProps.content.length >= 10 && !nextState.invalidContent)
            && ((nextProps.picUrl.length > 0) && !nextState.invalidPicUrl)
        ) {
            nextState.submitEnabled = true;
        } else {
            nextState.submitEnabled = false;
        }

    }

    render() {

        const {invalidPicUrl, invalidTitle, invalidContent, submitEnabled } = this.state;
        const invalidTitleMessage = `Any decent title is at least 3 letters long...`;
        const invalidContentMessage = "All content should have at least 10 letters...";
        const invalidURLMessage = "The URL provided is not valid";
        
        return(     
            <div className="ui segment form-container" >
                <form className="ui form infoForm">
                    <div className="field">
                        <input
                            ref={ref => this.titleInput = ref }
                            type="text"
                            name="title"
                            placeholder="Title"
                            onChange={this.updateTitle}
                            required
                        />
                        <label htmlFor="title"></label>
                        {(invalidTitle) ? <div className="invalidInput">{invalidTitleMessage}</div> : ''}
                    </div>
                    <div className="field">
                        <input
                            ref={ref => this.imageInput = ref}
                            id="imageInput"
                            type="text"
                            onChange={this.updatePicUrl}
                            name="pictureURL"
                            placeholder="Picture URL"
                            required
                        />
                        <label htmlFor="pictureURL"></label>
                        {(invalidPicUrl) ? <div className="invalidInput">{invalidURLMessage}</div> : ''}
                    </div>
                    <div className="field">
                        <textarea
                            ref={ref => this.contentTextArea = ref}
                            id="contentTextArea"
                            minLength="20"
                            placeholder="Content"
                            name="blog-post"
                            onChange={this.updateContent}
                            required
                            cols="30" rows="4"></textarea>
                        <label htmlFor="blog-post"></label>
                        {(invalidContent) ? <div className="invalidInput">{invalidContentMessage}</div> : ''}
                    </div>
                    <div 
                        id="addPostButton"
                        className="ui clearing segment"
                    >
                        <Button 
                            
                            floated="right" 
                            animated 
                            positive
                            onClick={this.handleFormSubmit}
                            disabled={!submitEnabled}
                        >
                            <Button.Content visible>
                                PostIt!
                            </Button.Content>
                            <Button.Content hidden>
                                <Icon name='plus' />
                            </Button.Content>
                        </Button>
                    </div>
                </form>
            </div>
                
            
        );     
    }
}


export { InfoForm };

