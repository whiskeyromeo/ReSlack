import React from 'react';

class HomePage extends React.Component {
    render() {
        return(
            <div className="component">
                <h1>Welcome to the App</h1>
                <br/>
                <hr/>
                <h3>Overview</h3>
                <p>
                    As you can see, there are some things that are still
                    a little bit wonky with this application. I have been 
                    using this as a testbed for different approaches to 
                    rendering realtime data streams using React. Most of the work
                    with this application was done over a very short time
                    so I ask that you excuse the rough edges. 
                </p>
                <p>
                    I am currently in the process of incorporating Redux 
                    into the project in order to try and mitigate the issues
                    which arise from passing state between multiple components. 
                    Additional features on the docket include optional sign-in/authentication
                    using OAuth and transition of the server side to Redis. 
                </p>
                <p>
                    I have strived to keep the architecture of the app as portable 
                    as possible in order to maximize the potential for component reuse
                    and stick to SOLID principles. I have found this to be a little more
                    difficult with the current setup in react as it seems in most of the 
                    prior work I have come across components are used as both an Interface 
                    and a View class. This seems to me to allow for the introduction of some 
                    confusion coming 
                    from an Object Oriented development standpoint, though it may be I simply have not 
                    yet discovered the most effective means of state transfer. Prior work I have done in
                    the newer versions of Angular seemed more familiar from a design standpoint with well defined
                    services to handle state movement and communication. 
                </p>
                <p>
                    In order to use this application you will need to have rethinkdb
                    installed, which is required for the current server configuration.
                    Most of the local installations I have done through the use of the
                    yarn package manager, however npm should work fine as well. 
                </p>
                <h3>Setup/Use</h3>
                <div>
                    <p>
                        If you are seeing this then I must assume that you were at least
                        partially successful in setting up the application. Checkout the 
                        \<strong>Blog</strong> link in the side menu to get started. Currently, you
                        can create a blog article, which you can then collaborate with other clients 
                        on. You can write HTML markup directly into the post.
                    </p>
                    <p>
                        Articles are presented within the frame to the user, and 
                        a little bit of sandboxing takes place. Currently inline 
                        javascript will not work within the presentation, though 
                        inline styling will. I am looking into transitioning the
                        article presentation into an iframe or something of the like
                        to possibly rectify this at some point. 
                    </p>
                    <p>
                        In order to simulate the use by multiple clients, start
                        up the clients in other via the following (depending on your installer)
                    </p>
                    <pre>
                        <code>yarn start      # will default to 3001 if 3000 is occupied</code>
                        <br/>
                        <code>npm run p1      # will run nodemon on port 3001</code>
                    </pre>
                    <p>
                        Hopefully I will be keeping this page updated as I make changes 
                        to the appication. Enjoy!
                    </p>
                </div>

            </div>
        );
    }
}

export default HomePage;