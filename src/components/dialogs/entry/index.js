import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Modal, Button, Form} from 'react-bootstrap';

import to from 'await-to-js';

import {_t} from '../../../i18n';

import PassInput from '../../pass-input';

import ConfirmDialog from '../confirm';

import message from '../../helper/message';

import {deleteEntry, updateEntry} from '../../../dbl';

const defaultProps = {
  onHide: () => {
  },
  onUpdate: () => {
  }
};

const propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  onHide: PropTypes.func,
  onUpdate: PropTypes.func
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
  };

  nameRef = React.createRef();

  nameChanged = (e) => {
    this.setState({name: e.target.value});
  };

  usernameChanged = (e) => {
    this.setState({username: e.target.value});
  };

  notesChanged = (e) => {
    this.setState({notes: e.target.value});
  };

  update = async () => {
    this.setState({error: ''});

    const {data} = this.props;
    const {name} = this.state;

    if (name.trim() === '') {
      this.setState({error: _t('entry-dialog.name-error')});
      this.nameRef.current.focus();
      return;
    }

    this.setState({inProgress: true});

    const {username, notes} = this.state;

    const [err2,] = await to(updateEntry(data._id, {name, username, notes}));

    if (err2) {
      message.error(_t('g.server-error'));
      this.setState({inProgress: false});
      return;
    }

    this.setState({inProgress: false});
    message.success(_t('g.updated'));
    const {onUpdate} = this.props;
    onUpdate();
  };

  delete = async () => {
    const {data} = this.props;

    this.setState({inProgress: true});

    const [err,] = await to(deleteEntry(data._id));

    if (err) {
      message.error(_t('g.server-error'));
      this.setState({inProgress: true});
      return;
    }

    this.setState({inProgress: false}, () => {
      message.success(_t('g.deleted'));
      const {onUpdate, onHide} = this.props;
      onUpdate();
      onHide();
    });
  };

  hide = () => {
    const {onHide} = this.props;
    onHide();
  };

  render() {
    const {data} = this.props;
    const {name, username, notes, inProgress, error} = this.state;

    return <>
      <Modal.Body>
        <Form>
          <Form.Group controlId="form-password">
            <PassInput {...this.props} value={data.pass}/>
          </Form.Group>
          {error &&
          <p>
            <Form.Text className="text-danger">{error}</Form.Text>
          </p>
          }
          <Form.Group controlId="form-name">
            <Form.Control ref={this.nameRef} type="text" value={name} onChange={this.nameChanged}
                          placeholder={_t('entry-dialog.name-label')} maxLength={60}/>
          </Form.Group>
          <Form.Group controlId="form-username">
            <Form.Control type="text" value={username} onChange={this.usernameChanged}
                          placeholder={_t('entry-dialog.username-label')} maxLength={100}/>
          </Form.Group>
          <Form.Group controlId="form-notes">
            <Form.Control type="text" as="textarea" value={notes} onChange={this.notesChanged}
                          placeholder={_t('entry-dialog.notes-label')} rows="2" maxLength={1000}/>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <ConfirmDialog title={_t('g.are-you-sure')} onConfirm={this.delete}>
          <Button variant="outline-danger" className="mr-auto" onClick={this.delete}
                  disabled={inProgress}>{_t('g.delete')}</Button>
        </ConfirmDialog>
        <Button variant="secondary" onClick={this.hide} disabled={inProgress}>{_t('g.close')}</Button>
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