import React, { Component } from 'react';
import request from 'superagent';
import config from '../conf/env-config';

class SearchForm extends Component {
  constructor (props) {
    super(props);

    this.state = {
      text_value: '',
      demographics: null
    };

    this.onSearchClick = this.onSearchClick.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.getDemographics = this.getDemographics.bind(this);
    this.onClearClick = this.onClearClick.bind(this);
  }

  getDemographics () {
    const demo = [];
    let index = 0;

    for (const key in this.state.demographics) {
      demo.push((<div key={index++}>{key}: {this.state.demographics[key]}</div>))
    }

    return demo;
  }

  render () {
    return (
      <div>
        <input type="text" value={this.state.text_value} onChange={this.onTextChange}/>
        <input type="button" value="Search" onClick={this.onSearchClick}/>
        <input type="button" value="Clear" onClick={this.onClearClick}/>
        {this.getDemographics()}
      </div>
    );
  }

  onClearClick (e) {
    e.preventDefault();

    this.setState({demographics: null});
  }

  onTextChange (e) {
    e.preventDefault();

    this.setState({text_value: e.target.value});
  }

  onSearchClick (e) {
    console.log('search clickes', this.state)

    request.get('/api/api/demographics')
      .query({city_name: this.state.text_value})
      .end((err, res) => {
        this.setState({demographics: res.body});
      });
  }
}

export default SearchForm;
