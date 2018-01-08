import React, { Component } from 'react';
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react';

class PostModal extends Component {

    componentDidMount() {
        // Need to subscribe and publish to associated article table
        
    }

    render() {
        const {post, trigger}  = {...this.props}
        return (
            <Modal trigger={trigger}>
                <Modal.Header>{post.title}</Modal.Header>
                <Modal.Content image scrolling>
                    <Image
                        size='medium'
                        src={post.imageURL}
                        wrapped
                    />
                    <Modal.Description>
                        <Header>{post.content}</Header>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Quam repellendus quas ratione maiores rem dolorum ullam repudiandae 
                            nesciunt tempore natus nisi in quod officia nemo quasi ad neque, possimus voluptatum!
                        </p>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button primary>
                        Exit <Icon name='right chevron' />
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export { PostModal };