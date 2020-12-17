import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import i18next from 'i18next';
import { closeModal } from '../reducers/modalsReducer';
import FromRemoveChannel from '../components/FormRemoveChannel';

function ModalRemove() {
  const dispatch = useDispatch();
  const modals = useSelector((state) => state.modals);
  const { isOpen, modalName } = modals;
  return (
    <Modal
      show={isOpen && modalName === 'removingModal'}
      onHide={() => dispatch(closeModal())}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {i18next.t('modals.removingChannel.title')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FromRemoveChannel />
      </Modal.Body>
    </Modal>
  );
}

export default ModalRemove;
