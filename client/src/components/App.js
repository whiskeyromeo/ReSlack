import React from 'react';
import { Router, Switch } from 'react-router-dom';
import { Route } from 'react-router';

import AboutPage from './about/AboutPage';
import Article from './article/Article';
import BlogPage from './blog/BlogPage';
import HomePage from './home/HomePage';
import NavBar from './navbar/NavBar';

import customHistory from '../utils/customHistory';

import routes from '../routes';

const title="Whiskey";


class App extends React.Component {
    render() {
        return (
            <Router history={customHistory}>
                <NavBar
                    inverted
                    styles={{ backgroundColor: '#455A64' }}
                    leftItems={routes}
                    title={title}
                >
                    <Switch>
                        <Route path="/about" component={AboutPage} />
                        <Route path="/blog" component={BlogPage} />   
                        <Route path="/post/:postId" component={Article} />   
                        <Route path="/" component={HomePage} />   
                    </Switch>
                </NavBar>
            </Router>
        );  
    }
}


export default App;