import React from 'react';

export default function Channels(props) {
  const { channels } = props;
  return (
    <ul
      className='nav flex-column nav-pills nav-fill'
    >
      {channels.map((channel) => {
        const { id, name } = channel;
        return (
          <li
            key={id}
            className='nav-item'
          >
            <button
              type='button'
              className='nav-link btn-block mb-2 text-left btn btn-primary'
            >
              {name}
            </button>
          </li>);
      })}
    </ul>);
}
