import React, { Component } from 'react';
import request from 'superagent';
import Paper from 'material-ui/Paper';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';

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
      demo.push((<ListItem primaryText={key} secondaryText={this.state.demographics[key]} key={index++} />));
    }

    return (<div><h2>Demographics</h2><List>{demo}</List></div>);
  }

  render () {

    const btn_style = {
      margin: '12px'
    };
    return (
      <div>
        <div>
          <TextField fullWidth={true} floatingLabelText="Enter a US City" value={this.state.text_value} onChange={this.onTextChange} />
        </div>
        <div>
        <RaisedButton style={btn_style} primary={true} label="Search" onClick={this.onSearchClick}/>
        <RaisedButton style={btn_style} label="Clear" onClick={this.onClearClick}/>
        </div>
        {this.getDemographics()}
      </div>
    );
  }

  onClearClick (e) {
    e.preventDefault();

    this.setState({demographics: null, text_value: ''});
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
