/*
eslint-disable jsx-a11y/anchor-is-valid
*/

import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {getConfig} from 'radiks';

import logoImg from '../../../images/text-logo.png';

import {logOutSvg} from '../../../svg';

class ManagerPage extends Component {

  constructor(props) {
    super(props);


  }

  componentDidMount() {
    const {user, history} = this.props;
    if (user === null) {
      history.push('/');
      return null;
    }
  }

  newProjectCreated = () => {

  };

  logout = () => {
    const {logout, history} = this.props;
    const {userSession} = getConfig();

    userSession.signUserOut();
    logout();
    history.push('/');
  };

  render() {
    const {ui, user} = this.props;

    if (user === null) {
      return null;
    }


    return (
      <div className="manager-page">

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
              {logOutSvg}Logout
            </span>
          </div>
        </div>

        <div className="content">
          content
        </div>

        {(() => {

          return null;
        })()}
      </div>
    )
  }
}

//

ManagerPage.defaultProps = {
  project: null
};

ManagerPage.propTypes = {
  ui: PropTypes.shape({
    newProject: PropTypes.bool.isRequired,
  }).isRequired,
  toggleUiProp: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

export default ManagerPage;