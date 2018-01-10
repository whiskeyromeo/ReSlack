import React, { Component } from 'react';
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react';
import { publishArticle, subscribeToPostArticle } from '../connection/api';
import HtmlParser from './HtmlParser';

class PostModal extends Component {
    

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
        }
        this.updateArticle = this.updateArticle.bind(this);
    }

    componentDidMount() {
        // Need to subscribe and publish to associated article table
        subscribeToPostArticle(this.props.post.id, (articleEvent) => {
            this.setState((prevState) => {
                return {
                    articles : [...prevState.articles, ...articleEvent.articles],
                }
            });
        });
    }

    updateArticle(evt) {
        let article = this.articleContent.value;
        publishArticle({
            postId: this.props.post.id,
            article: article,
        });

    }

    render() {
        const { articles } = this.state;
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
                        {
                            articles.map((x,i) => {
                                console.log(x.)
                                return (post.id === x.postId) ?
                                    <HtmlParser content={x.article} key={x.id }/>
                                : ''

                            })
                        }
                        <textarea name="" ref={ref => this.articleContent = ref} cols="30" rows="10"></textarea>
                        <button onClick={this.updateArticle}>Submit changes</button>
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