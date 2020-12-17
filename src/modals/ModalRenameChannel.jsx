import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import i18next from 'i18next';
import { closeModal } from '../reducers/modalsReducer';
import FormRenameChannel from '../components/FormRenameChannel';

function ModalRename() {
  const dispatch = useDispatch();
  const modals = useSelector((state) => state.modals);
  const { isOpen, modalName } = modals;
  return (
    <Modal
      show={isOpen && modalName === 'renamingModal'}
      onHide={() => dispatch(closeModal())}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {i18next.t('modals.renamingChannel.title')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormRenameChannel />
      </Modal.Body>
    </Modal>
  );
}

export default ModalRename;
