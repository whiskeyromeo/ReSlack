import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { options } from './parserConfig';

class HtmlParser extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(evt) {
        console.log('evt: ', evt.target);
    }

    
    render() {
        const html = this.props.content;
        return (
            <div className="parser-content" style={{border: '1px solid black'}} onClick={this.handleClick}>
                {ReactHtmlParser(html, options)}
            </div>
        );
    }
}

export default HtmlParser;