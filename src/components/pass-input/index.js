import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Button, Form, InputGroup} from 'react-bootstrap';

import {_t} from '../../i18n';

import message from '../helper/message';

class PassInput extends Component {

  constructor(props) {
    super(props);

    const {defaultHidden} = props;

    this.state = {
      hidden: defaultHidden
    }
  }

  input = React.createRef();

  copy = () => {
    const el = this.input.current;

    el.select();
    el.setSelectionRange(0, 99999); /*For mobile devices*/
    document.execCommand('copy');

    message.success(_t('pass-input.copied'), 800);
  };

  reveal = () => {
    this.setState({hidden: false});
  };

  conceal = () => {
    this.setState({hidden: true});
  };

  render() {
    const {value, canToggle} = this.props;
    const {hidden} = this.state;

    const inputType = hidden && canToggle ? 'password' : 'text';

    return <InputGroup>
      <Form.Control readOnly type={inputType} value={value} ref={this.input} onClick={this.copy}/>
      <InputGroup.Append>
        {(() => {

          if (!canToggle) {
            return null;
          }

          if (hidden) {
            return <Button variant="outline-secondary" onClick={this.reveal}>{_t('pass-input.reveal')}</Button>
          }

          if (!hidden) {
            return <Button variant="outline-secondary" onClick={this.conceal}>{_t('pass-input.conceal')}</Button>
          }
        })()}

        <Button variant="outline-secondary" onClick={this.copy}>{_t('pass-input.copy')}</Button>
      </InputGroup.Append>
    </InputGroup>
  }
}

PassInput.defaultProps = {
  value: '',
  defaultHidden: true,
  canToggle: true
};

PassInput.propTypes = {
  value: PropTypes.string,
  defaultHidden: PropTypes.bool,
  canToggle: PropTypes.bool,
};

export default PassInput;


