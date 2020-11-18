import { Action } from 'redux'
import { PURGE } from 'redux-persist'

//Represents a User structure that will be part of the app state
export interface UserInterface {
    _id: string | null,
    email: string | null,
    password: string | null,
    token: string | null,

    role: string | null,
    name: string | null,
    gender: string | null,
    phoneNumber: string | null,
    patients: [string] | null,
    imageUrl: string | null,

}

//The interface that exports the state of the UserReducer as UserReducer
//  so that it can be used elsewhere
export interface UserReducer {
    UserReducer: UserStateInterface
}

//Interface for the state used by this reducer (required by TS)
export interface UserStateInterface {
    user: UserInterface | null,
    progress: number,
    isLogging: boolean,
    isUpdating: boolean,
    isFetching: boolean
};

// Action Types
export const USER_LOGIN = "USER_LOGIN"
export const USER_LOGIN_COMPLETE = "USER_LOGIN_COMPLETE"
export const USER_LOGIN_FAILED = "USER_LOGIN_FAILED"
export const USER_LOGOUT = "USER_LOGOUT"
export const ADD_PROGRESS = "ADD_PROGRESS"
export const RESET_PROGRESS = "RESET_PROGRESS"

// Interface for the actions above (required by TS)
interface LoginAction extends Action {
    payload: UserInterface
}


// Implementing the userStateInterface, setting the initial state
const userInitState = {
    user: null,
    progress: 0,
    isLogging: false,
    isUpdating: false,
    isFetching: false
} as UserStateInterface

export function UserReducer(state = userInitState, action: Action | LoginAction) {

    switch (action.type) {

        case USER_LOGIN:
            return {
                ...state,
                isLogging: true
            };


        case USER_LOGIN_COMPLETE:
            return {
                ...state,
                isLogging: false,
                user: {
                    ...state.user,
                    _id: (action as LoginAction).payload._id,
                    email: (action as LoginAction).payload.email,
                    password: (action as LoginAction).payload.password,
                    token: (action as LoginAction).payload.token,
                    role: (action as LoginAction).payload.role,
                    name: (action as LoginAction).payload.name,
                    gender: (action as LoginAction).payload.gender,
                    phoneNumber: (action as LoginAction).payload.phoneNumber,
                    patients: (action as LoginAction).payload.patients,
                    imageUrl: "default_user.png"
                }
            };

        case USER_LOGIN_FAILED:
            return {
                ...state,
                isLogging: false
            };


        case USER_LOGOUT:
            return {
                ...state,
                user: null
            };

        case ADD_PROGRESS:
            return {
                ...state,
                progress: state.progress + 1
            };

        case RESET_PROGRESS:
            return {
                ...state,
                progress: 0
            };


        case PURGE:
            return userInitState;

        default:
            return state
    }

}

export default UserReducer;