import React, { Component } from 'react';

import HtmlHead from '../components/htmlhead';

import MuiThemeProvider     from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme          from 'material-ui/styles/getMuiTheme';

import LoginForm from '../components/loginform';
import SearchForm from '../components/searchform';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
const muiTheme = getMuiTheme({ userAgent: false });

class IndexPage extends Component {
  static async getInitialProps (options) {
    const session = options.req.session;
    const user = session.passport ? session.passport.user : null;

    return {
      user
    };
  }

  getLoginForm () {
    return (<LoginForm />);
  }

  getSearchForm () {
    return (<SearchForm />);
  }

  render () {
    const style = {
      width: '90%',
      minHeight: '300px',
      margin: '30px auto'
    };

    const paper_style = {
      padding: '50px;'
    }

    const form = this.props.user ? this.getSearchForm() : this.getLoginForm();
    const btn = this.props.user ? (<FlatButton label="logout" href="/api/auth/logout"/>) : null;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Card style={style}>
          <AppBar showMenuIconButton={false} title="Outvio"
            iconElementRight={btn}
          />
          <HtmlHead />
          <div style={paper_style}>
          {form}
          </div>
        </Card>
      </MuiThemeProvider>
    )
  }
}

export default IndexPage;
