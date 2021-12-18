import { createReducer } from "@reduxjs/toolkit";

const initialState = { name: "", artists: [], searchHistory: [] };
const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("ADD_ARTIST", (state, action) => {
      state.artists.unshift(action.payload);
      return state;
    })
    .addCase("BULKADD_ARTIST", (state, action) => {
      state.artists.unshift(...action.payload);
      return state;
    })
    .addCase("REMOVE_ARTIST", (state, action) => {
      state.artists.splice(
        state.artists.findIndex((item) => item.idArtist === action.payload.idArtist),
        1,
      );
      return state;
    })
    .addCase("ADD_NAME", (state, action) => {
      state.name = action.payload;
      return state;
    })
    .addCase("ADD_SEARCH_HISTORY_ITEM", (state, action) => {
      if (state.searchHistory.length === 20) {
        state.searchHistory.pop();
        state.searchHistory.unshift(action.payload);
      } else {
        state.searchHistory.unshift(action.payload);
      }
      return state;
    });
});
export default userReducer;
