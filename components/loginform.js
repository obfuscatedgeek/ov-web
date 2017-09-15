import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

class LoginForm extends Component {
  render () {

    return (
      <RaisedButton labelColor="#FFF" backgroundColor="#bd081c" fullWidth={true} label="Login with Pinterest" href="/api/auth/pinterest"/>
    );
  }
}

export default LoginForm;
