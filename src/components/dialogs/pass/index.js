import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Modal} from 'react-bootstrap';

import PassGenerator from "../../pass-form";

const defaultProps = {};

const propTypes = {
  toggleUiProp: PropTypes.func.isRequired
};

class DialogContent extends Component {
  onSave = () => {
    const {toggleUiProp} = this.props;
    toggleUiProp('passDialog');
  };

  render() {
    return <>
      <Modal.Body>
        <PassGenerator {...this.props} onSave={this.onSave}/>
      </Modal.Body>
    </>
  }
}

DialogContent.defaultProps = defaultProps;
DialogContent.propTypes = propTypes;

export {DialogContent};

class PassDialog extends Component {
  hide = () => {
    const {toggleUiProp} = this.props;
    toggleUiProp('passDialog');
  };

  render() {
    return (
      <Modal show className="pass-dialog" onHide={this.hide}>
        <DialogContent {...this.props} />
      </Modal>
    )
  }
}

PassDialog.defaultProps = defaultProps;

PassDialog.propTypes = propTypes;

export default PassDialog;