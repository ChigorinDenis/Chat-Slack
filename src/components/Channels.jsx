import React from 'react';
import { useDispatch, connect } from 'react-redux';
import classNames from 'classnames';
import { toggleChannel } from '../reducers/uiReducer';

const mapStateToProps = (state) => {
  const props = {
    channels: state.channels,
    ui: state.ui,
  };
  return props;
};

function Channels(props) {
  const { channels, ui } = props;
  console.log('channel', channels);
  const { currentChannelId } = ui;
  const dispatch = useDispatch();
  return (
    <div
      className='col-3'
    >
      <div
        className='d-flex mb-2'
      >
        <span>
          Channels
        </span>
        <button
          className='ml-auto p-0 btn btn-link'
          type='button'
        >
          +
        </button>
      </div>
      <ul
        className='nav flex-column nav-pills nav-fill'
      >
        {channels.map((channel) => {
          const { id, name } = channel;
          const activeChannel = id === currentChannelId;
          const btnClasses = classNames({
            'nav-link btn-block mb-2 text-left btn': true,
            'btn-primary': activeChannel,
            'btn-lght': !activeChannel,
          });
          return (
            <li
              key={id}
              className='nav-item'
            >
              <button
                type='button'
                className={btnClasses}
                onClick={() => dispatch(toggleChannel(id))}
              >
                {name}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default connect(mapStateToProps)(Channels);
