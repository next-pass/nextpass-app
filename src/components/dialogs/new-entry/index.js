import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Modal, Button} from 'react-bootstrap';

const defaultProps = {
  onSave: () => {
  }
};
const propTypes = {
  resetNextPass: PropTypes.func.isRequired,
  onSave: PropTypes.func
};

class DialogContent extends Component {

  cancel = () => {
    const {resetNextPass} = this.props;
    resetNextPass();
  };

  save = () => {
    const {onSave, resetNextPass} = this.props;
    resetNextPass();
    console.log("save")
  };

  render() {
    return <>
      <Modal.Body>
        <h5>New Password</h5>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={this.cancel}>Cancel</Button>
        <Button variant="primary" onClick={this.save}>Save</Button>
      </Modal.Footer>
    </>
  }
}

DialogContent.defaultProps = defaultProps;
DialogContent.propTypes = propTypes;

export {DialogContent};

class NewEntryDialog extends Component {
  hide = () => {

  };

  render() {
    return (
      <Modal show className="new-entry-dialog" onHide={this.hide}>
        <DialogContent {...this.props} />
      </Modal>
    )
  }
}

NewEntryDialog.defaultProps = defaultProps;

NewEntryDialog.propTypes = propTypes;

export default NewEntryDialog;