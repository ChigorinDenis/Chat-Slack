import React from 'react';
import { useDispatch, connect } from 'react-redux';
import {
  ButtonGroup,
  DropdownButton,
  Dropdown,
  Button,
} from 'react-bootstrap';
import classNames from 'classnames';
import { toggleChannel } from '../reducers/uiReducer';
import { openModal } from '../reducers/modalsReducer';

const mapStateToProps = (state) => {
  const props = {
    channels: state.channels,
    modals: state.modals,
    ui: state.ui,
  };
  return props;
};

const buildChannelButton = ({
  id,
  name,
  removable,
}, currentChannelId, dispatch) => {
  const btnColor = id === currentChannelId ? 'primary' : 'light';
  const btnDropdownClasses = classNames({
    'text-left  nav-link': true,
    [`btn-${btnColor}`]: true,
  });
  const btnClasses = classNames({
    [btnDropdownClasses]: true,
    'btn-block mb-2': true,
  });
  if (removable) {
    return (
      <ButtonGroup
        className='d-flex mb-2'
        onClick={() => dispatch(toggleChannel(id))}
      >
        <Button className={btnDropdownClasses}>{name}</Button>
        <DropdownButton as={ButtonGroup} title='' variant={btnColor}>
          <Dropdown.Item
            eventKey='1'
            onSelect={() => dispatch(openModal({ modalName: 'removingModal', data: { id, name } }))}
          >
            remove
          </Dropdown.Item>
          <Dropdown.Item
            eventKey='2'
            onSelect={() => dispatch(openModal({ modalName: 'renamingModal', data: { id, name } }))}
          >
            rename
          </Dropdown.Item>
        </DropdownButton>
      </ButtonGroup>
    );
  }
  return (
    <Button
      className={btnClasses}
      onClick={() => dispatch(toggleChannel(id))}
    >
      {name}
    </Button>
  );
};

function Channels(props) {
  const { channels, ui } = props;
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
          onClick={() => dispatch(openModal({ modalName: 'addingChannel' }))}
        >
          +
        </button>
      </div>
      <ul
        className='nav flex-column nav-pills nav-fill'
      >
        {channels.map((channel) => {
          const { id } = channel;
          return (
            <li
              key={id}
              className='nav-item'
            >
              {buildChannelButton(channel, currentChannelId, dispatch)}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default connect(mapStateToProps)(Channels);
