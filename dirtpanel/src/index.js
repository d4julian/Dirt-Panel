import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import initSubscriber from 'redux-subscriber';
import expireReducer from 'redux-persist-expire';
import { PersistGate } from 'redux-persist/lib/integration/react';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';
import { initStateAuth } from './reducers/authReducer';

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel1,
    whitelist: ['auth'],
    transforms: [
        expireReducer('auth', {
            expireSeconds: 86400,
            autoExpire: true,
            expiredState: initStateAuth
        }),
    ]
};

const pReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(pReducer, applyMiddleware(thunk));
const persistor = persistStore(store);
// eslint-disable-next-line no-unused-vars
const subscribe = initSubscriber(store);

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={<React.Fragment />} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById('page-container')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
