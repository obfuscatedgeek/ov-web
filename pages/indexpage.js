import React, { Component } from 'react';

import HtmlHead from '../components/htmlhead';

import MuiThemeProvider     from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme          from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

const muiTheme = getMuiTheme({ userAgent: false });

class IndexPage extends Component {
  render () {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>

        <div>
          <HtmlHead />
          Hello world</div>
      </MuiThemeProvider>
    );
  }
}

export default IndexPage;
