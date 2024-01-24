import { Action, createReducer, on } from "@ngrx/store"
import * as PostsActions from '../actions/posts.actions';
import { AppState } from "../../app.state";


export const initialState: AppState = {
  posts: []
}

export const postsReducer = createReducer(
  initialState,
  on(PostsActions.fetchPost, (state) => {
    return {
      ...state,
    }
  }),
  on(PostsActions.fetchPostSuccess, (state, {phases}) => {
    return {
      ...state,
      phases,
    }
  })
);

export function postsReducers(state: AppState | undefined, actions: Action) {
  return postsReducer(state, actions);
}
