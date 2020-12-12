import React, { useEffect, useRef } from 'react';
import { useDispatch, connect } from 'react-redux';
import { Form, FormGroup } from 'react-bootstrap';
import axios from 'axios';
import routes from '../routes';
import { closeModal } from '../reducers/modalsReducer';

const mapStateToProps = (state) => {
  const props = {
    modals: state.modals,
  };
  return props;
};

const handleSubmit = (dispatch, id) => async (event) => {
  event.preventDefault();
  const { channelPath } = routes;
  const pathChannels = channelPath(id);
  await axios.delete(pathChannels);
  dispatch(closeModal());
};

function FormRemoveChannel(props) {
  const dispatch = useDispatch();
  const { modals } = props;
  const { data } = modals;
  const { id } = data;
  const cancelRef = useRef();
  useEffect(() => {
    cancelRef.current.focus();
  }, []);
  return (
    <>
      <p>Remove this channel with all messages?</p>
      <Form onSubmit={handleSubmit(dispatch, id)}>
        <FormGroup>
          <button
            type='button'
            className='mr-2 btn btn-secondary'
            ref={cancelRef}
          >
            Cancel
          </button>
          <input
            className='btn btn-danger'
            type='submit'
            value='Remove'
          />
        </FormGroup>
      </Form>
    </>
  );
}

export default connect(mapStateToProps)(FormRemoveChannel);
