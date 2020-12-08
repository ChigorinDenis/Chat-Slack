import React, { useEffect, createRef } from 'react';
import { useFormik } from 'formik';
import { useDispatch, connect } from 'react-redux';
import { Modal, Form, FormGroup } from 'react-bootstrap';
import axios from 'axios';
import routes from '../routes';
import { closeModal } from '../reducers/modalsReducer';

const mapStateToProps = (state) => {
  const props = {
    modals: state.modals,
  };
  return props;
};

const generateOnSubmit = (dispatch) => async (values) => {
  const { channelsPath } = routes;
  const { name } = values;
  const pathChannels = channelsPath();
  await axios.post(pathChannels, { data: { attributes: { name } } });
  dispatch(closeModal());
};

function ModalAdd(props) {
  const dispatch = useDispatch();
  const formik = useFormik({
    onSubmit: generateOnSubmit(dispatch),
    initialValues: { name: '' },
  });
  const { modals } = props;
  const { isOpen, modalName } = modals;

  const inputEl = createRef(null);
  useEffect(() => inputEl.current && inputEl.current.select(), []);
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
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <Form.Control
              data-testid='input-body'
              name='name'
              ref={inputEl}
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
              Cancel
            </button>
            <button
              type='submit'
              className='btn btn-primary'
            >
              Submit
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default connect(mapStateToProps)(ModalAdd);
