import React, {Component} from 'react';
import connect from 'react-redux/es/connect/connect';
import {bindActionCreators} from 'redux';

import ManagerPage from '../../components/pages/manager';

import {login, logout} from '../../store/user';
import {toggleUiProp} from '../../store/ui';
import {setNextPass, resetNextPass} from '../../store/next-pass';

class ManagerContainer extends Component {
  render() {
    return <ManagerPage {...this.props} />;
  }
}

const mapStateToProps = ({user, ui, nextPass}) => ({
  user,
  ui,
  nextPass,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login,
      logout,
      toggleUiProp,
      setNextPass,
      resetNextPass
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManagerContainer)