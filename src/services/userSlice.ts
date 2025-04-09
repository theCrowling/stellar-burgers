import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  user: { name: string; email: string; role?: string } | null;
}

const initialState: UserState = {
  user: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    }
  }
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
