import React from 'react';
import Channels from './components/Channels.jsx';
import MessageBox from './components/MessageBox.jsx';
import ModalAddChannel from './modals/ModalAddChannel.jsx';
import ModalRenameChannel from './modals/ModalRenameChannel.jsx';
import ModalRemoveChannel from './modals/ModalRemoveChannel.jsx';

function App() {
  return (
    <div
      className='row h-100 pb-3'
    >
      <Channels />
      <MessageBox />
      <ModalAddChannel />
      <ModalRenameChannel />
      <ModalRemoveChannel />
    </div>
  );
}

export default App;
