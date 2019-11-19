/*
eslint-disable jsx-a11y/anchor-is-valid
*/

import React, {Component} from 'react';

import PropTypes from 'prop-types';


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

  render() {
    const {ui, user} = this.props;

    if (user === null) {
      return null;
    }

    return (
      <div className="manager-page">

        Manager

        {(() => {

          return null;
        })()}
      </div>
    )
  }
}

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