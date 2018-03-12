import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { options } from './parserConfig';
import { timeSince } from '../../utils/common';

class HtmlParser extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(evt) {
        // 
    }

    
    render() {
        const html = this.props.content.article;
        const createdDate = new Date(this.props.content.timestamp);
        const timeSinceArticle = timeSince(createdDate);
        // console.log(createdDate);
        return (
            <div className="parser-content" onClick={this.handleClick}>
                {ReactHtmlParser(html, options)}
                <div className="parserTimeBlock right floated"> created { timeSinceArticle } ago</div>
            </div>
        );
    }
}

export default HtmlParser;