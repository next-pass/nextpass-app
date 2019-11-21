import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Button, Form, InputGroup} from 'react-bootstrap';

import {_t} from '../../i18n';

import message from '../helper/message';

class PassInput extends Component {
  input = React.createRef();

  copy = () => {
    const el = this.input.current;

    el.select();
    el.setSelectionRange(0, 99999); /*For mobile devices*/
    document.execCommand('copy');

    message.success(_t('pass-form.copied'), 800);
  };

  render() {
    const {value} = this.props;

    return <InputGroup>
      <Form.Control readOnly type="text" value={value} ref={this.input} onClick={this.copy}/>
      <InputGroup.Append>
        <Button variant="outline-secondary" onClick={this.copy}>{_t('pass-form.copy')}</Button>
      </InputGroup.Append>
    </InputGroup>
  }
}

PassInput.defaultProps = {
  value: ''
};

PassInput.propTypes = {
  value: PropTypes.string
};

export default PassInput;


