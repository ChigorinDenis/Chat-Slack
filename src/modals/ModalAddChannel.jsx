import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import i18next from 'i18next';
import { Modal } from 'react-bootstrap';
import FormAdd from '../components/FormAddChannel';
import { closeModal } from '../reducers/modalsReducer';

function ModalAdd() {
  const dispatch = useDispatch();
  const modals = useSelector((state) => state.modals);
  const { isOpen, modalName } = modals;

  return (
    <Modal
      show={isOpen && modalName === 'addingChannel'}
      onHide={() => dispatch(closeModal())}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {i18next.t('modals.addingChannel.title')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormAdd />
      </Modal.Body>
    </Modal>
  );
}

export default ModalAdd;
