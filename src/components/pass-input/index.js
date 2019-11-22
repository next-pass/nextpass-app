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

    message.success(_t('pass-form.copied'), 800);
  };

  reveal = () => {
    this.setState({hidden: false});
  };

  conceal = () => {
    this.setState({hidden: true});
  };

  render() {
    const {value} = this.props;
    const {hidden} = this.state;

    return <InputGroup>
      <Form.Control readOnly type={hidden ? 'password' : 'text'} value={value} ref={this.input} onClick={this.copy}/>
      <InputGroup.Append>
        {(() => {



          if (hidden) {
            return <Button variant="outline-secondary" onClick={this.reveal}>Reveal</Button>
          }

          if (!hidden) {
            return <Button variant="outline-secondary" onClick={this.conceal}>Conceal</Button>
          }
        })()}

        <Button variant="outline-secondary" onClick={this.copy}>{_t('pass-form.copy')}</Button>
      </InputGroup.Append>
    </InputGroup>
  }
}

PassInput.defaultProps = {
  value: '',
  defaultHidden: true
};

PassInput.propTypes = {
  value: PropTypes.string,
  defaultHidden: PropTypes.bool,
};

export default PassInput;


