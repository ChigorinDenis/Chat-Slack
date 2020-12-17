import gon from 'gon';
import Rollbar from 'rollbar';
import i18next from 'i18next';
import { io } from 'socket.io-client';
import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import channelReducer, { addChannel } from './reducers/channelReducer';
import messageReducer, { addMessage } from './reducers/messageReducer';
import uiReducer from './reducers/uiReducer';
import modalsReducer from './reducers/modalsReducer';
import UserContext from './context';
import initializeSockets from './sockets';
import setCookieUserName from './userName.js';
import App from './App.jsx';
import en from './locales/en';

export default () => {
  if (process.env.NODE_ENV !== 'production') {
    localStorage.debug = 'chat:*';
  }

  const rollbar = new Rollbar();

  rollbar.configure({
    accessToken: '51be6d6389f44b9495c894f0788efab4',
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: 'production',
    },
  });

  i18next.init({
    lng: 'en',
    debug: true,
    resources: {
      en,
    },
    function(err) {
      if (err) {
        console.log('something went wrong', err);
      }
    },
  });

  const rootReducer = combineReducers({
    channels: channelReducer,
    messages: messageReducer,
    ui: uiReducer({ currentChannelId: gon.currentChannelId }),
    modals: modalsReducer,
  });

  const store = configureStore({
    reducer: rootReducer,
  });

  gon.channels.map((channel) => (store.dispatch(addChannel(channel))));
  gon.messages.map((message) => (store.dispatch(addMessage(message))));

  const socket = io();

  initializeSockets(store, socket);
  console.log('it works!');
  const userName = setCookieUserName();

  ReactDOM.render(
    <UserContext.Provider
      value={userName}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </UserContext.Provider>,
    document.getElementById('chat'),
  );
};
