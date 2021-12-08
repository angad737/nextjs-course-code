import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.push(action.payload);
    },
    loadComments: (state, action) => {
      state[action.payload.eventId] = action.payload.data;
    },
  },
});

export const { addComment, loadComments } = commentsSlice.actions;
export default commentsSlice.reducer;
