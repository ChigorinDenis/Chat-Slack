import React from 'react';
import { useDispatch, connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { closeModal } from '../reducers/modalsReducer';
import FromRemoveChannel from '../forms/FormRemoveChannel';

const mapStateToProps = (state) => {
  const props = {
    modals: state.modals,
  };
  return props;
};

function ModalRemove(props) {
  const dispatch = useDispatch();
  const { modals } = props;
  const { isOpen, modalName } = modals;

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
        <FromRemoveChannel />
      </Modal.Body>
    </Modal>
  );
}

export default connect(mapStateToProps)(ModalRemove);
