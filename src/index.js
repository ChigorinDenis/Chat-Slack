// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';

// import faker from 'faker';
import gon from 'gon';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';

import ReactDOM from 'react-dom';
import React from 'react';
import Channels from './components/Channels.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

console.log('it works!');
console.log('gon', gon);
ReactDOM.render(
  <Channels channels={gon.channels} />,
  document.getElementById('chat'),
);
