/*
eslint-disable jsx-a11y/anchor-is-valid
*/

import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Button, Form, InputGroup} from 'react-bootstrap';

import {getConfig} from 'radiks';

import NewEntryDialog from '../../dialogs/new-entry';

import PassDialog from '../../dialogs/pass';

import logoImg from '../../../images/text-logo.png';

import {logOutSvg} from '../../../svg';
import {_t} from "../../../i18n";

class ManagerPage extends Component {

  constructor(props) {
    super(props);

    const {fetchEntries} = this.props;
    fetchEntries();

    this.state = {
      search: ''
    }
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
    const {fetchEntries} = this.props;
    fetchEntries();
  };

  searchChanged = (e) => {
    this.setState({search: e.target.value});
  };


  render() {
    const {ui, user, nextPass, entries} = this.props;
    const {search} = this.state;

    if (user === null) {
      return null;
    }

    let {list: entryList} = entries;

    if (search) {
      entryList = entryList.filter(x => x.name.toLowerCase().indexOf(search.toLowerCase()) !== -1);
    }

    console.log(entryList);

    // We've created some dummy paswords


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
              <h2 className="entry-list-title">Passwords</h2>
              <div className="entry-list-buttons">
                <Button variant="outline-primary" onClick={this.newClicked}>+ New Password</Button>
              </div>
            </div>

            <div className="entry-search">
              <InputGroup>
                <Form.Control type="text" placeholder="search in passwords" value={search}
                              onChange={this.searchChanged}/>
              </InputGroup>
            </div>

            <div className="entry-body">
              {(() => {
                if (search && entryList.length === 0) {
                  return 'No match'
                }

                if (entryList.length === 0) {
                  return 'Nothing here'
                }

                return entryList.map((x, i) => {
                  return <div className="entry-body-item" key={i}>
                    <div className="item-name">
                      {x.name}
                    </div>
                  </div>
                })
              })()}
            </div>
          </div>
        </div>
        {ui.passDialog && <PassDialog  {...this.props} />}
        {nextPass && <NewEntryDialog {...this.props} onSave={this.newEntryCreated}/>}
      </div>
    )
  }
}

ManagerPage.defaultProps = {
  nextPass: null
};

ManagerPage.propTypes = {
  nextPass: PropTypes.string,
  entries: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    list: PropTypes.arrayOf(Object).isRequired
  }).isRequired,
  ui: PropTypes.shape({
    passDialog: PropTypes.bool.isRequired,
  }).isRequired,
  fetchEntries: PropTypes.func.isRequired,
  toggleUiProp: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

export default ManagerPage;