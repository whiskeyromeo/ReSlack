import React, { Component } from 'react';
import { ABOUT_HEADER, ABOUT_CONTENT } from '../../config/string_config';
class About extends Component {
    render() {
        return (
            <div className="component">
                <h2>{ ABOUT_HEADER } </h2>
                <p>{ ABOUT_CONTENT }</p>
            </div>
        );
    }
}

export default About;
