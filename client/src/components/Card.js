import React from 'react';
import { Link } from 'react-router-dom';

const Card = () => (
    <div className="ui card">
        <div className="content">
            <div className="header">Elliot Fu</div>
            <div className="meta">Friend</div>
            <div className="description">
                Elliot Fu is a film-maker from New York.
            </div>
        </div>
        <div className="extra content">
            <div className="ui large transparent left icon input">
                <i className="heart outline icon"></i>
                <input type="text" placeholder="Add Comment..." />
            </div>
        </div>
    </div>
);


class ImageCard extends React.Component {
    render() {
        // TODO : For some reason I am having a difficult time 
        // accessing objects from in here, perhaps need to spread?
        const post = this.props.post
        const options = {year: 'numeric', month: 'long', day: 'numeric'};
        let postDate = (this.props.postDate) ? (new Date(this.props.postDate)) : (new Date());
        postDate = postDate.toLocaleDateString("en-US", options);
        
        return (
            <Link className="ui card" to={{pathname: `/post/${this.props.id}`, state: post }} >
                <div className="image">
                    <img src={this.props.image} alt="Could not retrieve" width="150" height="150" />
                </div>
                <div className="content">
                    <div className="header">{this.props.title}</div>
                    <div className="description">
                        {this.props.content}...
                    </div>
                </div>
                <div 
                    className="extra content"
                >
                    <span className="right floated">Posted {postDate}</span>
                </div>
            </Link>
            
        );

    }

};

export { Card, ImageCard };
