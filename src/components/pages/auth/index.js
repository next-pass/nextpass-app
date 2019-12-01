/*
eslint-disable jsx-a11y/anchor-is-valid
*/

import React, {Component} from 'react';

import {userSession, getUsername} from "../../../blockstack-config";

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
    if (userSession.isSignInPending()) {
      try {
        await userSession.handlePendingSignIn();
      } catch (ex) {
        this.setState(({error: true}));
        console.error(ex.message);
        return;
      }

      this.doLogin();
    }
  };


  doLogin = () => {
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
