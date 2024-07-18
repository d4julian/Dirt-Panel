import axios from 'axios';

export const authenticate = (code) => {
    return async (dispatch, getState) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}auth/authenticate`, {
                code: code
            });
            dispatch({ type: 'AUTH_AUTHENTICATE', authState: response.data });
        } catch (error) {
            dispatch({ type: 'AUTH_AUTHENTICATE', authState: error.response.data });
        }
    };
};

export const logout = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'AUTH_LOGOUT' });
    };
};