import React from 'react';
import Channels from './components/Channels.jsx';
import MessageBox from './components/MessageBox.jsx';
import ModalAdd from './modals/ModalAdd.jsx';
import ModalRename from './modals/ModalRename.jsx';
import ModalRemove from './modals/ModalRemove.jsx';

function App() {
  return (
    <div
      className='row h-100 pb-3'
    >
      <Channels />
      <MessageBox />
      <ModalAdd />
      <ModalRename />
      <ModalRemove />
    </div>
  );
}

export default App;
