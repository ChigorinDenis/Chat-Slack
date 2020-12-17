import React from 'react';
import { useSelector } from 'react-redux';
import FormMessage from './FormMessage.jsx';

function MessageBox() {
  const messages = useSelector((state) => state.messages);
  const { currentChannelId } = useSelector((state) => state.ui);
  const curentChannelMessages = messages
    .filter((message) => message.channelId === currentChannelId);
  return (
    <div
      className='col h-100 border-left'
    >
      <div
        className='d-flex flex-column h-100'
      >
        {curentChannelMessages.map((item) => {
          const {
            id,
            message,
            userName,
          } = item;
          return (
            <span
              key={id}
            >
              <b>
                {userName}
                :
              </b>
              {message}
            </span>
          );
        })}
        <FormMessage />
      </div>
    </div>
  );
}

export default MessageBox;
