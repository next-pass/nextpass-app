import React, {Component} from 'react';
import connect from 'react-redux/es/connect/connect';
import {bindActionCreators} from 'redux';

import ManagerPage from '../../components/pages/manager';

import {login, logout} from '../../store/user';
import {toggleUiProp} from '../../store/ui';
import {setNextPass, resetNextPass} from '../../store/next-pass';
import {fetchEntries} from '../../store/entries';

class ManagerContainer extends Component {
  render() {
    return <ManagerPage {...this.props} />;
  }
}

const mapStateToProps = ({user, ui, nextPass, entries}) => ({
  user,
  ui,
  nextPass,
  entries,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login,
      logout,
      toggleUiProp,
      setNextPass,
      resetNextPass,
      fetchEntries
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManagerContainer)