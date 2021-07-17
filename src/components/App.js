import '../styles/App.css';
import '@fontsource/roboto';
import {Helmet} from 'react-helmet';
import React from 'react';
import Queue from './Queue';


const App = () => {
  return (
    <React.Fragment>
      <Helmet>
        <title> Dig Into </title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"/>
      </Helmet>
      <Queue/>
    </React.Fragment>
  );
}

export default App;
