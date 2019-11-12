import React from 'react';
import NextApp from 'next/app';

import Amplify from '@aws-amplify/core';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);

class App extends NextApp {
  render () {
    const {Component, props} = this.props;
    return (<Component {...props} />);
  }
}

export default App;
