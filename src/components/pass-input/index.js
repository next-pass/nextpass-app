import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Button, Form, InputGroup} from 'react-bootstrap';

import Clipboard from '../helper/clipboard';

import {_t} from '../../i18n';

class PassInput extends Component {
  constructor(props) {
    super(props);

    const {defaultHidden} = props;

    this.state = {
      hidden: defaultHidden
    }
  }

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
      {(() => {

        if (inputType === 'text') {
          return <Clipboard value={value}>
            <Form.Control readOnly type={inputType} value={value} className="pass-input"/>
          </Clipboard>;
        }

        return <Form.Control readOnly type={inputType} value={value} className="pass-input"/>;
      })()}

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

        <Clipboard value={value}>
          <Button variant="outline-secondary">{_t('pass-input.copy')}</Button>
        </Clipboard>
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


