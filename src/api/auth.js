import api from './api.js';
import { getDispatch } from '../helper/ReduxDispatcher.js';
import { messageActions } from '../store/message-slice.js';
import { authActions } from '../store/authentication-slice.js';
import { isEmail, isNotEmpty, hasMinLength, isEqualToOtherValue } from '../helper/ValidationHelper.js';

export const logInAction = async (prevFormState, dispatch, formData) => {
    const email = formData.get('email');
    const logInPassword = formData.get('logInPassword');

    const errorSet = new Set();

    if (!isEmail(email)) {
        errorSet.add('email');
    }

    if (errorSet.size !== 0) {
        return {
            error: errorSet,
            enteredValue: {
                email,
                logInPassword
            },
            success: false
        };
    }

    try {
        const response = await api.post('/api/auth/login', {
            email: email,
            password: logInPassword
        });

        if (response.status !== 200) {
            dispatch(messageActions.showMessage({ title: 'Log In', message: 'Log In failed, please try again', type: 'error' }));
            return { error: new Set(), success: false };
        }

        dispatch(messageActions.showMessage({ title: 'Log In', message: 'Log In successful', type: 'success' }));

        //Setting up the access token.
        dispatch(authActions.setCredentials({ accessToken: response.data.accessToken }));

        return { error: new Set(), success: true };
    } catch (error) {
        dispatch(messageActions.showMessage({ title: 'Log In', message: 'Log In process failed, ' + error.message, type: 'error' }));
        return { error: new Set(), success: false };
    }
}

export const signUpAction = async (prevFormState, dispatch, formData) => {
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('signUpEmail');
    const signUpPassword = formData.get('signUpPassword');
    const signUpConfirmPassword = formData.get('signUpConfirmPassword');
    const terms = formData.get('terms');

    const errorSet = new Set();

    if (!isNotEmpty(firstName)) {
        errorSet.add('firstName');
    }

    if (!isNotEmpty(lastName)) {
        errorSet.add('lastName');
    }

    if (!isEmail(email)) {
        errorSet.add('email');
    }

    if (!isNotEmpty(signUpPassword) || !hasMinLength(signUpPassword, 8)) {
        errorSet.add('password');
    }

    if (!isEqualToOtherValue(signUpPassword, signUpConfirmPassword)) {
        errorSet.add('confirmPassword');
    }

    if (!terms) {
        errorSet.add('terms');
    }

    if (errorSet.size !== 0) {
        return {
            error: errorSet,
            enteredValue: {
                firstName,
                lastName,
                email,
                signUpPassword,
                signUpConfirmPassword,
                terms
            },
            success: false
        };
    }

    try {

        const response = await api.post('/api/auth/signup', {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: signUpPassword
        });

        if (response.status !== 200) {
            dispatch(messageActions.showMessage({ title: 'Sign Up', message: 'Sign up failed, please try again', type: 'error' }));
            return { error: new Set(), success: false };
        }

        dispatch(messageActions.showMessage({ title: 'Sign Up', message: 'Sign up successful', type: 'success' }));

        //Setting up the access token.
        dispatch(authActions.setCredentials({ accessToken: response.data.accessToken }));

        return { error: new Set(), success: true };

    } catch (error) {
        dispatch(messageActions.showMessage({ title: 'Sign Up', message: 'Sign up process failed, ' + error.message, type: 'error' }));
        return { error: new Set(), success: false };
    }
}

export const logOutAction = async (dispatch) => {
    try {
        const response = await api.post('/api/auth/logout', {}, { withCredentials: true });

        if (response.status !== 200) {
            dispatch(messageActions.showMessage({ title: 'Log Out', message: 'Log Out failed, please try again', type: 'error' }));
            return
        }

        dispatch(messageActions.showMessage({ title: 'Log Out', message: 'Log Out successful', type: 'success' }));
        dispatch(authActions.logout());
    } catch (error) {
        dispatch(messageActions.showMessage({ title: 'Log Out', message: 'Log out process failed, ' + error.message, type: 'error' }));
    }
}

export const logOutActionOnRefreshTokenFailure = async (dispatch) => {
    try {
        const dispatch = getDispatch();

        const response = await api.post('/api/auth/logout', {}, { withCredentials: true });

        if (response.status !== 200) {
            dispatch(messageActions.showMessage({ title: 'Log Out', message: 'Some error occured, please log in again', type: 'error' }));
            return
        }

        dispatch(messageActions.showMessage({ title: 'Log Out', message: 'Your session has been expired, please Log In again.', type: 'success' }));
        dispatch(authActions.logout());
    } catch (error) {
        dispatch(messageActions.showMessage({ title: 'Log Out', message: 'Some error Occured, ' + error.message, type: 'error' }));
    }
}

