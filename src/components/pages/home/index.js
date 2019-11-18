/*
eslint-disable jsx-a11y/anchor-is-valid
*/

import React, {Component} from 'react';

import PropTypes from 'prop-types';

import logoImg from '../../../images/text-logo.png';

import graphic2 from '../../../images/graphic2.svg'

import {coctailSvg, shieldSvg} from "../../../svg";

import {userSession} from '../../../blockstack-config';

import PassForm from '../../pass-form/index'

import {Row, Col, Container, Button, InputGroup, Navbar, Nav, NavDropdown} from 'react-bootstrap';

class HomePage extends Component {
  goManager = (e) => {
    e.preventDefault();

    const {history} = this.props;
    history.push('/manager');
  };

  login = (e) => {
    e.preventDefault();

    userSession.redirectToSignIn();
  };

  render() {
    const {user} = this.props;

    return (
      <div className="home-page">
        {user === null &&
        <span>&nbsp;</span>
        }
        <Navbar className="main-nav-bar" bg="primary" variant="dark">
          <Container>
            <Navbar.Brand href="#home"><img src={logoImg} alt="Logo"/></Navbar.Brand>
            <Nav className="ml-auto">
              {user === null &&
              <>
                <Nav.Link href="#" onClick={this.login}>Login</Nav.Link>
                <Nav.Link href="#" onClick={this.login}>Sign Up</Nav.Link>
              </>
              }

              {user !== null && <Nav.Link href="#" onClick={this.goManager}>Password Manager</Nav.Link>}
            </Nav>
          </Container>
        </Navbar>
        <div className="hero">
          <Container>
            <Row>
              <Col md={6} className="hero-content">
                <h1 className="main-title">Your next secure password
                </h1>
                <p className="description">
                  Password security is a must to have for today's internet.
                  nextPass helps you to create extra secure
                  passwords and manage them in ease at a super secure place.
                </p>
                <div className="features">
                  <div className="feature">
                    {coctailSvg} Free to use
                  </div>
                  <div className="feature">
                    {shieldSvg} Secured by Blockstack
                  </div>
                </div>
              </Col>
              <Col md={6} className="hero-image">
                <img className="graphic" src={graphic2} alt="nextPass Graphic"/>
              </Col>
            </Row>
          </Container>
        </div>
        <Container>
          <Row>
            <Col md={12} className="showcase">
              <div className="password-form">
                <div className="password-form-content">
                  <PassForm {...this.props} />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <Container>
          <div className="main-footer">
            <div className="copyright">
              nextPass • 2019
            </div>
          </div>
        </Container>
      </div>
    )
  }
}


HomePage.defaultProps = {};

HomePage.propTypes = {
  user: PropTypes.shape({}),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};


export {HomePage};
