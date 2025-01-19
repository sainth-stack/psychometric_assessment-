import { configureStore } from "@reduxjs/toolkit";
import quizCategoriesReducer from "./features/QuizSlice";

const store = configureStore({
  reducer: {
    quizCategories: quizCategoriesReducer,
  },
});

export default store;
