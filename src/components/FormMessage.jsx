import React, { useEffect, useRef, useContext } from 'react';
import i18next from 'i18next';
import { useFormik } from 'formik';
import { Form, FormGroup, FormControl } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from 'axios';
import classNames from 'classnames';

import routes from '../routes';
import UserContext from '../context.js';

const handleSumbit = (userName, currentChannelId) => async (values, {
  setErrors,
  setStatus,
  resetForm,
}) => {
  const { message } = values;
  const { channelMessagesPath } = routes;
  const pathMessage = channelMessagesPath(currentChannelId);
  try {
    await axios.post(pathMessage, { data: { attributes: { message, userName } } });
    setStatus({ success: true });
    resetForm();
  } catch (error) {
    setStatus({ success: false });
    setErrors({ submit: error.message });
  }
};

function FormMessage() {
  const userName = useContext(UserContext);
  const { currentChannelId } = useSelector((state) => state.ui);
  const inputEl = useRef();
  useEffect(() => {
    inputEl.current.focus();
  }, []);
  const formik = useFormik({
    initialValues: { message: '' },
    onSubmit: handleSumbit(userName, currentChannelId),
  });
  const inputClass = classNames({
    'mr-2 form-control': true,
    'is-invalid': formik.errors.submit,
  });
  return (
    <div
      className='mt-auto'
    >
      <Form onSubmit={formik.handleSubmit}>
        <FormGroup>
          <div
            className='input-group'
          >
            <FormControl
              type='text'
              name='message'
              ref={inputEl}
              onChange={formik.handleChange}
              className={inputClass}
              disabled={formik.isSubmitting}
              autoFocus
            />
            <button
              aria-label='submit'
              type='submit'
              className='btn btn-primary'
              disabled={formik.isSubmitting}
            >
              {i18next.t('buttons.type.submit')}
            </button>
            <div
              className='d-block invalid-feedback'
            >
              {formik.errors.submit}
              &nbsp;
            </div>
          </div>
        </FormGroup>
      </Form>
    </div>
  );
}

export default FormMessage;
