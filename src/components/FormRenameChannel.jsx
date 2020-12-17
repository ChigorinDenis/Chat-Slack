import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Form, FormGroup, FormControl } from 'react-bootstrap';
import i18next from 'i18next';
import axios from 'axios';
import routes from '../routes';
import { closeModal } from '../reducers/modalsReducer';

const generateOnSubmit = (dispatch, id) => async (values) => {
  const { channelPath } = routes;
  const { name } = values;
  const pathChannels = channelPath(id);
  await axios.patch(pathChannels, { data: { attributes: { name } } });
  dispatch(closeModal());
};

function FormRenameChannel() {
  const dispatch = useDispatch();
  const modals = useSelector((state) => state.modals);
  const { data } = modals;
  const { name } = data;
  const formik = useFormik({
    initialValues: { name },
    onSubmit: generateOnSubmit(dispatch, data.id),
  });
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <Form onSubmit={formik.handleSubmit}>
      <FormGroup>
        <FormControl
          name='name'
          ref={inputRef}
          onChange={formik.handleChange}
          value={formik.values.name}
          required
        />
      </FormGroup>
      <div
        className='d-flex justify-content-end'
      >
        <button
          type='button'
          className='mr-2 btn btn-secondary'
        >
          {i18next.t('buttons.type.cancel')}
        </button>
        <button
          type='submit'
          className='btn btn-primary'
        >
          {i18next.t('buttons.type.submit')}
        </button>
      </div>
    </Form>
  );
}

export default FormRenameChannel;
