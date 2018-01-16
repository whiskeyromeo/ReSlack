import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class PostSortableTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            column: null,
            data : [],
            direction: 'ascending'
        };
        this.handleColumnSort = this.handleColumnSort.bind(this);
    }

    // Need to have this in order to trigger the rerendering when
    // the component is unmounted (i.e. the view is switched to grid or list)
    componentDidMount() {
        this.setState({ data: this.props.posts});
    }

    componentWillReceiveProps(nextProps) {
        this.setState(prevState => ({
            data: nextProps.posts
        }));
    }

    handleColumnSort(evt) {
        const { column, data, direction} = this.state;
        const target = evt.target.id;
        if(column !== target) {
            console.log('column not target: ', _.sortBy(data, [target]));
            this.setState({
                column: target,
                data: _.sortBy(data, [target]),
                direction: 'ascending'
            });
            return;
        }
        
        this.setState({
            data: data.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending'
        });
    }

    // TODO: Currently the posts being fed in via the subscribe method
    // are coming in piecemeal, which impacts the ability to enable proper
    // sorting of the columns
    // Perhaps implement a fix via redux?
    // Seems to be a common issue...https://github.com/redux-saga/redux-saga/issues/51
    render() {
        const { column, data, direction } = this.state;
        const posts = data;
        //console.log('posts: ', posts);
        return (
            <Table sortable celled fixed>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell 
                            id="title"
                            sorted={column === 'title' ? direction : null}
                            onClick={this.handleColumnSort}
                        >
                            Title
                        </Table.HeaderCell>
                        <Table.HeaderCell 
                            id="content"
                            sorted={column === 'content' ? direction : null}
                            onClick={this.handleColumnSort}
                        >
                            Description
                        </Table.HeaderCell>
                        <Table.HeaderCell
                            id="postDate"
                            sorted={column === 'postDate' ? direction : null}
                            onClick={this.handleColumnSort}
                        >
                            Date
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        posts.map(post => {
                            return (
                                <Table.Row key={post.id}>
                                    <Table.Cell>
                                        <Link to={{ pathname: `/post/${post.id}`, state: post }} >
                                            {post.title}
                                        </Link>
                                    </Table.Cell>
                                    <Table.Cell>{post.content}</Table.Cell>
                                    <Table.Cell>{post.postDate}</Table.Cell>
                                </Table.Row>
                            );
                        })
                    }
                </Table.Body>
            </Table>
        );
    }
}

PostSortableTable.propTypes = {
    posts : PropTypes.array
};


export default PostSortableTable;