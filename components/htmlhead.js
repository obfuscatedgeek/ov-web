import Head from 'next/head';
import React, { Component } from 'react';

class HtmlHead extends Component {
  render () {
    return (
      <Head>
        <title>{this.props.title || 'OV'} - {this.props.description || 'Web interface'}</title>
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet" />
        <meta charSet="UTF-8" />
      </Head>
    );
  }
};

export default HtmlHead;
