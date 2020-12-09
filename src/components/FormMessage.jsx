import React, { useEffect, useRef, useContext } from 'react';
import {
  Formik,
  Form,
  Field,
} from 'formik';
import { connect } from 'react-redux';
import axios from 'axios';
import classNames from 'classnames';

import routes from '../routes';
import UserContext from '../context.js';

const mapStateToProps = (state) => {
  const props = {
    ui: state.ui,
  };
  return props;
};

function FormMessage(props) {
  const userName = useContext(UserContext);
  const { ui: { currentChannelId } } = props;
  const inputEl = useRef();
  useEffect(() => {
    inputEl.current.focus();
  }, []);
  return (
    <div
      className='mt-auto'
    >
      <Formik
        initialValues={{ message: '' }}
        onSubmit={async (values, { setErrors, setStatus, resetForm }) => {
          const { message } = values;
          const { channelMessagesPath } = routes;
          const pathMessage = channelMessagesPath(currentChannelId);
          console.log(inputEl.current);
          try {
            await axios.post(pathMessage, { data: { attributes: { message, userName } } });
            setStatus({ success: true });
            resetForm();
          } catch (error) {
            setStatus({ success: false });
            setErrors({ submit: error.message });
          }
        }}
      >
        {({ isSubmitting, errors }) => {
          const inputClass = classNames({
            'mr-2 form-control': true,
            'is-invalid': errors.submit,
          });
          return (
            <Form>
              <div
                className='form-group'
              >
                <div
                  className='input-group'
                >
                  <Field
                    type='text'
                    name='message'
                    innerRef={inputEl}
                    className={inputClass}
                    disabled={isSubmitting}
                    autoFocus
                  />
                  <button
                    aria-label='submit'
                    type='submit'
                    className='btn btn-primary'
                    disabled={isSubmitting}
                  >
                    Submit
                  </button>
                  <div
                    className='d-block invalid-feedback'
                  >
                    {errors.submit}
                    &nbsp;
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default connect(mapStateToProps)(FormMessage);
