import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
//import Connection from '../connection/Connection';

import {
    Icon,
    Image,
    Menu,
    Sidebar,
    MenuItem
} from 'semantic-ui-react';

import '../../styles/navbar.css';

const NavBarMobile = ({
        children={},
        leftItems=[],
        onPushClick,
        onToggle,
        rightItems=[],
        visible=false,
        inverted=false,
        animation="overlay",
        styles={},
        title=''
    }) => (
        <Sidebar.Pushable>
            <Sidebar
                as={Menu}
                animation={(animation) ? animation : "overlay"}
                icon="labeled"
                inverted={inverted}
                vertical
                visible={visible}
                width="thin"
                className="borderless"
                style={styles}
                title={title}
            >
                <MenuItem className="really-wonkified">
                    <Image className="ui centered image really-wonkified" size="mini" src="https://react.semantic-ui.com/logo.png" />
                </MenuItem>
                {_.map(leftItems, item =>
                    <Link
                        key={item.key}
                        to={item.path}
                        onClick={onPushClick}
                    >
                        <Menu.Item className="wonkified" {...item} />
                    </Link>
                )}
            </Sidebar>
            <Sidebar.Pusher
                dimmed={visible}
                onClick={onPushClick}
            >
                <Menu className="borderless navbar" fixed="top" inverted={inverted} style={styles}>
                    <Menu.Item onClick={onToggle}>
                        <Icon name="sidebar" className="really-wonkified" />
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
                        <Menu.Item className="menuItems" />
                    </Menu.Menu>
                </Menu>
                {children}
            </Sidebar.Pusher>
        </Sidebar.Pushable>
    );

NavBarMobile.propTypes = {
    children: PropTypes.object,
    leftItems: PropTypes.array,
    onPushClick: PropTypes.func,
    onToggle: PropTypes.func,
    rightItems: PropTypes.array,
    visible: PropTypes.bool,
    inverted: PropTypes.bool,
    animation: PropTypes.string,
    styles: PropTypes.object,
    title: PropTypes.string
};

export default NavBarMobile;