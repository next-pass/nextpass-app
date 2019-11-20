import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Modal, Button, Form} from 'react-bootstrap';

import to from 'await-to-js';

import {_t} from '../../../i18n';

import {Entry} from '../../../model';

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
      this.setState({error: _t('new-entry-dialog.name-error')});
      this.nameRef.current.focus();
      return;
    }

    this.setState({inProgress: true});

    const e = new Entry({
      name,
      username,
      pass: nextPass,
      status: 1
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
      <Modal.Header closeButton>
        <Modal.Title>{_t('new-entry-dialog.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {error &&
          <p>
            <Form.Text className="text-danger">{error}</Form.Text>
          </p>
          }
          <Form.Group controlId="form-password">
            <Form.Control readOnly type="text" value={nextPass}/>
          </Form.Group>
          <Form.Group controlId="form-name">
            <Form.Control ref={this.nameRef} type="text" value={name} onChange={this.nameChanged}
                          placeholder={_t('new-entry-dialog.name-label')}/>
          </Form.Group>
          <Form.Group controlId="form-username">
            <Form.Control type="text" value={username} onChange={this.usernameChanged}
                          placeholder={_t('new-entry-dialog.username-label')}/>
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
      <Modal show className="new-entry-dialog" onHide={this.hide}>
        <DialogContent {...this.props} />
      </Modal>
    )
  }
}

NewEntryDialog.defaultProps = defaultProps;

NewEntryDialog.propTypes = propTypes;

export default NewEntryDialog;