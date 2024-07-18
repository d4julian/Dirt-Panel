export const serversDirty = (dirty) => {
    return (dispatch, getState) => {
        dispatch({ type: 'NAV_SETSERVERSDIRTY', value: dirty});
    };
};