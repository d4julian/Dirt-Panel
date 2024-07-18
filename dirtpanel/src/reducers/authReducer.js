export const initStateAuth = {
    authenticated: false,
    userData: {
        username: '',
        profilePicture: ''
    }
};

const authReducer = (state = initStateAuth, action) => {
    switch (action.type) {
        case 'AUTH_AUTHENTICATE':
            return action.authState;
        case 'AUTH_LOGOUT':
            return initStateAuth;
        default:
            return state;
    }
};

export default authReducer;