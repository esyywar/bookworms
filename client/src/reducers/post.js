import { GET_POST, GET_POSTS, CLEAR_POST, UPDATE_LIKES, POST_ERROR } from '../actions/types'

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
				post: action.payload,
				loading: false,
			}
		case GET_POSTS:
			return {
				posts: action.payload,
				loading: false,
			}
		case CLEAR_POST:
			return {
				post: null,
				posts: [],
				loading: false,
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
