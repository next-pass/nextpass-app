import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Link} from 'react-router-dom';

import {Button, Form, InputGroup} from 'react-bootstrap';

import NewEntryDialog from '../../dialogs/new-entry';

import {getConfig} from 'radiks';

import PassDialog from '../../dialogs/pass';

import EntryDialog from '../../dialogs/entry';

import LinearProgress from '../../helper/progress';

import {_t} from '../../../i18n';

import logoImg from '../../../images/text-logo.png';

import {logOutSvg} from '../../../svg';

class SideBar extends Component {
  logout = () => {
    const {logout, history} = this.props;
    const {userSession} = getConfig();

    userSession.signUserOut();
    logout();
    history.push('/');
  };

  render() {
    const {user} = this.props;

    return (
      <div className="side-bar">
        <div className="brand">
          <Link to="/">
            <img src={logoImg} alt="Logo"/>
          </Link>
        </div>

        <div className="user-info">
          <div className="avatar">
            {(() => {
              if(user.image){
                return null;
              }
              const fLetter = user.username.split('')[0].toUpperCase();
              return <span className="f-letter">{fLetter}</span>;
            })()}
            {user.image && <img src={user.image} alt="user avatar"/>}
          </div>
          <div className="username">{user.username}</div>
        </div>

        <div className="menu">
            <span className="menu-item item-logout" onClick={this.logout}>
              {logOutSvg}{_t('manager.logout')}
            </span>
        </div>
      </div>
    )
  }
}

SideBar.defaultProps = {
  nextPass: null
};

SideBar.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  }).isRequired
};


class EntryItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialog: false
    }
  }

  entryUpdated = () => {
    const {fetchEntries} = this.props;
    fetchEntries();
  };

  toggleDialog = () => {
    const {dialog} = this.state;
    this.setState({dialog: !dialog});
  };

  render() {
    const {data} = this.props;
    const {dialog} = this.state;

    return <>
      <div className="entry-body-item" onClick={this.toggleDialog}>
        <div className="item-name">
          {data.name}
        </div>
      </div>
      {dialog && <EntryDialog {...this.props} data={data} onHide={this.toggleDialog} onUpdate={this.entryUpdated}/>}
    </>
  }
}


EntryItem.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
};

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

    let {list: entryList, loading} = entries;
    const realCount = entryList.length;

    if (search) {
      entryList = entryList.filter(x => x.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
    }

    return (
      <div className="manager-page">
        <SideBar {...this.props} />

        <div className="content">
          <div className={`entry-list ${loading ? 'loading' : ''}`}>
            <div className="entry-list-header">
              <h2 className="entry-list-title">{_t('manager.title')}</h2>
              <div className="entry-list-buttons">
                <Button variant="outline-primary" onClick={this.newClicked}>{_t('manager.add-new')}</Button>
              </div>
            </div>
            {loading && <LinearProgress/>}

            {realCount > 0 &&
            <div className="entry-search">
              <InputGroup>
                <Form.Control type="text" placeholder={_t('manager.search-placeholder')} value={search}
                              onChange={this.searchChanged}/>
              </InputGroup>
            </div>
            }

            <div className="entry-body">
              {(() => {

                if (loading) {
                  return null;
                }

                if (search && entryList.length === 0) {
                  return <div className="empty-list">No match</div>;
                }

                if (entryList.length === 0) {
                  return <div className="empty-list">Nothing here</div>;
                }

                return entryList.map((x, i) => <EntryItem {...this.props} data={x} key={i}/>);
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