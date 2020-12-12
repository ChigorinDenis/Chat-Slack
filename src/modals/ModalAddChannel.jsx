import React from 'react';
import { useDispatch, connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import FormAdd from '../forms/FormAddChannel';
import { closeModal } from '../reducers/modalsReducer';

const mapStateToProps = (state) => {
  const props = {
    modals: state.modals,
  };
  return props;
};

function ModalAdd(props) {
  const dispatch = useDispatch();
  const { modals } = props;
  const { isOpen, modalName } = modals;

  return (
    <Modal
      show={isOpen && modalName === 'addingChannel'}
      onHide={() => dispatch(closeModal())}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Add Channel
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormAdd />
      </Modal.Body>
    </Modal>
  );
}

export default connect(mapStateToProps)(ModalAdd);
