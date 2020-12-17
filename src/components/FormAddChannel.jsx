import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import i18next from 'i18next';
import { Form, FormGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import routes from '../routes';
import { closeModal } from '../reducers/modalsReducer';

const generateOnSubmit = (dispatch) => async (values) => {
  const { channelsPath } = routes;
  const { name } = values;
  const pathChannels = channelsPath();
  await axios.post(pathChannels, { data: { attributes: { name } } });
  dispatch(closeModal());
};

function FormAddChannel() {
  const dispatch = useDispatch();
  const formik = useFormik({
    onSubmit: generateOnSubmit(dispatch),
    initialValues: { name: '' },
  });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <FormGroup>
        <FormControl
          data-testid='input-body'
          name='name'
          ref={inputRef}
          onChange={formik.handleChange}
          value={formik.values.name}
          required
          autoFocus
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

export default FormAddChannel;
