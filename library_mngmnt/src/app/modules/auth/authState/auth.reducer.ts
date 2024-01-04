import { createReducer, on } from '@ngrx/store';
import { userData } from 'src/app/models/user';
import {
  loginRequested,
  loginSuccess,
  logout,
  signUpRequested,
  signUpSuccess,
} from './auth.action';
const initialState: userData = {
  token: '',
  user: {
    _id: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    role: '',
    isLoading: false,
    error: '',
  },
};

export const authReducer = createReducer(
  initialState,
  on(signUpRequested, (state, action) => ({ ...state, isLoading: true })),
  on(signUpSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    token: action.token,
    user: action.user,
  })),
  on(loginRequested, (state, action) => ({ ...state, isLoading: true })),

  on(loginSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      token: action.token,
      user: action.user,
    };
  }),

  on(logout, (state, action) => ({...state, isLoading:true, token:''})),
);
