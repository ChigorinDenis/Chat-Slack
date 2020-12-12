import React from 'react';
import { useDispatch, connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { closeModal } from '../reducers/modalsReducer';
import FormRenameChannel from '../forms/FormRenameChannel';

const mapStateToProps = (state) => {
  const props = {
    modals: state.modals,
  };
  return props;
};

function ModalRename(props) {
  const dispatch = useDispatch();
  const { modals } = props;
  const { isOpen, modalName } = modals;
  return (
    <Modal
      show={isOpen && modalName === 'renamingModal'}
      onHide={() => dispatch(closeModal())}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Rename Channel
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormRenameChannel />
      </Modal.Body>
    </Modal>
  );
}

export default connect(mapStateToProps)(ModalRename);
