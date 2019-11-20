import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {getConfig} from 'radiks';

import logoImg from '../../../images/text-logo.png';

import {logOutSvg} from '../../../svg';

import {_t} from "../../../i18n";

class SideBar extends Component {


  logout = () => {
    const {logout, history} = this.props;
    const {userSession} = getConfig();

    userSession.signUserOut();
    logout();
    history.push('/');
  };

  render() {
    const {user} = this.props;

    return (
      <div className="side-bar">
        <div className="brand">
          <img src={logoImg} alt="Logo"/>
        </div>

        <div className="user-info">
          <div className="avatar">
            {(() => {
              const fLetter = user.username.split('')[0].toUpperCase();
              return <span className="f-letter">{fLetter}</span>;
            })()}
            {user.image && <img src={user.image}/>}
          </div>
          <div className="username">{user.username}</div>
        </div>

        <div className="menu">
            <span className="menu-item item-logout" onClick={this.logout}>
              {logOutSvg}{_t('manager.logout')}
            </span>
        </div>
      </div>
    )
  }
}

SideBar.defaultProps = {
  nextPass: null
};

SideBar.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  }).isRequired
};

export default SideBar;