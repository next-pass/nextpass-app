import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Link} from 'react-router-dom';

import {Button, Form, InputGroup} from 'react-bootstrap';

import NewEntryDialog from '../../dialogs/new-entry';

import {getConfig} from 'radiks';

import PassDialog from '../../dialogs/pass';

import EntryDialog from '../../dialogs/entry';

import LinearProgress from '../../helper/progress';

import Clipboard from '../../helper/clipboard';

import {_t} from '../../../i18n';

import logoImg from '../../../images/text-logo.png';

import {logOutSvg, clipboardSvg, editSvg} from '../../../svg';

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
              if (user.image) {
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

class ManagerPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      search: '',
      entry: null
    };

    this.loadEntries();
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

  loadEntries = () => {
    const {fetchEntries} = this.props;
    fetchEntries();
  };

  searchChanged = (e) => {
    this.setState({search: e.target.value});
  };

  entryClicked = (entry) => {
    this.setState({entry});
  };

  toggleDialog = () => {
    this.setState({entry: null});
  };

  render() {
    const {ui, user, nextPass, entries} = this.props;
    const {search, entry} = this.state;

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

            {entry &&
            <EntryDialog {...this.props} data={entry} onHide={this.toggleDialog} onUpdate={this.loadEntries}/>
            }

            <div className="entry-body">
              {(() => {

                if (loading) {
                  return null;
                }

                if (search && entryList.length === 0) {
                  return <div className="empty-list">{_t('manager.no-match')}</div>;
                }

                if (entryList.length === 0) {
                  return <div className="empty-list">{_t('manager.empty-list')}</div>;
                }

                return entryList.map((x, i) =>
                  <div className="entry-body-item" key={i}>
                    <div className="item-copy">
                      <Clipboard value={x.pass}>
                        <span title={_t('manager.copy-clipboard')}>{clipboardSvg}</span>
                      </Clipboard>
                    </div>
                    <div className="item-name">
                      {x.name}
                    </div>
                    <div className="item-edit" onClick={() => {
                      this.entryClicked(x)
                    }}>
                      <span title={_t('g.edit')}>{editSvg}</span>
                    </div>
                  </div>);
              })()}
            </div>
          </div>
        </div>
        {ui.passDialog && <PassDialog  {...this.props} />}
        {nextPass && <NewEntryDialog {...this.props} onSave={this.loadEntries}/>}
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