/*
    Base code for this was from https://codesandbox.io/s/325y47xk36
    I did a number of modifications to try and make it more portable/adaptable to
    edge cases

    The NavBar Component takes the parameters
        leftItems
        rightItems
        inverted
        animation

*/

import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Container,
    Icon,
    Image,
    Menu,
    Sidebar,
    Responsive
} from 'semantic-ui-react';

import { MenuItem } from 'semantic-ui-react';
import Connection from '../connection/Connection';

import '../stylesheets/navbar.css';

const NavBarMobile = ({
        children,
        leftItems,
        onPushClick,
        onToggle,
        rightItems,
        visible,
        inverted,
        animation,
        styles,
        title,
    }) => (
        <Sidebar.Pushable>
            <Sidebar
                as={Menu}
                animation={(animation) ? animation : "overlay"}
                icon="labeled"
                inverted={inverted}
                vertical
                visible={visible}
                width='thin'
                className="borderless"
                style={styles}
                title={title}
            >
                <MenuItem>
                    <Image className="ui centered image" size="mini" src="https://react.semantic-ui.com/logo.png" />
                </MenuItem>
                {_.map(leftItems, item => 
                    <Link 
                        key={item.key} 
                        to={item.path}
                        onClick={onPushClick}
                    >
                        <Menu.Item {...item} />
                    </Link>
                )} 
            </Sidebar>
            <Sidebar.Pusher
                dimmed={visible}
                onClick={onPushClick}
            >
                <Menu className="borderless navbar" fixed="top" inverted={inverted} style={styles}>
                    <Menu.Item onClick={onToggle}>
                        <Icon name="sidebar" />
                    </Menu.Item>
                    {
                        (title) ? <Menu.Item className="menuTitle">{title}</Menu.Item> : ''
                    }
                    <Menu.Menu position="right">
                        {_.map(rightItems, item => 
                            <Link key={item.key} to={item.path}>
                                <Menu.Item className="menuItems" {...item} />
                            </Link>
                        )}
                        <Menu.Item className="menuItems">
                            <Connection />
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
                {children}
            </Sidebar.Pusher>
        </Sidebar.Pushable>
)
/*
const NavBarDesktop = ({leftItems, rightItems, inverted, title, styles}) => (
    <Menu className="borderless" fixed="top" inverted={inverted} style={styles}>
        <Menu.Item>
            <Image size="mini" src="https://react.semantic-ui.com/logo.png" />
        </Menu.Item>
        {
            (title) ? <Menu.Item className="menuTitle" >{title}</Menu.Item> : ''
        }
        {_.map(leftItems, item =>
            <Link
                key={item.key}
                to={item.path}
            >
                <Menu.Item className="menuItems" {...item} />
            </Link>
        )}
        <Menu.Menu position="right">
            {_.map(rightItems, item =>
                <Link key={item.key} to={item.path}>
                    <Menu.Item className="menuItems" {...item} />
                </Link>
            )}
        </Menu.Menu>
    </Menu>
);
*/

const NavBarChildren = ({ children }) => (
    <Container style={{marginTop: '5em'}}>{children}</Container>
)

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        }
        this.handlePush = this.handlePush.bind(this);
        this.handleToggle = this.handleToggle.bind(this);

    }

    handlePush() {
        if(this.state.visible) {
            this.setState({visible:false});
        }
    }

    handleToggle() {
        this.setState({visible : !this.state.visible});
    }

    render() {
        const { children, leftItems, rightItems, inverted, animation, title, styles} = this.props;
        const { visible } = this.state;

        return (
            <div>
                <Responsive>
                    <NavBarMobile
                        leftItems={leftItems}
                        onPushClick={this.handlePush}
                        onToggle={this.handleToggle}
                        rightItems={rightItems}
                        visible={visible}
                        inverted={inverted}
                        animation={animation}
                        styles={styles}
                        title={title}
                    >
                        <NavBarChildren>{children}</NavBarChildren>
                    </NavBarMobile>
                </Responsive>
                {/*<Responsive minWidth={Responsive.onlyTablet.minWidth}>
                    <NavBarDesktop leftItems={leftItems} rightItems={rightItems} inverted={inverted} title={title} styles={styles} />
                    <NavBarChildren>{children}</NavBarChildren>
                </Responsive>*/}
            </div>
        )
    }
}

export default NavBar;

