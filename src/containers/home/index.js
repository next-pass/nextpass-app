import React, {Component} from 'react';
import connect from 'react-redux/es/connect/connect';
import {bindActionCreators} from 'redux';

import {HomePage} from '../../components/pages/home';

import {login, logout} from '../../store/user';
import {toggleUiProp} from '../../store/ui';
import {setNextPass} from '../../store/next-pass';

class HomeContainer extends Component {
  render() {
    return <HomePage {...this.props} />;
  }
}

const mapStateToProps = ({user, ui}) => ({
  user,
  ui
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login,
      logout,
      toggleUiProp,
      setNextPass
    },
    dispatch
  );

const HomePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);

export {HomePageContainer}