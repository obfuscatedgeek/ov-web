import React, { Component } from 'react';

import HtmlHead from '../components/htmlhead';

import MuiThemeProvider     from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme          from 'material-ui/styles/getMuiTheme';

import LoginForm from '../components/loginform';

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
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <HtmlHead />
          <LoginForm />
          Hello world</div>
      </MuiThemeProvider>
    );
  }

  getSearchForm () {
    return (
      <div>you have logged in <a href="/api/auth/logout">logout</a></div>
    )
  }

  render () {
    return this.props.user ? this.getSearchForm() : this.getLoginForm();
  }
}

export default IndexPage;
