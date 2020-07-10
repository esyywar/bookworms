import {
	GET_POST,
	GET_POSTS,
	CLEAR_POST,
	UPDATE_LIKES,
	ADD_POST,
	DELETE_POST,
	ADD_COMMENT,
	DELETE_COMMENT,
	POST_ERROR,
} from '../actions/types'

const initialState = {
	post: null,
	posts: [],
	loading: true,
	error: {},
}

export const post = (state = initialState, action) => {
	switch (action.type) {
		case GET_POST:
			return {
				...state,
				post: action.payload,
				loading: false,
			}
		case GET_POSTS:
			return {
				posts: action.payload.reverse(),
				loading: false,
			}
		case CLEAR_POST:
			return {
				post: null,
				posts: [],
				loading: true,
				error: {},
			}
		case UPDATE_LIKES:
			return {
				...state,
				posts: state.posts.map((post) =>
					post._id === action.payload.postId ? { ...post, likes: action.payload.likes } : post
				),
				loading: false,
			}
		case ADD_POST:
			return {
				...state,
				post: action.payload,
				posts: [action.payload, ...state.posts],
				loading: false,
			}
		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter((post) => post._id !== action.payload),
				loading: false,
			}
		case ADD_COMMENT:
			return {
				...state,
				post: { ...state.post, comments: action.payload },
			}
		case DELETE_COMMENT:
			return {
				...state,
				post: {
					...state.post,
					comments: state.post.comments.filter((comment) => comment._id !== action.payload),
				},
			}
		case POST_ERROR:
			return {
				post: null,
				posts: [],
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}
