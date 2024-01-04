import { createSelector } from "@ngrx/store";

const userAuth = (state: any) => state.userAuthentication;

export const tokenSelector = createSelector(userAuth,(state)=> state?.token)
export const userDataSelector = createSelector(userAuth,(state) => state?.user)
export const idSelector = createSelector(userAuth,(state)=> state?.user?._id)

