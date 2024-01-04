import {createAction, props} from '@ngrx/store'
import { user, userData } from 'src/app/models/user'


export const signUpRequested = createAction(
    '[Auth] signUpRequested',
    props<user>()
)


export const signUpSuccess = createAction(
    '[Auth] signUpSuccess',
    props<userData>()
)

export const loginRequested = createAction(
    '[Auth] loginRequested',
    props<{email:string; password:string}>()
)

export const loginSuccess = createAction(
    '[Auth] loginSuccess',
    props<userData>()
)

export const logout = createAction(
    'Auth logoutRequested',
)