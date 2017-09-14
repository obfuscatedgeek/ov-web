import React, { Component } from 'react';
import request from 'superagent';

class SearchForm extends Component {
  constructor (props) {
    super(props);

    this.state = {};
    this.onSearchClick = this.onSearchClick.bind(this);
  }

  render () {
    return (
      <div>
        <input type="text" />
        <input type="button" value="Search" onClick={this.onSearchClick}/>
      </div>
    );
  }

  onSearchClick () {
    console.log('search clickes')
  }
}

export default SearchForm;
