import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Button, Form, InputGroup} from 'react-bootstrap';

import NewEntryDialog from '../../dialogs/new-entry';

import PassDialog from '../../dialogs/pass';

import SideBar from './sidebar';


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

    if (search) {
      entryList = entryList.filter(x => x.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
    }

    return (
      <div className="manager-page">
        <SideBar {...this.props} />

        <div className="content">
          <div className="entry-list">
            <div className="entry-list-header">
              <h2 className="entry-list-title">{_t('manager.title')}</h2>
              <div className="entry-list-buttons">
                <Button variant="outline-primary" onClick={this.newClicked}>{_t('manager.add-new')}</Button>
              </div>
            </div>

            <div className="entry-search">
              <InputGroup>
                <Form.Control type="text" placeholder={_t('manager.search-placeholder')} value={search}
                              onChange={this.searchChanged}/>
              </InputGroup>
            </div>

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