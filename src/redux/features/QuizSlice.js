import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  responses: {
    DisruptiveInnovator: 0,
    RealWorlders: 0,
    ImplementationSpecialists: 0,
  },
};

const quizSlice = createSlice({
  name: "quizCategories",
  initialState,
  reducers: {
    incrementCategory: (state, action) => {
      const { category } = action.payload;
      state.responses[category] += 1;
    },
    decrementCategory: (state, action) => {
      const { category } = action.payload;
      if (state.responses[category] > 0) {
        state.responses[category] -= 1; // Decrement only if the value is greater than 0
      }
    },
    resetQuiz: (state) => {
      state.responses = initialState.responses;
    },
  },
});

export const { incrementCategory, decrementCategory, resetQuiz } =
  quizSlice.actions;
export default quizSlice.reducer;
