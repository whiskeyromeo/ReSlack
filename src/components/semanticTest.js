import React from 'react';

import NavBar from './NavBar';
import About from './About';
import Contact from './Contact';
import Demo from './Demo';
import Login from './Login';
import Blog from './Blog';

import customHistory from '../utils/customHistory';

import { Switch, Router } from 'react-router-dom';
import { Route } from 'react-router';


const leftItems = [
    { name: "Home", key: "home", path: "/"},
    { name: "About", key: "about", path: "/about" },
    { name: "Contact", key: "contact", path: "/contact" },
    { name: "Blog", key: "blog", path: "/blog" },
    { name: "Login", key: "login", path: "/login" },
];


const title = "Whiskey";


const SemDemo = () => (
    <Router history={customHistory} >
        <NavBar 
            styles={{ backgroundColor: '#455A64'}}
            inverted
            leftItems={leftItems}
            animation="push"
            title={title}
        >
            <Switch>
                <Route path="/about" component={About}/>
                <Route path="/contact" component={Contact}/>
                <Route path="/login" component={Login}/>
                <Route path="/blog" component={Blog}/>
                <Route path="/" component={Demo}/>
            </Switch>
        </NavBar>
    </Router>
)

export default SemDemo
