import { getUserApi, loginUserApi, logoutApi, registerUserApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { setCookie } from '../../utils/cookie';

interface UserState {
  user: TUser | null;
  isLoading: boolean;
  error: string | unknown;
}

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: null
};

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const response = await getUserApi();
  console.log(response);
  return response;
});

export const checkAuth = createAsyncThunk(
  'user/checkAuth',
  async (_, thunkAPI) => {
    try {
      const res = await getUserApi();
      return res.user;
    } catch (err) {
      return thunkAPI.rejectWithValue('Не авторизован');
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (
    {
      email,
      password,
      name
    }: { email: string; password: string; name: string },
    thunkAPI
  ) => {
    try {
      const res = await registerUserApi({ email, password, name });
      setCookie('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      return res.user;
    } catch (err) {
      return thunkAPI.rejectWithValue('Ошибка регистрации');
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const res = await loginUserApi({ email, password });
      localStorage.setItem('refreshToken', res.refreshToken);
      setCookie('accessToken', res.accessToken);
      return res.user;
    } catch (err) {
      return thunkAPI.rejectWithValue('Ошибка авторизации');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, thunkAPI) => {
    try {
      await logoutApi();
      localStorage.removeItem('refreshToken');
      document.cookie = 'accessToken=; Max-Age=0';
    } catch (err) {
      return thunkAPI.rejectWithValue('Ошибка при выходе');
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
    getUser(state, action) {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  }
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
