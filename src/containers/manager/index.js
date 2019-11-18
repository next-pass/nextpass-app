import React, {Component} from 'react';
import connect from 'react-redux/es/connect/connect';
import {bindActionCreators} from 'redux';

import ManagerPage from '../../components/pages/manager';

import {login, logout} from '../../store/user';
import {toggleUiProp, invalidateUiFlag} from '../../store/ui';


class ManagerContainer extends Component {
  render() {
    return <ManagerPage {...this.props} />;
  }
}

const mapStateToProps = ({user, ui,}) => ({
  user,
  ui,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login,
      logout,
      toggleUiProp,
      invalidateUiFlag
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManagerContainer)