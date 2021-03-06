import {
    GET_POSTS,
    POST_ERROR
} from "../actions/types";

const intialState = {
    posts: [],
    post: null,
    loading: true,
    error: {}
}

export default function post(state = intialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false,
            };

        case POST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            };

        default:
            return state;
    }
}