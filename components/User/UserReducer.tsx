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

export interface SignUpUser {
    email: string | null,
    password: string | null,
    name: string | null,
    role: string | null,
    gender: string | null,
    birthDate: Date | null,
    address: string | null,
    identificationNum: number | null,
    fiscalNumber: number | null,
    phoneNumber: number | null,
}

//The interface that exports the state of the UserReducer as UserReducer
//  so that it can be used elsewhere
export interface UserReducer {
    UserReducer: UserStateInterface
}

//Interface for the state used by this reducer (required by TS)
export interface UserStateInterface {
    user: UserInterface | null,
    signup: SignUpUser | null,
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
export const SIGN_UP_PART1 = "SIGN_UP_PART1"
export const SIGN_UP_PART2 = "SIGN_UP_PART2"
export const SIGN_UP_SUBMIT = "SIGN_UP_SUBMIT"
export const SIGN_UP_FAIL = "SIGN_UP_FAIL"
export const SIGN_UP_COMPLETE = "SIGN_UP_COMPLETE"


// Interface for the actions above (required by TS)
interface LoginAction extends Action {
    payload: UserInterface
}

interface SignupAction extends Action {
    payload: SignUpUser
}

// Implementing the userStateInterface, setting the initial state
const userInitState = {
    user: null,
    signup: null,
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

        case SIGN_UP_PART1:
            return {
                ...state,
                signup: {
                    ...state.signup,

                    role: "PATIENT",
                    name: (action as SignupAction).payload.name,
                    email: (action as SignupAction).payload.email,
                    password: (action as SignupAction).payload.password,
                    birthDate: (action as SignupAction).payload.birthDate,
                    gender: (action as SignupAction).payload.gender,

                }
            };

        case SIGN_UP_PART2:
            return {
                ...state,
                signup: {
                    ...state.signup,

                    phoneNumber: (action as SignupAction).payload.phoneNumber,
                    address: (action as SignupAction).payload.address,
                    identificationNum: (action as SignupAction).payload.identificationNum,
                    fiscalNumber: (action as SignupAction).payload.fiscalNumber,

                }
            };

        case SIGN_UP_SUBMIT:
            return {
                ...state,
                isUpdating: true
            };


        case SIGN_UP_FAIL:
            return {
                ...state,
                isUpdating: false
            };

        case SIGN_UP_COMPLETE:
            return {
                ...state,
                isUpdating: false
            };

        case PURGE:
            return userInitState;

        default:
            return state
    }

}

export default UserReducer;