import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Modal, Button, Form} from 'react-bootstrap';

import to from 'await-to-js';

import {_t} from '../../../i18n';

import {Entry as EntryModel} from '../../../model';

import PassInput from "../../pass-input";

const defaultProps = {
  onHide: () => {
  }
};

const propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  onHide: PropTypes.func
};

class DialogContent extends Component {

  constructor(props) {
    super(props);

    const {name, username, notes} = props.data;

    this.state = {
      name,
      username,
      notes,
      inProgress: false,
      error: ''
    }
  }

  nameChanged = (e) => {
    this.setState({name: e.target.value});
  };

  usernameChanged = (e) => {
    this.setState({username: e.target.value});
  };

  notesChanged = (e) => {
    this.setState({notes: e.target.value});
  };

  update = () => {

  };

  render() {
    const {data} = this.props;
    const {name, username, notes, inProgress, error} = this.state;

    return <>
      <Modal.Body>
        <Form>
          {error &&
          <p>
            <Form.Text className="text-danger">{error}</Form.Text>
          </p>
          }
          <Form.Group controlId="form-password">
            <PassInput {...this.props} value={data.pass}/>
          </Form.Group>
          <Form.Group controlId="form-name">
            <Form.Control ref={this.nameRef} type="text" value={name} onChange={this.nameChanged}
                          placeholder={_t('new-entry-dialog.name-label')} maxLength={60}/>
          </Form.Group>
          <Form.Group controlId="form-username">
            <Form.Control type="text" value={username} onChange={this.usernameChanged}
                          placeholder={_t('new-entry-dialog.username-label')} maxLength={100}/>
          </Form.Group>
          <Form.Group controlId="form-notes">
            <Form.Control type="text" as="textarea" value={notes} onChange={this.notesChanged}
                          placeholder="Extra notes" rows="2" maxLength={1000}/>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={this.update} disabled={inProgress}>{_t('g.update')}</Button>
      </Modal.Footer>
    </>
  }
}

DialogContent.defaultProps = defaultProps;
DialogContent.propTypes = propTypes;

export {DialogContent};

class EntryDialog extends Component {
  hide = () => {
    const {onHide} = this.props;
    onHide();
  };

  render() {
    return (
      <Modal show centered size="lg" className="entry-dialog" onHide={this.hide}>
        <DialogContent {...this.props} />
      </Modal>
    )
  }
}

EntryDialog.defaultProps = defaultProps;

EntryDialog.propTypes = propTypes;

export default EntryDialog;