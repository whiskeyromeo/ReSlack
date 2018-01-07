import React from 'react';

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
        let options = {year: 'numeric', month: 'long', day: 'numeric'};
        const todaysDate = new Date().toLocaleDateString("en-US", options);
        return (
            <div className="ui card">
                <div className="image">
                    <img src={this.props.image} width="150" height="150" alt="" />
                </div>
                <div className="content">
                    <div className="header">{this.props.title}</div>
                    <div className="description">
                        {this.props.content}...
                    </div>
                </div>
                <div className="extra-content">
                    <span className="right floated">Posted {todaysDate}</span>
                </div>
            </div>
            
        );

    }

};

export { Card, ImageCard };
