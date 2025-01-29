import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  responses: {
    ImplementationSpecialists: 0,
    RealWorlders: 0,
    DisruptiveInnovator: 0,
  },
};

const quizSlice = createSlice({
  name: "quizCategories",
  initialState,
  reducers: {
    incrementCategory: (state, action) => {
      const { category } = action.payload;
      const categories = Array.isArray(category) ? category : [category];

      categories.forEach((cat) => {
        const trimmedCat = cat.trim(); // Trim spaces if any
        if (state.responses[trimmedCat] !== undefined) {
          state.responses[trimmedCat] += 1;
        }
      });
    },
    decrementCategory: (state, action) => {
      const { category } = action.payload;
      const categories = Array.isArray(category) ? category : [category];

      categories.forEach((cat) => {
        const trimmedCat = cat.trim();
        if (
          state.responses[trimmedCat] !== undefined &&
          state.responses[trimmedCat] > 0
        ) {
          state.responses[trimmedCat] -= 1;
        }
      });
    },
    resetQuiz: (state) => {
      state.responses = { ...initialState.responses };
    },
  },
});

export const { incrementCategory, decrementCategory, resetQuiz } =
  quizSlice.actions;
export default quizSlice.reducer;
