import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class LoginForm extends Component {
  render () {
    return (
      <div>
        <a href="/api/auth/pinterest">Login with Pinterest</a>
      </div>
    );
  }
}

export default LoginForm;
