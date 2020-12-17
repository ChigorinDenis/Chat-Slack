import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, FormGroup } from 'react-bootstrap';
import i18next from 'i18next';
import axios from 'axios';
import routes from '../routes';
import { closeModal } from '../reducers/modalsReducer';

const handleSubmit = (dispatch, id) => async (event) => {
  event.preventDefault();
  const { channelPath } = routes;
  const pathChannels = channelPath(id);
  await axios.delete(pathChannels);
  dispatch(closeModal());
};

function FormRemoveChannel() {
  const dispatch = useDispatch();
  const modals = useSelector((state) => state.modals);
  const { data } = modals;
  const { id } = data;
  const cancelRef = useRef();
  useEffect(() => {
    cancelRef.current.focus();
  }, []);
  return (
    <>
      <p>{i18next.t('modals.removingChannel.textInfo')}</p>
      <Form onSubmit={handleSubmit(dispatch, id)}>
        <FormGroup>
          <button
            type='button'
            className='mr-2 btn btn-secondary'
            ref={cancelRef}
          >
            {i18next.t('buttons.type.cancel')}
          </button>
          <button
            className='btn btn-danger'
            type='submit'
          >
            {i18next.t('buttons.type.remove')}
          </button>
        </FormGroup>
      </Form>
    </>
  );
}

export default FormRemoveChannel;
