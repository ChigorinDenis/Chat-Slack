import { addMessage, removeMessages } from './reducers/messageReducer';
import {
  addChannel,
  renameChannel,
  removeChannel,
} from './reducers/channelReducer';

function initializeSokets(store, socket) {
  socket.on('connect', () => {
    console.log('connected');
  });

  socket.on('newMessage', ({ data }) => {
    const { attributes } = data;
    store.dispatch(addMessage(attributes));
  });

  socket.on('newChannel', ({ data }) => {
    const { attributes } = data;
    store.dispatch(addChannel(attributes));
  });

  socket.on('renameChannel', ({ data }) => {
    const { attributes } = data;
    store.dispatch(renameChannel(attributes));
  });

  socket.on('removeChannel', ({ data }) => {
    store.dispatch(removeChannel(data));
    store.dispatch(removeMessages(data));
  });
}

export default initializeSokets;
