import React from 'react';
import { useDispatch, connect } from 'react-redux';
import { Modal, FormGroup } from 'react-bootstrap';
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
  console.log('id', id);
  const { channelPath } = routes;
  const pathChannels = channelPath(id);
  await axios.delete(pathChannels);
  dispatch(closeModal());
};

function ModalRemove(props) {
  const dispatch = useDispatch();
  const { modals } = props;
  const { isOpen, modalName, data } = modals;
  const { id } = data;

  return (
    <Modal
      show={isOpen && modalName === 'removingModal'}
      onHide={() => dispatch(closeModal())}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Remove Channel
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Remove this channel with all messages?</p>
        <form onSubmit={handleSubmit(dispatch, id)}>
          <FormGroup>
            <button
              type='button'
              className='mr-2 btn btn-secondary'
            >
              Cancel
            </button>
            <input
              className='btn btn-danger'
              type='submit'
              value='Remove'
            />
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default connect(mapStateToProps)(ModalRemove);
