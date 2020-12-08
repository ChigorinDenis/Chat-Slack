// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';

// import faker from 'faker';
import gon from 'gon';
// import Cookies from 'js-cookie';
import { io } from 'socket.io-client';
import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
// import { useDispatch } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import Channels from './components/Channels.jsx';
// import MessageBox from './components/MessageBox.jsx';
// import ModalAdd from './modals/ModalAdd.jsx';
// import ModalRename from './modals/ModalRename.jsx';
// import ModalRemove from './modals/ModalRemove.jsx';
import channelReducer from './reducers/channelReducer';
import messageReducer from './reducers/messageReducer';
import uiReducer from './reducers/uiReducer';
import modalsReducer from './reducers/modalsReducer';
// import { addMessage } from './reducers/messageReducer';
// import { addChannel} from './reducers/channelReducer';
import UserContext from './context';
import initializeSockets from './sockets';
import auth from './auth.js';
import App from './App.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}
const rootReducer = combineReducers({
  channels: channelReducer(gon.channels),
  messages: messageReducer(gon.messages),
  ui: uiReducer({ currentChannelId: gon.currentChannelId }),
  modals: modalsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

const socket = io();

initializeSockets(store, socket);
console.log('it works!');
const userName = auth();

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
