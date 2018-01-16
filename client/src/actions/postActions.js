import * as types from './actionTypes';

export function loadPostsSuccess(posts) {
    return { type: types.LOAD_POSTS_SUCCESS, posts};
}

//
export function loadPosts() {
    return function(dispatch) {
        
    };
}