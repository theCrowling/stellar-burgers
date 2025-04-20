import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

type TConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    setBun(state, action: PayloadAction<TIngredient>) {
      state.bun = action.payload;
    },
    addIngredient(state, action: PayloadAction<TIngredient>) {
      const ingredientWithId = {
        ...action.payload,
        id: uuidv4()
      };
      state.ingredients.push(ingredientWithId);
    },
    removeIngredient(state, action: PayloadAction<string>) {
      state.ingredients = state.ingredients.filter(
        (i) => i.id !== action.payload
      );
    },
    moveIngredientUp(state, action: PayloadAction<string>) {
      const index = state.ingredients.findIndex((i) => i.id === action.payload);
      const ingredient = state.ingredients[index];
      state.ingredients.splice(index, 1);
      state.ingredients.splice(index - 1, 0, ingredient);
    },
    moveIngredientDown(state, action: PayloadAction<string>) {
      const index = state.ingredients.findIndex((i) => i.id === action.payload);
      const ingredient = state.ingredients[index];
      state.ingredients.splice(index, 1);
      state.ingredients.splice(index + 1, 0, ingredient);
    },
    clearConstructor(state) {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const {
  setBun,
  addIngredient,
  removeIngredient,
  moveIngredientDown,
  moveIngredientUp,
  clearConstructor
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
