import React, { Component } from 'react';
import { subscribeToConnection } from './api';

class Connection extends Component {
    state = {
        connection: 'connecting',
    }

    constructor(props) {
        super(props);
        subscribeToConnection(({
            state: connection,
            port,
        }) => {
            this.setState({
                connection,
                port,
            })
        })
    }

    render() {
        let content = null;
        if(this.state.connection === 'disconnected') {
            content = (
                <div className="connection-error">
                    <p>There was a problem with the connection...</p>
                </div>
            )
        }
        if(this.state.connection === 'connect_error') {
            content = (
                <div className="connection-error">
                    <p>Could not connect</p>
                </div>
            )
        }
        if(this.state.connection === 'connecting') {
            content = (
                <div>
                    <p>Connecting...</p>
                </div>
            )
        }

        return (
            <div className="connect">
                <p>Socket port: {this.state.port}</p>
                { content }
            </div>
        )
    }
}

export default Connection;
