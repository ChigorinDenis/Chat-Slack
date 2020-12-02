import React from 'react';
import { connect } from 'react-redux';
import FormMessage from './FormMessage.jsx';

const mapStateToProps = (state) => {
  const props = {
    messages: state.messages,
    ui: state.ui,
  };
  return props;
};

function MessageBox(props) {
  const { messages, ui } = props;
  const { currentChannelId } = ui;
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

export default connect(mapStateToProps)(MessageBox);
