import React, {Component} from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { ImageCard } from './Card';
import '../stylesheets/forms.css';



class InfoForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            picUrl: '',
            invalidPicUrl: false,
            invalidTitle: false,
            invalidContent: false,
        }
        this.updatePicUrl = this.updatePicUrl.bind(this);
        this.updateTitle = this.updateTitle.bind(this);
        this.updateContent = this.updateContent.bind(this);
    } 

    updateTitle(evt) {
       let title = evt.target.value;
       if(title.length < 3) {
           this.setState({invalidTitle: true,});
       } else {
           this.setState({invalidTitle:false, title: title})
       }
    }

    updateContent(evt) {
        let content = evt.target.value;
        if (content.length < 10) {
            this.setState({invalidContent: true,});
        } else {
            this.setState({invalidContent: false, content: content});
        }
    }

    updatePicUrl(evt) {
        let regex = new RegExp(/[-a-zA-Z0-9@:%_.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_.~#?&//=]*)?/gi);
        let picUrl = evt.target.value;
        console.log(picUrl);
        if(picUrl.match(regex)) {
            this.setState({ picUrl: evt.target.value, invalidPicUrl: false,})
        } else {
            this.setState({ invalidPicUrl : true, });
            console.log('should be invalid');
        }
        
    }

    render() {

        const { title, content, picUrl, invalidPicUrl, invalidTitle, invalidContent } = this.state;
        const invalidTitleMessage = `Any decent title is at least 3 letters long...`;
        const invalidContentMessage = "All content should have at least 10 letters...";
        const invalidURLMessage = "The URL provided is not valid";
        return(     
            <div className="ui segment form-container" >
                <form className="ui form infoForm">
                    <div className="field">
                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            onBlur={this.updateTitle}
                            required
                        />
                        <label htmlFor="title"></label>
                        {(invalidTitle) ? <div className="invalidInput">{invalidTitleMessage}</div> : ''}
                    </div>
                    <div className="field">
                        <input
                            type="text"
                            onBlur={this.updatePicUrl}
                            name="pictureURL"
                            placeholder="Picture URL"
                            required
                        />
                        <label htmlFor="pictureURL"></label>
                        {(invalidPicUrl) ? <div className="invalidInput">{invalidURLMessage}</div> : ''}
                    </div>
                    <div className="field">
                        <textarea
                            minLength="20"
                            placeholder="Content"
                            name="blog-post"
                            onBlur={this.updateContent}
                            required
                            cols="30" rows="4"></textarea>
                        <label htmlFor="blog-post"></label>
                        {(invalidContent) ? <div className="invalidInput">{invalidContentMessage}</div> : ''}
                    </div>
                    <div id="addPostButton" className="ui clearing segment" >
                        <Button floated="right" animated positive>
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

