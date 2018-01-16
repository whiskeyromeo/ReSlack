import React from 'react';
import PropTypes from 'prop-types';
import { Responsive } from 'semantic-ui-react';
import NavBarMobile from './NavBarMobile';
import NavBarChildren from './NavBarChildren';


class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
        this.handlePush = this.handlePush.bind(this);
        this.handleToggle = this.handleToggle.bind(this);

    }

    handlePush() {
        if (this.state.visible) {
            this.setState({ visible: false });
        }
    }

    handleToggle() {
        this.setState({ visible: !this.state.visible });
    }

    render() {
        const { children, leftItems, rightItems, inverted, animation, title, styles } = this.props;
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
            </div>
        );
    }
}

NavBar.propTypes = {
    children: PropTypes.object,
    leftItems: PropTypes.array,
    rightItems: PropTypes.array,
    inverted: PropTypes.bool,
    animation: PropTypes.bool,
    title: PropTypes.string,
    styles: PropTypes.object
};

export default NavBar;



