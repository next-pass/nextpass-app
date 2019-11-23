import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Modal, Button, Form} from 'react-bootstrap';

import to from 'await-to-js';

import PassInput from '../../pass-input';

import {_t} from '../../../i18n';

import {Entry} from '../../../model';

import {ENTRY_STATUS_ON, ENTRY_TYPE_PASSWORD} from '../../../constants';

const defaultProps = {
  onSave: () => {
  }
};
const propTypes = {
  resetNextPass: PropTypes.func.isRequired,
  nextPass: PropTypes.string.isRequired,
  onSave: PropTypes.func
};

class DialogContent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      username: '',
      inProgress: false,
      error: ''
    }
  }

  nameRef = React.createRef();

  componentDidMount() {
    setTimeout(() => {
      this.nameRef.current.focus();
    }, 400);
  }

  save = async () => {
    this.setState({error: ''});

    const {name, username} = this.state;
    const {nextPass} = this.props;

    if (name.trim() === '') {
      this.setState({error: _t('entry-dialog.name-error')});
      this.nameRef.current.focus();
      return;
    }

    this.setState({inProgress: true});

    const e = new Entry({
      name,
      username,
      pass: nextPass,
      status: ENTRY_STATUS_ON,
      type: ENTRY_TYPE_PASSWORD
    });

    const [err,] = await to(e.save());

    if (err) {
      this.setState({error: _t('g.server-error'), inProgress: false});
      return;
    }

    this.setState({error: '', inProgress: false});

    const {onSave, resetNextPass} = this.props;
    resetNextPass();
    onSave();
  };

  cancel = () => {
    const {resetNextPass} = this.props;
    resetNextPass();
  };

  nameChanged = (e) => {
    this.setState({name: e.target.value});
  };

  usernameChanged = (e) => {
    this.setState({username: e.target.value});
  };

  render() {
    const {nextPass} = this.props;
    const {name, username, error, inProgress} = this.state;

    return <>
      <Modal.Header>
        <Modal.Title>{_t('entry-dialog.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="form-password">
            <PassInput value={nextPass} canToggle={false}/>
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
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={this.cancel} disabled={inProgress}>{_t('g.cancel')}</Button>
        <Button variant="primary" onClick={this.save} disabled={inProgress}>{_t('g.save')}</Button>
      </Modal.Footer>
    </>
  }
}

DialogContent.defaultProps = defaultProps;
DialogContent.propTypes = propTypes;

export {DialogContent};

class NewEntryDialog extends Component {
  hide = () => {
    const {resetNextPass} = this.props;
    resetNextPass();
  };

  render() {
    return (
      <Modal show size="lg" centered className="new-entry-dialog" onHide={this.hide}>
        <DialogContent {...this.props} />
      </Modal>
    )
  }
}

NewEntryDialog.defaultProps = defaultProps;

NewEntryDialog.propTypes = propTypes;

export default NewEntryDialog;