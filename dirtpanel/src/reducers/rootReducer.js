import { combineReducers } from 'redux';

import authReducer from './authReducer';
import navReducer from './navReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    nav: navReducer
});

export default rootReducer;