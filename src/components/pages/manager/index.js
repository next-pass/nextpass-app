/*
eslint-disable jsx-a11y/anchor-is-valid
*/

import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Button} from 'react-bootstrap';

import {getConfig} from 'radiks';

import NewEntryDialog from '../../dialogs/new-entry';

import PassDialog from '../../dialogs/pass';

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

  logout = () => {
    const {logout, history} = this.props;
    const {userSession} = getConfig();

    userSession.signUserOut();
    logout();
    history.push('/');
  };

  newClicked = () => {
    const {toggleUiProp} = this.props;
    toggleUiProp('passDialog');
  };

  newEntryCreated = () => {

  };


  render() {
    const {ui, user, nextPass} = this.props;

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
          <div className="entry-list">
            <div className="entry-list-header">
              <h2 className="entry-list-title">My Passwords</h2>
              <div className="entry-list-buttons">
                <Button variant="outline-primary" onClick={this.newClicked}>+ New Password</Button>
              </div>
            </div>
          </div>
        </div>

        {(() => {

          return null;
        })()}

        {ui.passDialog && <PassDialog  {...this.props} />}
        {nextPass && <NewEntryDialog {...this.props} />}
      </div>
    )
  }
}

ManagerPage.defaultProps = {
  nextPass: null
};

ManagerPage.propTypes = {
  nextPass: PropTypes.string,
  ui: PropTypes.shape({
    passDialog: PropTypes.bool.isRequired,
  }).isRequired,
  toggleUiProp: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

export default ManagerPage;