import React from 'react';
import { useFormik } from 'formik';
import { useDispatch, connect } from 'react-redux';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import routes from '../routes';
import { closeModal } from '../reducers/modalsReducer';

const mapStateToProps = (state) => {
  const props = {
    modals: state.modals,
  };
  return props;
};

const generateOnSubmit = (dispatch, id) => async (values) => {
  const { channelPath } = routes;
  const { name } = values;
  const pathChannels = channelPath(id);
  await axios.patch(pathChannels, { data: { attributes: { name } } });
  dispatch(closeModal());
};

function ModalRename(props) {
  const dispatch = useDispatch();
  const { modals } = props;
  const { isOpen, modalName, data } = modals;
  const { name } = data;
  const formik = useFormik({
    initialValues: { name },
    onSubmit: generateOnSubmit(dispatch, data.id),
  });
  return (
    <Modal
      // show={true}
      show={isOpen && modalName === 'renamingModal'}
      onHide={() => dispatch(closeModal())}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Rename Channel
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              name='name'
              // ref={inputRef}
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
              Cancel
            </button>
            <button
              type='submit'
              className='btn btn-primary'
            >
              Submit
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default connect(mapStateToProps)(ModalRename);
