import React from 'react';
import { Container } from 'semantic-ui-react';
import ButtonPrimary from './ButtonPrimary';
import SemMenu from './SemMenu';
import { Card } from './Card';


const Demo = () => (
    
    <div className="ui container component" >
        <h1>This is a Demo of some Semantic UI components</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis praesentium explicabo a. Repudiandae deleniti placeat qui assumenda veritatis corrupti sapiente quis minima deserunt! Doloribus veritatis reiciendis voluptas itaque corrupti iure!</p>
        <hr />
        <div>
            <h2>Below are Some Buttons</h2>
            <ButtonPrimary />
        </div>
        <hr />
        <div>
            <h2>Below are some Menus</h2>
            <SemMenu />
        </div>
        <div>
            <Container>
                <h2>Below are some cards</h2>
                <div className="ui cards" >
                    <Card />
                    <Card />
                    <Card />
                </div>
            </Container>
        </div>
    </div>
        
)

export default Demo
