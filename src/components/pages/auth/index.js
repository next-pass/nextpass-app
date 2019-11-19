/*
eslint-disable jsx-a11y/anchor-is-valid
*/

import React, {Component} from 'react';

import {User, getConfig} from 'radiks';

import {getUsername} from "../../../blockstack-config";

import PropTypes from 'prop-types';

import logoImg from '../../../images/text-logo.png'

class AuthPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      error: null
    }
  }

  doAuth = async () => {
    const {userSession} = getConfig();

    if (userSession.isSignInPending()) {
      try {
        await userSession.handlePendingSignIn();
      } catch (ex) {
        this.setState(({error: true}));
        console.error(ex.message);
        return;
      }

      // Radiks throws "Uncaught TypeError: Cannot read property 'attrs' of undefined" error for
      // non-username accounts. This event handler is a workaround.
      window.addEventListener('unhandledrejection', this.handleRadiksError);

      await User.createWithCurrentUser();

      this.doLogin();
    }
  };

  handleRadiksError = (ex) => {
    if (ex.reason && ex.reason.message === "Cannot read property 'attrs' of undefined") {
      this.doLogin();
      console.error(ex.message);
      return;
    }

    this.setState(({error: true}));
  };

  doLogin = () => {
    // Remove the radiks event handler.
    window.removeEventListener('unhandledrejection', this.handleRadiksError);

    const {userSession} = getConfig();

    const userData = userSession.loadUserData();
    const username = getUsername();

    // Find user profile image
    let image;
    try {
      image = userData.profile.image[0].contentUrl
    } catch (e) {
      image = '';
    }

    const {login, history} = this.props;
    login(username, image);

    history.push('/manager');
  };

  componentDidMount() {
    this.doAuth().then();
  }

  login = (e) => {
    e.preventDefault();

    const {userSession} = getConfig();
    userSession.signUserOut();
    userSession.redirectToSignIn();
  };

  render() {
    const {error} = this.state;

    if (error) {
      return <div className="auth-error">
        <p><strong>Sorry :(</strong></p>
        <p>Something went wrong.</p>
        <p><a href="#" onClick={this.login}><strong>Click here</strong></a> to try again.</p>
      </div>;
    }

    return <div className="auth-loading">
      <img src={logoImg} alt="Logo"/>
    </div>;
  }
}


AuthPage.defaultProps = {};

AuthPage.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};


export default AuthPage;
