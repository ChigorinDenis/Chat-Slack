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
import Channels from './components/Channels.jsx';
import MessageBox from './components/MessageBox.jsx';
import channelReducer from './reducers/channelReducer';
import messageReducer from './reducers/messageReducer';
import uiReducer from './reducers/uiReducer';
// import { addMessage } from './reducers/messageReducer';
// import { addChannel} from './reducers/channelReducer';
import UserContext from './context';
import auth from './auth.js';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}
const rootReducer = combineReducers({
  channels: channelReducer(gon.channels),
  messages: messageReducer(gon.messages),
  ui: uiReducer({ currentChannelId: gon.currentChannelId }),
});

const store = configureStore({
  reducer: rootReducer,
});

const socket = io();

socket.on('connect', () => {
  console.log('connected');
  // console.log(socket.id);
});


socket.on('newMessage', ({ data }) => {
  const { attributes } = data;
  store.dispatch({ type: 'ADD_MESSAGE', payload: attributes });
});

console.log('it works!');
const userName = auth();
console.log(userName);
const vdom = (
  <div
    className='row h-100 pb-3'
  >
    <Channels />
    <MessageBox />
  </div>
);

ReactDOM.render(
  <UserContext.Provider
    value={userName}
  >
    <Provider store={store}>
      {vdom}
    </Provider>
  </UserContext.Provider>,
  document.getElementById('chat'),
);
