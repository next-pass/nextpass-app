import React, {Component} from 'react';

import PropTypes from 'prop-types';

import message from '../message';
import {_t} from "../../../i18n";

class Clipboard extends Component {

  copy = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const {value} = this.props;

    const el = document.createElement('input');

    el.setAttribute('type', 'text');
    el.setAttribute('value', value);
    el.style.position = 'absolute';
    el.style.left = '-5000px';
    el.style.top = '-5000px';

    document.body.appendChild(el);

    el.select();
    el.setSelectionRange(0, 99999); /*For mobile devices*/
    document.execCommand('copy');
    document.body.removeChild(el);

    message.success(_t('clipboard.copied'), 800);
  };

  render() {
    const {children} = this.props;

    return React.cloneElement(children, {
      onClick: this.copy
    });
  }
}

Clipboard.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.string.isRequired
};

export default Clipboard;