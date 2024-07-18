export const initNavState = {
    serversDirty: false
};

const navReducer = (state = initNavState, action) => {
    switch (action.type) {
        case 'NAV_SETSERVERSDIRTY':
            return {
                ...state,
                serversDirty: action.value
            };
        default:
            return state;
    }
};

export default navReducer;